// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  useLocation
} from "react-router-dom";


function PrivateRoute({ children, ...rest }) {
  const { isloggedin } = useSelector(state => state.user);
  const location = useLocation();

  if (!isloggedin) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />

}

export default PrivateRoute;