import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  const hasAccess = currentUser?.roles?.some(role => allowedRoles.includes(role));

  if (currentUser && hasAccess) {
    return <Outlet />;
  } else if (currentUser && !hasAccess) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
}

export default PrivateRoute
