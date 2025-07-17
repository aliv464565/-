'use client';

import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    FormHelperText,
    Grid2,
    TextField,
    Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ButtonBack from '@/components/Button/ButtonBack';
import { useCrodItem, useGetDataSelector } from '@/hooks/getDataTable';
import { BASE_URL_API_ORGANIZATION } from '@/libs/constanst';

interface DataType {
    name: string;
    national_code: string;
    phone: string;
    fax: string;
    address: string;
    website: string;
    parent: string;
    image: string | null;
    id: number;
}

export type DataSelectedType = {
    organization_type_id: string;
    parent_id: string;
    image: string;
} & DataType;

type DataformType = {
    organizationType: { id: number; name: string; statis: string };
    parent: { id: number; name: string; statis: string };
} & DataType;
type FormDataType = {
    name: string;
    national_code: string;
    phone: string;
    fax: string;
    address: string;
    website: string;
    organization_type_id: number | null;
};

export function FormActionsOrganization({
    data,
    status,
    optionsSelecteds,
}: {
    data?: DataformType;
    status: 'createImage' | 'updateImage';
    optionsSelecteds: { organizationTypes: { id: number; name: string }[] };
}) {
    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            name: data?.name || '',
            national_code: data?.national_code || '',
            phone: data?.phone || '',
            fax: data?.fax || '',
            address: data?.address || '',
            website: data?.website || '',
            parent_id: data?.parent?.id || null,
            organization_type_id: data?.organizationType?.id || null,
        },
    });

    const router = useRouter();
    const [image, setImage] = useState<{ image: string; imageFile: File }>();
    const [isErrors, setIsErrors] = useState<DataSelectedType>();
    const [inputValue, setInputValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 500); // ۵۰۰ میلی‌ثانیه

        return () => clearTimeout(timer);
    }, [inputValue]);

    const { data: DataOptiensSelected = { data: [{ name: '' }] }, isLoading } = useGetDataSelector({
        title: 'organizationSelectEdorganizationType',
        search: debouncedValue,
        api:BASE_URL_API_ORGANIZATION,
    });

    const { mutate } = useCrodItem({
        api: BASE_URL_API_ORGANIZATION,
        requestKey: 'organization',
        id: data?.id,
        status: status,
    });
    async function submit(dataform: FormDataType) {
        const newData: any = {
            ...dataform,
            image: image?.imageFile,
        };
        if (status === 'updateImage') {
            newData._method = 'PUT';
        }
        mutate(newData, {
            onError: (err: any) => {
                setIsErrors(err?.response?.data.message as DataSelectedType);
            },
            onSuccess: () => {
                router.replace('/realPersons/organization');
            },
        });
    }
    function ChengImage(event: React.ChangeEvent<HTMLInputElement>) {
        const fils = event.target.files;
        const file = fils?.[0];

        if (file?.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({ image: reader.result as string, imageFile: file });
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <form onSubmit={handleSubmit(submit)}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <Image
                    src={image?.image || data?.image || '/images/man-user-circle-icon.png'}
                    width={100}
                    height={100}
                    alt="خطا در برقراری ارتباط"
                />

                <Box sx={{ margin: '1rem' }}>
                    <Typography sx={{ marginBottom: '.5rem' }}> عکس خود را انتخاب کنید </Typography>
                    <Button variant="contained" component="label">
                        انتخاب فایل
                        <input type="file" hidden onChange={ChengImage} accept="image/*" />
                    </Button>
                    {isErrors?.image && (
                        <FormHelperText sx={{ color: 'red' }}>{isErrors.image}</FormHelperText>
                    )}
                </Box>
            </Box>

            <Grid2 container spacing={4}>
                <Grid2 size={6}>
                    <TextField label="نام سازمان" id="name" fullWidth {...register('name')} />
                    {isErrors?.name && (
                        <FormHelperText sx={{ color: 'red' }}>{isErrors.name}</FormHelperText>
                    )}
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        label="شناسه ملی"
                        fullWidth
                        id="national_code"
                        {...register('national_code')}
                    />
                    {isErrors?.national_code && (
                        <FormHelperText sx={{ color: 'red' }}>
                            {isErrors.national_code}
                        </FormHelperText>
                    )}
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        label="تلفن "
                        type="number"
                        id="phone"
                        fullWidth
                        {...register('phone')}
                    />
                    {isErrors?.phone && (
                        <FormHelperText sx={{ color: 'red' }}>{isErrors.phone}</FormHelperText>
                    )}
                </Grid2>
                <Grid2 size={6}>
                    <TextField label="فکس" id="fax" fullWidth {...register('fax')} />
                    {isErrors?.fax && (
                        <FormHelperText sx={{ color: 'red' }}>{isErrors.fax}</FormHelperText>
                    )}
                </Grid2>
                <Grid2 size={3}>
                    <TextField label="وبسایت" id="website" fullWidth {...register('website')} />
                </Grid2>
                <Grid2 size={5}>
                    <Controller
                        control={control}
                        name="parent_id"
                        render={({ field }) => (
                            <Autocomplete
                                loading={isLoading}
                                options={
                                    (DataOptiensSelected.data as {
                                        name: string;
                                        id: number;
                                    }[]) || [{ name: '', id: 0 }]
                                }
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                }}
                                onChange={(event, newValue) => {
                                    field.onChange(newValue ? newValue?.id : null);
                                }}
                                getOptionLabel={option => option?.name}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="سازمان والد "
                                        slotProps={{
                                            input: {
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <>
                                                        {isLoading ? (
                                                            <CircularProgress
                                                                color="inherit"
                                                                size={20}
                                                            />
                                                        ) : null}
                                                        {params.InputProps.endAdornment}
                                                    </>
                                                ),
                                            },
                                        }}
                                    />
                                )}
                                fullWidth
                            />
                        )}
                    />
                    {isErrors?.parent_id && (
                        <FormHelperText sx={{ color: 'red' }}>{isErrors.parent_id}</FormHelperText>
                    )}
                </Grid2>
                <Grid2 size={4}>
                    <Controller
                        control={control}
                        name="organization_type_id"
                        render={({ field }) => (
                            <Autocomplete
                                options={
                                    optionsSelecteds?.organizationTypes || [{ name: '', id: 0 }]
                                }
                                getOptionLabel={option => option.name}
                                value={
                                    optionsSelecteds?.organizationTypes?.find(
                                        item => item.id === field?.value
                                    ) || null
                                }
                                onChange={(_, selectedOption) => {
                                    field.onChange(selectedOption?.id || null);
                                }}
                                fullWidth
                                renderInput={params => (
                                    <TextField {...params} label="نوع سازمان " />
                                )}
                            />
                        )}
                    />
                    {isErrors?.organization_type_id && (
                        <FormHelperText sx={{ color: 'red' }}>
                            {isErrors.organization_type_id}
                        </FormHelperText>
                    )}
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        label=" آدرس"
                        id="address"
                        multiline
                        minRows={4}
                        fullWidth
                        {...register('address')}
                    />
                    {isErrors?.address && (
                        <FormHelperText sx={{ color: 'red' }}>{isErrors.address}</FormHelperText>
                    )}
                </Grid2>
                <ButtonBack variant="contained">برگشت به فهرست</ButtonBack>
                <Button type="submit">ذخیره </Button>
            </Grid2>
        </form>
    );
}
