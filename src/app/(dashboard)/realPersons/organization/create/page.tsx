import axiosConfig from '@/helpers/axiosConfig';
import { FormActionsOrganization } from '../../FormActionsOrganization';
import { BASE_URL_API_ORGANIZATION } from '@/libs/constanst';
export default async function Store() {
    const data = await axiosConfig.get(
        `${BASE_URL_API_ORGANIZATION}/upsert-data`,
        { nextContext: true }
    );
    return <FormActionsOrganization optionsSelecteds={data.data.data} status="createImage" />;
}
