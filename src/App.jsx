import React from "react";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes"; // This is the object created by createBrowserRouter
import './App.css';

function App() {
  return <RouterProvider router={AppRoutes} />;
}

export default App;
