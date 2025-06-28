import React from "react";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes"; 
import './App.css';

function App() {
  return <RouterProvider router={AppRoutes} />;
}

export default App;
