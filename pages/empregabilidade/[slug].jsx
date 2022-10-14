import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Button from "../../src/components/Button";
import parse from "html-react-parser";
import ContentCard from "../../src/components/ContentCard";
import apiService from "../../src/services/apiService";
import {useRouter} from "next/router";


const Employability = ({ employability, courses }) => {
  const router = useRouter()
  const [logged, setLogged] = useState(false);

  const handleCertificationUpload = () => {
    if(!logged) {
      router.push('/login')
    }
  }

  const handleStartForm = () => {
    if(!logged) {
      router.push('/login')
    } else {
      router.push(`/comece-agora/${slug}`)
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setLogged(!!token);
  }, []);

  return (
    <Box sx={styles.root}>
      <h1>Empregabilidade</h1>
      <hr />

      <Box sx={styles.texto}>
        <Box sx={styles.description}>
          <h1>{employability.title}</h1>

          <p>{parse(employability.description)}</p>
        </Box>
      </Box>

      <h2>Para ajudar no seu processo, conclua o(s) seguinte(s) curso(s):</h2>

      <Box sx={styles.cardsContainer}>
        
          {courses.length > 0 && 
            courses.map((course) => (
              <Box key={course.id} sx={styles.card}>
                <ContentCard
                  url={course.url}
                  imagePath={course.featuredImg}
                  title={course.title}
                  subtitle={course.subtitle}
                  logoPath={course.partnerLogoURL}
                />
              </Box>
            ))
          }
          
        <Box sx={styles.certificado}>
          <Button onClick={handleCertificationUpload}>Envie os certificados</Button>
          <input type="file" />
          <input type="file" />
          <p>
            Finalizando os cursos anexar nos campos correspondentes e comece o
            processo seletivo clicando em "comece agora”.
          </p>
        </Box>
      </Box>

      <Box sx={styles.button}>
        <Button onClick={handleStartForm}>Comece agora!</Button>
      </Box>

    </Box>
  );
};

export async function getServerSideProps(context) {
  const { api } = apiService;

  const courses = []
  let res = await api.get(`/wp/v2/empregabilidade?slug=${context.params.slug}&_embed`)
  let item = res.data[0]
  const employability = {
    featuredImg: item.imagem.guid,
    title: item.title.rendered,
    description: item.content.rendered,
    yoast: item.yoast_head_json
  }
  item.cursos_ec.forEach(course => {
    courses.push({
      id: course.id,
      url: course.url,
      featuredImg: course.image,
      title: course.title,
      subtitle: "Eu Capacito",
      partnerLogoURL: course.responsavel ?? null,
    });
  })

  return { props: { employability, courses }}

}

export default Employability;

const styles = {
  root: {
    h1: { marginTop: "2rem", fontSize: "22px", color: "#CAC8C8" },
    h2: {
      fontSize: "1.15rem",
      fontWeight: 500,
      borderBottom: {
        xs: "none",
        md: "1px solid #77837F",
      },
      pb: {
        md: "13px",
        xs: "0",
      },
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
  button: {
    mx: "1rem",
    textAlign: { md: "center", xs: "left" },
    "& .MuiButton-root": {
      width: { xs: "100%", md: "25%" },
    },
  },
  cardsContainer: {
    display: {
      md: "flex",
      xs: "none",
    },
  },
  card: {
    maxWidth: "30%",
    "& img": {
      border: "1px solid #77837f",
    },
    "& .MuiGrid-root img": {
      border: "none",
    },
    mr: "25px",
    mb: "40px",

    "& .MuiGrid-container": {
      border: "1px solid #77837f",
      boxSizing: "border-box",
      mt: "14px",
      borderRadius: "8px",
      padding: "24px",
      justifyContent: "space-between",
      alignItems: "end",
    },
    "& .desk-info": {
      mb: "50px",
    },
    "& small": {
      fontSize: "16px",
    },
  },
  certificado: {
    display: "flex",
    flexDirection: "column",
    width: "33%",
    margin: "0 auto",
    "& button": {
      width: "75%",
      margin: "0 auto 63px auto",
    },
    "& p": {
      fontSize: "12px !important",
      lineHeight: "20px",
      maxWidth: "359px",
    },
    "& input": {
      border: "1px solid #CAC8C8",
      borderRadius: "8px",
      margin: "10px 0",
    },
  },
};
