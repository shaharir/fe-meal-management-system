import Bazar from "../pages/private/Bazar";
import Border from "../pages/private/Border";
import DashBoard from "../pages/private/Dashboard";
import Deposit from "../pages/private/deposit";
import Meal from "../pages/private/meal";
import BorderReport from "../pages/private/report/BorderReport";
import PaymentReport from "../pages/private/report/PaymentReport";
import Profile from "../pages/private/Userprofile/Profile";

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

  {
    path: "/meal",
    element: <Meal />,
  },

  { path: "/deposit", element: <Deposit /> },
  { path: "/report/border", element: <BorderReport /> },
  { path: "/report/payment", element: <PaymentReport /> },
  { path: "/profile", element: <Profile /> },
];

export default PrivateRoutes;
