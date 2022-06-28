import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    const myStyle = {
        backgroundColor: "#232F34",
        minHeight: "100vh"
        // display: "flex"
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        // fontSize: "calc(10px + 2vmin)",
        // color: "white"
    };

    return (
        <main style={myStyle}>
            <Header />
            <Outlet />
        </main>
    )
};

export default Layout;