'use client';

import { ChildrenType } from '@/@core/types';
import themeConfig from '@/configs/themeConfig';

// Third-party Imports
import type { CSSObject } from '@emotion/styled';

// Type Imports

// Config Imports

// Hook Imports
import { useSettings } from '@/@core/hooks/useSettings';
import { verticalLayoutClasses } from '@/@layouts/utils/layoutClasses';
import StyledFooter from '@/@layouts/styles/vertical/StyledFooter';
import classNames from 'classnames';

// Util Imports

// Styled Component Imports

type Props = ChildrenType & {
    overrideStyles?: CSSObject;
};

const Footer = (props: Props) => {
    // Props
    const { children, overrideStyles } = props;

    // Hooks
    const { settings } = useSettings();

    // Vars
    const { footerContentWidth } = settings;

    const footerDetached = themeConfig.footer.detached === true;
    const footerAttached = themeConfig.footer.detached === false;
    const footerStatic = themeConfig.footer.type === 'static';
    const footerFixed = themeConfig.footer.type === 'fixed';
    const footerContentCompact = footerContentWidth === 'compact';
    const footerContentWide = footerContentWidth === 'wide';

    return (
        <StyledFooter
            overrideStyles={overrideStyles}
            className={classNames(verticalLayoutClasses.footer, 'is-full', {
                [verticalLayoutClasses.footerDetached]: footerDetached,
                [verticalLayoutClasses.footerAttached]: footerAttached,
                [verticalLayoutClasses.footerStatic]: footerStatic,
                [verticalLayoutClasses.footerFixed]: footerFixed,
                [verticalLayoutClasses.footerContentCompact]: footerContentCompact,
                [verticalLayoutClasses.footerContentWide]: footerContentWide,
            })}
        >
            <div className={verticalLayoutClasses.footerContentWrapper}>{children}</div>
        </StyledFooter>
    );
};

export default Footer;
