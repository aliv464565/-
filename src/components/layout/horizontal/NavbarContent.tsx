// Next Imports
import Link from 'next/link';

// Third-party Imports
import classnames from 'classnames';

// Type Imports
import type { ShortcutsType } from '@/components/layout/shared/ShortcutsDropdown';

// Component Imports
import NavToggle from './NavToggle';
import Logo from '@/components/layout/shared/Logo';
import NavSearch from '@/components/layout/shared/search';
import ModeDropdown from '@/components/layout/shared/ModeDropdown';
import ShortcutsDropdown from '@/components/layout/shared/ShortcutsDropdown';
import UserDropdown from '@/components/layout/shared/UserDropdown';

// Hook Imports
import useHorizontalNav from '@/@menu/hooks/useHorizontalNav';

// Util Imports
import { horizontalLayoutClasses } from '@/@layouts/utils/layoutClasses';
import {
    CalendarDaysIcon,
    Cog8ToothIcon,
    DocumentCurrencyDollarIcon,
    PresentationChartBarIcon,
    UserGroupIcon,
    UserIcon,
} from '@heroicons/react/24/outline';

// Vars
const shortcuts: ShortcutsType[] = [
    {
        url: '/apps/calendar',
        icon: <CalendarDaysIcon width={30} />,
        title: 'Calendar',
        subtitle: 'Appointments',
    },
    {
        url: '/apps/invoice/list',
        icon: <DocumentCurrencyDollarIcon width={30} />,
        title: 'Invoice App',
        subtitle: 'Manage Accounts',
    },
    {
        url: '/apps/user/list',
        icon: <UserIcon width={30} />,
        title: 'Users',
        subtitle: 'Manage Users',
    },
    {
        url: '/apps/roles',
        icon: <UserGroupIcon width={30} />,
        title: 'Role Management',
        subtitle: 'Permissions',
    },
    {
        url: '/',
        icon: <PresentationChartBarIcon width={30} />,
        title: 'Dashboard',
        subtitle: 'User Dashboard',
    },
    {
        url: '/pages/account-settings',
        icon: <Cog8ToothIcon width={30} />,
        title: 'Settings',
        subtitle: 'Account Settings',
    },
];

// const notifications: NotificationsType[] = [
//     {
//         avatarImage: '/images/avatars/8.png',
//         title: 'Congratulations Flora 🎉',
//         subtitle: 'Won the monthly bestseller gold badge',
//         time: '1h ago',
//         read: false,
//     },
//     {
//         title: 'Cecilia Becker',
//         avatarColor: 'secondary',
//         subtitle: 'Accepted your connection',
//         time: '12h ago',
//         read: false,
//     },
//     {
//         avatarImage: '/images/avatars/3.png',
//         title: 'Bernard Woods',
//         subtitle: 'You have new message from Bernard Woods',
//         time: 'May 18, 8:26 AM',
//         read: true,
//     },
//     {
//         avatarIcon: 'tabler-chart-bar',
//         title: 'Monthly report generated',
//         subtitle: 'July month financial report is generated',
//         avatarColor: 'info',
//         time: 'Apr 24, 10:30 AM',
//         read: true,
//     },
//     {
//         avatarText: 'MG',
//         title: 'Application has been approved 🚀',
//         subtitle: 'Your Meta Gadgets project application has been approved.',
//         avatarColor: 'success',
//         time: 'Feb 17, 12:17 PM',
//         read: true,
//     },
//     {
//         avatarIcon: 'tabler-mail',
//         title: 'New message from Harry',
//         subtitle: 'You have new message from Harry',
//         avatarColor: 'error',
//         time: 'Jan 6, 1:48 PM',
//         read: true,
//     },
// ];

const NavbarContent = () => {
    // Hooks
    const { isBreakpointReached } = useHorizontalNav();

    return (
        <div
            className={classnames(
                horizontalLayoutClasses.navbarContent,
                'flex items-center justify-between gap-4 is-full w-full'
            )}
        >
            <div className="flex items-center gap-4">
                <NavToggle />
                {/* Hide Logo on Smaller screens */}
                {!isBreakpointReached && (
                    <Link href="/">
                        <Logo />
                    </Link>
                )}
            </div>

            <div className="flex items-center">
                <NavSearch />
                <ModeDropdown />
                <ShortcutsDropdown shortcuts={shortcuts} />
                <UserDropdown />
                {/* Language Dropdown, Notification Dropdown, quick access menu dropdown, user dropdown will be placed here */}
            </div>
        </div>
    );
};

export default NavbarContent;
