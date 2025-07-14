'use client';

// React Imports
import { useEffect, type ReactElement } from 'react';

// Type Imports
import type { SystemMode } from '@/@core/types';

// Hook Imports
import { useSettings } from '@/@core/hooks/useSettings';
import useLayoutInit from '@/@core/hooks/useLayoutInit';
import { getSystemMode } from '@/@core/utils/serverHelpers';

type LayoutWrapperProps = {
    verticalLayout: ReactElement;
    horizontalLayout: ReactElement;
};

const LayoutWrapper = (props: LayoutWrapperProps) => {
    // Props
    const { verticalLayout, horizontalLayout } = props;
    const systemMode = getSystemMode();

    // Hooks
    const { settings } = useSettings();
    useLayoutInit(systemMode);
    //set mode dark or light

    // Return the layout based on the layout context
    return (
        <div className="flex flex-col flex-auto w-full  " data-skin={settings.skin}>
            {settings.layout === 'horizontal' ? horizontalLayout : verticalLayout}
        </div>
    );
};

export default LayoutWrapper;
