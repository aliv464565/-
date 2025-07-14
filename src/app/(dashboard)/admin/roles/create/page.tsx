import axiosConfig from '@/helpers/axiosConfig';
import { Typography } from '@mui/material';
import FromActionsRolse from '../formActionsRolse';

export default async function Create() {
    const data = await axiosConfig.get(
        'http://192.168.1.103:85/api/admin/membership/core/role/upsert-data',
        { nextContext: true }
    );
    return (
        <>
            <Typography variant="body2">اطلاعات نقش</Typography>

            <FromActionsRolse status="create" dataRoles={data.data.data} />
        </>
    );
}
