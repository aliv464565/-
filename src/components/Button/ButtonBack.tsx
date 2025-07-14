'use client';
import { Button, ButtonProps } from '@mui/material';
import { useRouter } from 'next/navigation';
interface ButtonBackProps extends ButtonProps {
    children: React.ReactNode;
}
export default function ButtonBack({ children, ...props }: ButtonBackProps) {
    const router = useRouter();

    return (
        <Button onClick={() => router.back()} {...props}>
            {children}
        </Button>
    );
}
