import { useContext, createContext } from "react";
import useUser from "../hooks/use-user";
import { AuthUser } from "../interfaces";
import { Dispatch } from "react";
import { IDetailUser } from "../interfaces";
export const UserContext = createContext<[IDetailUser | undefined, Dispatch<IDetailUser>]>([
  undefined,
  () => null
]);

export default function UserProvider({
  authUser: loggedInUser,
  children
}: {
  authUser: AuthUser;
  children: JSX.Element;
}) {
  const { user, setUser } = useUser(loggedInUser.uid);

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
}

export const useUserValue = () => useContext(UserContext);
