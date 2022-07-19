import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import CreateTournament from "./pages/CreateTournament";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="tournament" element={<CreateTournament />} />
                  <Route path="*" element={<NoPage />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
