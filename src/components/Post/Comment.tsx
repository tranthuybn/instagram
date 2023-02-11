import { Dispatch, useState } from "react";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";

import { IComment } from "../../interfaces";
import AddComment from "./AddComment";
import AllComments from "./AllComments";

function Comment({
  commentInput,
  caption,
  comments,
  username,
  imageSrc,
  docId,
  dateCreated,
  photoId,
  handleFocus,
  setUpdate,
  update,
  profileId
}: {
  commentInput: React.RefObject<HTMLInputElement>;
  caption: string;
  comments: Array<IComment>;
  username: string;
  imageSrc: string;
  docId: string;
  dateCreated: number;
  photoId: string;
  handleFocus: () => void;
  setUpdate: Dispatch<boolean>;
  update: boolean;
  profileId: string;
}) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentList, setCommentList] = useState(comments);
  return (
    <div>
      <div className="px-3">
        {commentList.length <= 2 ? (
          <div>
            {commentList.map((comment: IComment, index: number) => (
              <Link to={`/p/${comment.displayName}`} key={index}>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-sm">{comment.displayName}</span>
                  <span className="text-sm">{comment.comment}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <>
            <div
              role="button"
              className="text-gray-base text-sm"
              onClick={() => setShowAllComments(true)}
            >
              View all {commentList.length} comments
            </div>
            {showAllComments && (
              <AllComments
                setShowAllComments={setShowAllComments}
                imageSrc={imageSrc}
                username={username}
                caption={caption}
                commentList={commentList}
                photoId={photoId}
                handleFocus={handleFocus}
                setUpdate={setUpdate}
                update={update}
                setCommentList={setCommentList}
                commentInput={commentInput}
                docId={docId}
                dateCreated={dateCreated}
                profileId={profileId}
              />
            )}
          </>
        )}
        <p className="text-gray-base uppercase text-xs my-2">
          {formatDistance(dateCreated, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={commentList}
        setCommentList={setCommentList}
        commentInput={commentInput}
      />
    </div>
  );
}

export default Comment;
