import { Navigate } from "react-router-dom";
import { useAuthUserValue } from "../contexts/auth-user-context";
import { ROUTES } from "../constants";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const authUser = useAuthUserValue();
  if (!authUser) return <Navigate to={ROUTES.LOGIN} />;
  return children;
}
export default ProtectedRoute;
