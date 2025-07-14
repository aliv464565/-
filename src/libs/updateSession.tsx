'use client';

import { useEffect } from 'react';

export default function UpdateSession() {
    useEffect(() => {
        window.addEventListener('beforeunload', () => sessionStorage.setItem('reloaded', 'yes'));

        if (sessionStorage.getItem('reloaded')) {
            sessionStorage.removeItem('reloaded');
        }
    }, []);
    return null;
}
