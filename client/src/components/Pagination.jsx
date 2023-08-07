import React, { useContext } from "react";
import { DESADVContext } from "../context/DESADVContext";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

const Pagination = () => {
  const { page, setPage, totalPages } = useContext(DESADVContext);

  const nextPage = () => {
    if (page === totalPages) {
      return null;
    } else {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    if (page === 1) {
      return null;
    } else {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <ul className="flex justify-center items-center gap-4">
        <li>
          <button
            className="cursor-pointer transition-transform hover:scale-110"
            onClick={prevPage}
          >
            <AiOutlineLeftCircle size={"38px"} color="white" />
          </button>
        </li>
        {page - 1 !== 0 ? (
          <li>
            <button
              className="text-base font-semibold rounded-full hover:bg-[#999999] bg-[#F4F2DE] w-7 h-7 flex items-center justify-center"
              onClick={prevPage}
            >
              {page - 1}
            </button>
          </li>
        ) : null}
        <li>
          <button
            className="text-base font-semibold rounded-full bg-[#999999] text-white w-7 h-7 flex items-center justify-center"
            disabled
          >
            {page}
          </button>
        </li>
        {page + 1 !== totalPages && page !== totalPages ? (
          <li>
            <button
              className="text-base font-semibold rounded-full hover:bg-[#999999] bg-[#F4F2DE] w-7 h-7 flex items-center justify-center"
              onClick={nextPage}
            >
              {page + 1}
            </button>
          </li>
        ) : null}
        {page + 1 !== totalPages && page !== totalPages ? (
          <li className="text-base font-semibold rounded-full text-white w-7 h-7 flex items-center justify-center">
            ...
          </li>
        ) : null}
        {page !== totalPages ? (
          <li>
            <button
              className="text-base font-semibold rounded-full hover:bg-[#999999] bg-[#F4F2DE] w-7 h-7 flex items-center justify-center"
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </button>
          </li>
        ) : null}
        <li>
          <button
            className="cursor-pointer transition-transform hover:scale-110"
            onClick={nextPage}
          >
            <AiOutlineRightCircle size={"38px"} color="white" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
