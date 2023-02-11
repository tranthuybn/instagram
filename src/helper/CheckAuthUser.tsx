import { Navigate } from "react-router-dom";
import { useAuthUserValue } from "../contexts/auth-user-context";
import { ROUTES } from "../constants";

function CheckAuthUser({ children }: { children: JSX.Element }) {
  const authUser = useAuthUserValue();
  if (!authUser) return children;
  return <Navigate to={ROUTES.DASHBOARD} />;
}
export default CheckAuthUser;
