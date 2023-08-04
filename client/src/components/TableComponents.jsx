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
    <div className="flex justify-center flex-col p-12">
      <table className="mt-8 text-center bg-[#455669] rounded-xl text-sm">
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
                className="bg-[#b9b9b9] hover:bg-[#7c7c7c] cursor-pointer border-b-2 border-gray-500 last:border-none"
                onClick={() => handleClick(el._id)}
              >
                <td className="px-4 py-4 cursor-pointer">
                  {el.van_id ? (
                    el.van_id
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
          className="border-2 p-2 rounded-lg text-white text-lg hover:bg-gray-500 flex justify-center items-center gap-2"
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
