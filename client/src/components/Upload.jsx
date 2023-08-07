import React, { useContext } from "react";
import { DESADVContext } from "../context/DESADVContext";

const Upload = () => {
  const { successMessage, errorMessage, handleFileUpload } =
    useContext(DESADVContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };
  return (
    <div className="flex min-h-full justify-center">
      <div className="flex items-center w-auto justify-center h-screen flex-col">
        <label className="block mb-4 text-xl font-medium text-white">
          Upload file:
        </label>
        <input
          type="file"
          className="block w-full shadow-sm rounded-lg border-2 p-2 text-md text-white
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-[#7C9D96] file:text-white
      hover:file:bg-[#A1CCD1]
    "
          onChange={handleFileChange}
        />
        {successMessage && (
          <span className="text-green-600 pt-6 text-lg">{successMessage}</span>
        )}
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
      </div>
    </div>
  );
};
export default Upload;
