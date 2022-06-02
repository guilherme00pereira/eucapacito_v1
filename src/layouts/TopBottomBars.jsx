import { useState } from "react";
import Header from "./Header";
import FooterBar from "./FooterBar";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "@mui/material";

const TopBottomBars = () => {
  const [title, setTitle] = useState({
    main: '',
    sub: '',
  });
  const path = useLocation().pathname;

  // Código para ajustar a imagem da mulher de megafone com o menu inferior
  const paddingBottom =
    path === "/noticias" || path.includes("/oportunidade") ? "3.5rem" : 10;

  return (
    <>
      <Header title={title.main} subtitle={title.sub} />

      <Container sx={{ pt: 3, pb: paddingBottom }}>
        <Outlet context={[title, setTitle]} />
      </Container>

      <FooterBar />
    </>
  );
};

export default TopBottomBars;
