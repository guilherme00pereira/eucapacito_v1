import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

import CourseCard from "../components/CourseCard";

import EuCapacitoLogo from "../assets/img/logo.png";
import EuCapacitoLogoVertical from "../assets/img/logo-vertical.png";

import CourseImg1 from "../assets/img/home-curso1.png";
import CourseImg2 from "../assets/img/home-curso2.png";
import CourseImg3 from "../assets/img/home-curso3.png";
import CourseImg4 from "../assets/img/home-curso4.png";
import CourseLogoFiap from "../assets/img/home-curso-logo-fiap.png";
import CourseLogoMicrosoft from "../assets/img/home-curso-logo-microsoft.png";
import CourseLogoGoogle from "../assets/img/home-curso-logo-google.png";

const CoursesEC = () => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.description}>
        <img src={EuCapacitoLogo} alt="Logo EuCapacito" />
        <p>Cursos exclusivos da plataforma EC</p>
      </Box>

      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="meus-cursos-content"
          id="meus-cursos-header"
        >
          <h2>Cursos Eu Capacito</h2>
        </AccordionSummary>
        <AccordionDetails>
          <Swiper
            className="mySwiper"
            slidesPerView={1.2}
            spaceBetween={25}
            breakpoints={styles.swiper.breakpoints}
            autoplay={styles.swiper.autoplay}
            modules={[Pagination, Navigation, Autoplay]}
          >
            <SwiperSlide>
              <CourseCard
                url={"#"}
                imagePath={CourseImg1}
                title="Design Thinking"
                subtitle="Cadastre-se"
                logoPath={CourseLogoFiap}
              />
            </SwiperSlide>

            <SwiperSlide>
              <CourseCard
                url={"#"}
                imagePath={CourseImg2}
                title="Marketing Digital"
                subtitle="Cadastre-se"
                logoPath={CourseLogoGoogle}
              />
            </SwiperSlide>

            <SwiperSlide>
              <CourseCard
                url={"#"}
                imagePath={CourseImg3}
                title="Visualize dados no Power BI"
                subtitle="Cadastre-se"
                logoPath={CourseLogoMicrosoft}
              />
            </SwiperSlide>

            <SwiperSlide>
              <CourseCard
                url={"#"}
                imagePath={CourseImg4}
                title="Empreendedorismo"
                subtitle="Cadastre-se"
                logoPath={CourseLogoGoogle}
              />
            </SwiperSlide>
          </Swiper>
        </AccordionDetails>
      </Accordion>

      <Box sx={styles.about}>
        <h2>Entenda sobre o Eu Capacito</h2>
        <p>
          O Eu Capacito é um projeto que tem o objetivo de formar uma legião de
          profissionais para a economia digital.
        </p>

        <Swiper
          className="mySwiper"
          slidesPerView={1.2}
          spaceBetween={25}
          breakpoints={styles.swiper.breakpoints}
          autoplay={styles.swiper.autoplay}
          modules={[Pagination, Navigation, Autoplay]}
        >
          <SwiperSlide>
            <CourseCard
              url={"#"}
              imagePath={CourseImg1}
              title="Design Thinking"
              subtitle="Cadastre-se"
              logoPath={CourseLogoFiap}
            />
          </SwiperSlide>

          <SwiperSlide>
            <CourseCard
              url={"#"}
              imagePath={CourseImg2}
              title="Marketing Digital"
              subtitle="Cadastre-se"
              logoPath={CourseLogoGoogle}
            />
          </SwiperSlide>

          <SwiperSlide>
            <CourseCard
              url={"#"}
              imagePath={CourseImg3}
              title="Visualize dados no Power BI"
              subtitle="Cadastre-se"
              logoPath={CourseLogoMicrosoft}
            />
          </SwiperSlide>

          <SwiperSlide>
            <CourseCard
              url={"#"}
              imagePath={CourseImg4}
              title="Empreendedorismo"
              subtitle="Cadastre-se"
              logoPath={CourseLogoGoogle}
            />
          </SwiperSlide>
        </Swiper>
      </Box>

      <Box sx={styles.description}>
        <img src={EuCapacitoLogoVertical} alt="Logo EuCapacito" />
      </Box>
    </Box>
  );
};

export default CoursesEC;

const styles = {
  swiper: {
    autoplay: {
      delay: 4000,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  },
  root: {
    "& .MuiAccordion-root:nth-of-type(2)": {
      borderTop: "1px solid #77837F",
    },
    //css desktop
    "& .swiper-slide": {
      width: {
        sx: "100%",
        md: "31.5% !important",
      },
    },
  },
  description: {
    textAlign: "center",
    //css desktop
    marginTop: {
      md: "70px",
    },
    "& p": {
      m: "0.5rem 0 2.5rem",
      color: "#CAC8C8",
      fontSize: "0.9rem",
      fontWeight: 500,
      lineHeight: "1.6rem",
    },
  },
  about: {
    "& h2": {
      margin: "1.25rem 0",
      fontSize: "1rem",
      fontWeight: 500,
    },
    "& h2+p": {
      mb: "2rem",
      color: "#77837F",
      fontSize: "0.7rem",
      fontWeight: 600,
      lineHeight: "1.6rem",
    },
  },
};
