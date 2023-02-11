import { useCallback, useState, FormEvent, Dispatch } from "react";
import { useFirebaseValue } from "../../contexts/firebase-context";
import { useUserValue } from "../../contexts/user-context";
import { IComment } from "../../interfaces";

function AddComment({
  setCommentList,
  docId,
  comments,
  commentInput
}: {
  setCommentList: Dispatch<Array<IComment>>;
  docId: string;
  comments: Array<IComment>;
  commentInput: React.RefObject<HTMLInputElement>;
}) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useFirebaseValue();
  const [user] = useUserValue();
  const { username } = user || {};

  const addComment = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      await firebase
        .firestore()
        .collection("photos")
        .doc(docId)
        .update({
          comments: FieldValue.arrayUnion({
            displayName: username,
            comment
          })
        });
      setCommentList([...comments, { displayName: username || "", comment }]);
      setComment("");
    },
    [firebase, comment]
  );
  return (
    <div className="w-full border-t border-gray-primary ">
      <form method="POST" className="flex items-center justify-between px-3" onSubmit={addComment}>
        <input
          value={comment}
          ref={commentInput}
          type="text"
          placeholder="Add a comment..."
          className="border-0 py-4 grow outline-none text-sm"
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          disabled={!comment}
          className={`text-blue-medium py-4 px-2 font-semibold text-sm ${!comment && "opacity-50"}`}
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default AddComment;
