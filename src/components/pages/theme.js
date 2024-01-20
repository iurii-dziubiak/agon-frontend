import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            light: "#484848",
            main: "#212121",
            dark: "#000000",
            contrastText: "#fff",
        },
        secondary: {
            main: "#fff",
            contrastText: "#212121",
        },
        background: {
            default: "#484848",
            paper: "#fff",
        },
    },
});
