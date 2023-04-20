import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Form from "./pages/Form";
import Scheme from "./pages/Scheme";
import Result from "./pages/Result";

//TODO ContextProvider

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="tournament" element={<Form />} />
                    <Route path="ongoing/tournament/:id" element={<Scheme />} />
                    <Route
                        path="complete/tournament/:id"
                        element={<Result />}
                    />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
