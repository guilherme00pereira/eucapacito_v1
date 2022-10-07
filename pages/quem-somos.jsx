import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Grid, Box, Container, Link as MuiLink } from "@mui/material";
import { Instagram, Facebook, LinkedIn } from "@mui/icons-material";
import YouTube from "@mui/icons-material/YouTube";
import apiService from "../services/apiService";
import ReactPlayer from "react-player";
import parse from 'html-react-parser';

import PeopleIcon from "../assets/img/noticias-icone-pessoas.png";
import CheckIcon from "../assets/img/noticias-icone-check.png";
import HandsIcon from "../assets/img/noticias-icone-parceiros.png";
import PartyIcon from "../assets/img/noticias-icone-festa.png";
import EuCapacitoLogoVertical from "../assets/img/logo-vertical.png";
import linhaQuemSomos from "../assets/img/linha-quem-somos.png";
import linhaQuemSomosDepoimento from "../assets/img/linhagrande-quem-somos.png";
import ImagemGradient from "../assets/img/gradiente-quem-somos.png";
import Imagem1 from "../assets/img/image1-quem-somos.png";
import Imagem2 from "../assets/img/image2-quem-somos.png";
import Imagem3 from "../assets/img/image3-quem-somos.png";
import Imagem4 from "../assets/img/image4-quem-somos.png";
import MetadataManager from "../layouts/MetadataManager";

const QuemSomos = () => {
  const [title, setTitle] = useOutletContext();
  const [content, setContent] = useState({
    video: '',
    lide: '',
    full_text: '',
    quote: '',
    quote_author: '',
    forwho: [],
    alunos_title: '',
    alunos_info: '',
    conclusao_title: '',
    conclusao_info: '',
    parceiros_title: '',
    parceiros_info: '',
    empregos_title: '',
    empregos_info: '',
  });
  const {api} = apiService;

  useEffect(() => {
    setTitle({
      main: "Quem Somos",
      sub: "Saiba mais sobre",
    });
    api.get('/eucapacito/v1/aboutpage').then( (res) => {
      setContent({
        video: res.data.video,
        lide: res.data.lide,
        full_text: res.data.full_text,
        quote: res.data.quote,
        quote_author: res.data.quote_author,
        forwho: res.data.forwho,
        alunos_title: res.data.alunos_title,
        alunos_info: res.data.alunos_info,
        conclusao_title: res.data.conclusao_title,
        conclusao_info: res.data.conclusao_info,
        parceiros_title: res.data.parceiros_title,
        parceiros_info: res.data.parceiros_info,
        empregos_title: res.data.empregos_title,
        empregos_info: res.data.empregos_info,
      });
    })
  }, []);

  return (
    <Box sx={styles.root}>
      <MetadataManager ispage={true} value="about" />

      <h1>Sobre o Eu Capacito</h1>
      <hr />

      <Box container sx={{ display: "flex", justifyContent: "center", mt: "57px" }}>
        <ReactPlayer url={content.video} />
      </Box>

      <Box sx={styles.texto}>
        <p>{content.lide}</p>

        <Container sx={styles.containerParaQuem}>
          <p>PARA QUEM É?</p>

          <Container>
            {content.forwho.map((item) => (
                <Box sx={styles.boxInfo}>
                    <p>{item}</p>
                  </Box>
            ))}
          </Container>

          <Box sx={{ mr: "10px" }}>
            <img src={Imagem1} alt="business-man-owner-company-office" />
          </Box>

          <Box>
            <img
              src={Imagem2}
              alt="attractive-caucasian-woman-with-curly-hair-wearing-white-shirt-holding-pink-tablet-computer"
            />
            <img src={Imagem3} alt="close-up-business-people-conference-room" />
          </Box>
        </Container>

        <Container sx={styles.containerDepoimento}>
          <Box>
            <img src={ImagemGradient} className="gradiente" alt="" />
            <img src={Imagem4} alt="" />
          </Box>

          <Box sx={styles.boxDepoimento}>
            <img src={linhaQuemSomosDepoimento} alt="" />
            <Box>
              <h4>DEPOIMENTO</h4>
              <p>{content.quote}</p>
              <p>- {content.quote_author}</p>
            </Box>
          </Box>
        </Container>

        {parse(content.full_text)}

      </Box>

      <Box sx={styles.icons}>
        <Grid container>
          <Grid item xs={6} md={3}>
            <h2>{content.alunos_title}</h2>
            <p>MATRICULADOS</p>
            <img src={PeopleIcon} alt="Ícone - Pessoas" />
            <p>{content.alunos_info}</p>
          </Grid>

          <Grid item xs={6} md={3}>
            <h2>{content.conclusao_title}</h2>
            <p>CURSOS FINALIZADOS</p>
            <img src={CheckIcon} alt="Ícone - Check" />
            <p>{content.conclusao_info}</p>
          </Grid>

          <Grid item xs={6} md={3}>
            <h2>{content.parceiros_title}</h2>
            <p>AJUDAM NO PROJETO</p>
            <img src={HandsIcon} alt="Ícone - Hands" />
            <p>{content.parceiros_info}</p>
          </Grid>

          <Grid item xs={6} md={3}>
            <h2>{content.empregos_title}</h2>
            <p>PELO EU CAPACITO</p>
            <img src={PartyIcon} alt="Ícone - Jobs" />
            <p>{content.empregos_info}</p>
          </Grid>
        </Grid>
      </Box>

      <Box sx={styles.description}>
        <img src={EuCapacitoLogoVertical} alt="Logo EuCapacito" />
      </Box>

      <Box sx={styles.boxredes}>
        <MuiLink href="https://facebook.com">
          <Facebook sx={styles.iconRedes} />
        </MuiLink>

        <MuiLink href="https://instagram.com">
          <Instagram sx={styles.iconRedes} />
        </MuiLink>

        <MuiLink href="https://youtube.com">
          <YouTube sx={styles.iconRedes} />
        </MuiLink>

        <MuiLink href="https://linkedin.com">
          <LinkedIn sx={styles.iconRedes} />
        </MuiLink>
      </Box>

    </Box>
  );
};

export default QuemSomos;

const styles = {
  containerParaQuem: {
    display: {
      md: "flex",
      xs: "none",
    },
    justifyContent: "space-around",
    width: "80%",
    position: "relative",
    "& > p": {
      position: "absolute",
      transform: " rotate(270deg)",
      left: "-27%",
      top: "12%",
      color: "#77837F !important",
      fontSize: "30px !important",
    },
    "& p": {
      color: "#CAC8C8",
      fontSize: "18px",
      fontWeight: "500",
      textAlign: "left",
    },
    mt: "90px",
    paddingBottom: "0px !important",
  },
  boxInfo: {
    width: "220px",
    display: "flex",
    alignItems: "flex-start",
    mb: "15px",
    pl: "17px",
    backgroundImage: `url(${linhaQuemSomos})`,
    backgroundRepeat: "no-repeat",
    "& p": {
      margin: "0",
      fontSize: "16px",
      transform: "none",
      position: "relative",
      lineHeight:"18px",
      textTransform: "uppercase",
      wordBreak: "break-word",
    },
  },
  containerDepoimento: {
    display: {
      md: "flex",
      xs: "none",
    },
    justifyContent: "space-between",
    "& > img": {
      width: "342px",
      mt: "-20px",
      zIndex: "99",
    },
    position: "relative",
    "& .gradiente": {
      position: "absolute",
      mt: "43px",
      zIndex: "-10",
      left: "1.5%",
    },
    paddingBottom: "40px !important",
  },

  boxDepoimento: {
    display: "flex",
    "& img": {
      margin: "0 30px",
      height: "80%",
    },
    alignItems: "center",
    justifyContent: "space-between",
    "& h4": {
      fontSize: "18px",
      fontWeight: "500",
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
  root: {
    h1: { marginTop: "2rem", fontSize: "22px", color: "#CAC8C8" },
    hr: { border: 0, borderTop: "1px solid #77837F" },
    ".MuiContainer-root": {
      pb: "100px",
    },
  },
  news: {
    //css desktop
    "& .MuiGrid-root": {
      width: {
        md: "33%",
      },
    },
    //css desktop
    "& .MuiGrid-root h2": {
      marginLeft: {
        md: "15px",
        xl: "0px",
      },
    },
  },
  icons: {
    "& .MuiGrid-root":{
        alignItems:"flex-start"
    },
    py: "1.5rem",
    h2: { m: "0 0 0.25rem", fontSize:{xs:"1.375rem", md:"30px"}  },
    "& p": {
      m: "0 0 1.25rem",
      color: "#77837F",
      fontSize: {xs:"0.625rem", md:"14px"},
      fontWeight: 500,
    },
    img: { mb: "0.75rem", minHeight:"75px" },
    "img+p": { color: "#CAC8C8", fontSize: {xs:"2.5rem", md:"32px"}, fontWeight: 700 },
    "& .MuiGrid-item": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  description: {
    textAlign: "center",
    mt: "140px",
  },
  boxredes: {
    textAlign: "center",
    mt: "51px",
  },
  iconRedes: {
    color: "#77837F",
    mr: "20px",
  },
};
