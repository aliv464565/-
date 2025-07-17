'use client';

import CreateTable from '@/components/TemplateTable/Table';
import { URL_API_PERMISSION } from '@/libs/constanst';
import { Chip, TableCell, TableRow } from '@mui/material';

export default function Permissions() {
    function RowBodyTable(item: {
        title: string;
        name: string;
        permissionGroup: { name: string };
    }) {
        return (
            <>
                <TableCell sx={{ textAlign: 'center !important' }}>{item.title}</TableCell>
                <TableCell sx={{ textAlign: 'center !important', color: '#ababab' }}>
                    {item.name}
                </TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>
                    <Chip variant="outlined" label={item.permissionGroup.name} color="warning" />
                </TableCell>
            </>
        );
    }

    return (
        <CreateTable
            api={URL_API_PERMISSION}
            baseRouter="/admin/permissions"
            requestKey="tablePermissions"
            rowBody={RowBodyTable}
            roles={true}
        >
            <TableRow>
                <TableCell sx={{ textAlign: 'center !important' }}> نام مجوزها</TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}> کلید ها </TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>گروه ها</TableCell>
            </TableRow>
        </CreateTable>
    );
}
