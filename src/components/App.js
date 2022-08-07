import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Form from "./pages/Form";
import Scheme from "./pages/Scheme";

//TODO ContextProvider

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="tournament" element={<Form />} />
                  <Route path="tournament/:id" element={<Scheme />} />
                  <Route path="*" element={<NoPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
