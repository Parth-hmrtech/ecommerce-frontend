import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />; // or a 403 page
  }

  return <Outlet />;
};

export default ProtectedRoute;
