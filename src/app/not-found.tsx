// Type Imports

// Component Imports
import Providers from '@/components/Providers';
import BlankLayout from '@/@layouts/BlankLayout';

// Config Imports

// Util Imports
import NotFound from '@/viws/NotFound';

const NotFoundPage = async () => {
    // Vars

    return (
        <Providers>
            <BlankLayout>
                <NotFound />
            </BlankLayout>
        </Providers>
    );
};

export default NotFoundPage;
