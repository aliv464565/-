// Data Imports
// MUI Imports
'use client';
import { TableCell, TableRow } from '@mui/material';

import CreateTable from '@/components/TemplateTable/Table';
import { useSession } from 'next-auth/react';
import { BASE_URL_API_ROLSE } from '@/libs/constanst';

type DataType = {
    title: string;
    name: string;
    id: number;
};

export default function Roles() {
    const session = useSession();
    console.log(session);
    function RowBodyTable(item: DataType) {
        return (
            <>
                <TableCell sx={{ textAlign: 'center !important' }}>{item.title}</TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>{item.name}</TableCell>
            </>
        );
    }
    return (
        <CreateTable
            crod={{
                delete: session?.data?.permissions.includes('role_destroy'),
                show: session?.data?.permissions.includes('role_show'),
                create: session?.data?.permissions.includes('role_create'),
                update: session?.data?.permissions.includes('role_edit'),
            }}
            api={BASE_URL_API_ROLSE}
            baseRouter="/admin/roles"
            requestKey="tableRols"
            rowBody={RowBodyTable}
        >
            <TableRow>
                <TableCell sx={{ textAlign: 'center !important' }}> نقش ها </TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}> کلید ها </TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>اقدامات </TableCell>
            </TableRow>
        </CreateTable>
    );
}
