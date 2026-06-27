import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isAuthChecking, children }) {
  if (isAuthChecking) {
    return null;
  }
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
