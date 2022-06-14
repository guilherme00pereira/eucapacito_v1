import {useState, useEffect, useContext} from "react";
import {Box, CircularProgress, Drawer} from "@mui/material";
import FilterIcon from "../assets/img/filter-icon.svg";
import apiService from "../services/apiService";
import Filter from "../components/Search/Filter";
import Button from "../components/Button";
import CourseBox from "../components/Search/CourseBox";
import {SearchContext} from "../contexts/SearchContext";

const Search = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [hideLoadMoreButton, setHideLoadMoreButton] = useState(false);
    const {search, setSearch} = useContext(SearchContext);

    const {api} = apiService;

    // const [searchParams] = useSearchParams();
    // const [searchTerm, setSearchTerm] = useState(searchParams.get("search"));

    const handleLoadMore = () => {
        if (!hideLoadMoreButton) {
            setPage(page + 1);
        }
    };

    const handleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    } 

    const handleFilter = (status) => setDrawerOpen(status);

    useEffect(() => {
        setIsLoading(true);

        api.get(`/wp/v2/curso_ec?_embed&per_page=15&page=${page}&search=${search}`)
            .then((res) => {
                if (parseInt(res["headers"]["x-wp-totalpages"]) === page) {
                    setHideLoadMoreButton(true);
                }

                const fetchedCourses = [];

                res.data.forEach((course) => {
                    const newCourse = {
                        id: course.id,
                        slug: course.slug,
                        title: course.title.rendered,
                        subtitle: course.type === "curso_ec" ? "Eu Capacito" : "Parceiro",
                        partnerLogoURL: course.responsavel.guid,
                    };

                    fetchedCourses.push(newCourse);
                });

                setCourses([...courses, ...fetchedCourses]);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                return false;
            });

            

    }, [page]);

    return (
        <>
            {isLoading && <CircularProgress sx={styles.loading}/>}
            {!isLoading && (
                <Box sx={styles.root}>

                    {courses.length === 0 ? (
                        <p>Não foi encontrado cursos relacionados</p>
                    ) : (
                        <Box>
                            <div className="titulo">
                                <p>Resultados da pesquisa</p>

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
                                    <Filter handleFilter={handleFilter} />
                                </Drawer>
                            </div>

                            <hr/>

                            {courses.map((course) => (
                                <CourseBox
                                    key={course.id}
                                    courseId={course.id}
                                    slug={course.slug}
                                    title={course.title}
                                    company="Eu Capacito"
                                    logoURL={course.partnerLogoURL}
                                />
                            ))}
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
                        </Box>
                    )}
                </Box>
            )}
        </>
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
            padding: {xs: 0, md: "1.5rem"},
            width: "100%",
            minWidth: "282px",
            height: {xs: "calc(100% - 56px)", md: "auto"},
            background: 'rgb(0,0,0)',
            background: '-moz-linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(39,43,46,1) 100%)',
            background: '-webkit-linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(39,43,46,1) 100%)',
            background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(39,43,46,1) 100%)',
            filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#272b2e",GradientType=1)',
        },
    },
};
