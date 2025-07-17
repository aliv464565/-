import axiosConfig from '@/helpers/axiosConfig';
import FromActionsRolse from '../../formActionsRolse';
import { BASE_URL_API_ROLSE } from '@/libs/constanst';

export default async function UpdateForm({ params }: { params: Promise<{ updateId: string }> }) {
    const { updateId } = await params;
    const data = await axiosConfig.get(`${BASE_URL_API_ROLSE}/upsert-data`, { nextContext: true });
    const ShowData = await axiosConfig.get(`${BASE_URL_API_ROLSE}/show/${updateId}`, {
        nextContext: true,
    });
    return (
        <FromActionsRolse
            status="update"
            dataShow={ShowData.data.data}
            dataRoles={data.data.data}
        />
    );
}
