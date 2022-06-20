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
import VideoPage from "../assets/img/video-quem-somos.png";
import EuCapacitoLogoVertical from "../assets/img/logo-vertical.png";
import linhaQuemSomos from "../assets/img/linha-quem-somos.png";
import linhaQuemSomosDepoimento from "../assets/img/linhagrande-quem-somos.png";
import ImagemGradient from "../assets/img/gradiente-quem-somos.png";
import Imagem1 from "../assets/img/image1-quem-somos.png";
import Imagem2 from "../assets/img/image2-quem-somos.png";
import Imagem3 from "../assets/img/image3-quem-somos.png";
import Imagem4 from "../assets/img/image4-quem-somos.png";

const About = () => {
  const [title, setTitle] = useOutletContext();
  const [content, setContent] = useState({
    video: '',
    lide: '',
    full_content: ''
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
        lide: res.data.bloco1,
        full_content: res.data.texto
      });
    })
  }, []);

  return (
    <Box sx={styles.root}>
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
            <Box sx={styles.boxInfo}>
              <img src={linhaQuemSomos} />
              <p>PESSOAS EM TRANSIÇÃO DE CARREIRA</p>
            </Box>
            <Box sx={styles.boxInfo}>
              <img src={linhaQuemSomos} />
              <p>PROFISSIONAIS EM BUSCA DE NOVAS HABILIDADES</p>
            </Box>
            <Box sx={styles.boxInfo}>
              <img src={linhaQuemSomos} />
              <p>EMPRESAS EM TRANSIÇÃO DIGITAL</p>
            </Box>
            <Box sx={styles.boxInfo}>
              <img src={linhaQuemSomos} />
              <p>EMPREENDEDORES E FREELANCERS</p>
            </Box>
            <Box sx={styles.boxInfo}>
              <img src={linhaQuemSomos} />
              <p>LÍDERES E TIMES DE PRODUTOS</p>
            </Box>
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
              <p>
                é uma escola que prepara profissionais para uma nova era, dando
                uma visão de evolução e aprendizagem constante dentro de nossas
                próprias atuações, quebrando os paradigmas.”
              </p>
              <p>- ANTONIO SANTOS, ADMINISTRADOR, SP</p>
            </Box>
          </Box>
        </Container>

        {parse(content.full_content)}

      </Box>

      <Box sx={styles.icons}>
        <Grid container>
          <Grid item xs={6} md={3}>
            <h2>ALUNOS</h2>
            <p>MATRICULADOS</p>
            <img src={PeopleIcon} alt="Ícone - Pessoas" />
            <p>3.000</p>
          </Grid>

          <Grid item xs={6} md={3}>
            <h2>CONCLUÍDOS</h2>
            <p>CURSOS FINALIZADOS</p>
            <img src={CheckIcon} alt="Ícone - Check" />
            <p>2.700</p>
          </Grid>

          <Grid item xs={6} md={3}>
            <h2>PARCEIROS</h2>
            <p>AJUDAM NO PROJETO</p>
            <img src={HandsIcon} alt="Ícone - Hands" />
            <p>42</p>
          </Grid>

          <Grid item xs={6} md={3}>
            <h2>EMPREGOS</h2>
            <p>PELO EU CAPACITO</p>
            <img src={PartyIcon} alt="Ícone - Jobs" />
            <p>400</p>
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

      {/* <Box sx={styles.stayTuned}>
        <Grid container>
          <Grid item xs={6}>
            <img src={StayTunedImg} alt="Estrelas" />
          </Grid>

          <Grid item xs={6}>
            <img src={MegaphoneImg} alt="Mulher com megafone" />
          </Grid>
        </Grid>
      </Box> */}
    </Box>
  );
};

export default About;

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
    img: {
      mr: "14px",
      height: "100%",
    },
    "& p": {
      margin: "0",
      fontSize: "18px",
      transform: "none",
      position: "relative",
      lineHeight:"20px"
    },
  },
  containerDepoimento: {
    display: "flex",
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
    "img+p": { color: "#CAC8C8", fontSize: {xs:"2.5rem", md:"50px"}, fontWeight: 700 },
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
