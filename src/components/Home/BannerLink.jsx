import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

const BannerLink = ({ children, to }) => {
    const external = to.includes("http");
    return (
        <>
        {
             external ?
                 <MuiLink
                     href={to}
                     target="_blank"
                 >
                     {children}
                 </MuiLink>
                 :
                 <MuiLink
                     component={RouterLink}
                     to={to}
                 >
                     {children}
                 </MuiLink>
        }
        </>
    );
};

export default BannerLink;