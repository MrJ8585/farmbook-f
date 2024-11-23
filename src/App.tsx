import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import Catalog from "./components/client-front/Catalog";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
