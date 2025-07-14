import axiosConfig from '@/helpers/axiosConfig';
import { FormActionsOrganization } from '../../../FormActionsOrganization';
export default async function Update({ params }: { params: Promise<{ updateId: string }> }) {
    const { updateId } = await params;
    const data = await axiosConfig.get(
        'http://192.168.1.103:85/api/admin/membership/core/organization/upsert-data',
        { nextContext: true }
    );
    const responseDataUpdate = await axiosConfig.get(
        'http://192.168.1.103:85/api/admin/membership/core/organization/show/' + updateId,
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
