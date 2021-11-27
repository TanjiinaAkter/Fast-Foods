import { useContext, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import AlertMessage from "../components/AlertMessage/AlertMessage";
import Loader from "../components/Common/Loader";
import appContext from "../context/context";
import aboutPage from "../pages/About";
import AdminProfile from "../pages/Admin/Profile";
import adminLogin from "../pages/AdminLogin";
import foodDetailPage from "../pages/FoodDetail";
import foodsPage from "../pages/Foods";
import galleryPage from "../pages/Gallery";
import homePage from "../pages/Home";
import orderPage from "../pages/Order";
import orderManagementPage from "../pages/OrdersManagement";
import userOrdersPage from "../pages/User/Orders";
import UserProfilePage from "../pages/User/Profile";
import userLoginPage from "../pages/UserLogin";
import AdminPrivateRoute from "./AdminPrivateRoute";
import CommonPrivateRoute from "./CommonPrivateRoute";
import UserPrivateRoutes from "./UserPrivateRoutes";
const routes = [
  {
    component: adminLogin,
    path: "/admin/login",
  },
  {
    component: userLoginPage,
    path: "/user/login",
  },
  {
    component: galleryPage,
    path: "/gallery",
  },
  {
    component: aboutPage,
    path: "/about",
  },
  {
    component: foodDetailPage,
    path: "/foods/:id",
  },
  {
    component: foodsPage,
    path: "/foods",
  },
  {
    component: homePage,
    path: "/",
  },
];

const userPrivateRoutes = [
  {
    Component: UserProfilePage,
    path: "/user/profile",
  },
  {
    Component: orderPage,
    path: "/order/:id",
  },
  {
    Component: userOrdersPage,
    path: "/user/orders",
  },
];

const commonPrivateRoutes = [
  {
    Component: orderManagementPage,
    path: "/all/orders",
  },
];

function Routes() {
  const { adminLoginVerify } = useContext(appContext);
  useEffect(() => {
    if (localStorage.getItem("admin-auth-token")) {
      adminLoginVerify();
    }
  }, []);
  return (
    <main>
      <AlertMessage />
      <Loader />
      <Switch>
        {routes.map(({ component, path }) => (
          <Route path={path} exact component={component} key={path} />
        ))}
        {userPrivateRoutes.map(({ Component, path }) => (
          <UserPrivateRoutes path={path} key={path}>
            <Component />
          </UserPrivateRoutes>
        ))}

        {commonPrivateRoutes.map(({ Component, path }) => (
          <CommonPrivateRoute path={path} key={path}>
            <Component />
          </CommonPrivateRoute>
        ))}
        <AdminPrivateRoute path="/admin/profile">
          <AdminProfile />
        </AdminPrivateRoute>
      </Switch>
    </main>
  );
}
export default Routes;
