import { Box, CardHeader } from '@mui/material';
import { FormActionsListOfNaturalPersons } from '../../FormActionsListOfNaturalPersons';

export default async function Create() {
    return (
        <Box sx={{ borderRadius: 2, padding: 10 }}>
            <FormActionsListOfNaturalPersons status="createImage">
                <CardHeader
                    title="ایجاد کابر"
                    subheader="اطلاعات کاربر مورد نظر را وارد کنید"
                    sx={{
                        textAlign: 'center',
                    }}
                />
            </FormActionsListOfNaturalPersons>
        </Box>
    );
}
