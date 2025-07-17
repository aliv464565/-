'use client';
// input
import CustomTextField from '@/@core/components/mui/TextField';

import ButtonBack from '@/components/Button/ButtonBack';

// درخواست برای عملیات ها مانند ایجاد و بروز رسانی
import { useCrodItem } from '@/hooks/getDataTable';
import { BASE_URL_API_ROLSE } from '@/libs/constanst';

// mui
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid2,
    Stack,
    Typography,
} from '@mui/material';

// جا به جایی بین صفحات
import { useRouter } from 'next/navigation';

// react hook
import { useState } from 'react';

export interface DataRolsType {
    permissionGroups: { name: string; permissions: { name: string; id: number }[] }[];
}

export interface DataShowRolesShow {
    id: number;
    title: string;
    name: string;
    permissions: { id: number; title: string; name: string }[];
}

export default function FromActionsRolse({
    dataRoles,
    dataShow,
    status,
}: {
    dataRoles?: DataRolsType;
    dataShow?: DataShowRolesShow;
    status: 'create' | 'update';
}) {
    //عملیات های ایجاد و بروز رسانی رو انجام میده
    const { mutate } = useCrodItem({
        api: BASE_URL_API_ROLSE,
        requestKey: 'tableRols',
        id: dataShow?.id,
        status,
    });

    const [isErrors, setErrors] = useState<{ title: string; name: string; permissions: '' }>({
        title: '',
        name: '',
        permissions: '',
    });
    const router = useRouter();

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrors({ name: '', title: '', permissions: '' });
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const selectedPermissionIds = Object.keys(data)
            .filter(item => +item)
            .map(item => +item);

        const newData = {
            title: data?.title as string,
            name: data.name as string,
            permissions: selectedPermissionIds as number[],
        };
        mutate(newData, {
            onError: (err: any) => {
                setErrors(e => ({
                    ...e,
                    ...(err?.response?.data.message as { title: string; name: string }),
                }));
            },
            onSuccess: () => {
                router.replace('/admin/roles');
            },
        });
    }
    return (
        <form onSubmit={submit}>
            <Card>
                <CardContent>
                    <Grid2 container spacing={2}>
                        <Grid2 size={6}>
                            <CustomTextField
                                defaultValue={dataShow?.title}
                                size="medium"
                                name="title"
                                label="نام نقش"
                                placeholder="لطفا نام نقش مورد نظر را وارد کنید "
                                fullWidth
                                error={isErrors?.title !== ''}
                                helperText={isErrors?.title}
                            />
                        </Grid2>

                        <Grid2 size={6}>
                            <CustomTextField
                                defaultValue={dataShow?.name}
                                size="medium"
                                name="name"
                                label="کد یکتا"
                                fullWidth
                                error={isErrors?.name !== ''}
                                helperText={isErrors?.name}
                            />
                        </Grid2>

                        {dataRoles?.permissionGroups.map(item => (
                            <Grid2
                                size={3}
                                key={item.name}
                                sx={{ marginTop: '1rem', marginBottom: '2rem' }}
                            >
                                <Typography
                                    variant="body1"
                                    component="span"
                                    sx={{ display: 'inline-block' }}
                                    marginBottom={1}
                                    paddingInline={3}
                                    paddingBlock={2}
                                    borderRadius={2}
                                    fontWeight="bold"
                                    bgcolor="ButtonFace"
                                >
                                    {item.name}
                                </Typography>
                                <Stack>
                                    {item.permissions.map(checked => (
                                        <FormControlLabel
                                            key={checked.id}
                                            label={checked.name}
                                            control={
                                                <Checkbox
                                                    defaultChecked={dataShow?.permissions.some(
                                                        item => item.id === checked.id
                                                    )}
                                                    name={checked.id.toString()}
                                                />
                                            }
                                        />
                                    ))}
                                </Stack>
                            </Grid2>
                        ))}
                    </Grid2>
                    {isErrors.permissions !== '' && (
                        <FormHelperText error>{isErrors.permissions}</FormHelperText>
                    )}
                </CardContent>
                <CardActions>
                    <ButtonBack>برگشت به فهرست ها </ButtonBack>
                    <Button variant="contained" type="submit">
                        {' '}
                        ذخیره
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}
