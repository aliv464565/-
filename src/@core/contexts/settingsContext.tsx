'use client';

// React Imports
import type { ReactNode } from 'react';
import { createContext, useMemo, useState } from 'react';

// Type Imports
import type { Mode, Skin, Layout, LayoutComponentWidth } from '@/@core/types';

// Config Imports
import themeConfig from '@/configs/themeConfig';
import primaryColorConfig from '@/configs/primaryColorConfig';

// Hook Imports
import { useObjectCookie } from '@/@core/hooks/useObjectCookie';
import { getMode, getSettingsFromCookie } from '../utils/serverHelpers';

// Settings type
export type Settings = {
    mode?: Mode;
    skin?: Skin;
    semiDark?: boolean;
    layout?: Layout;
    navbarContentWidth?: LayoutComponentWidth;
    contentWidth?: LayoutComponentWidth;
    footerContentWidth?: LayoutComponentWidth;
    primaryColor?: string;
};

// UpdateSettingsOptions type
type UpdateSettingsOptions = {
    updateCookie?: boolean;
};

// SettingsContextProps type
type SettingsContextProps = {
    settings: Settings;
    updateSettings: (settings: Partial<Settings>, options?: UpdateSettingsOptions) => void;
    isSettingsChanged: boolean;
    resetSettings: () => void;
    updatePageSettings: (settings: Partial<Settings>) => () => void;
};

type Props = {
    children: ReactNode;
};

// Initial Settings Context
export const SettingsContext = createContext<SettingsContextProps | null>(null);

// Settings Provider
export const SettingsProvider = (props: Props) => {
    // Initial Settings

    const initialSettings: Settings = {
        mode: themeConfig.mode,
        skin: themeConfig.skin,
        semiDark: themeConfig.semiDark,
        layout: themeConfig.layout,
        navbarContentWidth: themeConfig.navbar.contentWidth,
        contentWidth: themeConfig.contentWidth,
        footerContentWidth: themeConfig.footer.contentWidth,
        primaryColor: primaryColorConfig[0].main,
    };

    const mode = getMode();
    const settingsCookieProps = getSettingsFromCookie();

    const updatedInitialSettings = {
        ...initialSettings,
        mode: mode || themeConfig.mode,
    };

    // Cookies
    const [settingsCookie, updateSettingsCookie] = useObjectCookie<Settings>(
        themeConfig.settingsCookieName,
        JSON.stringify(settingsCookieProps) !== '{}' ? settingsCookieProps : updatedInitialSettings
    );
    // State
    const [_settingsState, _updateSettingsState] = useState<Settings>(
        settingsCookie && JSON.stringify(settingsCookie) !== '{}'
            ? settingsCookie
            : updatedInitialSettings
    );

    const updateSettings = (settings: Partial<Settings>, options?: UpdateSettingsOptions) => {
        const { updateCookie = true } = options || {};

        _updateSettingsState(prev => {
            const newSettings = { ...prev, ...settings };
            // Update cookie if needed
            if (updateCookie) updateSettingsCookie(newSettings);

            return newSettings;
        });
    };

    /**
     * Updates the settings for page with the provided settings object.
     * Updated settings won't be saved to cookie hence will be reverted once navigating away from the page.
     *
     * @param settings - The partial settings object containing the properties to update.
     * @returns A function to reset the page settings.
     *
     * @example
     * useEffect(() => {
     *     return updatePageSettings({ theme: 'dark' });
     * }, []);
     */
    const updatePageSettings = (settings: Partial<Settings>): (() => void) => {
        updateSettings(settings, { updateCookie: false });

        // Returns a function to reset the page settings
        return () => settingsCookie && updateSettings(settingsCookie, { updateCookie: false });
    };

    const resetSettings = () => {
        updateSettings(initialSettings);
    };

    const isSettingsChanged = useMemo(
        () => JSON.stringify(initialSettings) !== JSON.stringify(_settingsState),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [_settingsState]
    );

    return (
        <SettingsContext.Provider
            value={{
                settings: _settingsState,
                updateSettings,
                isSettingsChanged,
                resetSettings,
                updatePageSettings,
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    );
};
