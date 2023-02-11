import { useContext, createContext } from "react";
import { AuthUser } from "../interfaces";

export const AuthUserContext = createContext<AuthUser | null>(null);

export default function AuthUserProvider({
  authUser,
  children
}: {
  authUser: AuthUser | null;
  children: JSX.Element;
}) {
  return <AuthUserContext.Provider value={authUser}>{children}</AuthUserContext.Provider>;
}

export const useAuthUserValue = () => useContext(AuthUserContext);
