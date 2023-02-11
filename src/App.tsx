import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants";
import AuthUserProvider from "./contexts/auth-user-context";
import ProtectedRoute from "./helper/ProtectedRoute";
import useAuthUser from "./hooks/use-auth-user";
import CheckAuthUser from "./helper/CheckAuthUser";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign_up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./pages/not_found"));
const Profile = lazy(() => import("./pages/profile"));
const Posts = lazy(() => import("./components/UserProfile/Posts"));
const SavedPosts = lazy(() => import("./components/UserProfile/SavedPosts"));

function App() {
  const { authUser } = useAuthUser();
  return (
    <AuthUserProvider authUser={authUser}>
      <div className="App">
        <Router>
          <Suspense fallback={<p className="text-center">Loading...</p>}>
            <Routes>
              <Route
                path={ROUTES.DASHBOARD}
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.LOGIN}
                element={
                  <CheckAuthUser>
                    <Login />
                  </CheckAuthUser>
                }
              />
              <Route
                path={ROUTES.SIGN_UP}
                element={
                  <CheckAuthUser>
                    <SignUp />
                  </CheckAuthUser>
                }
              />
              <Route
                path={ROUTES.PROFILE}
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              >
                <Route path="" element={<Posts />} />
                <Route path="saved" element={<SavedPosts />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </AuthUserProvider>
  );
}

export default App;
