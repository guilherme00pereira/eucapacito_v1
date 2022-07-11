import {useState, useEffect} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import apiService from "../services/apiService";
import parse from "html-react-parser";
import {Box, CircularProgress, Grid} from "@mui/material";
import {AccessTime, PlayCircleOutlined} from "@mui/icons-material";
import Button from "../components/Button";
import LessonCard from "../components/Course/LessonCard";

const Lessons = () => {
    const [courseData, setCourseData] = useState({
        featuredImg: "",
        title: "",
        duration: "",
    });
    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = sessionStorage.getItem("token");
    const {api} = apiService;
    const {id} = useParams();

    useEffect(() => {
        api.get(`/ldlms/v1/sfwd-lessons?course=${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            const fetchedVideos = []
            res.data.forEach((video) => {
                fetchedVideos.push({
                    id: video.id,
                    title: video.title.rendered
                })
                setLessons([...fetchedVideos]);
            })
            setIsLoading(false);
        });

        api.get(`/ldlms/v2/sfwd-courses/${id}`).then((res) => {
            const course = res.data;
            setCourseData({
                featuredImg: course.image,
                title: parse(`${course.title.rendered}`),
                duration: course.duracao,
            });
            setIsLoading(false);
        });
    }, [api]);

    return (
        <>
            {isLoading && <CircularProgress sx={styles.loading} />}
            {!isLoading && (
                <Box sx={styles.root}>
                    <Box sx={styles.image}>
                        <img src={courseData.featuredImg} alt={courseData.title}/>
                    </Box>

                    <Box sx={styles.container}>
                        <Box sx={styles.description}>
                            <h1>{courseData.title}</h1>
                            <Grid container sx={styles.topinfo}>
                                <Grid item xs={2}>
                                    <p>
                                        <PlayCircleOutlined sx={styles.topinfo.icons}/>
                                        {lessons.length} Vídeos
                                    </p>
                                </Grid>
                                <Grid item xs={2}>
                                    <p>
                                        <AccessTime sx={styles.topinfo.icons}/>
                                        {courseData.duration}
                                    </p>
                                </Grid>
                            </Grid>

                            <Grid>
                                {lessons.length > 0 &&
                                    lessons.map((lesson) => (
                                        <LessonCard lesson={lesson} />
                                    ))
                                }
                            </Grid>

                            <Box sx={styles.button}>
                                {token && (
                                    <Button
                                        href="#"
                                        sx={styles.courseLink}
                                    >
                                        Iniciar Prova
                                    </Button>
                                )}
                            </Box>
                        </Box>

                    </Box>
                </Box>)}
        </>
    );
};

export default Lessons;


const styles = {
    root: {
        mx: "-16px",
        mt: {
            md: "-48px",
            xs: "-24px"
        },
        h1: {
            fontSize: {xs: "16px", md: "32px"},
            fontWeight: {md: "500", xs: "700"},
            color: "#CAC8C8",
            textAlign: {
                md: "center",
                xs: "left",
            },
            borderBottom: {
                xs: "none",
                md: "1px solid #77837f",
            },
            paddingBottom: {
                md: "23px",
                xs: "0",
            },
        },
        h2: {
            fontSize: "1.3rem",
            fontWeight: 500,
        },
    },
    image: {
        minHeight: "350px",
        maxHeight: "533px",
        mt: "-24px",
        img: {
            width: "100%",
        },
    },
    container: {
        p: {
            md: "1rem 70px",
            xs: "1rem 1.5rem 2rem",
        },
        mt: "-149px",
        borderRadius: "20px 20px 0 0",
        filter: {
            md: "drop-shadow(0px -6px 12px #33EDAC)",
            xs: "drop-shadow(0px -6px 44px #33EDAC)",
        },
        minHeight: {
            md: "calc(100vh - 600px)",
            xs: "calc(100vh - 250px)",
        },
        backgroundImage: "linear-gradient(to right, #0E0E0E, #292C2F)", //`url(${imagemFundo})`,
        backgroundSize: "cover",
        backgroundPosition: "50%",
        position: "relative",
        zIndex: 9,
    },
    topinfo: {
            //css desktop
            flexWrap: {
                md: "nowrap",
                xs: "wrap",
            },
            alignItems: "center",
            textAlign: "left",
            "& p": {
                m: 0,
                fontWeight: "500",
                color: "#33EDAC",
                display: "flex",
                //css desktop
                justifyContent: {
                    md: "flex-start",
                    xs: "flex-end",
                },
                fontSize: {
                    md: "18px",
                    xs: "14px",
                },
                alignItems: "center",
            },
            icons: {
                ml: "0.85rem",
                mr: "0.35rem",
                fontSize: {
                    md: "2.2rem",
                    xs: "1.2rem",
                },
            },
            //css desktop
            pb: {
                md: "38px",
                xs: "0",
            },
        },
    "& .MuiGrid-root + p": {
        color: "#77837F",
        lineHeight: "1.625rem",
    },
    courseLink: {
        width: {
            md: "28%",
            xs: "100%",
        },
        padding: {
            md: "15px 65px",
            xs: "6px 16px",
        },
    },
    button: {
        textAlign: "center",
        mt: {
            md: "30px",
        },
    },
    loading: {
        display: "flex",
        margin: "1.5rem auto 0",
        color: "#77837F",
    },
}