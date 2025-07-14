// MUI Imports
import { useTheme } from '@mui/material/styles';

// Type Imports
import type { VerticalMenuContextProps } from '@/@menu/components/vertical-menu/Menu';

// Component Imports
import HorizontalNav, { Menu, SubMenu, MenuItem } from '@/@menu/horizontal-menu';
import VerticalNavContent from './VerticalNavContent';

// import { GenerateHorizontalMenu } from '@components/GenerateMenu'

// Hook Imports
import useVerticalNav from '@/@menu/hooks/useVerticalNav';

// Styled Component Imports
import StyledHorizontalNavExpandIcon from '@/@menu/styles/horizontal/StyledHorizontalNavExpandIcon';
import StyledVerticalNavExpandIcon from '@/@menu/styles/vertical/StyledVerticalNavExpandIcon';

// Style Imports
import menuItemStyles from '@/@core/styles/horizontal/menuItemStyles';
import menuRootStyles from '@/@core/styles/horizontal/menuRootStyles';
import verticalNavigationCustomStyles from '@/@core/styles/vertical/navigationCustomStyles';
import verticalMenuItemStyles from '@/@core/styles/vertical/menuItemStyles';
import verticalMenuSectionStyles from '@/@core/styles/vertical/menuSectionStyles';

// Menu Data Imports
// import menuData from '@/data/navigation/horizontalMenuData'

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
import { ChevronRightIcon, MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

type RenderExpandIconProps = {
    level?: number;
};

type RenderVerticalExpandIconProps = {
    open?: boolean;
    transitionDuration?: VerticalMenuContextProps['transitionDuration'];
};

const RenderExpandIcon = ({ level }: RenderExpandIconProps) => (
    <StyledHorizontalNavExpandIcon level={level}>
        <ChevronRightIcon width={20} />
    </StyledHorizontalNavExpandIcon>
);

const RenderVerticalExpandIcon = ({ open, transitionDuration }: RenderVerticalExpandIconProps) => (
    <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
        <ChevronRightIcon width={20} />
    </StyledVerticalNavExpandIcon>
);

const HorizontalMenu = () => {
    // Hooks
    const verticalNavOptions = useVerticalNav();
    const theme = useTheme();

    // Vars
    const { transitionDuration } = verticalNavOptions;

    return (
        <HorizontalNav
            switchToVertical
            verticalNavContent={VerticalNavContent}
            verticalNavProps={{
                customStyles: verticalNavigationCustomStyles(verticalNavOptions, theme),
                backgroundColor: 'var(--mui-palette-background-paper)',
            }}
        >
            <Menu
                rootStyles={menuRootStyles(theme)}
                renderExpandIcon={({ level }) => <RenderExpandIcon level={level} />}
                menuItemStyles={menuItemStyles(theme, 'tabler-circle')}
                renderExpandedMenuItemIcon={{ icon: <PlusCircleIcon width={20} /> }}
                popoutMenuOffset={{
                    mainAxis: ({ level }) => (level && level > 0 ? 14 : 12),
                    alignmentAxis: 0,
                }}
                verticalMenuProps={{
                    menuItemStyles: verticalMenuItemStyles(verticalNavOptions, theme),
                    renderExpandIcon: ({ open }) => (
                        <RenderVerticalExpandIcon
                            open={open}
                            transitionDuration={transitionDuration}
                        />
                    ),
                    renderExpandedMenuItemIcon: { icon: <MinusCircleIcon width={20} /> },
                    menuSectionStyles: verticalMenuSectionStyles(verticalNavOptions, theme),
                }}
            >
                {' '}
                <SubMenu label="اطلاعات پایه " icon={<CircleStackIcon width={20} />}>
                    <MenuItem href={`/baseInformatien/gender`} icon={<UserIcon width={20} />}>
                        جنسیت ها
                    </MenuItem>

                    <MenuItem
                        href={`/baseInformatien/religion`}
                        icon={<BuildingLibraryIcon width={20} />}
                    >
                        دین و مذهب ها
                    </MenuItem>

                    <MenuItem href={`/baseInformatien/marital`} icon={<UserPlusIcon width={20} />}>
                        وضعیت تاهل
                    </MenuItem>
                </SubMenu>
                <SubMenu label="اشخاص حقیقی " icon={<UserGroupIcon width={20} />}>
                    <MenuItem
                        href={`/really/listOfNaturalPersons`}
                        icon={<QueueListIcon width={20} />}
                    >
                        فهرست
                    </MenuItem>
                </SubMenu>
                <SubMenu label=" تنظیمات " icon={<Cog8ToothIcon width={20} />}>
                    <MenuItem href={`/admin/permissions`} icon={<KeyIcon width={20} />}>
                        مجوز ها
                    </MenuItem>
                    <MenuItem href={`/admin/roles`} icon={<WindowIcon width={20} />}>
                        نقش ها
                    </MenuItem>
                </SubMenu>
                <SubMenu label="اشخاص پایه " icon={<CubeIcon width={20} />}>
                    <MenuItem
                        href={`/realPersons/organization`}
                        icon={<QueueListIcon width={20} />}
                    >
                        فهرست
                    </MenuItem>
                </SubMenu>
            </Menu>
        </HorizontalNav>
    );
};

export default HorizontalMenu;
