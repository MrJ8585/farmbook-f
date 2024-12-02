import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import Catalog from "./components/client-front/Catalog";
import InfoDisplay from "./components/client-front/catalog/InfoDisplay";
import HomePage from "./components/farmer-front/HomePage";
import EditFarm from "./components/farmer-front/EditFarm";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<InfoDisplay />} />
          <Route path="/profile/:id" element={<HomePage />} />
          <Route path="/editfarm/:id" element={<EditFarm />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
