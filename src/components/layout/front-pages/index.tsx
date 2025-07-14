// Type Imports
import type { ChildrenType } from '@/@core/types';

// Component Imports
import Header from '@/components/layout/front-pages/Header';

// Server Action Imports

// Util Imports
import { frontLayoutClasses } from '@/@layouts/utils/layoutClasses';

const FrontLayout = async ({ children }: ChildrenType) => {
    // Vars

    return (
        <div className={frontLayoutClasses.root}>
            <Header />
            {children}
        </div>
    );
};

export default FrontLayout;
