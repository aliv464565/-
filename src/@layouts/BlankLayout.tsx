'use client';

// Third-party Imports
import classnames from 'classnames';

// Type Imports
import type { ChildrenType, SystemMode } from '@/@core/types';

// Hook Imports
import { useSettings } from '@/@core/hooks/useSettings';
import useLayoutInit from '@/@core/hooks/useLayoutInit';

// Util Imports
import { blankLayoutClasses } from './utils/layoutClasses';
import { getSystemMode } from '@/@core/utils/serverHelpers';

type Props = ChildrenType;

const BlankLayout = (props: Props) => {
    // Props
    const { children } = props;
    const systemMode = getSystemMode();

    // Hooks
    const { settings } = useSettings();

    useLayoutInit(systemMode);
    return (
        <div
            className={classnames(blankLayoutClasses.root, 'is-full bs-full')}
            data-skin={settings.skin}
        >
            {children}
        </div>
    );
};

export default BlankLayout;
