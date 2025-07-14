'use client';

// Type Imports
import type { Settings } from '@/@core/contexts/settingsContext';
import type { SystemMode } from '@/@core/types';

// Config Imports
import themeConfig from '@/configs/themeConfig';

export const getSettingsFromCookie = (): Settings => {
    if (typeof window === 'undefined') return { mode: undefined };
    const cookieName = themeConfig.settingsCookieName;
    const cookie = localStorage.getItem(cookieName);
    return JSON.parse(cookie ? cookie : '{}');
};

export const getMode = () => {
    const settingsCookie = getSettingsFromCookie();

    // Get mode from cookie or fallback to theme config
    const _mode = settingsCookie.mode || themeConfig.mode;

    return _mode;
};

export const getSystemMode = (): SystemMode => {
    const mode = getMode();
    if (typeof window === 'undefined') return 'light';
    const colorPrefCookie = (localStorage.getItem('colorPref') || 'light') as SystemMode;

    return (mode === 'system' ? colorPrefCookie : mode) || 'light';
};

export const getServerMode = () => {
    const mode = getMode();
    const systemMode = getSystemMode();

    return mode === 'system' ? systemMode : mode;
};

export const getSkin = () => {
    const settingsCookie = getSettingsFromCookie();

    return settingsCookie.skin || 'default';
};
