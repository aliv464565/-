import axiosConfig from '@/helpers/axiosConfig';
import { FormActionsOrganization } from '../../FormActionsOrganization';
export default async function Store() {
    const data = await axiosConfig.get(
        'http://192.168.1.103:85/api/admin/membership/core/organization/upsert-data',
        { nextContext: true }
    );
    return <FormActionsOrganization optionsSelecteds={data.data.data} status="createImage" />;
}
