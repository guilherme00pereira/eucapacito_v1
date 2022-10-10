import Link from 'next/link';
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
                <Link href={to}>
                    <MuiLink to={to}>
                        {children}
                    </MuiLink>
                </Link>
        }
        </>
    );
};

export default BannerLink;