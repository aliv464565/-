// Type Imports
import type { ChildrenType } from '@/@core/types';

// Component Imports
import Providers from '@/components/Providers';
import BlankLayout from '@/@layouts/BlankLayout';

// Config Imports

// Util Imports

type Props = ChildrenType;

const Layout = async (props: Props) => {
    const { children } = props;

    // Vars

    return (
        <Providers>
            <BlankLayout>{children}</BlankLayout>
        </Providers>
    );
};

export default Layout;
