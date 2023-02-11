import { useState } from "react";
import { AiOutlineTable } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { Link } from "react-router-dom";

function Category() {
  const [active, setActive] = useState("posts");

  return (
    <div className="container max-w-screen-lg mx-auto border-t border-gray-primary">
      <div className="flex justify-center gap-14">
        <Link
          to=""
          className={`${active === "posts" ? "border-t border-black-light" : ""}`}
          onClick={() => setActive("posts")}
        >
          <div className="flex items-center gap-2 py-4">
            <span className="text-md">
              <AiOutlineTable />
            </span>
            <span className="uppercase text-sm">posts</span>
          </div>
        </Link>
        <Link
          to="saved"
          className={`${active === "saved" ? "border-t border-black-light" : ""}`}
          onClick={() => setActive("saved")}
        >
          <div className="flex items-center gap-2 py-4">
            <span className="text-xs">
              <BsBookmark />
            </span>
            <span className="uppercase text-sm">saved</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Category;
