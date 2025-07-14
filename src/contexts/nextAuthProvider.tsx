'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// Third-party Imports
import { SessionProvider } from 'next-auth/react';
import type { SessionProviderProps } from 'next-auth/react';

export const NextAuthProvider = ({ children, ...rest }: SessionProviderProps) => {
    //config react query
    const queyClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    });
    return (
        // قرار دادن برای گرفتن مقادیر token با استفاده از useSession
        <SessionProvider {...rest}>
            <QueryClientProvider client={queyClient}>
                <ReactQueryDevtools initialIsOpen={true} />
                {children}
            </QueryClientProvider>
        </SessionProvider>
    );
};
