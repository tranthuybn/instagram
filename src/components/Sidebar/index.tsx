import Skeleton from "react-loading-skeleton";
import UserInfo from "./UserInfo";
import Suggestions from "./Suggestions";
import { useUserValue } from "../../contexts/user-context";

function Sidebar() {
  const [user] = useUserValue();
  const { username, fullName, following, userId, docId } = user || {};
  const isUserValid = username && fullName && following && userId && docId;
  return isUserValid ? (
    <div>
      <UserInfo username={username} fullName={fullName} />
      <Suggestions following={following} loggedInUserId={userId} loggedInUserDocId={docId} />
    </div>
  ) : (
    <>
      <Skeleton count={1} height={61} className="mb-4" />
      <Skeleton count={1} height={150} className="mt-5" />
    </>
  );
}

export default Sidebar;
