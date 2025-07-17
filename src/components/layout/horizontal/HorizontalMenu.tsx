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

import { ChevronRightIcon, MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { colunm } from '../vertical/VerticalMenu';
import { useSession } from 'next-auth/react';

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

interface CustomSession {
    data: {
        permissions: string[];
        // یا permission: string[];
    } | null;
}
const HorizontalMenu = () => {
    const session = useSession() as CustomSession;
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
                {colunm.map(
                    item =>
                        session.data?.permissions.filter(pers => item.permission.includes(pers))
                            .length === item.children.length && (
                            <>
                                <SubMenu label={item.label} icon={item.icon}>
                                    {item.children.map(
                                        (chi, index) =>
                                            session?.data?.permissions.includes(
                                                item.permission[index]
                                            ) && (
                                                <MenuItem
                                                    key={chi.url}
                                                    href={chi.url}
                                                    icon={chi.icon}
                                                >
                                                    {chi.label}
                                                </MenuItem>
                                            )
                                    )}
                                </SubMenu>
                            </>
                        )
                )}{' '}
            </Menu>
        </HorizontalNav>
    );
};

export default HorizontalMenu;
