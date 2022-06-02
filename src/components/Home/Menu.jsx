import { Box } from "@mui/material";
import MenuLink from "./MenuLink";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import CursosIcon from "../../assets/img/home-cursos.png";
import CursosECIcon from "../../assets/img/home-cursos-ec.png";
import InfoIcon from "../../assets/img/home-informacao.png";
import OportunidadeIcon from "../../assets/img/home-oportunidade.png";
import CarreirasIcon from "../../assets/img/home-carreiras.png";
import ConteudoIcon from "../../assets/img/home-conteudo.png";
import NoticiasIcon from "../../assets/img/home-noticias.png";
import ParceirosIcon from "../../assets/img/home-parceiros.png";
import ContatoIcon from "../../assets/img/home-contato.png";

const Menu = ({ sx }) => {
  return (
    <Box
      sx={{
        ...sx,
        //desktop css
        "& .swiper-slide": {
          flexShrink: {
            md: "1",
          },
          margin: {
            md: "0 20px",
          },
        },
      }}
    >
      <Swiper
        className="mySwiper"
        modules={[Navigation]}
        slidesPerView={3.3}
        // navigation={true}
      >
        <SwiperSlide>
          <MenuLink to="/cursos" imagePath={CursosIcon} title="Cursos" />
        </SwiperSlide>
        {/* <SwiperSlide>
          <MenuLink to="/cursos-ec" imagePath={CursosECIcon} title="Cursos EC" />
        </SwiperSlide> */}
        {/* <SwiperSlide>
          <MenuLink to="#" imagePath={CarreirasIcon} title="Carreiras" />
        </SwiperSlide> */}
        <SwiperSlide>
          <MenuLink
            to="/oportunidades"
            imagePath={OportunidadeIcon}
            title="Oportunidade"
          />
        </SwiperSlide>
        <SwiperSlide>
          <MenuLink to="/conteudo" imagePath={ConteudoIcon} title="Conteúdo" />
        </SwiperSlide>
        {/* <SwiperSlide>
          <MenuLink to="/noticias" imagePath={NoticiasIcon} title="Notícias" />
        </SwiperSlide> */}
        <SwiperSlide>
          <MenuLink
            to="/parceiros"
            imagePath={ParceirosIcon}
            title="Parceiros"
          />
        </SwiperSlide>
        <SwiperSlide>
          <MenuLink to="/contato" imagePath={ContatoIcon} title="Contato" />
        </SwiperSlide>
        <SwiperSlide>
          <MenuLink
            to="/quem-somos"
            imagePath={ContatoIcon}
            title="Quem Somos"
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Menu;
