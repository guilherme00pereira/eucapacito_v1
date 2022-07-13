import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiService from "../services/apiService";
import parse from "html-react-parser";
import { Timeline, TimelineConnector, TimelineContent, TimelineSeparator } from '@mui/lab';
import { Stack, Box, CircularProgress, Grid } from "@mui/material";
import { AccessTime, PlayCircleOutlined, CheckCircle, Adjust } from "@mui/icons-material";
import Button from "../components/Button";
import LessonCard from "../components/Course/LessonCard";
import { TimelineDot, TimelineItem } from "@mui/lab";

const Lessons = () => {
    const userID = sessionStorage.getItem("userID");
    const [courseData, setCourseData] = useState({
        featuredImg: "",
        title: "",
        duration: "",
    });
    const [lessons, setLessons] = useState([]);
    const [userSteps, setUserSteps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = sessionStorage.getItem("token");
    const { api } = apiService;
    const { id } = useParams();

    const lessonCompleted = (id) => 'completed' === userSteps[id]
    const allCompleted = () => userSteps.every( (v) => 'completed' === v)
    const showConnector = (arr, index) =>  arr.length - 1 === index

    useEffect(() => {
        api.get(`/ldlms/v1/sfwd-lessons?course=${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            const fetchedLessons = []
            res.data.forEach((lesson) => {
                fetchedLessons.push({
                    id: lesson.id,
                    title: lesson.title.rendered,
                    slug: lesson.slug
                })
                setLessons([...fetchedLessons]);
            })
            setIsLoading(false);
        });

        api.get(`ldlms/v2/users/${userID}/course-progress/${id}/steps?_embed`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            const fetchedSteps = []
            console.log(res.data[0])
            res.data[0].forEach((step) => {
                fetchedSteps[step.step] = step.step_status
            })
            setUserSteps([...fetchedSteps]);
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
        
    }, []);

    return (
        <>
            {isLoading && <CircularProgress sx={styles.loading} />}
            {!isLoading && (
                <Box sx={styles.root}>
                    <Box sx={styles.image}>
                        <img src={courseData.featuredImg} alt={courseData.title} />
                    </Box>

                    <Box sx={styles.container}>
                        <Box sx={styles.description}>
                            <h1>{courseData.title}</h1>
                            <Grid container sx={styles.topinfo}>
                                <Grid item xs={4} md={2}>
                                    <p>
                                        <PlayCircleOutlined sx={styles.topinfo.icons} />
                                        {lessons.length} Vídeos
                                    </p>
                                </Grid>
                                <Grid item xs={4} md={2}>
                                    <p>
                                        <AccessTime sx={styles.topinfo.icons} />
                                        {courseData.duration}
                                    </p>
                                </Grid>
                            </Grid>

                            <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                                <div>
                                    <span>Lições</span>
                                    <span>Teste</span>
                                </div>
                            </Stack>

                            <Timeline sx={styles.timeline} position="right">
                                {lessons.map((lesson, index, arr) => (
                                    <TimelineItem key={index}>
                                        <TimelineSeparator>
                                            <TimelineDot sx={lessonCompleted(lesson.id) ? styles.timeline.iconActive : styles.timeline.iconInactive}>
                                                {lessonCompleted(lesson.id) ? <CheckCircle /> : <Adjust />}
                                            </TimelineDot>
                                            {showConnector(arr, index) ||
                                                <TimelineConnector />
                                            }
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <LessonCard
                                                index={index}
                                                lesson={lesson}
                                                active={lessonCompleted(lesson.id)} />
                                        </TimelineContent>
                                    </TimelineItem>
                                ))}
                            </Timeline>

                            {allCompleted() && 
                                <Box sx={styles.button}>
                                    {token && (
                                        <Button
                                            href="/quizzes/teste-seu-conhecimento-persuasao"
                                            sx={styles.courseLink}
                                        >
                                            Iniciar Prova
                                        </Button>
                                    )}
                                </Box>                            
                            }

                        </Box>

                    </Box>
                </Box>)}
        </>
    );
};

export default Lessons;


const styles = {
    timeline: {
        padding: "0",
        mt: "2rem",
        iconActive: {
            color: "#33EDAC",
        },
        iconInactive: {
            color: "#77837F",
        },
        "& .MuiTimelineDot-root": {
            backgroundColor: "#101010",
            borderRadius: "50%",
            border: "0px",
            padding: "0px"
        },
        "& .MuiTimelineItem-root:before": {
            content: "none"
        },
        "& .MuiTimelineConnector-root": {
            margin: "-10px 0"
        },
        "& .MuiTimelineContent-root": {
            
        }
    },
    root: {
        mx: "-16px",
        mt: {
            md: "-48px",
            xs: "-24px"
        },
        h1: {
            fontSize: { xs: "16px", md: "32px" },
            fontWeight: { md: "500", xs: "700" },
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
            md: "100%", //"calc(100vh - 600px)",
            xs: "100%", //"calc(100vh - 250px)",
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
        alignItems: "left",
        textAlign: "left",
        "& p": {
            m: "0 0 0 -20px",
            fontWeight: "500",
            color: "#33EDAC",
            display: "flex",
            //css desktop
            justifyContent: {
                md: "flex-start",
                xs: "flex-start",
            },
            fontSize: {
                md: "18px",
                xs: "14px",
            },
            alignItems: "left",
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
    toptabs: {

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