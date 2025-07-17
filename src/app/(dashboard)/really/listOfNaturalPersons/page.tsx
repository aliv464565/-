'use client';
import CreateTable from '@/components/TemplateTable/Table';
import { BASE_URL_API_USER } from '@/libs/constanst';
import { Avatar, Box, TableCell, TableRow } from '@mui/material';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function ListOfNaturalPersons() {
    const session = useSession();
    console.log(session);
    function RowBodyTable(item: {
        image?: string;
        first_name: string;
        last_name: string;
        username: string;
    }) {
        return (
            <>
                <TableCell>
                    <Box display="flex" alignItems="center" gap={3}>
                        <Avatar>
                            <Image
                                src={item?.image || '/images/man-user-circle-icon.png'}
                                fill
                                alt="خطا در برقراری ارتباط"
                            />
                        </Avatar>
                        {item.first_name}
                    </Box>
                </TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>{item.last_name}</TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>{item.username}</TableCell>
            </>
        );
    }
    return (
        <CreateTable
            crod={{
                delete: session?.data?.permissions.includes('user_destroy'),
                show: session?.data?.permissions.includes('user_show'),
                create: session?.data?.permissions.includes('user_create'),
                update: session?.data?.permissions.includes('user_edit'),
            }}
            api={BASE_URL_API_USER}
            baseRouter="/really/listOfNaturalPersons"
            requestKey="tableListOfNaturalPersons"
            rowBody={RowBodyTable}
        >
            <TableRow>
                <TableCell sx={{ textAlign: 'center !important' }}> نام مجوزها</TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}> کلید ها </TableCell>
                <TableCell sx={{ textAlign: 'center !important' }}>گروه ها</TableCell>
            </TableRow>
        </CreateTable>
    );
}
