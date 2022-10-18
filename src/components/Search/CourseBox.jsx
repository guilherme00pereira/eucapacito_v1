import { Box } from "@mui/material";
import parse from "html-react-parser";
import IconBlog from "../../../public/assets/img/icon_blog.png";
import IconBolsaEstudo from "../../../public/assets/img/icon_bolsa_de_estudo.png";
import IconCursos from "../../../public/assets/img/icon_cursos.png";
import IconEbook from "../../../public/assets/img/icon_ebook.png";
import IconEmpregabilidade from "../../../public/assets/img/icon_empregabilidade.png";
import IconJornada from "../../../public/assets/img/icon_jornada.png";
import IconVideo from "../../../public/assets/img/icon_video.png";
import { useRouter } from "next/router";
import Image from 'next/image';


const CourseBox = ({ courseId, slug, icon, title, company, logoURL, type }) => {
  const router = useRouter()

  const handleCoursePage = (type, slug) => {
    switch(type) {
      case 'curso_ec':
        router.push(`/curso-ec/${slug}`);
        break;
      case 'sfwd-courses':
        router.push(`/course-ec/${slug}`);
        break;
      case 'bolsa_de_estudo':
        router.push(`/bolsa_de_estudo/${slug}`);
        break;
      case 'empregabilidade':
        router.push(`/empregabilidade/${slug}`);
        break;
      case 'jornada':
        router.push(`/jornada/${slug}`);
        break;
      default:
        router.push(`/${slug}`);  
        break;
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'post':
        return IconBlog;
      case 'video':
        return IconVideo;
      case 'e-book':
        return IconEbook;
      case 'bolsa_de_estudo':
        return IconBolsaEstudo;
      case 'empregabilidade':
        return IconEmpregabilidade;
      case 'jornada':
        return IconJornada;
      default:
        return IconCursos;
    }
  };

  return (
    <Box sx={styles.box} onClick={() => handleCoursePage(type, slug)}>
      <Box sx={styles.box.info}>
        <Box sx={styles.box.info.icon}>
          <Image src={renderIcon(type)} width="58" height="58" alt="Ícone" />
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
