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

type RenderExpandIconProps = {
    open?: boolean;
    transitionDuration?: VerticalMenuContextProps['transitionDuration'];
};

type Props = {
    // dictionary: Awaited<ReturnType<typeof getDictionary>>;
    scrollMenu: (container: any, isPerfectScrollbar: boolean) => void;
};

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
    <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
        <ChevronRightIcon width={20} />
    </StyledVerticalNavExpandIcon>
);

const VerticalMenu = ({ scrollMenu }: Props) => {
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
                    <MenuItem href={`/admin/premissions`} icon={<KeyIcon width={20} />}>
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
        </ScrollWrapper>
    );
};

export default VerticalMenu;
