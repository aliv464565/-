'use client';

import {
    Autocomplete,
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    FormHelperText,
    Grid2,
    TextField,
    Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DateObject from 'react-date-object';
import { useCrodItem, useGetDataItem as useGetDataSelector } from '@/hooks/getDataTable';
import ButtonBack from '@/components/Button/ButtonBack';
import { BASE_URL_API_USER } from '@/libs/constanst';

// Types
interface DataType {
    username: string;
    first_name: string;
    last_name: string;
    mobile: string;
    birth_place: string;
    identity_number: string;
    father_name: string;
    birth_date: string;
    address: string;
    job: string;
    office: string;
}

export interface DataSelectedType extends DataType {
    sex_id: string;
    religion_id: string;
    marital_id: string;
    image: string;
}

interface DataFormType extends DataType {
    id: number;
    sex: { name: string; id: number };
    religion: { name: string; id: number };
    marital: { name: string; id: number };
    image: string;
}

interface FormDataType extends DataType {
    sex_id: number | null;
    religion_id: number | null;
    marital_id: number | null;
}

interface FormProps {
    data?: DataFormType;
    status: 'createImage' | 'updateImage';
    children: React.ReactNode;
}

interface OptionType {
    name: string;
    id: number;
}

// Constants
const DEFAULT_AVATAR = '/images/man-user-circle-icon.png';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function FormActionsListOfNaturalPersons({ data, status, children }: FormProps) {
    const { control, handleSubmit, register } = useForm<FormDataType>({
        defaultValues: {
            username: data?.username || '',
            first_name: data?.first_name || '',
            last_name: data?.last_name || '',
            mobile: data?.mobile || '',
            birth_place: data?.birth_place || '',
            identity_number: data?.identity_number || '',
            father_name: data?.father_name || '',
            birth_date: data?.birth_date || '',
            address: data?.address || '',
            office: data?.office || '',
            job: data?.job || '',
            sex_id: data?.sex?.id || null,
            marital_id: data?.marital?.id || null,
            religion_id: data?.religion?.id || null,
        },
    });

    const router = useRouter();
    const [image, setImage] = useState<{ image: string; imageFile: File }>();
    const [isErrors, setIsErrors] = useState<DataSelectedType>();

    const { mutate } = useCrodItem({
        api: BASE_URL_API_USER,
        requestKey: 'tableListOfNaturalPersons',
        id: data?.id,
        status: status,
    });

    const { isLoading, data: optionsSelected } = useGetDataSelector({
        api: `${BASE_URL_API_USER}/upsert-data`,
        title: 'optionsSelectFormData',
    });

    // بهینه‌سازی submit function
    const handleFormSubmit = useCallback(
        async (dataForm: FormDataType) => {
            const newData = {
                ...dataForm,
                birth_date: dataForm.birth_date.replaceAll('/', '-'),
                image: image?.imageFile,
                ...(status === 'updateImage' && { _method: 'PUT' }),
            };

            mutate(newData, {
                onError: (err: any) => {
                    setIsErrors(err?.response?.data?.message as DataSelectedType);
                },
                onSuccess: () => {
                    router.replace('/really/listOfNaturalPersons');
                },
            });
        },
        [image, mutate, router, status]
    );

    // بهینه‌سازی image change handler
    const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file?.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({ image: reader.result as string, imageFile: file });
            };
            reader.readAsDataURL(file);
        }
    }, []);

    // بهینه‌سازی date change handler
    const handleDateChange = useCallback((dateObj: any, fieldOnChange: (value: string) => void) => {
        if (dateObj) {
            dateObj.digits = DIGITS;
            const formatted = dateObj.format?.('YYYY/MM/DD');
            fieldOnChange(formatted);
        }
    }, []);

    // بهینه‌سازی autocomplete change handler
    const handleAutocompleteChange = useCallback(
        (onChange: (value: number | null) => void) =>
            (_: any, selectedOption: OptionType | null) => {
                onChange(selectedOption?.id || null);
            },
        []
    );

    // بهینه‌سازی find option helper
    const findOption = useCallback(
        (options: OptionType[], value: number | null) =>
            options?.find((item: OptionType) => item.id === value) || null,
        []
    );

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Card>
                {children}
                <CardContent>
                    {/* Image Upload Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                        <Avatar sx={{ width: '100px', height: '100px' }}>
                            <Image
                                fill
                                src={image?.image || data?.image || DEFAULT_AVATAR}
                                alt="خطا در برقراری ارتباط"
                            />
                        </Avatar>
                        <Box sx={{ margin: '1rem' }}>
                            <Typography sx={{ marginBottom: '.5rem' }}>
                                عکس خود را انتخاب کنید
                            </Typography>
                            <Button variant="contained" component="label">
                                انتخاب فایل
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </Button>
                            {isErrors?.image && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.image}
                                </FormHelperText>
                            )}
                        </Box>
                    </Box>

                    <Grid2 container spacing={5}>
                        {/* Username Field */}
                        <Grid2 size={6}>
                            <TextField
                                label="کدملی"
                                type="number"
                                fullWidth
                                {...register('username')}
                                error={!!isErrors?.username}
                            />
                            {isErrors?.username && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.username}
                                </FormHelperText>
                            )}
                        </Grid2>

                        {/* Mobile Field */}
                        <Grid2 size={6}>
                            <TextField
                                label="موبایل"
                                type="number"
                                fullWidth
                                {...register('mobile')}
                                error={!!isErrors?.mobile}
                            />
                            {isErrors?.mobile && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.mobile}
                                </FormHelperText>
                            )}
                        </Grid2>

                        {/* First Name Field */}
                        <Grid2 size={6}>
                            <TextField
                                label="نام"
                                fullWidth
                                {...register('first_name')}
                                error={!!isErrors?.first_name}
                            />
                            {isErrors?.first_name && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.first_name}
                                </FormHelperText>
                            )}
                        </Grid2>

                        {/* Last Name Field */}
                        <Grid2 size={6}>
                            <TextField
                                label="نام خانوادگی"
                                fullWidth
                                {...register('last_name')}
                                error={!!isErrors?.last_name}
                            />
                            {isErrors?.last_name && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.last_name}
                                </FormHelperText>
                            )}
                        </Grid2>

                        {/* Sex Autocomplete */}
                        <Grid2 size={3}>
                            <Controller
                                control={control}
                                name="sex_id"
                                render={({ field }) => (
                                    <Autocomplete
                                        disablePortal
                                        options={optionsSelected?.sexes || []}
                                        getOptionLabel={(option: OptionType) => option.name}
                                        fullWidth
                                        value={findOption(optionsSelected?.sexes, field.value)}
                                        onChange={handleAutocompleteChange(field.onChange)}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                label="جنسیت"
                                                error={!!isErrors?.sex_id}
                                            />
                                        )}
                                    />
                                )}
                            />
                            {isErrors?.sex_id && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.sex_id}
                                </FormHelperText>
                            )}
                        </Grid2>

                        {/* Religion Autocomplete */}
                        <Grid2 size={3}>
                            <Controller
                                control={control}
                                name="religion_id"
                                render={({ field }) => (
                                    <Autocomplete
                                        disablePortal
                                        loading={isLoading}
                                        options={optionsSelected?.religions || []}
                                        getOptionLabel={(option: OptionType) => option.name}
                                        fullWidth
                                        value={findOption(optionsSelected?.religions, field.value)}
                                        onChange={handleAutocompleteChange(field.onChange)}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                label="دین"
                                                error={!!isErrors?.religion_id}
                                            />
                                        )}
                                    />
                                )}
                            />
                            {isErrors?.religion_id && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.religion_id}
                                </FormHelperText>
                            )}
                        </Grid2>

                        {/* Marital Status Autocomplete */}
                        <Grid2 size={3}>
                            <Controller
                                control={control}
                                name="marital_id"
                                render={({ field }) => (
                                    <Autocomplete
                                        disablePortal
                                        options={optionsSelected?.maritals || []}
                                        getOptionLabel={(option: OptionType) => option.name}
                                        fullWidth
                                        value={findOption(optionsSelected?.maritals, field.value)}
                                        onChange={handleAutocompleteChange(field.onChange)}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                label="وضعیت تاهل"
                                                error={!!isErrors?.marital_id}
                                            />
                                        )}
                                    />
                                )}
                            />
                            {isErrors?.marital_id && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.marital_id}
                                </FormHelperText>
                            )}
                        </Grid2>

                        {/* Identity Number Field */}
                        <Grid2 size={3}>
                            <TextField
                                label="شماره شناسنامه"
                                fullWidth
                                {...register('identity_number')}
                                error={!!isErrors?.identity_number}
                            />
                            {isErrors?.identity_number && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.identity_number}
                                </FormHelperText>
                            )}
                        </Grid2>

                        {/* Father Name Field */}
                        <Grid2 size={3}>
                            <TextField
                                label="نام پدر"
                                fullWidth
                                {...register('father_name')}
                                error={!!isErrors?.father_name}
                            />
                            {isErrors?.father_name && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.father_name}
                                </FormHelperText>
                            )}
                        </Grid2>

                        {/* Birth Date Picker */}
                        <Grid2 size={3}>
                            <Controller
                                name="birth_date"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        containerStyle={{ width: '100%' }}
                                        value={
                                            field.value
                                                ? new DateObject({
                                                      date: field.value,
                                                      calendar: persian,
                                                  })
                                                : null
                                        }
                                        onChange={dateObj =>
                                            handleDateChange(dateObj, field.onChange)
                                        }
                                        maxDate={new Date()}
                                        placeholder="انتخاب تاریخ"
                                        render={(value, openCalendar) => (
                                            <TextField
                                                label="تاریخ تولد"
                                                fullWidth
                                                value={value || ''}
                                                onClick={openCalendar}
                                                error={!!isErrors?.birth_date}
                                            />
                                        )}
                                    />
                                )}
                            />
                            {isErrors?.birth_date && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.birth_date}
                                </FormHelperText>
                            )}
                        </Grid2>

                        {/* Birth Place Field */}
                        <Grid2 size={3}>
                            <TextField
                                fullWidth
                                label="محل تولد"
                                {...register('birth_place')}
                                error={!!isErrors?.birth_place}
                            />
                            {isErrors?.birth_place && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.birth_place}
                                </FormHelperText>
                            )}
                        </Grid2>

                        {/* Job Field */}
                        <Grid2 size={3}>
                            <TextField
                                label="شغل"
                                fullWidth
                                {...register('job')}
                                error={!!isErrors?.job}
                            />
                            {isErrors?.job && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.job}
                                </FormHelperText>
                            )}
                        </Grid2>

                        {/* Address Field */}
                        <Grid2 size={12}>
                            <TextField
                                label="آدرس محل زندگی"
                                multiline
                                minRows={4}
                                fullWidth
                                {...register('address')}
                                error={!!isErrors?.address}
                            />
                            {isErrors?.address && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.address}
                                </FormHelperText>
                            )}
                        </Grid2>

                        {/* Office Address Field */}
                        <Grid2 size={12}>
                            <TextField
                                label="آدرس محل کار"
                                multiline
                                minRows={4}
                                fullWidth
                                {...register('office')}
                                error={!!isErrors?.office}
                            />
                            {isErrors?.office && (
                                <FormHelperText sx={{ color: 'red' }}>
                                    {isErrors.office}
                                </FormHelperText>
                            )}
                        </Grid2>
                    </Grid2>
                </CardContent>
                <CardActions sx={{ justifyContent: 'end' }}>
                    <ButtonBack>برگشت به فهرست</ButtonBack>
                    <Button type="submit" variant="contained">
                        ذخیره
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
}
