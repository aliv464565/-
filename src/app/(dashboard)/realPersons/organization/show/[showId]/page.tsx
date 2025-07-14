import ButtonBack from '@/components/Button/ButtonBack';
import axiosConfig from '@/helpers/axiosConfig';
import {
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

export default async function Show({ params }: { params: Promise<{ showId: string }> }) {
    const { showId } = await params;
    const responseDataUpdate = await axiosConfig.get(
        'http://192.168.1.103:85/api/admin/membership/core/organization/show/' + showId,
        { nextContext: true }
    );

    return (
        <form>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                <Image
                    src={responseDataUpdate.data.data?.image || '/images/man-user-circle-icon.png'}
                    width={100}
                    height={100}
                    alt="خطا در برقراری ارتباط"
                />

                <Box sx={{ margin: '1rem' }}>
                    <Typography sx={{ marginBottom: '.5rem' }}> عکس خود را انتخاب کنید </Typography>
                    <Button variant="contained" disabled component="label">
                        انتخاب فایل
                        <input type="file" hidden accept="image/*" />
                    </Button>
                </Box>
            </Box>

            <Grid2 container spacing={5}>
                <Grid2 size={6}>
                    <TextField
                        label="نام سازمان"
                        id="name"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        value={responseDataUpdate.data.data?.name}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        label="شناسه ملی"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        id="national_code"
                        value={responseDataUpdate.data.data?.national_code}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        label="تلفن "
                        type="number"
                        id="phone"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        value={responseDataUpdate.data.data?.phone}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        label="فکس"
                        id="fax"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        value={responseDataUpdate.data.data?.fax}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <TextField
                        label="وبسایت"
                        id="website"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        value={responseDataUpdate.data.data?.website}
                    />
                </Grid2>
                <Grid2 size={5}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">سازمان والد</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            disabled
                            value={responseDataUpdate.data.data?.parent?.id}
                            label="Age"
                        >
                            <MenuItem value={responseDataUpdate.data.data?.parent?.id}>
                                {responseDataUpdate.data.data?.parent?.name}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={4}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">نوع سازمان </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Age"
                            disabled
                            value={responseDataUpdate.data.data?.organizationType?.id}
                        >
                            <MenuItem value={responseDataUpdate.data.data?.organizationType?.id}>
                                {responseDataUpdate.data.data?.organizationType?.name}
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        label=" آدرس"
                        id="address"
                        InputProps={{ readOnly: true }}
                        multiline
                        minRows={4}
                        fullWidth
                        value={responseDataUpdate.data.data?.address}
                    />
                </Grid2>
                <ButtonBack variant="contained">برگشت به فهرست</ButtonBack>
            </Grid2>
        </form>
    );
}
