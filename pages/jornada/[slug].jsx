import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Button from "../../src/components/Button";
import parse from "html-react-parser";
import ContentCard from "../../src/components/ContentCard";
import apiService from "../../src/services/apiService";
import {useRouter} from "next/router";
import SEO from '../../src/seo'

const Journey = ({ journey, courses }) => {
    const router = useRouter()
    const [logged, setLogged] = useState(false);

    const handleStartForm = () => {
        if(!logged) {
            router.push('/login')
        } else {
            window.location.reload()
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setLogged(!!token);
    }, []);

    return (
        <>
            <SEO metadata={journey.yoast} />
            <Box sx={styles.root}>

                <Box sx={styles.texto}>
                    <Box>
                        <h1>{journey.title}</h1>

                        <p>{parse(journey.description)}</p>
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
        </>
    );
};

export async function getServerSideProps(context) {
    const { api }   = apiService;

    let courses     = []
    let res         = await api.get(`/wp/v2/jornada?slug=${context.params.slug}&_embed`)
    let item        = res.data[0]
    const journey   = {
        featuredImg: item.image,
        title: item.title.rendered,
        description: item.content.rendered,
        yoast: item.yoast_head_json
    }

    item.cursos_ec.forEach((course) => {
        courses.push({
            id: course.id,
            url: course.url,
            featuredImg: course.image,
            title: course.title,
            subtitle: "Eu Capacito",
            partnerLogoURL: course.responsavel ?? null,
        })
    })

    return { props: { journey, courses }}

}

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
