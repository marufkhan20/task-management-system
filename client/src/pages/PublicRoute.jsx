import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const isLoggeIn = useAuth();

  return !isLoggeIn ? children : <Navigate to="/" />;
};

export default PublicRoute;
