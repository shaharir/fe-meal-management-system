import AuthGuard from "../components/auth/AuthGuard";
import PrivateRoutes from "./PrivateRoutes";

const protectRoutes = () => {
  const protectedRoutes = PrivateRoutes.map((route) => ({
    ...route,
    element: <AuthGuard route={route}>{route.element}</AuthGuard>,
  }));

  return protectedRoutes;
};

export default protectRoutes;
