import React, { useContext, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { useParams } from "react-router-dom";
import { DESADVContext } from "../context/DESADVContext";
const Details = () => {
  const { id } = useParams();
  const { bhdata, fetchDesadvDataById } = useContext(DESADVContext);

  const [rowData, setRowData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDesadvDataById(id);
      setRowData(data);
    };
    fetchData();
  }, [id]);

  const rowData2 = bhdata.find((el) => el._id === id);
  // console.log(rowData ? rowData : "asdas");
  return (
    <>
      <Navigation />
      {<span className="flex flex-col"></span>}
    </>
  );
};

export default Details;
