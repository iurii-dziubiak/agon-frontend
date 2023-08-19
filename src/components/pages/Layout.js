import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { useGameContext } from "../../context/GameContext";

const Layout = () => {
    const {
        game: { bgImage },
    } = useGameContext();

    return (
        <main
            style={{
                backgroundImage: `url(/img/${bgImage})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom",
                backgroundSize: "25%",
                height: "100vh",
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <Header />
                    <Outlet />
                </Container>
            </ThemeProvider>
        </main>
    );
};

export default Layout;
