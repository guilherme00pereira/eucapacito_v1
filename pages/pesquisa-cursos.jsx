import {useState, useEffect, useContext} from "react";
import { AppContext } from "../src/services/context";
import {Box, CircularProgress, Drawer} from "@mui/material";
import Filter from "../src/components/Search/Filter";
import apiService from "../src/services/apiService";
import {loading} from "../src/commonStyles/loading"
import Button from "../src/components/Button";
import FilterIcon from "../public/assets/img/filter-icon.svg";
import CourseCard from "../src/components/Course/CourseCard";
import { useRouter } from "next/router";
import Image from "next/image"

const PesquisaCursos = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [filters, setFilters] = useState({
        levels: [],
        ranking: [],
        categories: [],
        partners: []
    });
    const [page, setPage] = useState(1);
    const [hideLoadMoreButton, setHideLoadMoreButton] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const ctx = useContext(AppContext);

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
        const token = sessionStorage.getItem("token")
        token
            ? ctx.setTitle({
                main: "Meus Cursos",
                sub: "Pesquisar um curso iniciado",
            })
            : ctx.setTitle({
                main: "Cursos",
                sub: "Encontre um curso para aprender",
            });
        if(router.isReady) {
            setIsLoading(true);
            let term = router.query.search;
            if (term === null || typeof term === 'undefined') term = ""
            const ids = router.query.t;
            let url = `/eucapacito/v1/search?page=${page}&course=true`;
            if (typeof ids !== 'undefined') {
                url += `&t=${ids}`;
            }
            url += `&search=${term}`;
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
                        type: course.type
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
        }
    }, [page, router.query.search, router.query.t]);

    return (
        <Box sx={styles.root}>

            <Box>
                <div className="titulo">
                    <h1>Cursos</h1>

                    <div className="filter-control">
                        <p>Filtro</p>

                        <Image src={FilterIcon} alt="" onClick={handleDrawer}/>
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
                        <CourseCard url={course.type === 'curso_ec' ? 'curso-ec' : 'course-ec'} course={course} key={course.id} />
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

export default PesquisaCursos;

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
