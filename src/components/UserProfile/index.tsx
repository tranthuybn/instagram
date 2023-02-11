import { useEffect, useState } from "react";
import { getPhotosByUserId } from "../../services";
import Header from "./Header";
import Photos from "./Photos";
import { IDetailUser, IPhoto } from "../../interfaces";

function UserProfile({ user }: { user: IDetailUser }) {
  const [photos, setPhotos] = useState<Array<IPhoto>>([]);
  useEffect(() => {
    (async function getPhotos() {
      const result = await getPhotosByUserId(user.userId);
      if (result) {
        setPhotos(result);
      } else {
        setPhotos([]);
      }
    })();
  }, [user.userId]);
  return (
    <div>
      <Header profile={user} totalPhoto={photos.length} />
      <Photos photos={photos} />
    </div>
  );
}

export default UserProfile;
