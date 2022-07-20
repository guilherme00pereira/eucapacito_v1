import { useState, useEffect } from "react";
import { Box, CircularProgress, Drawer } from "@mui/material";
import FilterIcon from "../assets/img/filter-icon.svg";
import apiService from "../services/apiService";
import Filter from "../components/Search/Filter";
import Button from "../components/Button";
import CourseBox from "../components/Search/CourseBox";
import { useSearchParams } from "react-router-dom";

const Search = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [filters, setFilters] = useState({
        levels: [],
        ranking: [],
        categories: [],
        partners: []
    });
    const [total, setTotal] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [page, setPage] = useState(1);
    // const [term, setTerm] = useState('');
    // const [ids, setIds] = useState('');
    const [hideLoadMoreButton, setHideLoadMoreButton] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { api } = apiService;

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
        const term = searchParams.get('search');
        const ids = searchParams.get('t');
        let url = `/eucapacito/v1/search?page=${page}`;
        if(null !== ids) {
            url += `&t=${ids}`;
        }
        if (term === "" || term.length > 3) {
            url += `&search=${term}`;
        }
        setIsLoading(true);
        api.get(url).then((res) => {
            if (parseInt(res["headers"]["x-wp-totalpages"]) === page) {
                setHideLoadMoreButton(true);
            } else {
                setHideLoadMoreButton(false);
            }
            const fetchedCourses = [];
            res.data.courses.forEach((course) => {
                const newCourse = {
                    id: course.id,
                    slug: course.slug,
                    title: course.title,
                    subtitle: course.type === "curso_ec" ? "Parceiro" : "Eu Capacito",
                    partnerLogoURL: course.logo,
                    type: course.type
                };
                fetchedCourses.push(newCourse);
            });
            setTotal(res.data.total);
            setFilters({
                levels: res.data.filters.nivel,
                ranking: res.data.filters.avaliao,
                categories: res.data.filters.categoria_de_curso_ec,
                partners: res.data.filters.parceiro_ec
            })

            page === 1 ? setCourses([...fetchedCourses]) : setCourses([...courses, ...fetchedCourses]);

            setIsLoading(false);
        })
            .catch((error) => {
                setIsLoading(false);
                return false;
            });
    }, [page, searchParams]);

    return (

        <Box sx={styles.root}>


            <Box>
                <div className="titulo">
                    <p>Resultados da pesquisa ({total})</p>

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

                {courses.length > 0 ?
                    courses.map((course) => (
                        <CourseBox
                            key={course.id}
                            courseId={course.id}
                            slug={course.slug}
                            title={course.title}
                            company="Eu Capacito"
                            logoURL={course.partnerLogoURL}
                            type={course.type}
                        />
                    )) : <p>Nenhum curso retornado para o(s) filtro(s) selecionado(s)</p>}
                {isLoading && <CircularProgress sx={styles.loading} />}
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

        </Box>
    );
};

export default Search;

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
    },
    hideLoadMoreButton: {
        display: "none",
        marginTop: "1.5rem",
    },
    loadMoreButton: {
        display: "block",
        margin: "1.5rem auto 0",
    },
    loading: {
        display: "flex",
        margin: "1.5rem auto 0",
        color: "#77837F",
    },
    filter: {
        "& .MuiDrawer-paper": {
            m: "0 auto",
            padding: { xs: 0, md: "1.5rem" },
            width: "100%",
            minWidth: "282px",
            height: { xs: "calc(100% - 56px)", md: "auto" },
            // background: 'rgb(0,0,0)',
            // background: '-moz-linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(39,43,46,1) 100%)',
            // background: '-webkit-linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(39,43,46,1) 100%)',
            background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(39,43,46,1) 100%)',
            filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#272b2e",GradientType=1)',
        },
    },
};
