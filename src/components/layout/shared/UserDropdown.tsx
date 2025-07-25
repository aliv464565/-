'use client';

// React Imports
import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';

// Next Imports
import { useRouter } from 'next/navigation';

// MUI Imports
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

// Third-party Imports
import { signOut, useSession } from 'next-auth/react';

// Hook Imports
import { useSettings } from '@/@core/hooks/useSettings';
import {
    Cog8ToothIcon,
    CurrencyDollarIcon,
    QuestionMarkCircleIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

// Util Imports

// Styled component for badge content
const BadgeContentSpan = styled('span')({
    width: 8,
    height: 8,
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundColor: 'var(--mui-palette-success-main)',
    boxShadow: '0 0 0 2px var(--mui-palette-background-paper)',
});

const UserDropdown = () => {
    // States
    const [open, setOpen] = useState(false);

    // Refs
    const anchorRef = useRef<HTMLDivElement>(null);

    // Hooks
    const router = useRouter();
    const session = useSession();
    const { settings } = useSettings();

    const handleDropdownOpen = () => {
        !open ? setOpen(true) : setOpen(false);
    };

    const handleDropdownClose = (
        event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent),
        url?: string
    ) => {
        if (url) {
            router.push(url);
        }

        if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    const handleUserLogout = async () => {
        try {
            // Sign out from the app
            await signOut({ callbackUrl: process.env.NEXT_PUBLIC_APP_URL });
        } catch (error) {
            console.error(error);

            // Show above error in a toast like following
            // toastService.error((err as Error).message)
        }
    };
    return (
        <>
            <Badge
                ref={anchorRef}
                overlap="circular"
                badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                className="mis-2"
            >
                <Avatar
                    ref={anchorRef}
                    alt={session?.data?.user?.first_name || ''}
                    src={session?.data?.user?.image || ''}
                    onClick={handleDropdownOpen}
                    className="cursor-pointer bs-[38px] is-[38px]"
                />
            </Badge>
            <Popper
                open={open}
                transition
                disablePortal
                placement="bottom-end"
                anchorEl={anchorRef.current}
                className="min-is-[240px] !mbs-3 z-[1] w-[20%]"
            >
                {({ TransitionProps, placement }) => (
                    <Fade
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top',
                        }}
                    >
                        <Paper
                            className={
                                settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg '
                            }
                        >
                            <ClickAwayListener
                                onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}
                            >
                                <MenuList>
                                    <div
                                        className="flex items-center px-3 pb-2  gap-2"
                                        tabIndex={-1}
                                    >
                                        <Avatar
                                            alt={session?.data?.user?.first_name || ''}
                                            src={session?.data?.user?.image || ''}
                                        />
                                        <div className="flex items-start flex-col">
                                            <Typography
                                                className="font-medium"
                                                color="text.primary"
                                            >
                                                {session?.data?.user?.first_name || ''}
                                            </Typography>
                                        </div>
                                    </div>
                                    <Divider className="mlb-1" />
                                    <MenuItem
                                        className="mli-2 gap-3"
                                        onClick={e => handleDropdownClose(e, '/pages/user-profile')}
                                    >
                                        <UserIcon width={20} />
                                        <Typography color="text.primary">پروفایل من </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        className="mli-2 gap-3"
                                        onClick={e =>
                                            handleDropdownClose(e, '/pages/account-settings')
                                        }
                                    >
                                        <Cog8ToothIcon width={20} />
                                        <Typography color="text.primary">تنظیمات</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        className="mli-2 gap-3"
                                        onClick={e => handleDropdownClose(e, '/pages/pricing')}
                                    >
                                        <CurrencyDollarIcon width={20} />
                                        <Typography color="text.primary">Pricing</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        className="mli-2 gap-3"
                                        onClick={e => handleDropdownClose(e, '/pages/faq')}
                                    >
                                        <QuestionMarkCircleIcon width={20} />
                                        <Typography color="text.primary">FAQ</Typography>
                                    </MenuItem>
                                    <div className="flex items-center px-3 py-2">
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            endIcon={<ArrowRightStartOnRectangleIcon width={20} />}
                                            onClick={handleUserLogout}
                                            sx={{
                                                '& .MuiButton-endIcon': { marginInlineStart: 1.5 },
                                            }}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </>
    );
};

export default UserDropdown;
