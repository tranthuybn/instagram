import { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES, SCREENSHOT_SLIDE } from "../constants";
import { useFirebaseValue } from "../contexts/firebase-context";

function Login() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeId, setActiveId] = useState(0);
  const { firebase } = useFirebaseValue();
  const isInvalid = emailAddress === " " || password === "";

  const handleLogIn = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      try {
        await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }
    },
    [emailAddress, password]
  );

  useEffect(() => {
    setTimeout(() => {
      if (activeId < SCREENSHOT_SLIDE.length - 1) {
        setActiveId(activeId + 1);
      } else {
        setActiveId(0);
      }
    }, 6000);
  }, [activeId]);

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);
  return (
    <div className="container flex items-center justify-center mx-auto max-w-screen-md h-screen">
      <div className="w-3/5 h-full items-center md-extra:flex hidden">
        <div className="relative w-full h-[600px] bg-phone-slide bg-center bg-contain bg-no-repeat ">
          <img
            className="max-w-full absolute top-6 h-86 right-16"
            src={SCREENSHOT_SLIDE[activeId]}
            alt="login"
          />
        </div>
      </div>
      <div className="flex flex-col w-80 h-full justify-center md-extra:w-2/5">
        <div className="flex flex-col h-auto pb-7 items-center bg-white rounded border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full py-10">
            <img className="w-1/2 " src="/images/icons/logo.png" alt="instagram-logo" />
          </h1>
          {error && <p className="mb-4 px-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleLogIn} method="POST" className="px-4">
            <input
              className="border border-gray-primary rounded text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 mb-2"
              type="text"
              placeholder="Email address"
              aria-label="Enter your email addresss"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              className="border border-gray-primary rounded text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 mb-2"
              type="password"
              placeholder="password"
              aria-label="Enter your email password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              disabled={isInvalid}
              className={`text-white bg-blue-medium w-full rounded-md h-8 mt-6 font-bold ${
                isInvalid && "opacity-50"
              }`}
              type="submit"
            >
              Log in
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col rounded w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Don't have an account?{` `}
            <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
