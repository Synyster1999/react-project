import React from "react";
import { useNavigate } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
const Navigation = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="h-20 p-6 w-full flex items-center shadow-md">
      <button
        className="border px-4 py-2 rounded-xl flex items-center text-xl text-white hover:bg-gray-500"
        onClick={handleGoBack}
      >
        <BiLeftArrowAlt size={"25px"} />
        Go back
      </button>
    </div>
  );
};

export default Navigation;
