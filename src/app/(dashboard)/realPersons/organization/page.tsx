'use client';
import CreateTable from '@/components/TemplateTable/Table';
import { TableCell, TableRow } from '@mui/material';
import { useSession } from 'next-auth/react';
interface DataType {
    name: string;
    national_code: string;
    parent: { name: string };
    organizationType: { name: string };
}
export default function Organization() {
    const session = useSession();
    function RowBodyTable(item: DataType) {
        return (
            <>
                <TableCell sx={{ textAlign: 'center !important' }}>{item.name}</TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>{item.national_code}</TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>
                    {item?.parent?.name || '-'}
                </TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>
                    {item?.organizationType?.name || '----'}
                </TableCell>
            </>
        );
    }
    return (
        <CreateTable
            crod={{
                delete: session?.data?.permissions.includes('organization_destroy'),
                show: session?.data?.permissions.includes('organization_show'),
                create: session?.data?.permissions.includes('organization_create'),
                update: session?.data?.permissions.includes('organization_edit'),
            }}
            api="http://192.168.1.103:85/api/admin/membership/core/organization"
            baseRouter="/realPersons/organization"
            requestKey="tableRealPersons"
            rowBody={RowBodyTable}
        >
            <TableRow>
                <TableCell sx={{ textAlign: 'center !important' }}> نام سازمان </TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}> شناسه سازمان </TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>والد</TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>نوع </TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>اقدامات </TableCell>
            </TableRow>
        </CreateTable>
    );
}
