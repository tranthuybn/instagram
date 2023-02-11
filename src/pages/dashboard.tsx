import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from "../components/Sidebar";
import UserProvider from "../contexts/user-context";
import useAuthUser from "../hooks/use-auth-user";
import { useEffect } from "react";

function Dashboard() {
  const { authUser } = useAuthUser();
  useEffect(() => {
    document.title = "Instagram";
  }, []);
  return authUser ? (
    <UserProvider authUser={authUser}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 mx-auto max-w-812">
          <div className="md:col-span-2 px-6 md:px-2">
            <Timeline />
          </div>
          <div className="hidden md:block">
            <Sidebar />
          </div>
        </div>
      </div>
    </UserProvider>
  ) : null;
}

export default Dashboard;
