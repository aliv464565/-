import axios from 'axios';
import { NextAuthOptions, User } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { BASE_URL_API } from '../constanst';
interface user {
    id: number;
    image: null | string;
    username: string;
    first_name: string;
    last_name: string;
    identity_number: null | string;
    father_name: null | string;
    birth_date: null | string;
    birth_place: null | string;
    mobile: string;
    phone: null | string;
    job: null | string;
    office: null | string;
    address: null | string;
}
interface CustomUser extends User {
    token: string;
    user: user;
    permissions: string[];
}
declare module 'next-auth' {
    interface Session {
        accessToken: string;
        permissions: string[];
        user: user;
    }
}
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialProvider({
            name: 'Credentials',
            type: 'credentials',
            credentials: {},
            async authorize(credentials) {
                const { username, password } = credentials as {
                    username: string;
                    password: string;
                };
                try {
                    const res = await axios.post(
                        `${BASE_URL_API}/auth/login`,
                        {
                            username,
                            password,
                        },
                        { headers: { 'Content-Type': 'application/json' } }
                    );
                    if (res && res.data.status && (await res).status) return res.data.data;
                    if (!res.data.status) {
                        throw res.data.message;
                    }
                    return null;
                } catch (error) {
                    const errors = error as string;
                    throw new Error(errors);
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, trigger, user, session }) {
            // در اولین login، user data را در token ذخیره کنید
            const customUser = user as CustomUser;
            if (user && trigger === 'signIn') {
                token.permissions = customUser?.permissions;
                token.accessToken = customUser.token;
                token.user = customUser.user;
            }
            if (trigger === 'update' && session) {
                token.user = session.user;
                token.permissions = session.permissions;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.permissions = token?.permissions as string[];
                session.accessToken = token.accessToken as string;
                session.user = token.user as user;
            }
            return session;
        },
    },

    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 8,
    },
    pages: { signIn: '/login' },
};
