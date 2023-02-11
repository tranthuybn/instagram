import { useEffect, useState } from "react";
import { useFirebaseValue } from "../contexts/firebase-context";
import { auth } from "../lib/firebase";
import { AuthUser } from "../interfaces";

function useAuthUser() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(
    JSON.parse(localStorage.getItem("authUser")!)
  );
  const { firebase } = useFirebaseValue();

  useEffect(() => {
    const listener = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setAuthUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setAuthUser(null);
      }
    });
    return () => listener();
  }, [firebase]);
  return { authUser };
}

export default useAuthUser;
