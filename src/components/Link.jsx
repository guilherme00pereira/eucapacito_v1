import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

const Link = ({ children, to, sx, onClick }) => {
  return (
    <MuiLink
      component={RouterLink}
      to={to}
      sx={{ color: "#33EDAC", textDecoration: "none", ...sx }}
      onClick={onClick}
    >
      {children}
    </MuiLink>
  );
};

export default Link;
