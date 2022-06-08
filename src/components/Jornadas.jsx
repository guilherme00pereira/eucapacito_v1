import { Box, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";

import CourseCard from "./CourseCard";
import Link from "./Link";

import CourseImg1 from "../assets/img/home-curso1.png";
import CourseImg2 from "../assets/img/home-curso2.png";
import CourseImg3 from "../assets/img/home-curso3.png";
import CourseImg4 from "../assets/img/home-curso4.png";
import CourseLogoFiap from "../assets/img/home-curso-logo-fiap.png";
import CourseLogoMicrosoft from "../assets/img/home-curso-logo-microsoft.png";
import CourseLogoGoogle from "../assets/img/home-curso-logo-google.png";

const Jornadas = () => {
  return (
    <Container>
      <Box sx={styles.courses}>
        <Swiper
          className="mySwiper"
          slidesPerView={1.2}
          spaceBetween={25}
          autoplay={styles.swiper.autoplay}
          modules={[Pagination, Navigation, Autoplay]}
          navigation={true}
        >
          <SwiperSlide className="card-desk">
            <CourseCard
              url={"#"}
              imagePath={CourseImg1}
              title="Design Thinking"
              subtitle="Cadastre-se"
              logoPath={CourseLogoFiap}
            />
          </SwiperSlide>

          <SwiperSlide className="card-desk">
            <CourseCard
              url={"#"}
              imagePath={CourseImg2}
              title="Marketing Digital"
              subtitle="Cadastre-se"
              logoPath={CourseLogoGoogle}
            />
          </SwiperSlide>

          <SwiperSlide className="card-desk">
            <CourseCard
              url={"#"}
              imagePath={CourseImg3}
              title="Visualize dados no Power BI"
              subtitle="Cadastre-se"
              logoPath={CourseLogoMicrosoft}
            />
          </SwiperSlide>

          <SwiperSlide className="card-desk">
            <CourseCard
              url={"#"}
              imagePath={CourseImg3}
              title="Empreendedorismo"
              subtitle="Cadastre-se"
              logoPath={CourseLogoGoogle}
            />
          </SwiperSlide>
        </Swiper>
      </Box>
    </Container>
  );
};

export default Jornadas;

const styles = {
  swiper: {
    autoplay: {
      delay: 4000,
    },
  },
  courses: {
      display:{
          md:"block",
          xs:"none"
      },
    "& .swiper-slide": {
        width: {
          sx: "100%",
          md: "31.5% !important",
        },
      },
      "& .swiper-wrapper": {
        width: {
          sx: "100%",
          md: "86%",
        },
        ml: {
          md: "50px",
          xs: "0",
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
    },
    "& .swiper-button-next:after": {
        display: {
          md: "block",
          xs: "none",
        },
        fontSize: "20px",
        fontWeight: "bold",
        color: "#33EDAC",
      },
      "& .swiper-button-prev:after": {
        display: {
          md: "block",
          xs: "none",
        },
        fontSize: "20px",
        fontWeight: "bold",
        color: "#33EDAC",
      },
  },
};
