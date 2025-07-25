'use client';

// React Imports
import { useRef, useState } from 'react';

// MUI Imports
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

// Type Imports
import type { Mode } from '@/@core/types';

// Hook Imports
import { useSettings } from '@/@core/hooks/useSettings';
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ModeDropdown = () => {
    // States
    const [open, setOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    // Refs
    const anchorRef = useRef<HTMLButtonElement>(null);

    // Hooks
    const { settings, updateSettings } = useSettings();

    const handleClose = () => {
        setOpen(false);
        setTooltipOpen(false);
    };

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleModeSwitch = (mode: Mode) => {
        handleClose();

        if (settings.mode !== mode) {
            updateSettings({ mode: mode });
        }
    };
    let getModeIcon;

    if (settings.mode === 'system') {
        getModeIcon = <ComputerDesktopIcon width={20} />;
    } else if (settings.mode === 'dark') {
        getModeIcon = <MoonIcon width={20} />;
    } else {
        getModeIcon = <SunIcon width={20} />;
    }

    return (
        <>
            <Tooltip
                title={settings.mode + ' Mode'}
                onOpen={() => setTooltipOpen(true)}
                onClose={() => setTooltipOpen(false)}
                open={open ? false : tooltipOpen ? true : false}
                slotProps={{ popper: { className: 'capitalize' } }}
            >
                <IconButton ref={anchorRef} onClick={handleToggle} className="text-textPrimary">
                    {getModeIcon}
                </IconButton>
            </Tooltip>
            <Popper
                open={open}
                transition
                disablePortal
                placement="bottom-start"
                anchorEl={anchorRef.current}
                className="min-is-[160px] !mbs-3 z-[1]"
            >
                {({ TransitionProps, placement }) => (
                    <Fade
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'right top',
                        }}
                    >
                        <Paper
                            className={
                                settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'
                            }
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList onKeyDown={handleClose}>
                                    <MenuItem
                                        className="gap-3"
                                        onClick={() => handleModeSwitch('light')}
                                        selected={settings.mode === 'light'}
                                    >
                                        <SunIcon width={20} />
                                        Light
                                    </MenuItem>
                                    <MenuItem
                                        className="gap-3"
                                        onClick={() => handleModeSwitch('dark')}
                                        selected={settings.mode === 'dark'}
                                    >
                                        <MoonIcon width={20} />
                                        Dark
                                    </MenuItem>
                                    <MenuItem
                                        className="gap-3"
                                        onClick={() => handleModeSwitch('system')}
                                        selected={settings.mode === 'system'}
                                    >
                                        <ComputerDesktopIcon width={20} />
                                        System
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </>
    );
};

export default ModeDropdown;
