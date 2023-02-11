import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdMoreHoriz } from "react-icons/md";
import {
  updateLoggedInUserFollowing,
  updateProfileFollower,
  getUserByUserId
} from "../../services";
import { useUserValue } from "../../contexts/user-context";
import { IDetailUser } from "../../interfaces";

function Header({ username, profileId }: { username: string; profileId: string }) {
  const [showOptions, setShowOptions] = useState(false);
  const [follow, setFollow] = useState(true);
  const [profile, setProfile] = useState<IDetailUser>();

  const [user] = useUserValue();
  const { userId: loggedInUserId, docId: loggedInUserDocId } = user || {};

  const handleFollowUser = useCallback(async () => {
    if (profile && loggedInUserDocId && loggedInUserId) {
      setFollow(!follow);
      await updateLoggedInUserFollowing(loggedInUserDocId, profileId, follow);
      await updateProfileFollower(profile.docId, loggedInUserId, follow);
    }
  }, [loggedInUserDocId, profileId, profile, follow]);

  useEffect(() => {
    async function getProfile() {
      const result = await getUserByUserId(profileId);
      setProfile(result);
    }
    if (profileId) getProfile();
  }, []);

  return (
    <div className="flex justify-between items-center h-14 px-3">
      <div className="flex items-center gap-3">
        <Link to={`/p/${username}`} className="flex items-center justify-between">
          <img
            src={`/images/avatars/${username}.jpeg`}
            alt={`${username} img`}
            className="rounded-full flex w-8 h-8 mr-3"
          />
          <span className="text-sm text-black-light font-semibold">{username}</span>
        </Link>
        {!follow ? (
          <span
            className="text-blue-medium text-sm font-bold"
            role="button"
            onClick={handleFollowUser}
          >
            Follow
          </span>
        ) : (
          ""
        )}
      </div>
      <div role="button" className="p-2 text-lg" onClick={() => setShowOptions(!showOptions)}>
        <MdMoreHoriz className="hover:opacity-50 " />
      </div>
      {showOptions && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-black-faded z-50">
          <div
            className="fixed top-0 bottom-0 left-0 right-0 cursor-default"
            role="button"
            onClick={() => setShowOptions(!showOptions)}
          />
          <div className="bg-white rounded-lg absolute top-1/4">
            <div
              className="flex flex-col justify-center w-96 items-center"
              role="button"
              onClick={() => setShowOptions(!showOptions)}
            >
              {follow && (
                <button
                  type="button"
                  className="text-sm text-red-primary font-bold border-b border-gray-primary py-4 w-full flex justify-center items-center"
                  onClick={handleFollowUser}
                >
                  Unfollow
                </button>
              )}
              <button
                type="button"
                className="text-sm py-4 border-b border-gray-primary w-full flex justify-center items-center"
              >
                <Link to={`/p/${username}`}>Go to post</Link>
              </button>
              <button
                type="button"
                className="text-sm py-4 border-b border-gray-primary w-full flex justify-center items-center"
              >
                Saved
              </button>
              <button
                type="button"
                className="text-sm py-4 w-full flex justify-center items-center"
                onClick={() => setShowOptions(!showOptions)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
