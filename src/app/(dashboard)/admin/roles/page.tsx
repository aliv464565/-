// Data Imports
// MUI Imports
'use client';
import { TableCell, TableRow } from '@mui/material';

import CreateTable from '@/components/TemplateTable/Table';
import { useSession } from 'next-auth/react';

type DataType = {
    title: string;
    name: string;
    id: number;
};

export default function Roles() {
    const session = useSession();
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
            api="http://192.168.1.103:85/api/admin/membership/core/role"
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
