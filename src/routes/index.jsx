// src/routes/index.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/Home";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

export default AppRoutes;
