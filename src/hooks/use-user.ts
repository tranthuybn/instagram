import { useEffect, useState } from "react";
import { getUserByUserId } from "../services";
import { IDetailUser } from "../interfaces";

function useUser(userId: string | undefined) {
  const [user, setUser] = useState<IDetailUser | undefined>();
  useEffect(() => {
    (async function getUserObjByUserId() {
      if (userId) {
        const user = await getUserByUserId(userId);
        setUser(user);
      }
    })();
  }, [userId]);

  return { user, setUser };
}

export default useUser;
