import axiosConfig from '@/helpers/axiosConfig';
import { FormActionsOrganization } from '../../../FormActionsOrganization';
import { BASE_URL_API_ORGANIZATION } from '@/libs/constanst';
export default async function Update({ params }: { params: Promise<{ updateId: string }> }) {
    const { updateId } = await params;
    const data = await axiosConfig.get(`${BASE_URL_API_ORGANIZATION}/upsert-data`, {
        nextContext: true,
    });
    const responseDataUpdate = await axiosConfig.get(
        `${BASE_URL_API_ORGANIZATION}/show/${updateId}`,
        { nextContext: true }
    );
    return (
        <FormActionsOrganization
            data={responseDataUpdate.data.data}
            optionsSelecteds={data.data.data}
            status="updateImage"
        />
    );
}
