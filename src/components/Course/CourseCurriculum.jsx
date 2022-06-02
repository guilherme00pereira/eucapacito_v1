import { Box } from "@mui/material";
import { PlayCircleOutline } from "@mui/icons-material";
import Link from "../Link";

const CourseCurriculum = ({ number, title, duration, link }) => {
  return (
    <Box sx={styles.box}>
      <Box sx={styles.box.info}>
        <Box sx={styles.box.info.number}>{number}</Box>

        <Box sx={styles.box.info.description}>
          <h3>{title}</h3>
          <p>{duration}</p>
        </Box>
      </Box>

      <Box sx={styles.box.icon}>
        <Link to={link}>
          <PlayCircleOutline />
        </Link>
      </Box>
    </Box>
  );
};

export default CourseCurriculum;

const styles = {
  box: {
    mb: '0.5rem',
    border: "1px solid #77837F",
    borderRadius: "8px",
    padding: "0.625rem 1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.3rem",
    info: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      number: {
        mr: "1rem",
        fontSize: "1.8rem",
      },
      description: {
        h3: {
          m: 0,
          mb: "0.625rem",
          fontSize: "1.3rem",
          fontWeight: 500,
        },
        "& p": {
          m: 0,
          color: "#77837F",
          fontSize: "1rem",
        },
      },
    },
    icon: {
      svg: {
        fontSize: "3.5rem",
        color: "#CAC8C8",
      },
    },
  },
};
