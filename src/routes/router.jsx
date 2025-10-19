import { createBrowserRouter } from "react-router";
import Login from "../pages/public/Login";
import AuthGuard from "../components/auth/AuthGuard";
import Sidebar from "../layout/Sidebar";
import protectRoutes from "./ProtectRoute";
import SignUp from "../pages/public/SignUp";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Sidebar />,
    children: protectRoutes(),
  },
]);
