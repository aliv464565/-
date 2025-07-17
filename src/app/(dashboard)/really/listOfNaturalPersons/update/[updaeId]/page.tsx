import { Box, CardHeader } from '@mui/material';
import { FormActionsListOfNaturalPersons } from '../../../FormActionsListOfNaturalPersons';
import axiosConfig from '@/helpers/axiosConfig';
import { BASE_URL_API_USER } from '@/libs/constanst';

export default async function Create({ params }: { params: Promise<{ updaeId: string }> }) {
    const { updaeId } = await params;
    const data = await axiosConfig.get(`${BASE_URL_API_USER}/show/${updaeId}`, {
        nextContext: true,
    });
    return (
        <Box sx={{ borderRadius: 2, padding: 10 }}>
            <FormActionsListOfNaturalPersons status="updateImage" data={data.data.data}>
                <CardHeader
                    title="بروزرسانی کردن کابر"
                    subheader="اطلاعات مورد نظر خود را تغییر دهید"
                    sx={{ textAlign: 'center' }}
                />
            </FormActionsListOfNaturalPersons>
        </Box>
    );
}
