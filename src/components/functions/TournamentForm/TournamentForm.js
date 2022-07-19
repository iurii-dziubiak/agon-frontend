import * as React from 'react';
import {
    Box,
    FormControl, FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    InputLabel,
    MenuItem, Radio,
    RadioGroup
} from '@mui/material';
import {TextField} from "@mui/material";

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

export function TournamentForm() {
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    return (
            <Box
                component="form"
                sx={{
                    // '& .MuiTextField-root': { m: 2, width: '15em' },
                    display: 'grid',
                    gridTemplateColumns: { md: '3fr 1fr' },
                    gap: 3,
                }}
                noValidate
                autoComplete="off"
                // justifyContent="center"
                // alignItems="center"
            >
                <TextField
                    required
                    id="outlined-required"
                    label="Tournament Title"
                    color="secondary" focused
                />
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    color="secondary" focused
                    value={currency}
                    onChange={handleChange}
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
    );
}