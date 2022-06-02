import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const CustomGrid = () => {
  const [title, setTitle] = useState("");

  return (
    <Box>
      <Outlet context={[title, setTitle]} />
    </Box>
  );
};

export default CustomGrid;
