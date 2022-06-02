import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import NewsPost from "../components/News/NewsPost";
import PeopleIcon from "../assets/img/noticias-icone-pessoas.png";
import CheckIcon from "../assets/img/noticias-icone-check.png";
import HandsIcon from "../assets/img/noticias-icone-parceiros.png";
import PartyIcon from "../assets/img/noticias-icone-festa.png";
import StayTunedImg from "../assets/img/noticias-fique-ligado.png";
import MegaphoneImg from "../assets/img/noticias-megafone.png";

const News = () => {
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle({
      main: "Conteúdo",
      sub: "Leia o conteúdo da semana",
    });
  }, []);

  return (
    <Box sx={styles.root}>
      <h1>Últimas Notícias</h1>
      <hr />

      <Box container sx={styles.news}>
        <NewsPost />
        <NewsPost />
      </Box>

      <hr />

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

      <Box sx={styles.stayTuned}>
        <Grid container>
          <Grid item xs={6}>
            <img src={StayTunedImg} alt="Estrelas" />
          </Grid>

          <Grid item xs={6}>
            <img src={MegaphoneImg} alt="Mulher com megafone" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default News;

const styles = {
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
    "& .MuiGrid-root h2":{
        marginLeft:{
            md:"15px",
            xl:"0px"
        }
    }
  },
  icons: {
    py: "1.5rem",
    h2: { m: "0 0 0.25rem", fontSize: "1.375rem" },
    "& p": {
      m: "0 0 1.25rem",
      color: "#77837F",
      fontSize: "0.625rem",
      fontWeight: 500,
    },
    img: { mb: "0.75rem" },
    "img+p": { color: "#CAC8C8", fontSize: "2.5rem", fontWeight: 700 },
    "& .MuiGrid-item": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  stayTuned: {
    "& .MuiGrid-item": {
      maxWidth: "48%",
    },
    "& .MuiGrid-item:first-of-type": {
      textAlign: "right",
    },
    "& .MuiGrid-item:last-of-type": {
      textAlign: "left",
      img: { display: "block" },
    },
    //css desktop
    display: {
      md: "none",
    },
  },
};
