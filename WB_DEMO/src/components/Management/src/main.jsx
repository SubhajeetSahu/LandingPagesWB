import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./components/Home/Home.jsx";
import Report from "./components/Report/Report.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/Login.jsx";
import Camera from "./components/Camera/Camera.jsx";
import DailyReport from "./components/Report/DailyReport.jsx";
import WeeklyReport from "./components/Report/WeeklyReport.jsx";
import MonthlyReport from "./components/Report/MonthlyReport.jsx";
import CustomizedReport from "./components/Report/CutomizedReport.jsx";
import Transaction from "./components/Transaction/Transaction.jsx";
import Location from "./components/Location/Location.jsx";
import Rough from "./components/Rough/Rough.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/dailyreport" element={<DailyReport />} />
      <Route path="/weeklyreport" element={<WeeklyReport />} />
      <Route path="/monthlyreport" element={<MonthlyReport />} />
      <Route path="/customizedreport" element={<CustomizedReport />} />
      <Route path="/live-transaction" element={<Transaction />} />
      <Route path="/live-location" element={<Location />} />
      <Route path="/rough" element={<Rough />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
