import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const { user } = useSelector((store) => store.user);

  // Assuming there's a property 'isAdmin' in the user object
  const isAdmin = user && user.isAdmin;

  return isAdmin ? <Outlet /> : <Navigate to="/" replace={true} />;
};

export default AdminRoute;
