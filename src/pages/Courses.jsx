import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Drawer} from "@mui/material";
import Filter from "../components/Search/Filter";
import apiService from "../services/apiService";
import { useSearchParams } from "react-router-dom";
import { loading } from "../commonStyles/loading"
import Button from "../components/Button";
import CourseCard from "../components/CourseCard";
import FilterIcon from "../assets/img/filter-icon.svg";
import {ExpandMore} from "@mui/icons-material";
import {Swiper, SwiperSlide} from "swiper/react";
import {swiper} from "../commonStyles/swiper";
import {Autoplay, Pagination} from "swiper";

const Courses = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [courses, setCourses] = useState([]);
  const [journeys, setJourneys] = useState([]);
  const [filters, setFilters] = useState({
    levels: [],
    ranking: [],
    categories: [],
    partners: []
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [hideLoadMoreButton, setHideLoadMoreButton] = useState(false);
  const [title, setTitle] = useOutletContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const postsPerPage = "9";
  const { api } = apiService;

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  const handleModal = (status) => setDrawerOpen(status);

  useEffect(() => {
    token
      ? setTitle({
        main: "Meus Cursos",
        sub: "Pesquisar um curso iniciado",
      })
      : setTitle({
        main: "Cursos",
        sub: "Encontre um curso para aprender",
      });

    const ids = searchParams.get('t');
    let url = `/eucapacito/v1/search?page=${page}`;
    if(null !== ids) {
      url += `&t=${ids}`;
    }
      api.get(url).then((res) => {
        if (parseInt(res["headers"]["x-wp-totalpages"]) === page) {
          setHideLoadMoreButton(true);
        }

        const fetchedCourses = [];

        res.data.courses.forEach((course) => {
          const newCourse = {
            id: course.id,
            slug: course.slug,
            featuredImg: course.image,
            title: course.title,
            subtitle: "Eu Capacito",
            partnerLogoURL: course.logo,
          };

          fetchedCourses.push(newCourse);
        });

        setFilters({
          levels: res.data.filters.nivel,
          ranking: res.data.filters.avaliao,
          categories: res.data.filters.categoria_de_curso_ec,
          partners: res.data.filters.parceiro_ec
      })
        if (page === 1) {
            setCourses([...fetchedCourses]);
        } else {
            setCourses([...courses, ...fetchedCourses]);
        }

      });

    api.get(`/wp/v2/jornada?per_page=${postsPerPage}`).then((res) => {
      const fetchedJourneys = [];

      res.data.forEach((journey) => {
        fetchedJourneys.push({
          id: journey.id,
          slug: journey.slug,
          featuredImg: journey.image,
          title: journey.title.rendered,
          excerpt: journey.excerpt.rendered,
        });
        setJourneys([...fetchedJourneys]);
      });
    });

  }, []);

  return (
    <Box sx={styles.root}>

      <Box>
        <div className="titulo">
            <p>Cursos</p>

            <div className="filter-control">
              <p>Filtro</p>

              <img src={FilterIcon} alt="" onClick={handleDrawer} />
            </div>

            <Drawer
              anchor="top"
              open={drawerOpen}
              onClose={handleDrawer}
              ModalProps={{
                BackdropProps: { sx: { backgroundColor: "unset" } },
              }}
              sx={styles.filter}
            >
              <Filter handleModal={handleModal} filters={filters} />
            </Drawer>
          </div>

          <hr />
      </Box>


          <Swiper
              className="mySwiper"
              slidesPerView={1.2}
              spaceBetween={25}
              breakpoints={swiper.breakpoints}
              autoplay={swiper.autoplay}
              modules={[Pagination, Autoplay]}
              pagination={{clickable:true}}
          >
           {courses.length > 0 &&
                courses.map((course) => (
                    <SwiperSlide
                        className="card-desk"
                        key={course.id + Math.random()}
                    >
                      <CourseCard
                          url={`/curso-ec/${course.slug}`}
                          imagePath={course.featuredImg}
                          title={course.title}
                          subtitle="Cadastre-se"
                          logoPath={course.partnerLogoURL}
                      />
                    </SwiperSlide>
                ))}
          </Swiper>

      <Box>
        <div className="titulo">
          <p>Jornadas</p>
        </div>
        <hr />
      </Box>

      <Swiper
          className="mySwiper"
          slidesPerView={1.2}
          spaceBetween={25}
          breakpoints={swiper.breakpoints}
          autoplay={swiper.autoplay}
          modules={[Pagination, Autoplay]}
          pagination={{clickable:true}}
      >
        {journeys.length > 0 &&
            journeys.map((journey) => (
                <SwiperSlide
                    className="card-desk"
                    key={journey.id + Math.random()}
                >
                  <CourseCard
                      url={`/jornada/${journey.slug}`}
                      imagePath={journey.featuredImg}
                      title={journey.title}
                      subtitle="Cadastre-se"
                      logoPath={journey.partnerLogoURL}
                  />
                </SwiperSlide>
            ))}
      </Swiper>

    </Box>
  );
};

export default Courses;

const styles = {
  root: {
    hr: {
      border: 0,
      borderTop: "1px solid #77837F",
      pb: "20px",
      mt: "0px"
    },
    "& p": {
      fontWeight: 500,
    },
    "& .titulo": {
      display: "flex",
      justifyContent: "space-between",
    },
    "& .filter-control": {
      display: "flex",
      alignItems: "center",
      "& p + img": {
        ml: "0.75rem",
      },
      "& p + img:hover": {
        cursor: "pointer",
      },
    },
    "& .swiper-pagination-bullet": {
      background: "#33EDAC",
    },
    "& .swiper-pagination-bullet-active": {
      background: "#33EDAC",
    },
    "& .swiper-slide": {
      mb: {
        xs: "0",
        md: "50px",
      },
    }
  },
  tabPanelBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  hideLoadMoreButton: {
    display: "none",
  },
  loadMoreButton: {
    display: "block",
    margin: "0 auto 3rem",
  },
  filter: {
    "& .MuiDrawer-paper": {
      m: "0 auto",
      padding: { xs: 0, md: "1.5rem" },
      width: "100%",
      minWidth: "282px",
      height: { xs: "calc(100% - 56px)", md: "auto" },
      background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(39,43,46,1) 100%)',
      filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#272b2e",GradientType=1)',
    },
  },
};
