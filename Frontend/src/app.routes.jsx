import { createBrowserRouter } from "react-router";
import LandingPage from "./features/Landing/LandingPage";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Dashboard from "./features/home/Pages/Dashboard";
import HomePage from "./features/home/Pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />
  },
  {
    path: "/home",
    element: <HomePage />
  }
]);
