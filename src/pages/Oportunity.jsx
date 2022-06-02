import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import parse from "html-react-parser";

import apiService from "../services/apiService";

import CourseImg3 from "../assets/img/home-curso3.png";


import Button from "../components/Button";
// import CourseCurriculum from "../components/Course/CourseCurriculum";

import imagemFundo from "../assets/img/bg-desktop.png";

const Oportunity = () => {
  const [courseData, setCourseData] = useState({
    featuredImg: "",
    title: "",
    description: "",
  });

  const { api } = apiService;
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    api
      .get(`/wp/v2/${type}/${id}?_embed`)
      .then((res) => {
        const post = res.data;

        setCourseData({
          featuredImg: post["featured_image_src"],
          title: parse(`${post.title.rendered}`),
          description: parse(`${post.content.rendered}`),
        });
      });
  }, [id, api]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.image}>
        <img src={CourseImg3} alt={courseData.title} />
      </Box>

      <Box sx={styles.container}>
        <Box sx={styles.description}>
          <h1>{courseData.title}</h1>

          <p>{courseData.description}</p>
        </Box>
      </Box>
    </Box>
  );
};

export default Oportunity;

const styles = {
  root: {
    mx: "-16px",
    h1: {
      fontSize: "1.5rem",
      fontWeight: 500,
      textAlign: {
        md: "center",
        xs: "left",
      },
      borderBottom: {
        xs: "none",
        md: "1px solid #77837f",
      },
      paddingBottom: {
        md: "23px",
        xs: "0",
      },
    },
    h2: {
      fontSize: "1.3rem",
      fontWeight: 500,
    },
  },
  image: {
    minHeight: "350px",
    mt: "-24px",
    img: {
      width: "100%",
    },
  },
  container: {
    p: "1rem 1.5rem 2rem",
    mt: "-149px",
    borderRadius: "20px 20px 0 0",
    filter: {
      md: "drop-shadow(0px -6px 12px #33EDAC)",
      xs: "drop-shadow(0px -6px 44px #33EDAC)",
    },
    minHeight: {
      md: "calc(100vh - 600px)",
      xs: "calc(100vh - 250px)",
    },
    backgroundImage: `url(${imagemFundo})`,
    position: "relative",
    zIndex: 9,
  },
  description: {
    block: {
      //css desktop
      flexWrap: {
        md: "nowrap",
        xs: "wrap",
      },
      textAlign: "right",
      "& p": {
        m: 0,
        fontSize: "0.875rem",
      },
      "& p span": {
        color: "#FAE62E",
      },
      "& .MuiGrid-item:first-of-type p": {
        mb: {
          md: "0",
          xs: "0.5rem",
        },
        textAlign: "left",
      },
      "& .MuiGrid-item:nth-of-type(2) p": {
        fontSize: "1.5rem",
        fontWeight: 700,
        color: {
          md: "#77837F",
        },
      },
      "& .MuiGrid-item:last-of-type": {
        maxWidth: {
          md: "32%",
          xs: "100%",
        },

        mt: "1rem",
        mb: {
          md: "0",
          xs: "0.5rem",
        },
        "& p": {
          color: "#33EDAC",
          display: "flex",
          //css desktop
          justifyContent: {
            md: "flex-start",
            xs: "flex-end",
          },
          alignItems: "center",
        },
      },
      icons: {
        ml: "0.85rem",
        mr: "0.35rem",
        fontSize: "1.2rem",
      },
      //css desktop
      pb: {
        md: "38px",
        xs: "0",
      },

      borderBottom: {
        xs: "none",
        md: "1px solid #77837f",
      },
      alignItems: {
        md: "flex-end",
      },
      "& .description-desk": {
        display: {
          md: "flex",
          xs: "block",
        },
        justifyContent: "space-around",
        order: {
          md: "2",
        },
        img:{
            maxWidth:{                
                md:"100px",
                xs:"70px",
            },
            mb:{
                md:"-14px",
                xs:"-10px"
            }
        }
      },
      "& .description-desk-value": {
        order: {
          md: "3",
        },
        "& .desk-curso": {
          display: {
            md: "inline-block",
            xs: "none",
          },
          color: "#DADADA",
          fontSize: "18px",
        },
      },
    },
    "& .MuiGrid-root + p": {
      color: "#77837F",
      lineHeight: "1.625rem",
    },
    courseLink: {
      width: {
        md: "28%",
        xs: "100%",
      },
      padding: {
        md: "15px 75px",
        xs: "6px 16px",
      },
    },
    button: {
      textAlign: "center",
      mt: {
        md: "30px",
      },
    },
    desktopBonus: {
      display: {
        xs: "none",
        md: "block",
      },
      "& p:last-of-type": {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "14px",
        alignItems: "center",
        "& img": {
          mr: "10px",
        },
        mb:"35px",
      },
      "& p:first-of-type": {
        margin: "85px 0 35px 0",
      },
      containerButton: {
        display: {
          md: "flex",
          xs: "none",
        },
        justifyContent: "space-around",
        mt: "30px",
        pb: "23px",
        borderBottom: "1px solid #77837f",
      },
      button: {
        minWidth: "30%",
        padding: "30px 60px",
        background: "none",
        border: "1px solid #77837F",
        boxShadow: "none",
        color: "#CAC8C8",
        "&:hover":{
            background:"none"
        }
      },
    },
  },
  specs: {
    "& .MuiGrid-root p": {
      mt: 0,
      mb: "0.625rem",
      display: "flex",
      alignItems: "center",
      color: "#77837F",
      svg: {
        mr: "1rem",
        color: "#CAC8C8",
      },
    },
  },
  curriculum: {},
};
