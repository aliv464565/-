'use client';
// MUI Imports
import { useTheme } from '@mui/material/styles';

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar';

// Type Imports
import type { VerticalMenuContextProps } from '@/@menu/components/vertical-menu/Menu';

// Component Imports
import { Menu, SubMenu, MenuItem } from '@/@menu/vertical-menu';

// import { GenerateVerticalMenu } from '@components/GenerateMenu'

// Hook Imports
import useVerticalNav from '@/@menu/hooks/useVerticalNav';

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@/@menu/styles/vertical/StyledVerticalNavExpandIcon';

// Style Imports
import menuItemStyles from '@/@core/styles/vertical/menuItemStyles';
import menuSectionStyles from '@/@core/styles/vertical/menuSectionStyles';

// Menu Data Imports
// import menuData from '@/data/navigation/verticalMenuData'
import {
    BuildingLibraryIcon,
    CircleStackIcon,
    Cog8ToothIcon,
    CubeIcon,
    KeyIcon,
    QueueListIcon,
    UserGroupIcon,
    UserIcon,
    UserPlusIcon,
    WindowIcon,
} from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
// import { useSession } from 'next-auth/react';

type RenderExpandIconProps = {
    open?: boolean;
    transitionDuration?: VerticalMenuContextProps['transitionDuration'];
};

type Props = {
    // dictionary: Awaited<ReturnType<typeof getDictionary>>;
    scrollMenu: (container: any, isPerfectScrollbar: boolean) => void;
};

interface CustomSession {
    data: {
        permissions: string[];
        // یا permission: string[];
    } | null;
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
    <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
        <ChevronRightIcon width={20} />
    </StyledVerticalNavExpandIcon>
);
export const colunm = [
    {
        label: 'اطلاعات پایه ',
        icon: <CircleStackIcon width={20} />,
        permission: ['sex_index', 'religion_index', 'marital_index'],
        children: [
            {
                label: 'جنسیت ها',
                url: '/baseInformatien/gender',
                icon: <CircleStackIcon width={20} />,
            },
            {
                label: 'دین و مذهب ها ',
                url: '/baseInformatien/religion',
                icon: <BuildingLibraryIcon width={20} />,
            },
            {
                label: 'وضعیت تاهل',
                url: '/baseInformatien/marital',
                icon: <UserPlusIcon width={20} />,
            },
        ],
    },
    {
        label: 'اشخاص حقیقی ',
        icon: <UserGroupIcon width={20} />,
        permission: ['user_index'],
        children: [
            {
                label: 'فهرست',
                url: '/really/listOfNaturalPersons',
                icon: <QueueListIcon width={20} />,
            },
        ],
    },
    {
        label: ' تنظیمات ',
        icon: <Cog8ToothIcon width={20} />,
        permission: ['permission_index', 'role_index'],
        children: [
            {
                label: 'مجوز ها',
                url: `/admin/permissions`,
                icon: <KeyIcon width={20} />,
            },
            {
                label: 'نقش ها',
                url: '/admin/roles',
                icon: <WindowIcon width={20} />,
            },
        ],
    },
    {
        label: 'اشخاص پایه',
        icon: <CubeIcon width={20} />,
        permission: ['organization_index'],
        children: [
            {
                label: 'فهرست',
                url: '/realPersons/organization',
                icon: <KeyIcon width={20} />,
            },
        ],
    },
];
const VerticalMenu = ({ scrollMenu }: Props) => {
    const session = useSession() as CustomSession;
    // console.log(session.data?.permissions);
    // Hooks
    const theme = useTheme();
    const verticalNavOptions = useVerticalNav();

    // Vars
    const { isBreakpointReached, transitionDuration } = verticalNavOptions;

    const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar;

    return (
        // eslint-disable-next-line lines-around-comment
        /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
        <ScrollWrapper
            {...(isBreakpointReached
                ? {
                      className: 'bs-full overflow-y-auto overflow-x-hidden',
                      onScroll: container => scrollMenu(container, false),
                  }
                : {
                      options: { wheelPropagation: false, suppressScrollX: true },
                      onScrollY: container => scrollMenu(container, true),
                  })}
        >
            {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
            {/* Vertical Menu */}

            <Menu
                popoutMenuOffset={{ mainAxis: 23 }}
                menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
                renderExpandIcon={({ open }) => (
                    <RenderExpandIcon open={open} transitionDuration={transitionDuration} />
                )}
                renderExpandedMenuItemIcon={{ icon: <CircleStackIcon width={20} /> }}
                menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
            >
                {colunm.map(item => {
                    return (
                        session.data?.permissions?.filter(pers => item.permission.includes(pers))
                            .length === item.children.length && (
                            <>
                                <SubMenu label={item.label} icon={item.icon}>
                                    {item.children.map((chi, index) => {
                                        console.log(
                                            session?.data?.permissions.includes(
                                                item.permission[index]
                                            ),
                                            item,
                                            item.permission[index]
                                        );

                                        return (
                                            session?.data?.permissions.includes(
                                                item.permission[index]
                                            ) && (
                                                <MenuItem href={chi.url} icon={chi.icon}>
                                                    {chi.label}
                                                </MenuItem>
                                            )
                                        );
                                    })}
                                </SubMenu>
                            </>
                        )
                    );
                })}
            </Menu>
        </ScrollWrapper>
    );
};

export default VerticalMenu;
