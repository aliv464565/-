// React Imports
import Link from 'next/link';
// MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

//Third-party Imports

// Component Imports
import Logo from '@/components/layout/shared/Logo';

// Config Imports
import themeConfig from '@/configs/themeConfig';

// Util Imports
import AuthIllustrationWrapper from '../AuthIllustrationWrapper';
import CredentialsSigninForm from './credentials-signin-form';

// TypeError

//FormData Type

// Styled Component Imports

const LoginV1 = () => {
    // States

    // Hooks

    return (
        <div className="flex justify-center items-center h-[100vh] ">
            <div className="flex flex-col justify-center items-center min-bs-[100dvh] p-12">
                <AuthIllustrationWrapper>
                    <Card className="flex flex-col sm:is-[450px]">
                        <CardContent className="sm:!p-12">
                            <Link href={'/'} className="flex justify-center mbe-6">
                                <Logo />
                            </Link>
                            <div className="flex flex-col gap-1 mbe-6">
                                <Typography variant="h4">{`خوش امدید  ${themeConfig.templateName}! 👋🏻`}</Typography>
                                <Typography>
                                    برای ورود لطفا نام کاربری و رمز عبور خود را وارد کنید
                                </Typography>
                            </div>
                            <CredentialsSigninForm />
                        </CardContent>
                    </Card>
                </AuthIllustrationWrapper>
            </div>
        </div>
    );
};

export default LoginV1;
