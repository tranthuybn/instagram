import { Link } from "react-router-dom";

function Caption({ username, caption }: { username: string; caption: string }) {
  return (
    <div className="flex items-start gap-2 mb-2 px-3">
      <Link to={`/p/${username}`} className="font-semibold text-sm">
        {username}
      </Link>
      <span className="text-sm overflow-hidden text-ellipsis">{caption}</span>
    </div>
  );
}

export default Caption;
