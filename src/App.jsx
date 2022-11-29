import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import ProudctDetails from "./pages/ProudctDetails";
import Purchases from "./pages/Purchases";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import LoadingScreen from "./components/LoadingScreen";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
function App() {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProudctDetails />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
