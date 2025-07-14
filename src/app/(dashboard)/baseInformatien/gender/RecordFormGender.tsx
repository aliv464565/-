'use client';
import { useCrodItem } from '@/hooks/getDataTable';
import {
    ExclamationCircleIcon,
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import {
    Box,
    Button,
    Card,
    FormControlLabel,
    IconButton,
    Modal,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
interface RecordFormGenderProps {
    api: string;
    actions: 'create' | 'update' | 'show' | 'delete';
    data?: any;
    requestKey?: string;
}

export default function RecordFormGender({
    api,
    actions,
    data,
    requestKey,
}: RecordFormGenderProps) {
    const [Error, setError] = useState({ invalid: '', name: '', status: '' });
    const [open, setOpen] = useState(false);
    const { mutate } = useCrodItem({
        api,
        id: data?.id,
        requestKey,
        status: actions,
    });
    async function Submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const newData = {
            name: data.name,
            status: data.status ? '1' : '0',
        };
        await mutate(newData, {
            onError(e: any) {
                setError(item => ({ ...item, ...e?.response?.data?.message }));
            },
            onSuccess() {
                setOpen(false);
            },
        });
    }
    return (
        <>
            {actions === 'create' && (
                <Button
                    variant="contained"
                    onClick={() => setOpen(true)}
                    className="max-sm-is-full is-auto mb-3"
                >
                    اضافه کردن
                </Button>
            )}
            {actions === 'delete' && (
                <IconButton color="error" onClick={() => setOpen(true)}>
                    <TrashIcon width={20} />
                </IconButton>
            )}
            {actions === 'update' && (
                <IconButton color="warning">
                    <PencilSquareIcon onClick={() => setOpen(true)} width={20} />
                </IconButton>
            )}
            {actions === 'show' && (
                <IconButton color="info">
                    <EyeIcon width={20} onClick={() => setOpen(true)} />
                </IconButton>
            )}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card
                    sx={{
                        position: 'absolute',
                        top: '30%',
                        left: '35%',
                        width: '40rem ',
                        paddingBlock: '1.5rem',
                        paddingInline: '2rem',
                    }}
                >
                    <Box textAlign="end">
                        <IconButton>
                            <XMarkIcon width={20} onClick={() => setOpen(false)} />
                        </IconButton>
                    </Box>
                    {actions === 'delete' && (
                        <Typography
                            marginBottom=".2rem"
                            variant="caption"
                            component="p"
                            align="center"
                        >
                            <ExclamationCircleIcon width={100} fontWeight={100} />
                        </Typography>
                    )}
                    <Typography variant="h5" fontWeight="bold" align="center">
                        {actions == 'create' && 'افزودن جنسیت'}
                        {actions === 'update' && 'بروزرسانی جنسیت'}
                        {actions === 'show' && 'نمایش جنسیت '}
                        {actions === 'delete' && ' آیا از حذف این جنسیت مطمئن هستید؟'}
                    </Typography>
                    <Typography marginBottom="2rem" variant="caption" component="p" align="center">
                        {actions === 'create' && ' اطلاعات جنسیت مورد نظر را وارد کنید'}
                        {actions === 'update' && 'اطلاعات جنسیت مورد نظر را بروزرسانی کنید '}{' '}
                        {actions === 'show' && 'اطلاعت جنیست مورد نظر'}
                    </Typography>
                    <form
                        onSubmit={Submit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                        }}
                    >
                        {actions !== 'delete' ? (
                            <>
                                <TextField
                                    disabled={actions === 'show'}
                                    name="name"
                                    defaultValue={data?.name}
                                    fullWidth
                                    variant="outlined"
                                    label="جنسیت"
                                    placeholder=" لطفا نام جنسیت را وارد کنید "
                                    helperText={Error.name}
                                    error={Error?.name !== ''}
                                />
                                <FormControlLabel
                                    label="وضعیت"
                                    name="status"
                                    disabled={actions === 'show'}
                                    control={<Switch defaultChecked={data?.status === '1'} />}
                                />
                                <Box textAlign="end">
                                    {actions !== 'show' ? (
                                        <Button type="submit" variant="contained">
                                            ذخیره
                                        </Button>
                                    ) : (
                                        <Button onClick={() => setOpen(false)} variant="contained">
                                            بستن
                                        </Button>
                                    )}
                                </Box>
                            </>
                        ) : (
                            <Box textAlign="end">
                                <Button onClick={() => setOpen(false)} variant="contained">
                                    بستن
                                </Button>
                                <Button
                                    color="error"
                                    sx={{ marginLeft: '.5rem' }}
                                    type="submit"
                                    variant="contained"
                                >
                                    تایید
                                </Button>
                            </Box>
                        )}
                    </form>
                </Card>
            </Modal>
        </>
    );
}
