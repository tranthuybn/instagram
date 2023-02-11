import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import { getUserByUsername } from "../services";
import { IDetailUser } from "../interfaces";
import { ROUTES } from "../constants";
import Header from "../components/Header";

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState<IDetailUser>();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUser(username: string) {
      const result = await getUserByUsername(username);
      if (!!result) {
        setUser(result);
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }
    if (username) getUser(username);
  }, [username]);

  return (
    <>
      {user ? (
        <>
          <Header />
          <UserProfile user={user} />
        </>
      ) : null}
    </>
  );
}

export default Profile;
