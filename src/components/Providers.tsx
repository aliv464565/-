'use client';

import { ChildrenType } from '@/@core/types';
import { VerticalNavProvider } from '@/@menu/contexts/verticalNavContext';
import AppReactToastify from '@/libs/AppReactToastify';
import dynamic from 'next/dynamic';

// اگر SettingsProvider named export باشه
const SettingsProvider = dynamic(
    () =>
        import('@/@core/contexts/settingsContext').then(mod => ({
            default: mod.SettingsProvider,
        })),
    {
        ssr: false,
        loading: () => null,
    }
);

const CustomThemeProvider = dynamic(() => import('./theme'), {
    ssr: false,
    loading: () => null,
});

type Props = ChildrenType;

const Providers = (props: Props) => {
    const { children } = props;

    return (
        <VerticalNavProvider>
            <SettingsProvider>
                <CustomThemeProvider>
                    {children}
                    <AppReactToastify hideProgressBar />
                </CustomThemeProvider>
            </SettingsProvider>
        </VerticalNavProvider>
    );
};

export default Providers;
