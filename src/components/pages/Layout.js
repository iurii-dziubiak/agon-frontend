import { Outlet } from "react-router-dom";
import Header from "./Header";
import {Container, CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
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