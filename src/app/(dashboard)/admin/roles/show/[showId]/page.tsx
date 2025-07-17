import CustomTextField from '@/@core/components/mui/TextField';
import ButtonBack from '@/components/Button/ButtonBack';
import axiosConfig from '@/helpers/axiosConfig';
import { BASE_URL_API_ROLSE } from '@/libs/constanst';
import { Card, Checkbox, FormControlLabel, Grid2, Stack, Typography } from '@mui/material';
type DataType = {
    name: string;
    permissions: { id: number; name: string }[];
}[];
export default async function Show({ params }: { params: Promise<{ showId: string }> }) {
    const { showId } = await params;
    const data = await axiosConfig.get(`${BASE_URL_API_ROLSE}/upsert-data`, { nextContext: true });
    const ShowData = await axiosConfig.get(`${BASE_URL_API_ROLSE}/show/${showId}`, {
        nextContext: true,
    });
    return (
        <form>
            <Card className="w-full px-6 py-5">
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <CustomTextField
                            size="medium"
                            label="نام نقش"
                            disabled
                            fullWidth
                            value={ShowData.data.data.title}
                        />
                    </Grid2>

                    <Grid2 size={6}>
                        <CustomTextField
                            size="medium"
                            label="کد یکتا"
                            disabled
                            fullWidth
                            value={ShowData.data.data.name}
                        />
                    </Grid2>

                    {(data?.data.data.permissionGroups as DataType).map(item => (
                        <Grid2
                            size={3}
                            key={item.name}
                            sx={{ marginTop: '1rem', marginBottom: '2rem' }}
                        >
                            <Typography
                                variant="body1"
                                component="span"
                                sx={{ display: 'inline-block' }}
                                marginBottom={1}
                                paddingInline={3}
                                paddingBlock={2}
                                borderRadius={2}
                                fontWeight="bold"
                                bgcolor="ButtonFace"
                            >
                                {item.name}
                            </Typography>

                            <Stack>
                                {item.permissions.map(checked => (
                                    <FormControlLabel
                                        key={checked.id}
                                        label={checked.name}
                                        control={
                                            <Checkbox
                                                disabled
                                                checked={(
                                                    ShowData.data.data?.permissions as {
                                                        id: number;
                                                    }[]
                                                ).some(item => item.id === checked.id)}
                                            />
                                        }
                                    />
                                ))}
                            </Stack>
                        </Grid2>
                    ))}
                </Grid2>
                <ButtonBack variant="contained">برگشت به فهرست ها </ButtonBack>
            </Card>
        </form>
    );
}
