import { Link } from "@mui/material";
import { NavLink } from "react-router-dom";

const MenuLink = ({ to, imagePath, title }) => {
  return (
    <Link component={NavLink} to={to} sx={styles.link}>
      <p>{title}</p>
    </Link>
  );
};

export default MenuLink;

const styles = {
  link: {
    display: "flex",
    flexDirection: "column",
    //css desktop
    flexDirection: {
      md: "row",
      xs: "column",
    },
    justifyContent: "center",
    alignItems: "center",
    color: "#77837F",
    fontSize: "0.875rem",
    fontWeight: 500,
    textDecoration: "none",
    img: {
      maxWidth: "90px",
    },
    "& > p": {
      xs: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#272B2E",
        width: "110px",
        height: "110px",
        borderRadius: "55px",
      },
      md: {
        display: 'block',
        width: 'auto',
        height: 'auto',
        backgroundColor: "unset",
      }
    },
    //css desktop
    img: {
      maxWidth: {
        md: "30px",
        xs: "90px",
      },
      mr: {
        md: "10px",
      },
    },
    "& p": {
      m: "0.3rem 0 0",
    },
    //css desktop
    "& p": {
      m: {
        md: "0",
      },
    },
  },
};
