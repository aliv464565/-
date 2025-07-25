'use client';
import CreateTable from '@/components/TemplateTable/TableModal';
import { BASE_URL_API_RELIGION } from '@/libs/constanst';
import { TableCell, TableRow } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function Religion() {
    const session = useSession();
    function RowBodyTable(item: { name: string; status: string }) {
        return (
            <>
                <TableCell sx={{ textAlign: 'center !important' }}>{item.name}</TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>
                    {item.status === '1' ? 'فعال' : 'غیر فعال'}
                </TableCell>
            </>
        );
    }
    return (
        <CreateTable
            crod={{
                delete: session?.data?.permissions.includes('religion_destroy'),
                show: session?.data?.permissions.includes('religion_show'),
                create: session?.data?.permissions.includes('religion_create'),
                update: session?.data?.permissions.includes('religion_edit'),
            }}
            api={BASE_URL_API_RELIGION}
            requestKey="tableReligion"
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
