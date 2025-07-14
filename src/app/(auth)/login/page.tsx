'use client';

// React Imports
import { useEffect, useState } from 'react';

// Next Imports
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// react Hook Form
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

// MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';

//Third-party Imports
import { object, minLength, string, pipe, nonEmpty, InferInput } from 'valibot';
import { valibotResolver } from '@hookform/resolvers/valibot';

// Component Imports
import Logo from '@/components/layout/shared/Logo';
import CustomTextField from '@/@core/components/mui/TextField';

// Config Imports
import themeConfig from '@/configs/themeConfig';

// Util Imports
import AuthIllustrationWrapper from '../AuthIllustrationWrapper';
import { EyeIcon } from '@heroicons/react/24/outline';
import { signIn } from 'next-auth/react';
import { CircularProgress, FormHelperText } from '@mui/material';

// TypeError
type ErrorType = {
    username: string;
    password: string;
    invalid: string;
};

//FormData Type
type FormData = InferInput<typeof schema>;

const schema = object({
    username: pipe(string(), nonEmpty('حداقل یک چیزی وارد کن خالو')),
    password: pipe(
        string(),
        nonEmpty('رمز وارد کن خالو'),
        minLength(5, 'رمزت امن نیست حداقل باید 5 کاراکتر باشه ')
    ),
});
// Styled Component Imports

const LoginV1 = () => {
    // States
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [errorState, setErrorState] = useState<ErrorType>({
        password: '',
        username: '',
        invalid: '',
    });

    const [loading, setLoading] = useState(false);
    // Hooks
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: valibotResolver(schema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const handleClickShowPassword = () => setIsPasswordShown(show => !show);

    const Submit: SubmitHandler<FormData> = async (formData: FormData) => {
        try {
            setLoading(true);
            const res = await signIn('credentials', { ...formData, redirect: false });

            if (res?.error) {
                setLoading(false);
                throw res.error;
            }

            router.replace('/home');

            setLoading(false);
        } catch (error) {
            setErrorState(e => ({ ...e, invalid: error as string }));
        }
    };
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
                            <form onSubmit={handleSubmit(Submit)} className="flex flex-col gap-6">
                                <Controller
                                    control={control}
                                    name="username"
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <CustomTextField
                                            {...field}
                                            autoFocus
                                            fullWidth
                                            dir="rtl"
                                            autoComplete="usename"
                                            onChange={e => {
                                                field.onChange(e.target.value);
                                                errorState?.username !== '' &&
                                                    setErrorState({
                                                        password: '',
                                                        username: '',
                                                        invalid: '',
                                                    });
                                            }}
                                            {...((errors.username ||
                                                errorState?.username !== '') && {
                                                error: true,
                                                helperText:
                                                    errors?.username?.message ||
                                                    errorState?.username,
                                            })}
                                            label="نام کاربری "
                                            placeholder="لطفا نام کاربری خود را وارد کنید "
                                        />
                                    )}
                                />

                                <Controller
                                    rules={{ required: true }}
                                    control={control}
                                    name="password"
                                    render={({ field }) => (
                                        <CustomTextField
                                            {...field}
                                            fullWidth
                                            dir="rtl"
                                            label="رمز عبور"
                                            placeholder="············"
                                            id="outlined-adornment-password"
                                            type={isPasswordShown ? 'text' : 'password'}
                                            slotProps={{
                                                input: {
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                edge="end"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={e =>
                                                                    e.preventDefault()
                                                                }
                                                            >
                                                                <EyeIcon width={20} />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            onChange={e => {
                                                field.onChange(e.target.value);
                                                errorState?.password !== '' &&
                                                    setErrorState({
                                                        password: '',
                                                        username: '',
                                                        invalid: '',
                                                    });
                                            }}
                                            {...((errors?.password ||
                                                errorState?.password !== '') && {
                                                error: true,
                                                helperText:
                                                    errors.password?.message ||
                                                    errorState?.password,
                                            })}
                                        />
                                    )}
                                />
                                <FormHelperText sx={{ color: 'red' }}>
                                    {errorState.invalid}
                                </FormHelperText>
                                <div className="flex justify-between items-center gap-x-3 gap-y-1 flex-wrap">
                                    <Typography
                                        className="text-end"
                                        color="primary.main"
                                        component={Link}
                                        href={'/pages/auth/forgot-password-v1'}
                                    >
                                        رمز عبور را فراموش کرده اید ؟
                                    </Typography>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label="مرا به خاطر بسپار"
                                    />
                                </div>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                    disabled={loading}
                                >
                                    ورود
                                    {loading && <CircularProgress color="inherit" size={20} />}
                                </Button>
                                <div className="flex justify-center items-center flex-wrap gap-2">
                                    <Typography
                                        component={Link}
                                        href={'/pages/auth/register-v1'}
                                        color="primary.main"
                                    >
                                        ساخت اکانت جدید
                                    </Typography>
                                    <Typography>برای اولین بار وارد سایت ما شدید؟</Typography>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </AuthIllustrationWrapper>
            </div>
        </div>
    );
};

export default LoginV1;
