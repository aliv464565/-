'use client';

import CreateTable from '@/components/TemplateTable/Table';
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
            api="http://192.168.1.103:85/api/admin/membership/core/permission"
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
