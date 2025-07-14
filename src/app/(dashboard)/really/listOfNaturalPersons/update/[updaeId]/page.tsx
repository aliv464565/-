import { Box, CardHeader } from '@mui/material';
import { FormActionsListOfNaturalPersons } from '../../../FormActionsListOfNaturalPersons';
import axiosConfig from '@/helpers/axiosConfig';

// export async function generateStaticParams() {
//     const data: { data: { data: GenderData } } = await axios.get('http://192.168.1.103:85/api/admin/membership/core/user', { headers: { 'Content-Type': 'application/json' } });
//     const params = data.data.data.map(row => ({ params: { updaeId: row.id } }));
//     return params;
// }
export default async function Create({ params }: { params: Promise<{ updaeId: string }> }) {
    const { updaeId } = await params;
    const data = await axiosConfig.get(
        `http://192.168.1.103:85/api/admin/membership/core/user/show/${updaeId}`,
        { nextContext: true }
    );
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
