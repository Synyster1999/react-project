import React, { useContext } from "react";
import { DESADVContext } from "../context/DESADVContext";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import { RxReset } from "react-icons/rx";

const TableComponents = () => {
  const { bhdata, resetTable } = useContext(DESADVContext);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className="flex justify-center flex-col min-h-screen px-12">
      <table className="text-center bg-[#a5a5a6] rounded-xl text-sm shadow-md">
        <thead>
          <tr>
            <td className="px-4 py-2">VAN ID</td>
            <td className="px-4 py-2">Material</td>
            <td className="px-4 py-2">Carrier</td>
            <td className="px-4 py-2">Tracking Number</td>
            <td className="px-4 py-2">Line</td>
            <td className="px-4 py-2">Quantity</td>
            <td className="px-4 py-2">Invoice Number</td>
            <td className="px-4 py-2">Arrival Date</td>
          </tr>
        </thead>
        <tbody>
          {bhdata.map((el) => {
            return (
              <tr
                key={el._id}
                className="bg-[#F4F2DE] hover:bg-[#a5a5a6] cursor-pointer  last:border-none"
                onClick={() => handleClick(el._id)}
              >
                <td className="px-4 py-4 cursor-pointer">
                  {el.supplier ? (
                    el.supplier
                  ) : (
                    <p className="text-red-500">No Data</p>
                  )}
                </td>
                <td className="px-4 py-4 cursor-pointer">
                  {el.material ? (
                    el.material
                  ) : (
                    <p className="text-red-500">No Data</p>
                  )}
                </td>
                <td className="px-4 py-4">
                  {el.carrier ? (
                    el.carrier
                  ) : (
                    <p className="text-red-500">No Data</p>
                  )}
                </td>
                <td className="px-4 py-4">
                  {el.tracking_number ? (
                    el.tracking_number
                  ) : (
                    <p className="text-red-500">No Data</p>
                  )}
                </td>
                <td className="px-4 py-4">
                  {el.line ? el.line : <p className="text-red-500">No Data</p>}
                </td>
                <td className="px-4 py-4">
                  {el.quantity ? (
                    el.quantity
                  ) : (
                    <p className="text-red-500">No Data</p>
                  )}
                </td>
                <td className="px-4 py-4">
                  {el.invoice_number ? (
                    el.invoice_number
                  ) : (
                    <p className="text-red-500">No Data</p>
                  )}
                </td>
                <td className="px-4 py-4">
                  {el.arrival_date ? (
                    el.arrival_date
                  ) : (
                    <p className="text-red-500">No Data</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-2">
        <button
          onClick={resetTable}
          className="border-2 shadow-sm p-2 rounded-lg text-white text-lg hover:bg-[#7C9D96] flex justify-center items-center gap-2"
        >
          <RxReset size={"25px"} />
          Reset Table
        </button>
        <Pagination />
      </div>
    </div>
  );
};

export default TableComponents;
