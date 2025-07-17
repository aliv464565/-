import ButtonBack from '@/components/Button/ButtonBack';
import axiosConfig from '@/helpers/axiosConfig';
import { BASE_URL_API_USER } from '@/libs/constanst';
import {
    Alert,
    Avatar,
    Box,
    Button,
    FormControl,
    Grid2,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import Image from 'next/image';

export default async function show({ params }: { params: Promise<{ ShowId: string }> }) {
    const { ShowId } = await params;
    const data = await axiosConfig.get(`${BASE_URL_API_USER}/show/${ShowId}`, {
        nextContext: true,
    });
    if (!data) return <Alert> خطا در برقراری ارتباط دوباره تلاش کنید</Alert>;
    return (
        <form>
            <Box textAlign="center">
                <Typography variant="h4">نمایش حساب</Typography>
                <Typography variant="body2">جزئیات حصاب مورد نظر را مشاهده کنید </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    marginLeft: '2rem',
                }}
            >
                <Avatar sx={{ width: '80px', height: '80px' }}>
                    <Image
                        fill
                        src={data.data.data.image || '/man-user-circle-icon.png'}
                        alt="خطا در برقراری ارتباط"
                    />
                </Avatar>

                <Box sx={{ margin: '1rem' }}>
                    <Typography sx={{ marginBottom: '.5rem' }}> عکس خود را انتخاب کنید </Typography>
                    <Button variant="contained" component="label" disabled>
                        انتخاب فایل
                        <input type="file" hidden accept="image/*" />
                    </Button>
                </Box>
            </Box>
            <Grid2 container spacing={5}>
                <Grid2 size={6}>
                    <TextField
                        label="کدملی"
                        type="number"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        value={data.data.data.username || ''}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        label="نام"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        value={data.data.data.first_name || ''}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        label="نام خانوادگی"
                        InputProps={{ readOnly: true }}
                        fullWidth
                        value={data.data.data.last_name || ''}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        label="موبایل"
                        type="tel"
                        InputProps={{ readOnly: true }}
                        fullWidth
                        value={data.data.data.mobile || ''}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <TextField
                        label="شغل"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        value={data.data.data.job || ''}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">دین</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            disabled
                            label="دین"
                            value={data.data.data?.religion?.id || ''}
                        >
                            <MenuItem value={data.data.data?.religion?.id || 0}>
                                {data?.data?.data?.religion?.name || ''}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">وضعیت تاهل</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            disabled
                            value={data.data.data?.marital?.id || ''}
                            label="وضعیت تاهل"
                        >
                            <MenuItem value={data.data.data?.marital?.id || 0}>
                                {data?.data?.data?.marital?.name || ''}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={3}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">جنسیت</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            disabled
                            label="جنسیت"
                            value={data.data.data?.sex?.id || ''}
                        >
                            <MenuItem value={data.data.data?.sex?.id || 0}>
                                {data?.data?.data?.sex?.name || ''}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={3}>
                    <TextField
                        label="محل تولد"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        value={data.data.data.birth_place || ''}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <TextField
                        label="شماره شناسنامه"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        value={data.data.data.identity_number || ''}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <TextField
                        label="نام پدر"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        value={data.data.data.father_name || ''}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <TextField
                        label="تاریخ تولد"
                        type="date"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        value={data.data.data?.birth_date || ''}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        label="ادرس محل زندگی"
                        multiline
                        minRows={4}
                        type="Tea"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        value={data.data.data.address || ''}
                    />
                </Grid2>{' '}
                <Grid2 size={12}>
                    <TextField
                        label="آدرس محل کار "
                        multiline
                        minRows={4}
                        type="Tea"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        value={data.data.data.office || ''}
                    />
                </Grid2>
                <ButtonBack variant="contained">برگشت به فهرست</ButtonBack>
            </Grid2>
        </form>
    );
}
