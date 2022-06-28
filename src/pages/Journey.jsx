import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Box } from "@mui/material";
import Button from "../components/Button";
import parse from "html-react-parser";

import ContentCard from "../components/ContentCard";

import apiService from "../services/apiService";

const Journey = () => {
    const [journeyData, setJourneyData] = useState({
        featuredImg: "",
        title: "",
        description: "",
    });
    const loggedId = sessionStorage.getItem('loggedIn');
    let navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const { api } = apiService;
    const { slug } = useParams();

    const handleStartForm = () => {
        if(!loggedId) {
            navigate('/login')
        } else {
            window.location.reload()
        }
    }

    useEffect(() => {
        api
            .get(`/wp/v2/jornada?slug=${slug}&_embed`)
            .then((res) => {
                setJourneyData({
                    featuredImg: res.data[0].image,
                    title: parse(`${res.data[0].title.rendered}`),
                    description: parse(`${res.data[0].content.rendered}`),
                });
                const fetchedCourses = [];
                res.data[0].cursos_ec.forEach((course) => {
                    fetchedCourses.push({
                        id: course.id,
                        url: course.url,
                        featuredImg: course.image,
                        title: course.title,
                        subtitle: "Eu Capacito",
                        partnerLogoURL: course.responsavel,
                    });
                });
                setCourses([...fetchedCourses]);
            });
    }, [api]);

    return (
        <Box sx={styles.root}>

            <Box sx={styles.texto}>
                <Box>
                    <h1>{journeyData.title}</h1>

                    <p>{journeyData.description}</p>
                </Box>
            </Box>

            <h2>Para garantir o seu acesso, você precisa  concluir o(s) seguinte(s) curso(s):</h2>

            <Box sx={styles.cardsContainer}>

                {courses.length > 0 &&
                    courses.map((course) => (
                        <Box key={course.id} sx={styles.card}>
                            <ContentCard
                                url={course.url}
                                imagePath={course.featuredImg}
                                title={course.title}
                                subtitle={course.subtitle}
                                logoPath={course.partnerLogoURL}
                            />
                        </Box>
                    ))
                }
            </Box>
            <Box sx={styles.button}>
                <Button onClick={handleStartForm}>Comece agora!</Button>
            </Box>
        </Box>
    );
};

export default Journey;


const styles = {
    root: {
        h1: { marginTop: "2rem", fontSize: "36px", color: "#CAC8C8", textAlign: "center" },
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
    image: {
        minHeight: "350px",
        maxHeight: "533px",
        mt: "-24px",
        img: {
            width: "100%",
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

    button: {
        mx: "1rem",
        textAlign: { md: "center", xs: "left" },
        "& .MuiButton-root": {
            width: { xs: "100%", md: "25%" },
        },
    },
    cardsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start"
    },
    card: {
        width: {
            md: "30%",
            xs: "100%"
        },
        "& img": {
            border: "1px solid #77837f",
        },
        "& .MuiGrid-root img": {
            border: "none",
        },
        mr: "25px",
        mb: "40px",

        "& .MuiGrid-container": {
            border: "1px solid #77837f",
            boxSizing: "border-box",
            mt: "14px",
            borderRadius: "8px",
            padding: "24px",
            justifyContent: "space-between",
            alignItems: "end",
        },
        "& .desk-info": {
            mb: "50px",
        },
        "& small": {
            fontSize: "16px",
        },
    },
};
