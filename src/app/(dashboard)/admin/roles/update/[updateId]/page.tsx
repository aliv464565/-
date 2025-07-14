import axiosConfig from '@/helpers/axiosConfig';
import FromActionsRolse from '../../formActionsRolse';

export default async function UpdateForm({ params }: { params: Promise<{ updateId: string }> }) {
    const { updateId } = await params;
    const data = await axiosConfig.get(
        'http://192.168.1.103:85/api/admin/membership/core/role/upsert-data',
        { nextContext: true }
    );
    const ShowData = await axiosConfig.get(
        'http://192.168.1.103:85/api/admin/membership/core/role/show/' + updateId,
        { nextContext: true }
    );
    return (
        <FromActionsRolse
            status="update"
            dataShow={ShowData.data.data}
            dataRoles={data.data.data}
        />
    );
}
