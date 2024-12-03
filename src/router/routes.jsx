import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import {
  NotFound,
  SignIn,
  SignUp,
  ForgotPassword,
  ResetPassword,
  PrivateRoute,
  UnAuthorized,
  MyProfile,
  Home
} from "../pages";
import { useSelector } from "react-redux";

const AppRoutes = () => {
    const ROLES = {
      Admin: "admin",
      Moderator: "moderator",
      User: "user",
      Guest: "guest",
    };

  const { currentUser } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index path="/" element={<Home />} />

          <Route path="/unauthorized" element={<UnAuthorized />} />

          <Route
            path="/signin"
            element={
              currentUser ? <Navigate to="/" replace={true} /> : <SignIn />
            }
          />
          <Route
            path="/signup"
            element={
              currentUser ? <Navigate to="/" replace={true} /> : <SignUp />
            }
          />
          <Route
            path="/forgot-password"
            element={
              currentUser ? (
                <Navigate to="/" replace={true} />
              ) : (
                <ForgotPassword />
              )
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              currentUser ? (
                <Navigate to="/" replace={true} />
              ) : (
                <ResetPassword />
              )
            }
          />
          <Route
            element={<PrivateRoute allowedRoles={[ROLES.Admin , ROLES.User]} />}
          >
            <Route path="/profile" element={<MyProfile/>} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={[ROLES.Admin ]} />} >
            
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
