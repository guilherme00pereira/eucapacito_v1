import FooterBar from "./FooterBar";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "@mui/material";

const BottomBar = () => {
  const path = useLocation().pathname;

  // Código para ajustar a imagem da mulher de megafone com o menu inferior
  let paddingBottom = "80px";

  if (path === "/noticias" || path.includes("/curso/")) {
    paddingBottom = "56px";
  }

  return (
    <>
      <Container sx={{ pt: 3, pb: paddingBottom }}>
        <Outlet />
      </Container>

      <FooterBar />
    </>
  );
};

export default BottomBar;
