import { useOutletContext } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { FaComment } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

import { IPhoto } from "../../interfaces";

function Posts() {
  const { photos }: { photos: Array<IPhoto> } = useOutletContext();
  return !photos ? (
    <Skeleton count={3} width={325} height={325} />
  ) : photos.length > 0 ? (
    <div className="container max-w-screen-lg mx-auto">
      <div className="grid grid-cols-3 gap-6 mb-12">
        {photos.map((photo: IPhoto) => (
          <div
            key={photo.photoId}
            className="overflow-hidden w-full h-80 group relative"
            role="button"
          >
            <div className="flex items-center justify-center w-full h-full">
              <img src={photo.imageSrc} alt={photo.photoId} />
            </div>
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-black-faded hidden group-hover:flex items-center justify-center">
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-1 text-white font-semibold text-lg">
                  <span>
                    <BsFillHeartFill className="fill-white" />
                  </span>
                  <span className="">{photo.likes.length}</span>
                </div>
                <div className="flex items-center gap-1 text-white font-semibold text-lg">
                  <span>
                    <FaComment className="fill-white" />
                  </span>
                  <span className="">{photo.comments.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="container max-w-screen-lg mx-auto">No posts</div>
  );
}

export default Posts;
