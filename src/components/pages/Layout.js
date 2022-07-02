import { Outlet } from "react-router-dom";
import Header from "./Header";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import {createTheme} from "@mui/material/styles";

const Layout = () => {
    const theme = createTheme({
        palette: {
            primary: {
                light: '#4f5b62',
                main: '#263238',
                dark: '#000a12',
                contrastText: '#fff',
            },
            secondary: {
                light: '#4fb3bf',
                main: '#00838f',
                dark: '#005662',
                contrastText: '#fff',
            },
            background: {
                default: '#4f5b62',
                paper: '#00838f'
            }
        },
    });

    return (
        <main>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Header />
                    <Outlet />
                </Container>
            </ThemeProvider>
        </main>
    )
};

export default Layout;