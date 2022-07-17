import React from "react";
import UserSchema from "./pages/User/User.schema.json";
import UserDetails from "./pages/User/UserDetails";
import UserContainer from "./pages/User/UserContainer";
import AuthoritySchema from "./pages/Authority/Authority.schema.json";
import AuthorityDetails from "./pages/Authority/AuthorityDetails";
import AuthorityContainer from "./pages/Authority/AuthorityContainer";
import ProductSchema from "./pages/Product/Product.schema.json";
import ProductDetails from "./pages/Product/ProductDetails";
import ProductContainer from "./pages/Product/ProductContainer";
import LicenseSchema from "./pages/License/License.schema.json";
import LicenseDetails from "./pages/License/LicenseDetails";
import LicenseContainer from "./pages/License/LicenseContainer";
import VerifyOtp from "./pages/auth/VerifyOtp";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Error400 from "./pages/errors/error400";
import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/auth/UpdateProfile";
import ChangePassword from "./pages/auth/ChangePassword";
import App from "./components/app";

const Router = () => {
  return (
    <BrowserRouter basename={`/`}>
      <Switch>
        <Route path={`/login`} component={Login} />
        <Route path={`/signup`} component={Signup} />
        <Route path={`/forgot-password`} component={ForgotPassword} />
        <Route path={`/reset-password/:tokenId`} component={ResetPassword} />
        <App>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path={`/dashboard`} component={Dashboard} />
            <Route path={`/update-profile`} component={UpdateProfile} />
            <Route path={`/change-password`} component={ChangePassword} />
            <Route exact path="/license" component={LicenseContainer} />
            <Route
              path="/license/:id"
              render={props => (
                <LicenseDetails {...props} modelName={"license"} />
              )}
            />
            <Route exact path="/product" component={ProductContainer} />
            <Route
              path="/product/:id"
              render={props => (
                <ProductDetails {...props} modelName={"product"} />
              )}
            />
            <Route exact path="/authority" component={AuthorityContainer} />
            <Route
              path="/authority/:id"
              render={props => (
                <AuthorityDetails {...props} modelName={"authority"} />
              )}
            />
            <Route exact path="/user" component={UserContainer} />
            <Route
              path="/user/:id"
              render={props => <UserDetails {...props} modelName={"user"} />}
            />
            <Route exact path="/*" component={Error400} />
          </Switch>
        </App>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
