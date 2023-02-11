import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { VscSearch, VscAccount } from "react-icons/vsc";
import { MdHomeFilled, MdOutlineNightlightRound } from "react-icons/md";
import { BsPlusSquare } from "react-icons/bs";
import { ROUTES } from "../../constants";
import { useFirebaseValue } from "../../contexts/firebase-context";
import useAuthUser from "../../hooks/use-auth-user";
import useUser from "../../hooks/use-user";
import { IDetailUser } from "../../interfaces";
import Skeleton from "react-loading-skeleton";

function Header() {
  const { authUser: loggedInUser } = useAuthUser();
  const { user }: { user: IDetailUser | undefined } = useUser(loggedInUser?.uid);
  const { firebase } = useFirebaseValue();
  const [showMenu, setShowMenu] = useState(false);

  const handleSignOut = useCallback(() => {
    firebase.auth().signOut();
  }, [firebase]);

  return (
    <div className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between items-center h-full">
          <div className="text-center flex items-center cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="instagram logo">
                <img src="/images/icons/logo.png" alt="logo" className="mt-2 w-1/2" />
              </Link>
            </h1>
          </div>
          <div className="w-64 bg-gray-second rounded-md h-9 hidden md:block">
            <form className="w-full h-full flex justify-between items-center">
              <button
                type="button"
                className="text-gray-base top-0 left-0 bottom-0  w-8 h-8 flex justify-center items-center"
              >
                <VscSearch />
              </button>
              <input
                type="text"
                placeholder="Search"
                className="py-1 px-2 h-full w-11/12 text-sm outline-0 bg-transparent"
              />
            </form>
          </div>
          <div className="flex items-center align-items">
            <Link to={ROUTES.DASHBOARD} aria-label="dashboard">
              <MdHomeFilled className="text-3xl text-black-light mr-4 cursor-pointer" />
            </Link>
            <button type="button">
              <BsPlusSquare className="text-2xl text-black-light mr-4" />
            </button>
            <div className="relative flex">
              {user ? (
                <button onClick={() => setShowMenu(!showMenu)} type="button">
                  <img
                    src={`/images/avatars/${user.username}.jpeg`}
                    alt={`${user.username} profile`}
                    className="rounded-full h-8 w-8"
                  />
                </button>
              ) : (
                <Skeleton count={1} width={20} height={20} />
              )}

              {showMenu && (
                <>
                  <button
                    type="button"
                    className="fixed top-0 left-0 right-0 bottom-0 bg-transparent"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute bg-white w-56 top-11 right-0 translate-x-10 rounded shadow-3xl">
                    <ul>
                      <li className="flex items-center px-2 rounded-t h-10 hover:bg-gray-background cursor-pointer">
                        <Link to={`/p/${user?.username}`} className="flex items-center w-full">
                          <span className="text-base pr-3">
                            <VscAccount />
                          </span>
                          <span className="grow">Profile</span>
                        </Link>
                      </li>
                      <li className="flex items-center px-2 h-10 hover:bg-gray-background cursor-pointer">
                        <button type="button" className="flex items-center w-full text-left">
                          <span className="text-base pr-3">
                            <MdOutlineNightlightRound />
                          </span>
                          <span className="grow">Dark mode</span>
                        </button>
                      </li>
                      <li className="flex items-center py-2 px-2 h-11 rounded-b hover:bg-gray-background border-t border-gray-primary cursor-pointer">
                        <button
                          type="button"
                          className="flex items-center w-full text-left "
                          onClick={handleSignOut}
                        >
                          <span className="text-base grow">Log out</span>
                        </button>
                      </li>
                    </ul>
                    <span className="absolute top-0 right-0 -translate-y-full -translate-x-12 border-x-8 border-b-8 border-b-white border-x-transparent" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
