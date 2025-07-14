// Third-party Imports
import classnames from 'classnames';

// Type Imports
import type { ShortcutsType } from '@/components/layout/shared/ShortcutsDropdown';

// Component Imports
import NavToggle from './NavToggle';
import NavSearch from '@/components/layout/shared/search';
import ModeDropdown from '@/components/layout/shared/ModeDropdown';
import ShortcutsDropdown from '@/components/layout/shared/ShortcutsDropdown';
import UserDropdown from '@/components/layout/shared/UserDropdown';

// Util Imports
import { verticalLayoutClasses } from '@/@layouts/utils/layoutClasses';
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

const NavbarContent = () => {
    return (
        <div
            className={classnames(
                verticalLayoutClasses.navbarContent,
                'flex items-center justify-between gap-4 w-full'
            )}
        >
            <div className="flex items-center gap-4">
                <NavToggle />
                <NavSearch />
            </div>
            <div className="flex items-center">
                <ModeDropdown />
                <ShortcutsDropdown shortcuts={shortcuts} />
                <UserDropdown />
            </div>
        </div>
    );
};

export default NavbarContent;
