'use client';

export const useObjectCookie = <T>(key: string, fallback?: T): [T | null, (newVal: T) => void] => {
    const cookie = localStorage?.getItem(key);
    const value = cookie ? JSON.parse(cookie) : fallback;

    const updateValue = (newVal: T) => {
        localStorage.setItem(key, JSON.stringify(newVal));
    };

    return [value, updateValue];
};
