import React from "react";
import { MdUpload, MdTableRows } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(`${route}`);
  };
  return (
    <div>
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 shadow-xl">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <button
                className="flex hover:bg-gray-700 items-center gap-2 w-full rounded-md p-2"
                onClick={() => handleClick("/")}
              >
                <MdTableRows size={"30px"} color="white" />
                <span className="text-xl text-white">Overview</span>
              </button>
            </li>
            <li>
              <button
                className="flex hover:bg-gray-700 items-center gap-2 w-full rounded-md p-2"
                onClick={() => handleClick("/upload")}
              >
                <MdUpload size={"30px"} color="white" />
                <span className="text-xl text-white">Upload</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
