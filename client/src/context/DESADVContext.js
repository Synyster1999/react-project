import { createContext, useEffect, useState } from "react";

export const DESADVContext = createContext({});

export const DESADVProvider = ({ children }) => {
  const [bhdata, setBhdata] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(250);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getDesadvData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/desadv-data?page=${page}`
      );
      const data = await response.json();
      setBhdata(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/pages`);
      const data = await response.json();
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDesadvDataById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/desadv-data/${id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/api/upload-file", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage("File uploaded successfully!");
        setErrorMessage(""); // Clear any previous error message
      } else {
        setErrorMessage("Error uploading file. Please, try again");
        setSuccessMessage(""); // Clear any previous success message
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Error uploading file. Please, try again");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  useEffect(() => {
    getDesadvData();
  }, [page]);

  const resetTable = () => {
    setPage(1);
  };

  return (
    <DESADVContext.Provider
      value={{
        bhdata,
        setPage,
        page,
        totalPages,
        resetTable,
        fetchDesadvDataById,
        handleFileUpload,
        successMessage,
        errorMessage,
      }}
    >
      {children}
    </DESADVContext.Provider>
  );
};
