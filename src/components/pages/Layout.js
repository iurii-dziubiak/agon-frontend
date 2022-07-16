import { Outlet } from "react-router-dom";
import Header from "./Header";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./theme"

const Layout = () => {
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