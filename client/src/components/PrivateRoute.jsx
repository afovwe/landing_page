import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole, selectIsLoading } from '../state/authSlice';
import { useAuth } from '@clerk/clerk-react';
import { roleRoutes, hasPermission } from '../utils/roles';

const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center">
    <div className="text-lg">Loading...</div>
  </div>
);

const PrivateRoute = ({ children, requiredRole = 'user' }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const role = useSelector(selectUserRole);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();

  // Show loading state while Clerk loads
  if (!isLoaded || isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check if user has permission to access this route
  const allowedRoutes = roleRoutes[role] || [];
  const currentPath = location.pathname;

  if (!hasPermission(role, requiredRole) || 
      !allowedRoutes.some(route => currentPath.startsWith(route))) {
    // If user doesn't have permission, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
