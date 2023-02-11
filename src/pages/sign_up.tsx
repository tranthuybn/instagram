import { useCallback, useState, useEffect, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants";
import { useFirebaseValue } from "../contexts/firebase-context";
import { doseUsernameExist } from "../services";

function SignUp() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { firebase } = useFirebaseValue();

  const isInvalid = username === "" || fullName === "" || emailAddress === "" || password === "";

  const handleSignUp = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const usernameExists = await doseUsernameExist(username);
      if (!usernameExists) {
        try {
          const createdUserResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(emailAddress, password);
          await firebase.firestore().collection("users").add({
            userId: createdUserResult.user?.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: [],
            followers: [],
            dateCreated: Date.now()
          });
          navigate(ROUTES.DASHBOARD);
        } catch (error) {
          if (error instanceof Error) setError(error.message);
        }
      } else {
        setUsername("");
        setError("That username is already have.");
      }
    },
    [username, fullName, emailAddress, password]
  );

  useEffect(() => {
    document.title = "Signup - Instagram";
  }, []);

  return (
    <div className="container flex items-center justify-center mx-auto max-w-screen-md h-screen">
      <div className="flex flex-col w-80 h-auto justify-center">
        <div className="flex flex-col h-auto items-center bg-white rounded border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full py-10">
            <img className="w-1/2 " src="/images/icons/logo.png" alt="instagram-logo" />
          </h1>
          {error && <p className="mb-4 px-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignUp} method="POST" className="px-4 pb-10">
            <input
              required
              className="border border-gray-primary rounded text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 mb-2"
              type="text"
              placeholder="Email address"
              aria-label="Enter your email addresss"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              required
              className="border border-gray-primary rounded text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 mb-2"
              type="text"
              placeholder="Username"
              aria-label="Enter your username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <input
              required
              className="border border-gray-primary rounded text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 mb-2"
              type="text"
              placeholder="Full Name"
              aria-label="Enter your Full Name"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />
            <input
              required
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
              Sign up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col rounded w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
