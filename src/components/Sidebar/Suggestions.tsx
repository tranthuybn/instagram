import { useEffect, useState } from "react";
import { getSuggestedProfiles } from "../../services";
import SuggestedProfile from "./SuggestedProfile";
import { IDetailUser } from "../../interfaces";

function Suggestions({
  following,
  loggedInUserId,
  loggedInUserDocId
}: {
  following: Array<string>;
  loggedInUserId: string;
  loggedInUserDocId: string;
}) {
  const [profiles, setProfiles] = useState<Array<IDetailUser>>([]);

  useEffect(() => {
    (async function getProfiles() {
      const suggestedProfiles = await getSuggestedProfiles(loggedInUserId, following);
      setProfiles(suggestedProfiles);
    })();
  }, [loggedInUserId, following]);

  return (
    <div>
      <p className="text-gray-base font-bold text-sm">Suggestions For You</p>
      {profiles.length > 0 ? (
        <div className="mt-4 grid gap-5">
          {profiles.map((profile: IDetailUser) => (
            <SuggestedProfile
              key={profile.docId}
              loggedInUserDocId={loggedInUserDocId}
              loggedInUserId={loggedInUserId}
              profileId={profile.userId}
              profileDocId={profile.docId}
              profileUsername={profile.username}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Suggestions;
