import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    const myStyle = {
        backgroundColor: "#232F34",
        minHeight: "100vh"
    };

    return (
        <main style={myStyle}>
            <Header />
            <Outlet />
        </main>
    )
};

export default Layout;