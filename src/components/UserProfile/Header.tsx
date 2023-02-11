import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthUser from "../../hooks/use-auth-user";
import useUser from "../../hooks/use-user";
import { BsChevronDown } from "react-icons/bs";

import { updateProfileFollower, updateLoggedInUserFollowing } from "../../services";
import { IDetailUser } from "../../interfaces";

function Header({
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    username: profileUsername,
    fullName: profileFullName,
    followers: profileFollowers,
    following: profileFollowing
  },
  totalPhoto
}: {
  profile: IDetailUser;
  totalPhoto: number;
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isFollowingProfile, setFollow] = useState(false);
  const [totalFollower, setTotalFollower] = useState(profileFollowers.length);
  const { authUser } = useAuthUser();
  const { user } = useUser(authUser?.uid);
  const {
    username,
    following: userFollowing,
    userId: loggedInUserId,
    docId: loggedInUserDocId
  } = user || {};
  const activeFollowBtn = username && username !== profileUsername;
  const doesUserFollowProfile = userFollowing?.includes(profileUserId);
  const doesProfileFollowUser = profileFollowing.includes(loggedInUserId || "");

  const handleFollowUser = useCallback(async () => {
    if (loggedInUserDocId && loggedInUserId) {
      setShowOptions(false);
      setFollow(!isFollowingProfile);
      setTotalFollower(isFollowingProfile ? totalFollower - 1 : totalFollower + 1);
      await updateLoggedInUserFollowing(loggedInUserDocId, profileUserId, isFollowingProfile);
      await updateProfileFollower(profileDocId, loggedInUserId, isFollowingProfile);
    }
  }, [loggedInUserDocId, profileUserId, profileDocId, isFollowingProfile]);

  useEffect(() => {
    if (typeof doesUserFollowProfile === "boolean") {
      setFollow(doesUserFollowProfile);
    }
  }, [doesUserFollowProfile]);

  return (
    <div className="container mx-auto max-w-screen-lg pb-10">
      <div className="grid grid-cols-3">
        <div className="flex items-center justify-center">
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden">
            <img
              src={`/images/avatars/${profileUsername}.jpeg`}
              alt={`${profileUsername} img`}
              className=""
            />
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex flex-col items-start">
            <div className="flex gap-6 items-center">
              <p className="text-2xl font-light">{profileUsername}</p>
              {activeFollowBtn && (
                <>
                  <button
                    className={`flex items-center gap-1 rounded-md ${
                      isFollowingProfile
                        ? "bg-gray-second hover:bg-gray-primary"
                        : "bg-blue-medium text-white"
                    } px-4 py-1`}
                    onClick={() => (isFollowingProfile ? setShowOptions(true) : handleFollowUser())}
                  >
                    <span className="font-semibold text-sm">
                      {isFollowingProfile
                        ? "Following"
                        : doesProfileFollowUser
                        ? "Follow back"
                        : "Follow"}
                    </span>
                    {isFollowingProfile && <BsChevronDown className="text-sm" />}
                  </button>
                  {showOptions && (
                    <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center bg-black-faded z-10">
                      <div
                        className="fixed top-0 right-0 left-0 bottom-0"
                        role="button"
                        onClick={() => setShowOptions(false)}
                      />
                      <div className="bg-white rounded-lg absolute top-1/4 ">
                        <div className="flex flex-col justify-center items-center w-96">
                          <img
                            src={`/images/avatars/${profileUsername}.jpeg`}
                            alt={`${profileUsername} profile`}
                            className="rounded-full w-14 mt-6 mb-2"
                          />
                          <span className="font-semibold mb-6 text-sm">{profileUsername}</span>
                          <button
                            type="button"
                            className="text-sm py-4 border-t border-gray-primary hover:bg-gray-background w-full flex justify-center items-center"
                            onClick={handleFollowUser}
                          >
                            Unfollow
                          </button>
                          <button
                            onClick={() => setShowOptions(false)}
                            type="button"
                            className="text-sm py-4 border-t rounded-b-lg border-gray-primary hover:bg-gray-background w-full flex justify-center items-center"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex justify-between gap-8 mt-4">
              <span>{totalPhoto > 2 ? `${totalPhoto} posts` : `${totalPhoto} post`}</span>
              <Link to={``}>
                {profileFollowers.length > 2
                  ? `${totalFollower} followers`
                  : `${totalFollower} follower`}
              </Link>
              <Link to={``}>{`${profileFollowing.length} following`}</Link>
            </div>
            <p className="mt-4 font-semibold">{profileFullName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
