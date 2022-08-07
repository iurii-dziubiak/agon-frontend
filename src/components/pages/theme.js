import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            light: '#484848',
            main: '#212121',
            dark: '#000000',
            contrastText: '#fff',
        },
        secondary: {
            light: '#4fb3bf',
            main: '#00838f',
            dark: '#005662',
            contrastText: '#fff',
        },
        background: {
            default: '#fff',
            paper: '#00838f'
        }
    },
});