import axiosConfig from '@/helpers/axiosConfig';
import { Typography } from '@mui/material';
import FromActionsRolse from '../formActionsRolse';
import { BASE_URL_API_ROLSE } from '@/libs/constanst';

export default async function Create() {
    const data = await axiosConfig.get(`${BASE_URL_API_ROLSE}/upsert-data`, { nextContext: true });
    return (
        <>
            <Typography variant="body2">اطلاعات نقش</Typography>

            <FromActionsRolse status="create" dataRoles={data.data.data} />
        </>
    );
}
