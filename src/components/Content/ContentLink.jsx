import { Link, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import {ArrowForwardIos} from "@mui/icons-material";

const ContentLink = ({ to, title }) => {
    return (
        <Link component={NavLink} to={to} sx={styles.link}>
            <div>{title}</div>
            <span>
                <ArrowForwardIos sx={styles.arrow} />
            </span>
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
        fontWeight: 500,
        textDecoration: "none",
        div: {
            fontSize: "1.5em !important"
        }
    },
    arrow: {
        mt: "10px",
    }
}