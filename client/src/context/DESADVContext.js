import { createContext, useEffect, useState } from "react";

export const DESADVContext = createContext({});

export const DESADVProvider = ({ children }) => {
  const [bhdata, setBhdata] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(250);

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
      }}
    >
      {children}
    </DESADVContext.Provider>
  );
};
