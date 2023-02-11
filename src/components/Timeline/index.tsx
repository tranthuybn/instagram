import Skeleton from "react-loading-skeleton";
import { useUserValue } from "../../contexts/user-context";
import usePhotos from "../../hooks/use-photos";
import Post from "../Post";
import { IDetailPhoto } from "../../interfaces";

function Timeline() {
  const [user] = useUserValue();
  const { userId, following } = user || {};
  const photos = usePhotos(userId, following);
  return (
    <>
      {!photos ? (
        <Skeleton count={4} height={400} width={540} />
      ) : photos.length > 0 ? (
        <div className="max-w-lg mx-auto">
          {photos.map((photo: IDetailPhoto) => (
            <Post key={photo.photoId} photo={photo} />
          ))}
        </div>
      ) : (
        <div>Follow to see posts</div>
      )}
    </>
  );
}

export default Timeline;
