'use client';
import CreateTable from '@/components/TemplateTable/TableModal';
import { BASE_URL_API_SEX } from '@/libs/constanst';
import { TableCell, TableRow } from '@mui/material';
import { useSession } from 'next-auth/react';

export default function Gender() {
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
                delete: session?.data?.permissions.includes('sex_destroy'),
                show: session?.data?.permissions.includes('sex_show'),
                create: session?.data?.permissions.includes('sex_create'),
                update: session?.data?.permissions.includes('sex_edit'),
            }}
            api={BASE_URL_API_SEX}
            requestKey="tableGender"
            rowBody={RowBodyTable}
        >
            <TableRow>
                <TableCell sx={{ textAlign: 'center !important', fontWeight: 'bold  !important' }}>
                    نام
                </TableCell>
                <TableCell sx={{ textAlign: 'center !important', fontWeight: 'bold  !important' }}>
                    وضعیت ها
                </TableCell>
                <TableCell sx={{ textAlign: 'center !important', fontWeight: 'bold  !important' }}>
                    اقدامات
                </TableCell>
            </TableRow>
        </CreateTable>
    );
}
