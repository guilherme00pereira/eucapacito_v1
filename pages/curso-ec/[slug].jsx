import {useEffect, useState, useContext} from "react";
import {Box, Grid} from "@mui/material";
import {
    AccessTime,
} from "@mui/icons-material";
import parse from "html-react-parser";
import apiService from "../../src/services/apiService";
import Button from "../../src/components/Button";
import {coursePage} from "../../src/commonStyles/coursePage";
import {calculateTime, extractYoastData} from "../../src/services/helper"
import { AppContext } from "../../src/services/context";
import { useRouter } from "next/router";
import SEO from "../../src/seo";

const Course = ({ course }) => {
    const router = useRouter()
    const ctx = useContext(AppContext);
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setLogged(!!token);
        ctx.setTitle({
            main: "Curso",
            sub: course.title,
          });
    }, [])

    const handleRedirect = (e) => {
        e.preventDefault();
        sessionStorage.setItem("redirectURL", location.pathname);
        router.push("/login");
    };

    return (
        <>
            <SEO metadata={extractYoastData(course.yoast)} />
            <Box sx={coursePage.root}>
                <Box sx={coursePage.image}>
                    <img src={course.featuredImg} alt={course.title}/>
                </Box>

                <Box sx={coursePage.container}>
                    <Box sx={coursePage.description}>
                        <h1>{parse(course.title)}</h1>
                        <Grid container sx={coursePage.description.block}>
                            <Grid item xs={8} className="description-desk">
                                <p>
                                    Categoria: <span>{course.category}</span>
                                </p>
                                <p>
                                    Oferecido por:{" "}
                                    <img src={course.partnerLogoURL} alt="Logo Parceiro"/>
                                </p>
                            </Grid>

                            <Grid item xs={4} className="description-desk-value">
                                <p>
                                    <small className="desk-curso">Curso:</small> Grátis
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <p style={{textAlign: "left"}}>
                                    <AccessTime sx={coursePage.description.block.icons}/>
                                    {course.duration}
                                </p>
                            </Grid>
                        </Grid>

                        <div className="description">{parse(course.description)}</div>

                        <Box sx={coursePage.description.button}>
                            {logged && (
                                <Button
                                    href={course.courseUrl}
                                    target="_blank"
                                    sx={coursePage.description.courseLink}
                                >
                                    Comece agora
                                </Button>
                            )}

                            {!logged && (
                                <Button
                                    sx={coursePage.description.courseLink}
                                    onClick={handleRedirect}
                                >
                                    Faça o Login
                                </Button>
                            )}
                        </Box>
                    </Box>

                </Box>
            </Box>
        </>
    );
};

export async function getStaticPaths() {
    const {api}     = apiService;
    const res       = await api.get('eucapacito/v1/course-slugs')
    const slugs     = res.data
    const paths     = slugs.map(slug => ({
        params: { slug: slug }
    }))
    return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
    const {api}     = apiService;
    let res             = await api.get(`/wp/v2/curso_ec?slug=${params.slug}&_embed`)
    const courseData    = res.data[0];
    const course = {
        featuredImg: courseData["featured_image_src"],
        subtitle: "Eu Capacito",
        title: courseData.title.rendered,
        category: courseData.categories.map((category) => category.name).join(", "),
        partnerLogoURL: courseData.responsavel.guid,
        price: "",
        duration: calculateTime(courseData.duration),
        description: courseData.content.rendered,
        courseUrl: courseData.url,
        yoast: courseData.yoast_head_json
        }

    return { props: { course }}
}

export default Course;

