import { useState, useEffect, useContext } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { Link, Box, Container, CircularProgress, Stack } from "@mui/material";
import Button from "../components/Button";
import apiService from "../services/apiService";
import parse from 'html-react-parser';
import ReactPlayer from "react-player";
import ArrowLeftOutlined from "../assets/img/arrow-left-outlined.png"
import ArrowLeft from "../assets/img/arrow-left.png"

const Lesson = () => {
    const [title, setTitle, courseData, setCourseData, userSteps, setUserSteps] = useOutletContext();
    const [lesson, setLesson] = useState({
        title: "",
        content: "",
        video: ""
    });
    const userID = sessionStorage.getItem("userID");
    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");
    const [end, setEnd] = useState(false);
    const [btnAlign, setBtnAlign] = useState("space-between")
    const { api } = apiService;
    let navigate = useNavigate();
    const { slug, id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const token = sessionStorage.getItem("token");


    useEffect(() => {

        api.get(`/ldlms/v1/sfwd-lessons/?course=${id}&slug=${slug}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            const lesson = res.data[0];
            setLesson({
                id: lesson.id,
                title: lesson.title.rendered,
                content: lesson.content.rendered,
                video: lesson.video,
                course: lesson.course,
                prev: lesson.prev,
                next: lesson.next
            })
            slug === lesson.prev || setPrev(`/lessons/${lesson.prev}/${id}`)
            slug === lesson.next || setNext(`/lessons/${lesson.next}/${id}`)
            if(slug === lesson.prev || slug === lesson.next) setBtnAlign("center")
            setIsLoading(false);
        });
        userSteps.length === 0 && api.get(`eucapacito/v1/get-user-progress?user=${userID}&course=${id}`).then((res) => {
            const fetchedSteps = []
            res.data.forEach((step) => {
                fetchedSteps[step.id] = step.status
            })
            setUserSteps(fetchedSteps);
        });

        courseData.quizz === "" && api.get(`/ldlms/v2/sfwd-courses/${id}`).then((res) => {
            const course = res.data
            setCourseData({
                id: course.id,
                featuredImg: course.image,
                title: parse(`${course.title.rendered}`),
                duration: course.duracao,
                quizz: course.quizz
            });
        });

        setEnd( userSteps.every( (v) => 'completed' === v ) && getLastElement(userSteps) == lesson.id )

    }, []);

    const handleComplete = (lid) => {
        api.post("/eucapacito/v1/lesson-complete", {
            user: sessionStorage.getItem("userID"),
            course: id,
            lesson: lid
        })
    }

    const handleNavBack = () => {
        navigate(`/${lesson.course}/aulas/${id}`)
    }

    const handleBeginTest = () => {
        navigate(`/quizzes/${courseData.quizz.slug}/${courseData.quizz.id}`)
    }

    const getLastElement = (arr) => {
        const keys = Object.keys(arr)
        return keys[keys.length -1]
    }

    return (
        <>
            {isLoading && <CircularProgress sx={styles.loading} />}
            {!isLoading && (
                <Container sx={styles.root}>
                    <Box>
                        <Link component="button" onClick={handleNavBack}  sx={styles.backLessons}>
                            <span>
                                <img src={ArrowLeftOutlined} alt="arrow-left-outlined" width={22} height={26} />
                                <img src={ArrowLeft} alt="arrow-left" style={{marginLeft: "-12px"}} width={22} height={26}  />
                            </span>
                            <div style={{paddingLeft: "15px", border: "none", fontWeight: "700"}}>
                                <p>Retornar às Aulas</p>
                            </div>
                        </Link>
                    </Box>
                    <hr />
                    <Box sx={styles.texto}>
                        <Box>
                            <h1>{lesson.title}</h1>
                            {parse(lesson.content)}
                        </Box>
                    </Box>
                    <Box sx={styles.video}>
                        <ReactPlayer onPlay={() => handleComplete(lesson.id)} url={lesson.video} />
                    </Box>
                    {end ? 
                        <Stack direction="row" justifyContent={btnAlign} alignItems="center">
                            <Button onClick={handleBeginTest} sx={styles.courseLink}>
                                Iniciar Prova
                            </Button>
                        </Stack>
                        :
                        <Stack direction="row" justifyContent={btnAlign} alignItems="flex-end">
                            {"" === prev ||
                                <Button href={prev} sx={styles.courseLink}>
                                    Anterior
                                </Button>
                            }
                            <Box sx={styles.button}>
                                {"" === next ||
                                    <Button href={next} sx={styles.courseLink}>
                                        Próxima
                                    </Button>
                                }
                            </Box>   
                        </Stack>
                    }
                    
                </Container>
                
            )}
        </>
    )
}

export default Lesson;


const styles = {
    root: {
        paddingTop: "0",
        h1: { marginTop: "0.5rem", fontSize: "22px", color: "#CAC8C8", textAlign: "center" },
        h2: {
          fontSize: "1.15rem",
          fontWeight: 500,
          borderBottom: {
            xs: "none",
            md: "1px solid #77837F",
          },
          pb: {
            md: "13px",
            xs: "0",
          },
        },
        hr: { border: 0, borderTop: "1px solid #77837F" },
      },
      texto: {
        margin: "70px auto",
        "& p": {
          lineHeight: "30px",
          fontSize: "18px",
          fontWeight: "500",
          color: "#77837F",
          textAlign: "justify",
        },
        width: "90%",
        "& small": {
          fontSize: "18px",
          color: "#CAC8C8",
        },
      },
    video: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        my: "50px"
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
    backLessons: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        p: {
            fontSize: "18px",
            textDecoration: "none",
            color: "#CACAC8"
        }
    }
}