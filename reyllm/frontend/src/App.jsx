import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Workspace from "./components/Workspace";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import RoleManager from './components/RoleManager';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role-manager" element={<RoleManager />} />
      </Routes>
    </Router>
  );
}

export default App;