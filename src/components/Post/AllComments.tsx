import { Dispatch } from "react";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";

import { IComment } from "../../interfaces";
import Image from "./Image";
import Action from "./Action";
import Header from "./Header";
import AddComment from "./AddComment";

function AllComments({
  setShowAllComments,
  imageSrc,
  username,
  caption,
  commentList,
  photoId,
  handleFocus,
  setUpdate,
  update,
  docId,
  setCommentList,
  commentInput,
  dateCreated,
  profileId
}: {
  setShowAllComments: Dispatch<boolean>;
  imageSrc: string;
  username: string;
  caption: string;
  commentList: Array<IComment>;
  photoId: string;
  handleFocus: () => void;
  setUpdate: Dispatch<boolean>;
  update: boolean;
  docId: string;
  setCommentList: Dispatch<Array<IComment>>;
  commentInput: React.RefObject<HTMLInputElement>;
  dateCreated: number;
  profileId: string;
}) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-black-faded">
      <div
        className="fixed w-full top-0 bottom-0"
        onClick={() => setShowAllComments(false)}
        role="button"
      />
      <div className="fixed overflow-hidden w-full max-h-80 right-0 left-0 mx-auto max-w-4xl rounded-md top-20 grid grid-cols-1 md:grid-cols-2 h-96 md:h-auto">
        <div className="hidden md:block">
          <Image imageSrc={imageSrc} username={username} />
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full bg-white flex flex-col">
          <div className="w-full border-b border-gray-primary">
            <Header username={username} profileId={profileId} />
          </div>
          <div className="overflow-x-auto grow bg-white max-h-full pt-2 px-3 gap-3">
            <div className="flex items-start gap-5">
              <Link to={`/p/${username}`} className="shrink-0">
                <img
                  className="rounded-full w-8 h-8"
                  src={`/images/avatars/${username}.jpeg`}
                  alt={`${username} img`}
                />
              </Link>
              <span className="text-sm grow">
                <span className="font-semibold mr-2">{username}</span>
                {caption}
              </span>
            </div>
            <div>
              {commentList.map((comment: IComment, index: number) => (
                <div key={index} className="flex items-start gap-5 my-4">
                  <div>
                    <Link to={`/p/${comment.displayName}`}>
                      <img
                        className="rounded-full w-8 h-8"
                        src={`/images/avatars/${comment.displayName}.jpeg`}
                        alt={`${comment.displayName} img`}
                      />
                    </Link>
                  </div>
                  <div>
                    <Link to={`/p/${comment.displayName}`}>
                      <span className="font-semibold text-sm mr-2">{comment.displayName}</span>
                    </Link>
                    <span className="text-sm">{comment.comment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-40 bg-white w-full bottom-0 border-t border-gray-primary ">
            <Action
              photoId={photoId}
              handleFocus={handleFocus}
              setUpdate={setUpdate}
              update={update}
            />
            <p className="text-gray-base uppercase text-xs my-2 px-3">
              {formatDistance(dateCreated, new Date())} ago
            </p>
            <div className="border-0">
              <AddComment
                docId={docId}
                comments={commentList}
                setCommentList={setCommentList}
                commentInput={commentInput}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllComments;
