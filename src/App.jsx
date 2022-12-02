import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import ProudctDetails from "./pages/ProudctDetails";
import Purchases from "./pages/Purchases";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import LoadingScreen from "./components/LoadingScreen";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import ProtectedRoutes from "./components/ProtectedRoutes";
function App() {

  const [modalNav, setModalNav] = useState(false);
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <HashRouter >
      <NavBar  modalNav={modalNav}  setModalNav={setModalNav}/>
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home modalNav={modalNav}  setModalNav={setModalNav}/>} />
        <Route path="/product/:id" element={<ProudctDetails modalNav={modalNav} setModalNav={setModalNav} />} />
        <Route path="/login" element={<Login  modalNav={modalNav} setModalNav={setModalNav}/>} />
        <Route path="/register" element={<Register modalNav={modalNav} setModalNav={setModalNav}/>} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/purchases" element={<Purchases  modalNav={modalNav} setModalNav={setModalNav}/>} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
