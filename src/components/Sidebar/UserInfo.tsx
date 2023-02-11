import { Link } from "react-router-dom";

function UserInfo({ username, fullName }: { username: string; fullName: string }) {
  return (
    <div className="grid grid-cols-4 gap-2 mb-6 items-center">
      <div className="flex items-center w-14 h-14">
        <Link to={`/p/${username}`} className="w-full h-full">
          <img
            className="rounded-full w-full h-full mr-3"
            src={`/images/avatars/${username}.jpeg`}
            alt={`${username} profile`}
          />
        </Link>
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">
          <Link to={`/p/${username}`}>{username}</Link>
        </p>
        <p className="text-sm text-gray-base">{fullName}</p>
      </div>
    </div>
  );
}

export default UserInfo;
