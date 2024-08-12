import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingAnimation from "../components/LoadingAnimation/LoadingAnimation";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="h-[35rem] grid place-content-center">
        <LoadingAnimation />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/sign-in"></Navigate>;
};

export default PrivateRoute;
