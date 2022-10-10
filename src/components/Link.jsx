import {Link as NextLink} from "next/link";
import { Link as MuiLink } from "@mui/material";

const Link = ({ children, to, sx, onClick }) => {
  return (
    <MuiLink
      component={NextLink}
      to={to}
      sx={{ color: "#33EDAC", textDecoration: "none", ...sx }}
      onClick={onClick}
    >
      {children}
    </MuiLink>
  );
};

export default Link;
