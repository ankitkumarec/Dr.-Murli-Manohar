import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, loading, currentUser } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal border-t-transparent"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page and save the attempted url
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && currentUser && !allowedRoles.includes(currentUser.role)) {
    // Role not authorized
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <h2 className="font-heading text-2xl font-bold text-navy">Access Denied</h2>
        <p className="mt-2 text-gray-600">You do not have permission to view this page.</p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 rounded-lg bg-teal px-6 py-2 font-medium text-white transition-colors hover:bg-teal-light"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
