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
  const [courseData, setCourseData] = useState({
      featuredImg: "",
      title: "",
      duration: "",
      quizz: "",
  });
  const [userSteps, setUserSteps] = useState([]);
  const path = useLocation().pathname;

  // Código para ajustar a imagem da mulher de megafone com o menu inferior
  /* const paddingBottom =
    path === "/noticias" || path.includes("/oportunidade") ? "3.5rem" : 10; */

  return (
    <>
      <Header title={title.main} subtitle={title.sub} />

      <Container sx={{ pt: 3, pb: 10 }}>
        <Outlet context={[title, setTitle, courseData, setCourseData, userSteps, setUserSteps]} />
      </Container>

      <FooterBar />
    </>
  );
};

export default TopBottomBars;
