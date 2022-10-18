import { useState, useEffect, useContext } from "react";
import { Link, Box, Container, CircularProgress, Stack } from "@mui/material";
import Button from "../../../src/components/Button";
import apiService from "../../../src/services/apiService";
import parse from 'html-react-parser';
import ReactPlayer from "react-player";
import ArrowLeftOutlined from "../../../public/assets/img/arrow-left-outlined.png"
import ArrowLeft from "../../../public/assets/img/arrow-left.png"
import { StepsContext } from "../../../src/services/context";
import { useRouter } from "next/router";
import Image from 'next/image'

const Lesson = () => {
    const router = useRouter()
    const ctx = useContext(StepsContext)
    const [lesson, setLesson] = useState({
        title: "",
        content: "",
        video: ""
    });
    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");
    const [end, setEnd] = useState(false);
    const [btnAlign, setBtnAlign] = useState("space-between")
    const { api } = apiService;
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const userID = sessionStorage.getItem("userID");
        const token = sessionStorage.getItem("token");

        if (router.isReady) {
            api.get(`/ldlms/v1/sfwd-lessons/?course=${router.query.id}&slug=${router.query.slug}`, {
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
                router.queryslug === lesson.prev || setPrev(`/lessons/${lesson.prev}/${router.query.id}`)
                router.queryslug === lesson.next || setNext(`/lessons/${lesson.next}/${router.query.id}`)
                if (router.queryslug === lesson.prev || router.queryslug === lesson.next) setBtnAlign("center")
                setIsLoading(false);
            });
            ctx.userSteps.length === 0 && api.get(`eucapacito/v1/get-user-progress?user=${userID}&course=${router.query.id}`).then((res) => {
                const fetchedSteps = []
                res.data.forEach((step) => {
                    fetchedSteps[step.id] = step.status
                })
                ctx.setUserSteps(fetchedSteps);
            });

            ctx.courseData.quizz === "" && api.get(`/ldlms/v2/sfwd-courses/${router.query.id}`).then((res) => {
                const course = res.data
                ctx.setCourseData({
                    id: course.id,
                    featuredImg: course.image,
                    title: parse(`${course.title.rendered}`),
                    duration: course.duracao,
                    quizz: course.quizz
                });
            });

            setEnd(ctx.userSteps.every((v) => 'completed' === v) && getLastElement(ctx.userSteps) == lesson.id)
        }

    }, []);

    const handleComplete = (lid) => {
        api.post("/eucapacito/v1/lesson-complete", {
            user: sessionStorage.getItem("userID"),
            course: id,
            lesson: lid
        })
    }

    const handleNavBack = () => {
        router.push(`/${lesson.course}/aulas/${router.query.id}`)
    }

    const handleBeginTest = () => {
        router.push(`/quizzes/${courseData.quizz.slug}/${courseData.quizz.id}`)
    }

    const getLastElement = (arr) => {
        const keys = Object.keys(arr)
        return keys[keys.length - 1]
    }

    return (
        <>
            {isLoading && <CircularProgress sx={styles.loading} />}
            {!isLoading && (
                <Container sx={styles.root}>
                    <Box>
                        <Link component="button" onClick={handleNavBack} sx={styles.backLessons}>
                            <span>
                                <Image src={ArrowLeftOutlined} alt="arrow-left-outlined" width={22} height={26} />
                                <Image src={ArrowLeft} alt="arrow-left" style={{ marginLeft: "-12px" }} width={22} height={26} />
                            </span>
                            <div style={{ paddingLeft: "15px", border: "none", fontWeight: "700" }}>
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

Lesson.isLessonPage = true

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