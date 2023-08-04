import React from "react";
import TableComponents from "../components/TableComponents";
import { DESADVProvider } from "../context/DESADVContext";
import Sidebar from "../components/Sidebar";
const Overview = () => {
  return (
    <DESADVProvider>
      <div>
        <Sidebar />
        <TableComponents />
      </div>
    </DESADVProvider>
  );
};

export default Overview;
