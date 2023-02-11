import { useEffect, useState } from "react";
import { getProfilePhotos } from "../services";
import { IDetailPhoto } from "../interfaces";

function usePhotos(userId: string | undefined, following: Array<string> | undefined) {
  const [content, setContent] = useState<Array<IDetailPhoto>>();
  useEffect(() => {
    (async function getPhotos() {
      if (userId && following) {
        if (following.length > 0) {
          const photos = await getProfilePhotos(userId, following);
          setContent(photos);
        } else {
          setContent([]);
        }
      }
    })();
  }, [userId, following]);
  return content;
}

export default usePhotos;
