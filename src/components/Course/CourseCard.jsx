import Link from "../Link";
import parse from "html-react-parser";
import { Box } from "@mui/material";
// import { LinearProgress } from "@mui/material";

const CourseCard = ({ url, course }) => {
  // const courseProgress = Math.floor(Math.random() * 100);

  return (
    <Link to={`/${url}/${course.slug}`} sx={styles.container}>
      <Box sx={styles.image}>
        <img src={course.featuredImg} alt="Imagem Curso" />
      </Box>

      <Box sx={styles.info}>
        <h3>{parse(`${course.title}`)}</h3>
        <h4>{parse(`${course.subtitle}`)}</h4>

        <Box sx={styles.progressRow}>
          {/* <span>{courseProgress}%</span> */}
          {/* <LinearProgress
            variant="determinate"
            value={courseProgress}
            sx={styles.progressBar}
          /> */}
          <img src={course.partnerLogoURL} alt="" />
        </Box>
      </Box>
    </Link>
  );
};

export default CourseCard;

const styles = {
  container: {
    width: {
      xs: "calc(100% / 2 - 2%)",
      md: "calc(100% / 3 - 2%)",
    },
    m: "10px 1%",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    mb: "7px",
    border: "1px solid #77837F",
    borderRadius: "8px",
    img: {
      display: "block",
      borderRadius: "8px",
      width: "100%",
      height: {
        xs: "105px",
        md: "200px",
      },
    },
  },
  info: {
    border: "1px solid #77837F",
    borderRadius: "8px",
    padding: "10px 12px",
    h3: {
      m: 0,
      mb: "0.25rem",
      color: "#CAC8C8",
      fontSize: { xs: "12.5px", md: "18px" },
      fontWeight: 500,
      width: "100%",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      wordBreak: "break-word",
      minHeight: "38px",
    },
    h4: {
      m: 0,
      mb: "1rem",
      color: "#77837F",
      fontSize: { xs: "7px", md: "16px" },
      fontWeight: 500,
    },
  },
  progressRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    color: "#CAC8C8",
    fontSize: "12px",
    p: { margin: 0 },
    img: {
      maxWidth: {
        xs: "49px",
        md: "70px",
      },
      maxHeight: {
        xs: "30px",
        md: "70px",
      },
    },
    minHeight: {
      xs: "30px",
      md: "70px",
    },
  },
  progressBar: {
    width: "100%",
    mx: "0.5rem",
    "&.MuiLinearProgress-root": {
      borderRadius: "5px",
      backgroundColor: "#DEFFF1",
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "#33EDAC",
      },
    },
  },
};
