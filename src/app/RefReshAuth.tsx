'use client';
import axiosConfig from '@/helpers/axiosConfig';
import { BASE_URL_API_AUTH } from '@/libs/constanst';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function RefreshAuth() {
    const { update } = useSession();

    useEffect(() => {
        async function handleAuth() {
            try {
                const data = await axiosConfig.get(BASE_URL_API_AUTH);

                if (!data.data.data.user.id) {
                    throw new Error('اعتبار حساب شما به پایان رسیده است لطفا دوباره لاگ این کنید');
                }
                update({ user: data.data.data.user, permissions: data.data.data.permissions });
            } catch (error) {
                console.error('خطا:', error);
                signOut();
            }
        }
        const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (nav.type === 'reload') {
            handleAuth();
        }
    }, []);

    return null;
}
