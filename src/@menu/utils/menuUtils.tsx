// React Imports
import { Children, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';

// Third-party Imports
import type { CSSObject } from '@emotion/styled';

// Type Imports
import type { ChildrenType, RenderExpandedMenuItemIcon } from '../types';

// Component Imports
import {
    SubMenu as HorizontalSubMenu,
    MenuItem as HorizontalMenuItem,
    Menu as HorizontalMenu,
} from '../horizontal-menu';
import {
    SubMenu as VerticalSubMenu,
    MenuItem as VerticalMenuItem,
    Menu as VerticalMenu,
} from '../vertical-menu';
import { GenerateVerticalMenu } from '@/components/GenerateMenu';

// Util Imports
import { menuClasses } from './menuClasses';

// Styled Component Imports
import StyledMenuIcon from '../styles/StyledMenuIcon';

type RenderMenuIconParams = {
    level?: number;
    active?: boolean;
    disabled?: boolean;
    styles?: CSSObject;
    icon?: ReactElement;
    renderExpandedMenuItemIcon?: RenderExpandedMenuItemIcon;
    isBreakpointReached?: boolean;
};

// تایپ مناسب برای props منوآیتم
interface MenuItemProps {
    component?: {
        props: {
            href?: string;
        };
    };
    href?: string;
    exactMatch?: boolean;
    activeUrl?: string;
    children?: ReactNode;
    menuData?: any;
    verticalMenuProps?: any;
}

// تابع بازگشتی برای بررسی وجود url در میان children
export const confirmUrlInChildren = (children: ChildrenType['children'], url: string): boolean => {
    if (!children) {
        return false;
    }

    if (Array.isArray(children)) {
        return children.some((child: ReactNode) => confirmUrlInChildren(child, url));
    }

    if (isValidElement<MenuItemProps>(children)) {
        const { component, href, exactMatch, activeUrl, children: subChildren } = children.props;

        if (component && 'props' in component && component.props.href) {
            return exactMatch === true || exactMatch === undefined
                ? component.props.href === url
                : !!activeUrl && url.includes(activeUrl);
        }

        if (href) {
            return exactMatch === true || exactMatch === undefined
                ? href === url
                : !!activeUrl && url.includes(activeUrl);
        }

        if (subChildren) {
            return confirmUrlInChildren(subChildren, url);
        }
    }

    return false;
};

/*
 * دلیل تبدیل children کامپوننت HorizontalMenu به VerticalMenu:
 * کامپوننت‌های منوی افقی در صفحه‌های کوچک مشکل دارن
 * پس باید کودکان اون‌ها رو به معادل عمودی‌شون تبدیل کنیم.
 */

/**
 * پردازش children منوی افقی برای تبدیل به منوی عمودی یا اعمال تابع تبدیل روی هر child
 */
const processMenuChildren = (
    children: ReactNode,
    mapFunction: (child: ReactNode) => ReactNode
): ReactNode => {
    return Children.map(children, child => {
        if (!isValidElement(child)) return child;

        return (child.props as any)?.menuData ? (
            <GenerateVerticalMenu menuData={(child.props as any).menuData} />
        ) : (
            mapFunction(child)
        );
    });
};

/**
 * تبدیل سلسله‌مراتب منوی افقی به منوی عمودی
 */
export const mapHorizontalToVerticalMenu = (children: ReactNode): ReactNode => {
    return Children.map(children, child => {
        if (!isValidElement(child)) return null;

        const { children: childChildren, verticalMenuProps, ...rest }: any = child.props;

        switch (child.type) {
            case HorizontalMenuItem:
                return <VerticalMenuItem {...rest}>{childChildren}</VerticalMenuItem>;
            case HorizontalSubMenu:
                return (
                    <VerticalSubMenu {...rest}>
                        {mapHorizontalToVerticalMenu(childChildren)}
                    </VerticalSubMenu>
                );
            case HorizontalMenu:
                const transformedChildren = processMenuChildren(
                    childChildren,
                    mapHorizontalToVerticalMenu
                );
                return <VerticalMenu {...verticalMenuProps}>{transformedChildren}</VerticalMenu>;
            default:
                return child;
        }
    });
};

/*
 * رندر آیکون برای منو آیتم و ساب‌منو‌ها در سطوح بالاتر از 0
 */
export const renderMenuIcon = (params: RenderMenuIconParams): ReactElement | null => {
    const {
        icon,
        level,
        active,
        disabled,
        styles,
        renderExpandedMenuItemIcon,
        isBreakpointReached,
    } = params;

    if (icon && (level === 0 || (!isBreakpointReached && level && level > 0))) {
        return (
            <StyledMenuIcon className={menuClasses.icon} rootStyles={styles}>
                {icon}
            </StyledMenuIcon>
        );
    }

    if (
        level &&
        level !== 0 &&
        renderExpandedMenuItemIcon &&
        renderExpandedMenuItemIcon.icon !== null &&
        (!renderExpandedMenuItemIcon.level || renderExpandedMenuItemIcon.level >= level)
    ) {
        const iconToRender =
            typeof renderExpandedMenuItemIcon.icon === 'function'
                ? renderExpandedMenuItemIcon.icon({ level, active, disabled })
                : renderExpandedMenuItemIcon.icon;

        if (iconToRender) {
            return (
                <StyledMenuIcon className={menuClasses.icon} rootStyles={styles}>
                    {iconToRender}
                </StyledMenuIcon>
            );
        }
    }

    return null;
};
