import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import parse from "html-react-parser";

import apiService from "../services/apiService";


const Oportunity = () => {
  const [oportunityData, setOportunityData] = useState({
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

        setOportunityData({
          featuredImg: post.imagem.guid,
          title: parse(`${post.title.rendered}`),
          description: parse(`${post.content.rendered}`),
        });
      });
  }, [id, api]);

  return (
    <Box sx={styles.root}>
      <h1>Empregabilidade</h1>
      <hr />

      <Box sx={styles.texto}>
        <Box sx={styles.description}>
          <h1>{oportunityData.title}</h1>

          <p>{oportunityData.description}</p>
        </Box>
      </Box>

      <h2>Para ajudar no seu processo, conclua o(s) seguinte(s) curso(s):</h2>
      <hr />

    </Box>
  );
};

export default Oportunity;

const styles = {
  root: {
    h1: { marginTop: "2rem", fontSize: "22px", color: "#CAC8C8" },
    hr: { border: 0, borderTop: "1px solid #77837F" },
    ".MuiContainer-root": {
      pb: "100px",
    },
    h2: {
      fontSize: "1.3rem",
      fontWeight: 500,
    },
  },
  image: {
    minHeight: "350px",
    maxHeight: "533px",
    mt: "-24px",
    img: {
      width: "100%",
    },
  },
  texto: {
    margin: "70px auto",
    "& p": {
      lineHeight: "30px",
      fontSize: "18px",
      fontWeight: "500",
      color: "#77837F",
      textAlign: "justify",
    },
    width: "90%",
    "& small": {
      fontSize: "18px",
      color: "#CAC8C8",
    },
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
