'use client';

// React Imports

// MUI Imports

import { deepmerge } from '@mui/utils';
import { ThemeProvider, lighten, darken, createTheme } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import type {} from '@mui/material/themeCssVarsAugmentation'; //! Do not remove this import otherwise you will get type errors while making a production build
import type {} from '@mui/lab/themeAugmentation'; //! Do not remove this import otherwise you will get type errors while making a production build

// Third-party Imports
import { useMedia } from 'react-use';
import stylisRTLPlugin from 'stylis-plugin-rtl';

// Type Imports
import type { ChildrenType, SystemMode } from '@/@core/types';

// Component Imports
import ModeChanger from './ModeChanger';

// Config Imports
import themeConfig from '@/configs/themeConfig';

// Hook Imports
import { useSettings } from '@/@core/hooks/useSettings';

// Core Theme Imports
import defaultCoreTheme from '@/@core/theme';
import { useMemo } from 'react';
import { getSystemMode } from '@/@core/utils/serverHelpers';

type Props = ChildrenType;

const CustomThemeProvider = (props: Props) => {
    // Props
    const { children } = props;
    // Hooks
    const systemMode = getSystemMode();
    const { settings } = useSettings();
    const isDark = useMedia('(prefers-color-scheme: dark)', systemMode === 'dark');

    // Vars
    const isServer = typeof window === 'undefined';
    let currentMode: SystemMode;

    if (isServer) {
        currentMode = systemMode;
    } else {
        if (settings.mode === 'system') {
            currentMode = isDark ? 'dark' : 'light';
        } else {
            currentMode = settings.mode as SystemMode;
        }
    }

    // Merge the primary color scheme override with the core theme
    const theme = useMemo(() => {
        const newTheme = {
            colorSchemes: {
                light: {
                    palette: {
                        primary: {
                            main: settings.primaryColor,
                            light: lighten(settings.primaryColor as string, 0.2),
                            dark: darken(settings.primaryColor as string, 0.1),
                        },
                    },
                },
                dark: {
                    palette: {
                        primary: {
                            main: settings.primaryColor,
                            light: lighten(settings.primaryColor as string, 0.2),
                            dark: darken(settings.primaryColor as string, 0.1),
                        },
                    },
                },
            },
            cssVariables: {
                colorSchemeSelector: 'data',
            },
        };
        const coreTheme = deepmerge(defaultCoreTheme(settings, currentMode), newTheme);

        return createTheme(coreTheme);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings.primaryColor, settings.skin, currentMode, settings]);

    return (
        <AppRouterCacheProvider
            options={{
                prepend: true,
                key: 'rtl',
                stylisPlugins: [stylisRTLPlugin],
            }}
        >
            <ThemeProvider
                theme={theme}
                defaultMode={systemMode}
                modeStorageKey={`${themeConfig.templateName
                    .toLowerCase()
                    .split(' ')
                    .join('-')}-mui-template-mode${settings.primaryColor}`}
            >
                <>
                    <ModeChanger systemMode={systemMode} />
                    <CssBaseline />
                    {children}
                </>
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
};

export default CustomThemeProvider;
