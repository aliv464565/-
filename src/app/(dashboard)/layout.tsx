// MUI Imports
import Button from '@mui/material/Button';

// Type Imports
import type { ChildrenType } from '@/@core/types';

// Layout Imports
import LayoutWrapper from '@/@layouts/LayoutWrapper';
import VerticalLayout from '@/@layouts/VerticalLayout';
import HorizontalLayout from '@/@layouts/HorizontalLayout';

// Component Imports
// Config Imports
import Providers from '@/components/Providers';
import Navigation from '@/components/layout/vertical/Navigation';
import ScrollToTop from '@/@core/components/scroll-to-top';
import Customizer from '@/@core/components/customizer';
import Header from '@/components/layout/horizontal/Header';
import Navbar from '@/components/layout/vertical/Navbar';
import { NextAuthProvider } from '@/contexts/nextAuthProvider';
import { VerticalNavProvider } from '@/@menu/contexts/verticalNavContext';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import RefReshAuth from '../RefReshAuth';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/styles/auth';

// Util Imports

const Layout = async (props: ChildrenType) => {
    // const params = await props.params;
    const { children } = props;
    const session = await getServerSession(authOptions);
    // Vars
    return (
        <Providers>
            <NextAuthProvider session={session}>
                <RefReshAuth />
                <VerticalNavProvider>
                    <LayoutWrapper
                        verticalLayout={
                            <VerticalLayout navigation={<Navigation />} navbar={<Navbar />}>
                                {children}
                            </VerticalLayout>
                        }
                        horizontalLayout={
                            <HorizontalLayout header={<Header />}>{children}</HorizontalLayout>
                        }
                    />
                    <ScrollToTop className="mui-fixed">
                        <Button
                            variant="contained"
                            className="is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center"
                        >
                            <ArrowUpIcon width={20} />
                        </Button>
                    </ScrollToTop>
                    <Customizer />
                </VerticalNavProvider>
            </NextAuthProvider>
        </Providers>
    );
};
export default Layout;
