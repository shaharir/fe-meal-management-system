import Bazar from "../pages/private/Bazar";
import Border from "../pages/private/Border";
import DashBoard from "../pages/private/Dashboard";

const PrivateRoutes = [
  {
    path: "/",
    element: <DashBoard />,
  },
  {
    path: "/border",
    element: <Border />,
  },

  {
    path: "/bazar",
    element: <Bazar />,
  },
];

export default PrivateRoutes;
