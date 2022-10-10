import { Link as MuiLink } from "@mui/material";
import Link from 'next/link';
import {ArrowForwardIos} from "@mui/icons-material";

const ContentLink = ({ to, title }) => {
    return (
        <Link href={to}>
            <MuiLink to={to} sx={styles.link}>
                <div>{title}</div>
                <span>
                    <ArrowForwardIos sx={styles.arrow} />
                </span>
            </MuiLink>
        </Link>
    );
}

export default ContentLink;

const styles = {
    link: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "baseline",
        color: "#33EDAC",
        fontWeight: "400 !important",
        fontStyle: "normal !important",
        textDecoration: "none",
        div: {
            fontSize: "16px !important"
        }
    },
    arrow: {
        fontSize: "16px",
        width: "16px !important"
    }
}