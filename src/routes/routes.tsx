import { Navigate, createBrowserRouter } from "react-router-dom";

import Account from "../pages/account/account";
import AppLayout from "../ui/app-layout/app-layout";
import Bookings from "../pages/bookings/bookings";
import Cabins from "../pages/cabins/cabins";
import Dashboard from "../pages/dashboard/dashboard";
import GlobalStyles from "../styles/global-styles";
import Login from "../pages/login/login";
import PageNotFound from "../pages/page-not-found/page-not-found";
import Settings from "../pages/settings/settings";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Navigate replace to="dashboard" />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "bookings",
        element: <Bookings />
      },
      {
        path: "cabins",
        element: <Cabins />
      },
      {
        path: "settings",
        element: <Settings />
      },
      {
        path: "account",
        element: <Account />
      },
      {
        path: "account",
        element: <Account />
      }
    ]
  },
  {
    path: "login",
    element: (
      <>
        <GlobalStyles />
        <Login />
      </>
    )
  }
]);
export default Routes;
