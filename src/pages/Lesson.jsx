import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, CircularProgress, Stack } from "@mui/material";
import Button from "../components/Button";
import apiService from "../services/apiService";
import parse from 'html-react-parser';
import ReactPlayer from "react-player";

const Lesson = () => {
    const [lesson, setLesson] = useState({
        title: "",
        content: "",
        video: ""
    });
    const [next, setNext] = useState("");
    const [prev, setPrev] = useState("");
    const [btnAlign, setBtnAlign] = useState("space-between")
    const { api } = apiService;
    const { slug, id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const token = sessionStorage.getItem("token");
    let navigate = useNavigate();


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

    }, []);

    const handleComplete = (lid) => {
        api.post("/eucapacito/v1/lesson-complete", {
            user: sessionStorage.getItem("userID"),
            course: id,
            lesson: lid
        })
    }

    return (
        <>
            {isLoading && <CircularProgress sx={styles.loading} />}
            {!isLoading && (
                <Container sx={styles.root}>
                    <Box sx={styles.texto}>
                        <Box>
                        <h1>{lesson.title}</h1>
                        {parse(lesson.content)}
                        </Box>
                    </Box>
                    <Box sx={styles.video}>
                        <ReactPlayer onPlay={() => handleComplete(lesson.id)} url={lesson.video} />
                    </Box>
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
}