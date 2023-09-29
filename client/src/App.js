import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AccountVerificatoin from "./pages/AccountVerificatoin";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./pages/PrivateRoute";
import PublicRoute from "./pages/PublicRoute";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";
import VerifyAccount from "./pages/VerifyAccount";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-email/:email"
          element={
            <PublicRoute>
              <AccountVerificatoin />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-account/:id"
          element={
            <PublicRoute>
              <VerifyAccount />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
