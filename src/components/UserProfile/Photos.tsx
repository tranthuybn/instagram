import { Outlet } from "react-router-dom";
import Category from "./Category";
import { IPhoto } from "../../interfaces";

function Photos({ photos }: { photos: Array<IPhoto> }) {
  return (
    <div>
      <Category />
      <Outlet context={{ photos }} />
    </div>
  );
}

export default Photos;
