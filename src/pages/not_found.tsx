import { Link } from "react-router-dom";
import { ROUTES } from "../constants";
import Header from "../components/Header";

function NotFound() {
  return (
    <div>
      <Header />
      <div className="text-center">
        <h1 className="font-semibold text-2xl mb-5">Sorry, this page isn't available</h1>
        <p>
          The link you followed may be not exist.{" "}
          <Link to={ROUTES.DASHBOARD} className="text-blue-medium">
            Go back to Instagram
          </Link>
        </p>
      </div>
    </div>
  );
}

export default NotFound;
