import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const user =  JSON.parse(localStorage.getItem('currentUser'));
  return user.isAdmin === true && user;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;