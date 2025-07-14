import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const routePermissions = [
        ///listOfNaturalPersons
        { pattern: '/really/listOfNaturalPersons/show', permission: 'user_show' },
        { pattern: '/really/listOfNaturalPersons/create', permission: 'user_create' },
        { pattern: '/really/listOfNaturalPersons/update', permission: 'user_edit' },
        { pattern: '/really/listOfNaturalPersons', permission: 'user_index' },

        ///organization
        { pattern: '/realPersons/organization/show', permission: 'organization_show' },
        { pattern: '/realPersons/organization/create', permission: 'organization_create' },
        { pattern: '/realPersons/organization/update', permission: 'organization_edit' },
        { pattern: '/realPersons/organization', permission: 'organization_index' },

        //roles
        { pattern: '/admin/roles/show', permission: 'role_show' },
        { pattern: '/admin/roles/create', permission: 'role_create' },
        { pattern: '/admin/roles/update', permission: 'role_edit' },
        { pattern: '/admin/roles', permission: 'role_index' },

        ///premissions
        { pattern: '/admin/premissions', permission: 'permission_index' },

        ///gender
        { pattern: '/baseInformatien/gender', permission: 'sex_index' },

        ///religion
        { pattern: '/baseInformatien/religion/show', permission: 'religion_show' },
        { pattern: '/baseInformatien/religion/create', permission: 'religion_create' },
        { pattern: '/baseInformatien/religion/update', permission: 'religion_edit' },
        { pattern: '/baseInformatien/religion', permission: 'religion_index' },

        ///marital
        { pattern: '/baseInformatien/marital/show', permission: 'marital_show' },
        { pattern: '/baseInformatien/marital/create', permission: 'marital_create' },
        { pattern: '/baseInformatien/marital/update', permission: 'marital_edit' },
        { pattern: '/baseInformatien/marital', permission: 'marital_index' },
    ];
    const publicRoutes = ['/login'];

    const { pathname } = req.nextUrl;
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.accessToken && !pathname.startsWith('/api') && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if (publicRoutes.includes(pathname)) {
        if (token?.accessToken) {
            return NextResponse.redirect(new URL('/admin/roles', req.url));
        }
        return NextResponse.next();
    }
    const requiredPermission = routePermissions.find(item =>
        pathname.startsWith(item.pattern)
    )?.permission;

    if (requiredPermission && !(token?.permissions as string[]).includes(requiredPermission)) {
        return NextResponse.redirect(new URL('/403', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};
