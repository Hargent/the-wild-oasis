import { Navigate, createBrowserRouter } from "react-router-dom";

import Account from "../pages/account/account";
import AppLayout from "../ui/app-layout/app-layout";
import Booking from "../pages/booking/booking";
import Bookings from "../pages/bookings/bookings";
import Cabins from "../pages/cabins/cabins";
import CheckIn from "../pages/check-in/check-in";
import Dashboard from "../pages/dashboard/dashboard";
import GlobalStyles from "../styles/global-styles";
import Login from "../pages/login/login";
import NewUsers from "../pages/users/users";
import PageNotFound from "../pages/page-not-found/page-not-found";
import ProtectedRoute from "../ui/protected-route/protected-routes";
import Settings from "../pages/settings/settings";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
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
        path: "bookings/:bookingId",
        element: <Booking />
      },
      {
        path: "checkin/:bookingId",
        element: <CheckIn />
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
        path: "users",
        element: <NewUsers />
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
