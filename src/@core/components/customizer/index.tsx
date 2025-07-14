'use client';

// React Imports
import { useRef, useState } from 'react';
import {
    ArrowPathIcon,
    Cog6ToothIcon,
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
    SwatchIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
// Next Imports

// MUI Imports
import Chip from '@mui/material/Chip';
import Popper from '@mui/material/Popper';
import { useTheme } from '@mui/material/styles';

import type { Breakpoint } from '@mui/material/styles';

import { HexColorPicker, HexColorInput } from 'react-colorful';
// Third-party Imports
import classnames from 'classnames';
import { useDebounce, useMedia } from 'react-use';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Type Imports
import type { Settings } from '@/@core/contexts/settingsContext';
import type { PrimaryColorConfig } from '@/configs/primaryColorConfig';

// Icon Imports
import SkinDefault from '@/@core/svg/SkinDefault';
import SkinBordered from '@/@core/svg/SkinBordered';
import LayoutVertical from '@/@core/svg/LayoutVertical';
import LayoutCollapsed from '@/@core/svg/LayoutCollapsed';
import LayoutHorizontal from '@/@core/svg/LayoutHorizontal';
import ContentCompact from '@/@core/svg/ContentCompact';
import ContentWide from '@/@core/svg/ContentWide';

// Config Imports
import primaryColorConfig from '@/configs/primaryColorConfig';

// Hook Imports
import { useSettings } from '@/@core/hooks/useSettings';

// Style Imports
import styles from './styles.module.css';
import CustomIconButton from '../mui/IconButton';
import { ClickAwayListener, Fade, Grid2, Paper } from '@mui/material';

type CustomizerProps = {
    breakpoint?: Breakpoint | 'xxl' | `${number}px` | `${number}rem` | `${number}em`;
    dir?: 'rtl';
};
type DebouncedColorPickerProps = {
    settings: Settings;
    isColorFromPrimaryConfig: PrimaryColorConfig | undefined;
    handleChange: (
        field: keyof Settings | 'primaryColor',
        value: Settings[keyof Settings] | string
    ) => void;
};

const DebouncedColorPicker = (props: DebouncedColorPickerProps) => {
    // Props
    const { settings, isColorFromPrimaryConfig, handleChange } = props;

    // States
    const [debouncedColor, setDebouncedColor] = useState(
        settings.primaryColor ?? primaryColorConfig[0].main
    );

    // Hooks
    useDebounce(() => handleChange('primaryColor', debouncedColor), 200, [debouncedColor]);

    return (
        <>
            <HexColorPicker
                color={
                    !isColorFromPrimaryConfig
                        ? settings.primaryColor ?? primaryColorConfig[0].main
                        : '#eee'
                }
                onChange={setDebouncedColor}
            />
            <HexColorInput
                className={styles.colorInput}
                color={
                    !isColorFromPrimaryConfig
                        ? settings.primaryColor ?? primaryColorConfig[0].main
                        : '#eee'
                }
                onChange={setDebouncedColor}
                prefixed
                placeholder="Type a color"
            />
        </>
    );
};

const Customizer = ({ breakpoint = 'lg' }: CustomizerProps) => {
    // States
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Refs
    const anchorRef = useRef<HTMLDivElement | null>(null);

    // Hooks
    const theme = useTheme();
    const { settings, updateSettings, resetSettings, isSettingsChanged } = useSettings();

    // Vars
    let breakpointValue: CustomizerProps['breakpoint'];

    switch (breakpoint) {
        case 'xxl':
            breakpointValue = '1920px';
            break;
        case 'xl':
            breakpointValue = `${theme.breakpoints.values.xl}px`;
            break;
        case 'lg':
            breakpointValue = `${theme.breakpoints.values.lg}px`;
            break;
        case 'md':
            breakpointValue = `${theme.breakpoints.values.md}px`;
            break;
        case 'sm':
            breakpointValue = `${theme.breakpoints.values.sm}px`;
            break;
        case 'xs':
            breakpointValue = `${theme.breakpoints.values.xs}px`;
            break;
        default:
            breakpointValue = breakpoint;
    }

    const breakpointReached = useMedia(`(max-width: ${breakpointValue})`, false);
    const isMobileScreen = useMedia('(max-width: 600px)', false);
    const isBelowLgScreen = useMedia('(max-width: 1200px)', false);
    const isColorFromPrimaryConfig = primaryColorConfig.find(
        item => item.main === settings.primaryColor
    );

    const ScrollWrapper = isBelowLgScreen ? 'div' : PerfectScrollbar;

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    // Update Settings
    const handleChange = (field: keyof Settings, value: Settings[keyof Settings]) => {
        // Update direction state

        updateSettings({ [field]: value });
    };
    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };
    return (
        !breakpointReached && (
            <div
                className={classnames('customizer', styles.customizer, {
                    [styles.show]: isOpen,
                    [styles.smallScreen]: isMobileScreen,
                })}
            >
                <div className={styles.toggler} onClick={handleToggle}>
                    <Cog6ToothIcon width={20} />
                </div>

                <Grid2 container className={styles.header}>
                    <Grid2 size={6} textAlign="start">
                        <h4 className={styles.customizerTitle}>شخصی سازی کردن صفحه </h4>
                        <p className={styles.customizerSubtitle}>سفارشی سازی و پیش نمایش در صفحه</p>
                    </Grid2>
                    <Grid2 size={6} textAlign="end">
                        <CustomIconButton>
                            <div onClick={resetSettings} className="relative flex cursor-pointer">
                                <ArrowPathIcon width={20} />
                                <div
                                    className={classnames(styles.dotStyles, {
                                        [styles.show]: isSettingsChanged,
                                    })}
                                />
                            </div>
                        </CustomIconButton>
                        <CustomIconButton>
                            <XMarkIcon width={20} onClick={() => handleToggle()} />
                        </CustomIconButton>
                    </Grid2>
                </Grid2>

                <ScrollWrapper
                    {...(isBelowLgScreen
                        ? { className: 'bs-full overflow-y-auto overflow-x-hidden' }
                        : { options: { wheelPropagation: false, suppressScrollX: true } })}
                >
                    <div className={styles.customizerBody}>
                        <div className="flex flex-col gap-6">
                            <Chip
                                label="قالب "
                                size="small"
                                color="primary"
                                variant="tonal"
                                className="self-start rounded-sm"
                            />
                            <div className="flex flex-col gap-2">
                                <p className="font-medium">رنگ ها </p>
                                <div className="flex items-center justify-between">
                                    {primaryColorConfig.map(item => (
                                        <div
                                            key={item.main}
                                            className={classnames(styles.primaryColorWrapper, {
                                                [styles.active]:
                                                    settings.primaryColor === item.main,
                                            })}
                                            onClick={() => handleChange('primaryColor', item.main)}
                                        >
                                            <div
                                                className={styles.primaryColor}
                                                style={{ backgroundColor: item.main }}
                                            />
                                        </div>
                                    ))}
                                    <div
                                        ref={anchorRef}
                                        className={classnames(styles.primaryColorWrapper, {
                                            [styles.active]: !isColorFromPrimaryConfig,
                                        })}
                                        onClick={() => setIsMenuOpen(prev => !prev)}
                                    >
                                        <div
                                            className={classnames(
                                                styles.primaryColor,
                                                'flex items-center justify-center'
                                            )}
                                            style={{
                                                backgroundColor: !isColorFromPrimaryConfig
                                                    ? settings.primaryColor
                                                    : 'var(--mui-palette-action-selected)',
                                                color: isColorFromPrimaryConfig
                                                    ? 'var(--mui-palette-text-primary)'
                                                    : 'var(--mui-palette-primary-contrastText)',
                                            }}
                                        >
                                            <SwatchIcon width={20} />
                                        </div>
                                    </div>
                                    <Popper
                                        transition
                                        open={isMenuOpen}
                                        disablePortal
                                        anchorEl={anchorRef.current}
                                        placement="bottom-end"
                                        className="z-[1]"
                                    >
                                        {({ TransitionProps }) => (
                                            <Fade
                                                {...TransitionProps}
                                                style={{ transformOrigin: 'right top' }}
                                            >
                                                <Paper elevation={6} className={styles.colorPopup}>
                                                    <ClickAwayListener
                                                        onClickAway={handleMenuClose}
                                                    >
                                                        <div>
                                                            <DebouncedColorPicker
                                                                settings={settings}
                                                                isColorFromPrimaryConfig={
                                                                    isColorFromPrimaryConfig
                                                                }
                                                                handleChange={handleChange}
                                                            />
                                                        </div>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Fade>
                                        )}
                                    </Popper>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="font-medium">حالت</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col items-start gap-0.5">
                                        <div
                                            className={classnames(
                                                styles.itemWrapper,
                                                styles.modeWrapper,
                                                {
                                                    [styles.active]: settings.mode === 'light',
                                                }
                                            )}
                                            onClick={() => handleChange('mode', 'light')}
                                        >
                                            <SunIcon width={20} />
                                        </div>
                                        <p
                                            className={styles.itemLabel}
                                            onClick={() => handleChange('mode', 'light')}
                                        >
                                            رشن
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start gap-0.5">
                                        <div
                                            className={classnames(
                                                styles.itemWrapper,
                                                styles.modeWrapper,
                                                {
                                                    [styles.active]: settings.mode === 'dark',
                                                }
                                            )}
                                            onClick={() => handleChange('mode', 'dark')}
                                        >
                                            <MoonIcon width={20} />
                                        </div>
                                        <p
                                            className={styles.itemLabel}
                                            onClick={() => handleChange('mode', 'dark')}
                                        >
                                            تاریک
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start gap-0.5">
                                        <div
                                            className={classnames(
                                                styles.itemWrapper,
                                                styles.modeWrapper,
                                                {
                                                    [styles.active]: settings.mode === 'system',
                                                }
                                            )}
                                            onClick={() => handleChange('mode', 'system')}
                                        >
                                            <ComputerDesktopIcon width={20} />
                                        </div>
                                        <p
                                            className={styles.itemLabel}
                                            onClick={() => handleChange('mode', 'system')}
                                        >
                                            سیستم
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="font-medium">حاشیه ها</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-start gap-0.5">
                                        <div
                                            className={classnames(styles.itemWrapper, {
                                                [styles.active]: settings.skin === 'default',
                                            })}
                                            onClick={() => handleChange('skin', 'default')}
                                        >
                                            <SkinDefault />
                                        </div>
                                        <p
                                            className={styles.itemLabel}
                                            onClick={() => handleChange('skin', 'default')}
                                        >
                                            پیش فرض
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start gap-0.5">
                                        <div
                                            className={classnames(styles.itemWrapper, {
                                                [styles.active]: settings.skin === 'bordered',
                                            })}
                                            onClick={() => handleChange('skin', 'bordered')}
                                        >
                                            <SkinBordered />
                                        </div>
                                        <p
                                            className={styles.itemLabel}
                                            onClick={() => handleChange('skin', 'bordered')}
                                        >
                                            بدون حاشیه
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className={styles.hr} />

                        <div className="flex flex-col gap-6">
                            <Chip
                                label="طرح بندی"
                                variant="tonal"
                                size="small"
                                color="primary"
                                className="self-start rounded-sm"
                            />
                            <div className="flex flex-col gap-2">
                                <p className="font-medium">طرح بندی ها</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col items-start gap-0.5">
                                        <div
                                            className={classnames(styles.itemWrapper, {
                                                [styles.active]: settings.layout === 'vertical',
                                            })}
                                            onClick={() => handleChange('layout', 'vertical')}
                                        >
                                            <LayoutVertical />
                                        </div>
                                        <p
                                            className={styles.itemLabel}
                                            onClick={() => handleChange('layout', 'vertical')}
                                        >
                                            عمودی
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start gap-0.5">
                                        <div
                                            className={classnames(styles.itemWrapper, {
                                                [styles.active]: settings.layout === 'collapsed',
                                            })}
                                            onClick={() => handleChange('layout', 'collapsed')}
                                        >
                                            <LayoutCollapsed />
                                        </div>
                                        <p
                                            className={styles.itemLabel}
                                            onClick={() => handleChange('layout', 'collapsed')}
                                        >
                                            فروریخته
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start gap-0.5">
                                        <div
                                            className={classnames(styles.itemWrapper, {
                                                [styles.active]: settings.layout === 'horizontal',
                                            })}
                                            onClick={() => handleChange('layout', 'horizontal')}
                                        >
                                            <LayoutHorizontal />
                                        </div>
                                        <p
                                            className={styles.itemLabel}
                                            onClick={() => handleChange('layout', 'horizontal')}
                                        >
                                            افقی
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="font-medium">محتوا</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-start gap-0.5">
                                        <div
                                            className={classnames(styles.itemWrapper, {
                                                [styles.active]:
                                                    settings.contentWidth === 'compact',
                                            })}
                                            onClick={() =>
                                                updateSettings({
                                                    navbarContentWidth: 'compact',
                                                    contentWidth: 'compact',
                                                    footerContentWidth: 'compact',
                                                })
                                            }
                                        >
                                            <ContentCompact />
                                        </div>
                                        <p
                                            className={styles.itemLabel}
                                            onClick={() =>
                                                updateSettings({
                                                    navbarContentWidth: 'compact',
                                                    contentWidth: 'compact',
                                                    footerContentWidth: 'compact',
                                                })
                                            }
                                        >
                                            جمع و جور
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start gap-0.5">
                                        <div
                                            className={classnames(styles.itemWrapper, {
                                                [styles.active]: settings.contentWidth === 'wide',
                                            })}
                                            onClick={() =>
                                                updateSettings({
                                                    navbarContentWidth: 'wide',
                                                    contentWidth: 'wide',
                                                    footerContentWidth: 'wide',
                                                })
                                            }
                                        >
                                            <ContentWide />
                                        </div>
                                        <p
                                            className={styles.itemLabel}
                                            onClick={() =>
                                                updateSettings({
                                                    navbarContentWidth: 'wide',
                                                    contentWidth: 'wide',
                                                    footerContentWidth: 'wide',
                                                })
                                            }
                                        >
                                            پهن
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollWrapper>
            </div>
        )
    );
};

export default Customizer;
