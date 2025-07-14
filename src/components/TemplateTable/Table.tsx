'use client';

// Data Imports
// MUI Imports
import Grid from '@mui/material/Grid2';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import tableStyles from '@/@core/styles/table.module.css';

import React, { useState } from 'react';
import CustomTextField from '@/@core/components/mui/TextField';
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    MenuItem,
    Pagination,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { useGetDataTables } from '@/hooks/getDataTable';
import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import SearchInput from '@/components/TemplateTable/InputSearch';
import RecordFormGender from '@/app/(dashboard)/baseInformatien/gender/RecordFormGender';

type DataType = {
    title: string;
    name: string;
    id: number;
};

export default function CreateTable({
    children,
    crod,
    api,
    requestKey,
    baseRouter,
    rowBody,
    roles,
}: {
    children: React.ReactNode;
    crod?: {
        delete: boolean | undefined;
        show: boolean | undefined;
        create: boolean | undefined;
        update: boolean | undefined;
    };
    api: string;
    requestKey: string;
    baseRouter: string;
    rowBody: (row: any) => React.ReactElement;
    roles?: boolean;
}) {
    const [search, setSearch] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState('10');
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetDataTables({
        url: api,
        page: page,
        rowsPerPage,
        search,
        title: requestKey,
    });

    return (
        <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
                {crod?.create && (
                    <Link href={`${baseRouter}/create`}>
                        <Button variant="contained" className="max-sm-is-full is-auto mb-3">
                            اضافه کردن
                        </Button>
                    </Link>
                )}
                <Card className="w-full">
                    <div className="flex flex-wrap justify-between gap-4 p-6">
                        <div className="flex flex-wrap items-center max-sm:flex-col gap-4 max-sm:is-full is-auto">
                            <CustomTextField
                                select
                                value={rowsPerPage}
                                onChange={e => setRowsPerPage(e.target.value)}
                                className="flex-auto w-[70px] max-sm:is-full"
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
                            </CustomTextField>
                        </div>
                        <div>
                            <SearchInput
                                onChange={val => {
                                    setPage(1);
                                    setSearch(val as string);
                                }}
                                placeholder="جستجو ردیف "
                                className="flex-auto max-w-2xs"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className={tableStyles.table}>
                            <TableHead>{children}</TableHead>

                            <TableBody>
                                {data &&
                                    (data.data as DataType[]).map(item => (
                                        <TableRow key={item.id}>
                                            {rowBody(item)}

                                            {!roles && (
                                                <TableCell sx={{ textAlign: 'center !important' }}>
                                                    {crod?.show && (
                                                        <Link
                                                            href={`${baseRouter}/show/${item.id}`}
                                                        >
                                                            <IconButton color="warning">
                                                                <EyeIcon width={20} />
                                                            </IconButton>
                                                        </Link>
                                                    )}
                                                    {crod?.update && (
                                                        <Link
                                                            href={`${baseRouter}/update/${item.id}`}
                                                        >
                                                            <IconButton color="primary">
                                                                <PencilSquareIcon width={20} />
                                                            </IconButton>
                                                        </Link>
                                                    )}
                                                    {crod?.delete && (
                                                        <RecordFormGender
                                                            api={api}
                                                            actions="delete"
                                                            requestKey={requestKey}
                                                            data={item}
                                                        />
                                                    )}
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </table>
                        {!data && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    padding: '2rem',
                                    width: '100%',
                                }}
                                bgcolor="ButtonFace"
                            >
                                درحال دریافت اطلاعات
                            </Box>
                        )}
                    </div>
                    {isLoading ? (
                        <Box sx={{ justifyContent: 'center', display: 'flex', margin: '2rem' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TablePagination
                            component={() => (
                                <div className="flex justify-between items-center flex-wrap py-3 border-bs bs-auto px-4 gap-2">
                                    <Typography color="text.disabled">
                                        {`نمایش ${page === 1 ? 0 : (page - 1) * +rowsPerPage + 1}
                              تا ${data?.meta.to} در ${data?.meta.total}
                              ایتم `}
                                    </Typography>
                                    <Pagination
                                        shape="rounded"
                                        color="primary"
                                        variant="tonal"
                                        count={Math.ceil(data?.meta.total / +rowsPerPage)}
                                        page={page}
                                        onChange={(_, page) => {
                                            setPage(page);
                                        }}
                                        showFirstButton
                                        showLastButton
                                    />
                                </div>
                            )}
                            count={10}
                            rowsPerPage={+rowsPerPage}
                            page={page}
                            onPageChange={(_, page) => {
                                setPage(page);
                            }}
                        />
                    )}
                </Card>
            </Grid>
        </Grid>
    );
}
