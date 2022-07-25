import {useState, useEffect} from "react";
import {useOutletContext} from "react-router-dom";
import {Box} from "@mui/material";
import apiService from "../services/apiService";
import {useSearchParams} from "react-router-dom";
import ContentTitle from "../components/Content/ContentTitle";
import ContentCard from "../components/ContentCard";
import {Swiper, SwiperSlide} from "swiper/react";
import {swiper} from "../commonStyles/swiper";
import {Autoplay, Pagination} from "swiper";
import parse from "html-react-parser";

const Courses = () => {
    const token = sessionStorage.getItem("token");
    const userID = sessionStorage.getItem("userID");

    const [myCourses, setMyCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [journeys, setJourneys] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [hideLoadMoreButton, setHideLoadMoreButton] = useState(false);
    const [title, setTitle] = useOutletContext();

    const postsPerPage = "9";
    const {api} = apiService;

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

        if (token) {
            api.get(`/ldlms/v2/users/${userID}/courses`, {
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
                const myFetchedCourses = [];
                res.data.forEach((course) => {
                    myFetchedCourses.push({
                        id: course.id,
                        slug: course.slug,
                        featuredImg: course.image,
                        title: course.title.rendered,
                        subtitle: "Eu Capacito",
                        partnerLogoURL: course.logo,
                    });
                });
                sessionStorage.setItem("userCourses", myFetchedCourses.map((course) => course.id))
                setMyCourses([...myFetchedCourses]);
            });
        }

        const ids = searchParams.get('t');
        let url = `/eucapacito/v1/search?page=${page}&course=true`;
        if (null !== ids) {
            url += `&t=${ids}`;
        }
        api.get(url).then((res) => {
            if (parseInt(res["headers"]["x-wp-totalpages"]) === page) {
                setHideLoadMoreButton(true);
            }

            const fetchedCourses = [];

            res.data.courses.forEach((course) => {
                fetchedCourses.push({
                    id: course.id,
                    slug: course.slug,
                    featuredImg: course.image,
                    title: course.title,
                    subtitle: "Eu Capacito",
                    partnerLogoURL: course.logo,
                    type: course.type
                });
            });
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

            {token &&
                <>
                    <Box>
                        <div className="titulo">
                            <h1>Meus Cursos</h1>
                        </div>
                        <hr/>
                    </Box>

                    <Swiper
                        className="mySwiper"
                        slidesPerView={1.2}
                        spaceBetween={25}
                        breakpoints={swiper.breakpoints}
                        autoplay={swiper.autoplay}
                        modules={[Pagination, Autoplay]}
                        pagination={{clickable: true}}
                    >
                        {myCourses.length > 0 &&
                            myCourses.map((course) => (
                                <SwiperSlide
                                    className="card-desk"
                                    key={course.id + Math.random()}
                                >
                                    <ContentCard
                                        url={`/course-ec/${course.slug}`}
                                        imagePath={course.featuredImg}
                                        title={course.title}
                                        subtitle="Acessar"
                                        logoPath={course.partnerLogoURL}
                                    />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </>
            }


            <ContentTitle title="Cursos" to={'/pesquisa-cursos'} linkText="Todos os cursos"/>
            <Swiper
                className="mySwiper"
                slidesPerView={1.2}
                spaceBetween={25}
                breakpoints={swiper.breakpoints}
                autoplay={swiper.autoplay}
                modules={[Pagination, Autoplay]}
                pagination={{clickable: true}}
            >
                {courses.length > 0 &&
                    courses.map((course) => (
                        <SwiperSlide
                            className="card-desk"
                            key={course.id + Math.random()}
                        >
                            <ContentCard
                                url={course.type === 'curso_ec' ? `/curso-ec/${course.slug}` : `/course-ec/${course.slug}`}
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
                    <h1>Jornadas</h1>
                </div>
                <hr/>
            </Box>

            <Swiper
                className="mySwiper"
                slidesPerView={1.2}
                spaceBetween={25}
                breakpoints={swiper.breakpoints}
                autoplay={swiper.autoplay}
                modules={[Pagination, Autoplay]}
                pagination={{clickable: true}}
            >
                {journeys.length > 0 &&
                    journeys.map((journey) => (
                        <SwiperSlide
                            className="card-desk"
                            key={journey.id + Math.random()}
                        >
                            <ContentCard
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
        h1: {marginTop: "2rem", fontSize: "20px", color: "#CAC8C8"},
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
                xs: "50px",
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
            padding: {xs: 0, md: "1.5rem"},
            width: "100%",
            minWidth: "282px",
            height: {xs: "calc(100% - 56px)", md: "auto"},
            background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(39,43,46,1) 100%)',
            filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#272b2e",GradientType=1)',
        },
    },
};
