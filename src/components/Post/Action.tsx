import { Dispatch } from "react";
import { FiHeart } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import { useFirebaseValue } from "../../contexts/firebase-context";
import { useUserValue } from "../../contexts/user-context";
import { getPhotoByPhotoId } from "../../services";
import { IPhoto } from "../../interfaces";

function Action({
  handleFocus,
  photoId,
  setUpdate,
  update
}: {
  handleFocus: () => void;
  photoId: string;
  setUpdate: Dispatch<boolean>;
  update: boolean;
}) {
  const [photo, setPhoto] = useState<IPhoto>();
  const [totalLike, setTotalLike] = useState<number>(0);
  const { firebase, FieldValue } = useFirebaseValue();
  const [user] = useUserValue();
  const { userId: loggedInUserId } = user || {};
  let isLoggedInUserLikePhoto = photo?.likes.includes(loggedInUserId || "");
  const [toggleLiked, setToggleLikes] = useState(isLoggedInUserLikePhoto);

  const handleLikePhoto = useCallback(async () => {
    await firebase
      .firestore()
      .collection("photos")
      .doc(photo?.docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(loggedInUserId)
          : FieldValue.arrayUnion(loggedInUserId)
      });
    setToggleLikes(!toggleLiked);
    setTotalLike(toggleLiked ? totalLike - 1 : totalLike + 1);
  }, [totalLike, firebase, FieldValue, toggleLiked, photo, update]);

  useEffect(() => {
    async function getPhoto() {
      const result = await getPhotoByPhotoId(photoId);
      setPhoto(result);
    }
    if (photoId) getPhoto();
  }, [photoId, update]);

  useEffect(() => {
    if (photo) {
      setTotalLike(photo.likes.length);
      setToggleLikes(isLoggedInUserLikePhoto);
    }
  }, [photo]);

  useEffect(() => {
    setUpdate(!update);
  }, [toggleLiked]);
  return (
    <div className="px-3">
      <div className="flex items-center justify-start h-12 py-1 text-2xl">
        <button className={`mr-4 ${!toggleLiked && "hover:opacity-50"}`} onClick={handleLikePhoto}>
          <FiHeart
            className={`${toggleLiked ? "fill-red text-red-primary" : "text-black-light"}`}
          />
        </button>
        <button className={`mr-4 ${!toggleLiked && "hover:opacity-50"}`} onClick={handleFocus}>
          <FaRegComment />
        </button>
      </div>
      <div className="font-semibold text-sm mb-2">
        {totalLike === 0 || totalLike === 1 ? `${totalLike} like` : `${totalLike} likes`}
      </div>
    </div>
  );
}

export default Action;
