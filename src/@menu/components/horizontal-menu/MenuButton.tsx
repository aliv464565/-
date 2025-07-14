// React Imports
import { cloneElement, createElement, forwardRef } from 'react';
import type { ForwardRefRenderFunction, ReactElement, ComponentProps } from 'react';

// Third-party Imports
import classnames from 'classnames';
import { css } from '@emotion/react';

// Type Imports
import type { ChildrenType, MenuButtonProps } from '../../types';

// Component Imports
import { RouterLink } from '../RouterLink';

// Util Imports
import { menuClasses } from '../../utils/menuClasses';

type MenuButtonStylesProps = Partial<ChildrenType> & {
    level: number;
    disabled?: boolean;
};

export const menuButtonStyles = (props: MenuButtonStylesProps) => {
    // Props
    const { level, disabled, children } = props;

    return css({
        display: 'flex',
        alignItems: 'center',
        minBlockSize: '30px',
        textDecoration: 'none',
        color: 'inherit',
        boxSizing: 'border-box',
        cursor: 'pointer',
        paddingInline: '20px',

        '&:hover': {
            backgroundColor: '#f3f3f3',
        },

        '&:focus-visible': {
            outline: 'none',
            backgroundColor: '#f3f3f3',
        },

        ...(disabled && {
            pointerEvents: 'none',
            cursor: 'default',
            color: '#adadad',
        }),

        // All the active styles are applied to the button including menu items or submenu
        [`&.${menuClasses.active}`]: {
            ...(level === 0
                ? {
                      color: 'white',
                      backgroundColor: '#765feb',
                  }
                : {
                      ...(children
                          ? { backgroundColor: '#f3f3f3' }
                          : { color: '#765feb', backgroundColor: '#765feb1f' }),
                  }),
        },
    });
};

// Fix 1: Define proper types for different component scenarios
type MenuButtonComponent = string | ReactElement<any, any>;

// Fix 2: Extend MenuButtonProps with proper generic constraints
interface ExtendedMenuButtonProps extends Omit<MenuButtonProps, 'component'> {
    component?: MenuButtonComponent;
    href?: string;
}

const MenuButton: ForwardRefRenderFunction<HTMLAnchorElement, ExtendedMenuButtonProps> = (
    { className, component, children, ...rest },
    ref
) => {
    if (component) {
        // If component is a string, create a new element of that type
        if (typeof component === 'string') {
            return createElement(
                component,
                {
                    className: classnames(className),
                    ...rest,
                    ref,
                },
                children
            );
        } else {
            // Fix 3: Better type handling for ReactElement
            const element = component as ReactElement<any, any>;
            const { className: classNameProp, ...props } = element.props || {};

            return cloneElement(
                element,
                {
                    className: classnames(className, classNameProp),
                    ...rest,
                    ...props,
                    ref,
                } as any, // Type assertion needed here due to cloneElement limitations
                children
            );
        }
    } else {
        // If there is no component but href is defined, render RouterLink
        if (rest.href) {
            const { href, ...linkProps } = rest;
            return (
                <RouterLink ref={ref} className={className} href={href} {...linkProps}>
                    {children}
                </RouterLink>
            );
        } else {
            return (
                <a ref={ref} className={className} {...rest}>
                    {children}
                </a>
            );
        }
    }
};

export default forwardRef(MenuButton);
