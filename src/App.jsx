import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { SearchContext } from './contexts/SearchContext';

import Theme from './Theme';
import AppSettings from './AppSettings';
import LoginRegister from "./pages/LoginRegister";
import TopBottomBars from "./layouts/TopBottomBars";
import BottomBar from "./layouts/BottomBar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import CoursesEC from "./pages/CoursesEC";
import CourseClass from "./pages/CourseClass";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Partners from "./pages/Partners";
import Content from "./pages/Content";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import News from "./pages/News";
import About from "./pages/About";
import Oportunity from "./pages/Oportunity";
import Oportunities from "./pages/Oportunities";
import Employability from "./pages/Employability";
import EmployabilityRegister from "./pages/EmployabilityRegister";
import Profile from "./pages/Profile";
import Password from "./pages/Password";
import AccountEdition from "./pages/AccountEdition";
import Filter from "./pages/Filter";
import Video from "./pages/Video";
import Videos from "./pages/Videos";
import Ebooks from "./pages/Ebooks";

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
                <Route path="/cursos" element={<Courses />} />
                <Route path="/cursos-ec" element={<CoursesEC />} />
                <Route path="/curso/:slug/:id" element={<Course />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/parceiros" element={<Partners />} />
                <Route path="/conteudo" element={<Content />} />
                <Route path="/blog/:slug/:id" element={<Blog />} />
                <Route path="/blog" element={<Blogs />} />
                <Route path="/video/:slug/:id" element={<Video />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/ebook" element={<Ebooks />} />
                <Route path="/noticias" element={<News />} />
                <Route path="/quem-somos" element={<About />} />
                <Route path="/oportunidade/:slug/:id" element={<Oportunity />} />
                <Route path="/oportunidades" element={<Oportunities />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/editar-senha" element={<Password />} />
                <Route path="/editar-conta" element={<AccountEdition />} />
                <Route path="/filtro" element={<Filter />} />
                <Route path="/empregabilidade" element={<Employability />} />
              </Route>
            </Route>

            <Route element={<BottomBar />}>
              <Route path="/aula" element={<CourseClass />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </SearchContext.Provider>
  );
}

export default App;

