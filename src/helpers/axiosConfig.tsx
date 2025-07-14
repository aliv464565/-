import { authOptions } from '@/libs/styles/auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

declare module 'axios' {
    interface AxiosRequestConfig {
        nextContext?: boolean; // Add custom property
    }
}
const axiosConfig = axios.create({
    baseURL: 'http://192.168.1.103:85/api',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});
const getToken = async (context?: boolean) => {
    if (context) {
        const session = await getServerSession(authOptions);
        return session?.accessToken;
    } else {
        const session = await getSession();
        return session?.accessToken;
    }
};
axiosConfig.interceptors.request.use(
    async config => {
        const token = await getToken(config?.nextContext);
        if (token) {
            config.headers!['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
export default axiosConfig;
