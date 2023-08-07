import { MdUpload, MdTableRows } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (route) => navigate(`${route}`);
  const isButtonActive = (route) => location.pathname === route;

  return (
    <div>
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen shadow-xl">
        <div className="h-full px-3 py-4 bg-[#7C9D96]">
          <ul className="space-y-2 font-medium">
            <li>
              <button
                className={`flex items-center gap-2 w-full rounded-md p-2 ${
                  isButtonActive("/")
                    ? "bg-[#A1CCD1] hover:bg-none"
                    : "hover:bg-[#A1CCD1]"
                }`}
                onClick={() => handleClick("/")}
              >
                <MdTableRows size={"30px"} color="white" />
                <span className="text-xl text-white">Overview</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center gap-2 w-full rounded-md p-2 ${
                  isButtonActive("/upload")
                    ? "bg-[#A1CCD1] hover:bg-none"
                    : "hover:bg-[#A1CCD1]"
                }`}
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
