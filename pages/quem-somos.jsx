import { useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Link as MuiLink, Stack,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import {Instagram, Facebook, LinkedIn} from "@mui/icons-material";
import YouTube from "@mui/icons-material/YouTube";
import apiService from "../src/services/apiService";
import parse from 'html-react-parser';
import { AppContext } from "../src/services/context";
import PeopleIcon from "../public/assets/img/quem-icone-pessoas.png";
import CheckIcon from "../public/assets/img/quem-icone-check.png";
import HandsIcon from "../public/assets/img/noticias-icone-parceiros.png";
import PartyIcon from "../public/assets/img/noticias-icone-festa.png";
import EuCapacitoLogoVertical from "../public/assets/img/logo-vertical.png";
import linhaQuemSomos from "../public/assets/img/linha-quem-somos.png";
import Image from 'next/future/image';
import SEO from '../src/seo'
import {extractYoastData} from "../src/services/helper";
import dynamic from "next/dynamic";
import {swiper} from "../src/commonStyles/swiper";
import {Autoplay, Pagination} from "swiper";
import depoimentos from "../src/data/depoimentos.json"
import TestimonyCard from "../src/components/About/TestimonyCard";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false })

const QuemSomos = ({ content, metadata }) => {
  const ctx = useContext(AppContext);
  
  useEffect(() => {
    ctx.setTitle({
      main: "Quem Somos",
      sub: "Saiba mais sobre",
    });
    
  }, []);

  return (
    <Box sx={styles.root}>

      <SEO metadata={metadata} />

      <h1>Sobre o Eu Capacito</h1>
      <hr />

      <Box container sx={{ display: "flex", justifyContent: "center", mt: "57px" }}>
        <ReactPlayer url={content.video} />
      </Box>

      <Box sx={styles.texto}>
        <div className="textContent">
          {parse(content.lide)}
        </div>

        <Container sx={styles.containerParaQuem}>
          <div className="forWhoTitle">
            <h5>PARA QUEM É?</h5>
          </div>

          <Stack direction="row" spacing={4} justifyContent="space-evenly" flexWrap="wrap" alignItems="center" className="forWhoTopics">
            {content.forwho.map((item) => (
                <Box sx={styles.boxInfo}>
                    <p>{item}</p>
                  </Box>
            ))}
          </Stack>
        </Container>

        <div className="textContent">
          {parse(content.full_text)}
        </div>

      </Box>

      <Box sx={styles.icons}>
        <Grid container>
          <Grid item xs={6} md={3}>
            <h2>{content.alunos_title}</h2>
            <p>MATRICULADOS</p>
            <Image src={PeopleIcon} alt="Ícone - Pessoas" />
            <p>{content.alunos_info}</p>
          </Grid>

          <Grid item xs={6} md={3}>
            <h2>{content.conclusao_title}</h2>
            <p>CURSOS FINALIZADOS</p>
            <Image src={CheckIcon} alt="Ícone - Check" />
            <p>{content.conclusao_info}</p>
          </Grid>

          <Grid item xs={6} md={3}>
            <h2>{content.parceiros_title}</h2>
            <p>AJUDAM NO PROJETO</p>
            <Image src={HandsIcon} alt="Ícone - Hands" />
            <p>{content.parceiros_info}</p>
          </Grid>

          <Grid item xs={6} md={3}>
            <h2>{content.empregos_title}</h2>
            <p>PELO EU CAPACITO</p>
            <Image src={PartyIcon} alt="Ícone - Jobs" />
            <p>{content.empregos_info}</p>
          </Grid>
        </Grid>
      </Box>

      <Box sx={styles.boxDepoimento}>
        <Stack display="flex" direction="row" justifyContent="between" className="depoimentoHead">
          <h2>Depoimentos</h2>
        </Stack>
        <Swiper
            slidesPerView={1.2}
            spaceBetween={10}
            breakpoints={swiper.breakpoints}
            autoplay={swiper.autoplay}
            modules={[Pagination, Autoplay]}
            pagination={{clickable: true}}
        >
          {depoimentos.map(d => (
              <SwiperSlide className="card-desk">
                  <TestimonyCard testimonial={d} />
              </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box sx={styles.description}>
        <Image src={EuCapacitoLogoVertical} alt="Logo EuCapacito" />
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


export async function getStaticProps() {
  const {api}     = apiService;
  let res         = await api.get('/eucapacito/v1/aboutpage')
  const content = {
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
    }

    res       = await api.get("/wp/v2/pages/" + process.env.PAGE_ABOUT)
  const metadata  = extractYoastData(res.data.yoast_head_json)
    return { props: { content, metadata }}
}

export default QuemSomos;

const styles = {
  containerParaQuem: {
    display: {
      md: "flex",
      xs: "none",
    },
    justifyContent: "space-around",
    width: "90%",
    height: "220px",
    position: "relative",
    "& .forWhoTitle": {
      width: "5%",
      transform: " rotate(270deg)",
      color: "#77837F !important",
      fontSize: "30px !important",
    },
    "& h5": {
      width: "200px",
      ml: "-70px"
    },
    "& p": {
      color: "#CAC8C8",
      fontSize: "18px",
      fontWeight: "500",
      textAlign: "left",
    },
    "& .forWhoTopics": {
      width: "100%",
      ml: "-30px"
    },
    my: "90px",
    paddingBottom: "0px !important",
  },
  boxInfo: {
    width: "360px",
    display: "flex",
    alignItems: "flex-start",
    m: "0 0 15px 0 !important",
    pl: "17px",
    backgroundImage: `url(${linhaQuemSomos.src})`,
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
  boxDepoimento: {
    margin: "20px auto",
    width: "90%",
    "& h2": {
      fontSize: "20px"
    },
    "& .depoimentoHead": {
      fontStyle: "italic",
      textTransform: "uppercase"
    },
    "& .swiper-pagination-bullet": {
      background: "#33EDAC",
    },
    "& .swiper-pagination-bullet-active": {
      background: "#33EDAC",
    },
    "& .swiper-slide": {
      mb: {
        xs: "50px",
        md: "50px",
      },
    }
  },
  texto: {
    margin: "70px auto",
    "& .textContent": {
      fontStyle: "italic",
      lineHeight: "28px",
      fontSize: "16px",
      fontWeight: "600",
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
