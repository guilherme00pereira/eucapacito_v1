import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { SearchContext } from './ApplicationContexts';

import Theme from './Theme';
import AppSettings from './AppSettings';
import LoginRegister from "./pages/LoginRegister";
import TopBottomBars from "./layouts/TopBottomBars";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Partners from "./pages/Partners";
import Content from "./pages/Content";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import News from "./pages/News";
import About from "./pages/About";
import Scholarship from "./pages/Scholarship";
import Oportunities from "./pages/Oportunities";
import Employability from "./pages/Employability";
import EmployabilityRegister from "./pages/EmployabilityRegister";
import Profile from "./pages/Profile";
import Password from "./pages/Password";
import AccountEdition from "./pages/AccountEdition";
import Filter from "./components/Search/Filter";
import Video from "./pages/Video";
import Videos from "./pages/Videos";
import Ebooks from "./pages/Ebooks";
import Finished from "./pages/Finished";
import Journey from "./pages/Journey";
import CoursesListing from "./pages/CoursesListing";
import TermsAndServices from "./pages/TermsAndServices"
import CourseLD from "./pages/CourseLD";
import Lessons from "./pages/Lessons"
import Lesson from "./pages/Lesson";
import Quizz from "./pages/Quizz";
import QuizzComplete from "./pages/QuizzComplete";
import Certification from "./pages/Certification";
import Temp from "./pages/Temp";


function App() {
  // const navigate = useNavigate();
  // const handleBackPage = () => navigate(-1);

  const [search, setSearch] = useState('');

  return (
    <SearchContext.Provider value={{search, setSearch}}>
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppSettings />}>
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/registrar" element={<LoginRegister />} />
              <Route path="/recuperar-senha" element={<LoginRegister />} />
              <Route path="/empregabilidade/registrar" element={<EmployabilityRegister />} />

              <Route element={<TopBottomBars />}>
                <Route path="/" element={<Home />} />
                <Route path="/procurar" element={<Search />} />
                <Route path="/todos-os-cursos" element={<CoursesListing />} />
                <Route path="/cursos" element={<Courses />} />
                <Route path="/course-ec/:slug" element={<CourseLD />} />
                <Route path="/lessons/:slug/:id" element={<Lesson />} />
                <Route path=":slug/aulas/:id" element={<Lessons />} />
                <Route path="/quizzes/:slug/:id" element={<Quizz />} />
                <Route path="/teste-concluido/:id" element={<QuizzComplete />} />
                <Route path="/certificado/:id" element={<Certification />} />
                <Route path="/curso-ec/:slug" element={<Course />} />
                <Route path="/jornada/:slug" element={<Journey />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/parceiros" element={<Partners />} />
                <Route path="/conteudo" element={<Content />} />
                <Route path="/:slug" element={<Blog />} />
                <Route path="/blog" element={<Blogs />} />
                <Route path="/video/:slug" element={<Video />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/ebooks/" element={<Ebooks />} />
                <Route path="/noticias" element={<News />} />
                <Route path="/quem-somos" element={<About />} />
                <Route path="/bolsa-de-estudo/:slug" element={<Scholarship />} />
                <Route path="/empregabilidade/:slug" element={<Employability />} />
                <Route path="/oportunidades" element={<Oportunities />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/editar-senha" element={<Password />} />
                <Route path="/editar-conta" element={<AccountEdition />} />
                <Route path="/filtro" element={<Filter />} />
                <Route path="/comece-agora/:slug" element={<EmployabilityRegister />} />
                <Route path="/concluido" element={<Finished />} />
                <Route path="/termos-e-servicos" element={<TermsAndServices />} />
                <Route path="/pesquisa-de-satisfacao" element={<Temp />} />
              </Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </SearchContext.Provider>
  );
}

export default App;

