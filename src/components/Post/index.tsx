import Header from "./Header";
import Image from "./Image";
import Action from "./Action";
import Comment from "./Comment";
import Caption from "./Caption";
import { useRef, useState } from "react";
import { IDetailPhoto } from "../../interfaces";

function Post({ photo }: { photo: IDetailPhoto }) {
  const commentInput = useRef<HTMLInputElement>(null);
  const [update, setUpdate] = useState(false);
  const handleFocus = () => {
    commentInput.current?.focus();
  };
  return (
    <div className="border bg-white border-gray-primary rounded-lg mb-3">
      <Header username={photo.username} profileId={photo.userId} />
      <Image imageSrc={photo.imageSrc} username={photo.username} />
      <div>
        <Action
          photoId={photo.photoId}
          handleFocus={handleFocus}
          setUpdate={setUpdate}
          update={update}
        />
        <Caption username={photo.username} caption={photo.caption} />
        <Comment
          photoId={photo.photoId}
          handleFocus={handleFocus}
          commentInput={commentInput}
          dateCreated={photo.dateCreated}
          caption={photo.caption}
          comments={photo.comments}
          username={photo.username}
          imageSrc={photo.imageSrc}
          docId={photo.docId}
          setUpdate={setUpdate}
          update={update}
          profileId={photo.userId}
        />
      </div>
    </div>
  );
}

export default Post;
