// MUI Imports
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarFull } from '@heroicons/react/24/outline';
import type { Theme } from '@mui/material/styles';

const rating: Theme['components'] = {
    MuiRating: {
        defaultProps: {
            emptyIcon: <StarIcon width={20} />,
            icon: <StarFull width={20} />,
        },
        styleOverrides: {
            root: {
                gap: '2px',
                color: 'var(--mui-palette-warning-main)',
                '& i, & svg': {
                    flexShrink: 0,
                },
                '& .MuiRating-decimal > label:first-of-type, & .MuiRating-decimal > span:first-of-type':
                    {
                        zIndex: 1,
                    },
            },
            sizeSmall: {
                '& .MuiRating-icon i, & .MuiRating-icon svg': {
                    fontSize: '1.25rem',
                },
            },
            sizeLarge: {
                '& .MuiRating-icon i, & .MuiRating-icon svg': {
                    fontSize: '1.75rem',
                },
            },
        },
    },
};

export default rating;
