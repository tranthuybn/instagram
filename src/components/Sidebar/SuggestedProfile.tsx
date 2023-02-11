import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { updateProfileFollower, updateLoggedInUserFollowing } from "../../services";

function SuggestedProfile({
  loggedInUserId,
  loggedInUserDocId,
  profileId,
  profileDocId,
  profileUsername
}: {
  profileUsername: string;
  profileId: string;
  profileDocId: string;
  loggedInUserId: string;
  loggedInUserDocId: string;
}) {
  const [follow, setFollow] = useState(false);
  const [showConfirmUnFollow, setShowConfirmUnFollow] = useState(false);

  const handleFollowUser = useCallback(async () => {
    setFollow(!follow);
    setShowConfirmUnFollow(false);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, follow);
    await updateProfileFollower(profileDocId, loggedInUserId, follow);
  }, [loggedInUserDocId, profileId, profileDocId, follow]);

  return (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="">
        <Link to={`/p/${profileUsername}`} className="flex items-center justify-between">
          <div className="overflow-hidden w-8 h-8 rounded-full flex items-center justify-center">
            <img
              className=""
              src={`/images/avatars/${profileUsername}.jpeg`}
              alt={`${profileUsername} profile`}
            />
          </div>
          <p className="ml-3 text-sm">{profileUsername}</p>
        </Link>
      </div>
      <div>
        <button
          onClick={() => {
            follow ? setShowConfirmUnFollow(true) : handleFollowUser();
          }}
          type="button"
          className={` text-xs font-bold ${follow ? "text-black-light" : "text-blue-medium"}`}
        >
          {follow ? "Following" : "Follow"}
        </button>
      </div>
      {showConfirmUnFollow && (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex justify-center bg-black-faded">
          <div
            className="fixed top-0 right-0 left-0 bottom-0"
            role="button"
            onClick={() => setShowConfirmUnFollow(false)}
          />
          <div className="bg-white rounded-lg absolute top-1/4 ">
            <div className="flex flex-col justify-center items-center  w-96">
              <img
                src={`/images/avatars/${profileUsername}.jpeg`}
                alt={`${profileUsername} profile`}
                className="rounded-full w-20 my-6"
              />
              <span className="mt-2 mb-5 text-sm">Unfollow {profileUsername}?</span>
              <button
                onClick={handleFollowUser}
                type="button"
                className="text-sm text-red-primary font-bold py-4 border-t border-gray-primary w-full flex justify-center items-center"
              >
                Unfollow
              </button>
              <button
                onClick={() => setShowConfirmUnFollow(false)}
                type="button"
                className="text-sm py-4 border-t border-gray-primary w-full flex justify-center items-center"
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

export default SuggestedProfile;
