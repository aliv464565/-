// Next Imports

// MUI Imports

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css';

// Type Imports

// Component Imports

// HOC Imports

// Config Imports

// Util Imports

// Style Imports
import '@/app/globals.css';

// Generated Icon CSS Imports
import { ChildrenType } from '@/@core/types';

export const metadata = {
    title: 'Vuexy - MUI Next.js Admin Dashboard Template',
    description:
        'Vuexy - MUI Next.js Admin Dashboard Template - is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.',
};

const RootLayout = async (props: ChildrenType) => {
    const { children } = props;
    // Vars
    return (
        <html id="__next" lang={'fa'} dir="rtl" suppressHydrationWarning>
            <body className="flex is-full min-bs-full flex-auto flex-col">{children}</body>
        </html>
    );
};

export default RootLayout;
