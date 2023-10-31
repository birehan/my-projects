import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import { Box } from "@mui/material";
import AdminComponetSelector from "../components/AdminComponetSelector";

const AdminPage = () => {
  const [selectedComponent, setSelectedComponent] = useState("courses");

  return (
    <Box display="flex" sx={{}}>
      <Sidebar
        setSelectedComponent={setSelectedComponent}
        selectedComponent={selectedComponent}
      />
      <AdminComponetSelector
        setSelectedComponent={setSelectedComponent}
        selectedComponent={selectedComponent}
      />
    </Box>
  );
};
export default AdminPage;
