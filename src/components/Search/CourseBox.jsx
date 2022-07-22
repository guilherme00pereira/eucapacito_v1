import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

import archiveIcon from "../../assets/img/procurar-icon-archive.svg";
import editIcon from "../../assets/img/procurar-icon-edit.svg";
import layersIcon from "../../assets/img/procurar-icon-layers.svg";

const CourseBox = ({ courseId, slug, icon, title, company, logoURL, type }) => {
  let navigate = useNavigate();

  const handleCoursePage = (type, slug) => {
    switch(type) {
      case 'curso-ec':
        navigate(`/curso-ec/${slug}`);
        break;
      case 'sfwc-courses':
        navigate(`/course-ec/${slug}`);
        break;
      case 'bolsa_de_estudo':
        navigate(`/bolsa_de_estudo/${slug}`);
        break;
      case 'empregabilidade':
        navigate(`/empregabilidade/${slug}`);
        break;
      case 'jornada':
        navigate(`/jprnada/${slug}`);
        break;
      default:
        navigate(`/${slug}`);  
        break;
    }
  };

  const icons = [
    archiveIcon,
    editIcon,
    layersIcon,
    archiveIcon,
    editIcon,
    layersIcon,
  ];

  const randomIndex = Math.trunc(Math.random() * (6 - 1) + 1);

  return (
    <Box sx={styles.box} onClick={() => handleCoursePage(type, slug)}>
      <Box sx={styles.box.info}>
        <Box sx={styles.box.info.icon}>
          <img src={icons[randomIndex - 1]} alt="Ícone" />
        </Box>

        <Box sx={styles.box.info.description}>
          <h3>{parse(`${title}`)}</h3>
          <div>{parse(`${company}`)}</div>
        </Box>
      </Box>

      <Box sx={styles.box.logo}>
        {logoURL && <img src={logoURL} alt="Logo Parceiro" />}
      </Box>
    </Box>
  );
};

export default CourseBox;

const styles = {
  box: {
    width: {
      md: "31%",
      xs: "100%",
    },
    mr: {
      md: "25px",
      xs: "0",
    },
    mb: {
      md: "40px",
      xs: "1.5rem",
    },
    border: "1px solid #77837F",
    borderRadius: "8px",
    padding: {
      md: "1%",
      xs: "3%",
    },
    height: {
      md: "98px",
      xs: "auto",
    },
    display: {
      md: "inline-block",
      xs: "flex",
    },
    cursor: "pointer",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    fontSize: "1.3rem",
    info: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      icon: {
        mr: "1rem",
        fontSize: "1.8rem",
      },
      description: {
        wordBreak: "break-word",
        h3: {
          m: 0,
          mb: "0.625rem",
          pr: "0.2rem",
          fontSize: {
            xs: "1rem",
            md: "14px",
          },
          fontWeight: 500,
        },
        "& div": {
          m: 0,
          color: "#77837F",
          fontSize: {
            xs: "1rem",
            md: "14px",
          },
          fontWeight: 500,
        },
      },
    },
    logo: {
      // svg: {
      //   fontSize: "3.5rem",
      //   color: "#CAC8C8",
      // },
      alignSelf: "flex-end",
      textAlign: {
        md: "right",
        xs: "left",
      },
      mt: {
        md: "-8%",
        xs: "0",
      },
      img: {
        verticalAlign: "bottom",
        width: "25px",
        height: "25px",
        objectFit: "contain"
      },
    },
  },
  "& .card-desk": {
    display: {
      md: "block",
      xs: "none",
    },
    mr: "50px !important",
    "& img:last-type-of": {
      mt: "50px",
    },
    "& span": {
      textAlign: "right",
      mb: "10px",
    },
    margin: "30px 0",
    "& .MuiGrid-container": {
      border: "1px solid #77837f",
      boxSizing: "border-box",
      mt: "14px",
      borderRadius: "8px",
      padding: "32px",
      minHeight: "150px",
      justifyContent: "end",
    },
    "& .desk-info + div": {
      alignSelf: "flex-end",
    },
    "& .desk-info": {
      width: "100%",
    },
    "&:hover": {
      "& img": {
        boxShadow: "0px 0px 10px 5px #33EDAC",
        transtion: "easy",
      },
      "& .MuiGrid-container": {
        boxShadow: "0px 0px 10px 5px #33EDAC",
        "& img": {
          boxShadow: "none",
        },
      },
    },
  },
};
