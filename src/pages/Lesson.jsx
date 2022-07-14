import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, CircularProgress } from "@mui/material";
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
    const { api } = apiService;
    const { slug, id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const token = sessionStorage.getItem("token");


    const getNext = (id) => {
        const steps = sessionStorage.getItem("")
    }

    useEffect(() => {

        api.get(`/ldlms/v1/sfwd-lessons?slug=${slug}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            const lesson = res.data[0];
            setLesson({
                id: lesson.id,
                title: lesson.title.rendered,
                content: lesson.content.rendered,
                video: lesson.video
            })
            setIsLoading(false);
        });

    }, []);

    const handleComplete = (lid) => {
        api.post("/eucapacito/v1/lesson-complete", {
            user: sessionStorage.getItem("userID"),
            course: 10730,
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
                    <Box sx={styles.button}>
                        <Button onClick={() => getNext(lesson.id)} sx={styles.courseLink}>
                            Próxima
                        </Button>
                    </Box>   
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
        alignItems: "center"
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