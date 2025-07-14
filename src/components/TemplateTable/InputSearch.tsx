'use client';
import CustomTextField from '@/@core/components/mui/TextField';
import { TextFieldProps } from '@mui/material';
import { useEffect, useState } from 'react';

export default function SearchInput({
    value: initialValue,
    onChange,
    debounce = 1000,
    ...props
}: {
    value?: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<TextFieldProps, 'onChange'>) {
    const [value, setValue] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />;
}
