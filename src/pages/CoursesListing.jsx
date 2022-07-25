import {useState, useEffect} from "react";
import {useOutletContext} from "react-router-dom";
import {Box, CircularProgress, Drawer} from "@mui/material";
import Filter from "../components/Search/Filter";
import apiService from "../services/apiService";
import {useSearchParams} from "react-router-dom";
import {loading} from "../commonStyles/loading"
import Button from "../components/Button";
import FilterIcon from "../assets/img/filter-icon.svg";
import CourseCard from "../components/Course/CourseCard";

const Courses = () => {
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([]);
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

    const {api} = apiService;

    const handleLoadMore = () => {
        if (!hideLoadMoreButton) {
            setPage(page + 1);
        }
    };

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

        setIsLoading(true);
        const term = searchParams.get('search');
        const ids = searchParams.get('t');
        let url = `/eucapacito/v1/search?page=${page}&course=true`;
        if(null !== ids) {
            url += `&t=${ids}`;
        }
        if (term === "" || term.length > 3) {
            url += `&search=${term}`;
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
            setIsLoading(false);
        })
            .catch((error) => {
                setIsLoading(false);
                return false;
            });
    }, [page, token, searchParams]);

    return (
        <Box sx={styles.root}>

            <Box>
                <div className="titulo">
                    <h1>Cursos</h1>

                    <div className="filter-control">
                        <p>Filtro</p>

                        <img src={FilterIcon} alt="" onClick={handleDrawer}/>
                    </div>

                    <Drawer
                        anchor="top"
                        open={drawerOpen}
                        onClose={handleDrawer}
                        ModalProps={{
                            BackdropProps: {sx: {backgroundColor: "unset"}},
                        }}
                        sx={styles.filter}
                    >
                        <Filter handleModal={handleModal} filters={filters}/>
                    </Drawer>
                </div>

                <hr/>
            </Box>

            <Box sx={styles.tabPanelBox}>
                {courses.length > 0 ?
                    courses.map((course) => (
                        <CourseCard course={course} key={course.id} />
                    )) : <p>Nenhum curso retornado para o(s) filtro(s) selecionado(s)</p>}
            </Box>
            {isLoading && <CircularProgress sx={loading.circular}/>}
            {!isLoading && (
                <Button
                    sx={
                        hideLoadMoreButton
                            ? styles.hideLoadMoreButton
                            : styles.loadMoreButton
                    }
                    onClick={handleLoadMore}
                >
                    Ver mais
                </Button>
            )}
        </Box>
    );
};

export default Courses;

const styles = {
    root: {
        h1: { marginTop: "2rem", fontSize: "20px", color: "#CAC8C8" },
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
