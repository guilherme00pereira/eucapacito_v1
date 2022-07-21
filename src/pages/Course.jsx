import {useState, useEffect} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import parse from "html-react-parser";
import {Box, CircularProgress, Grid} from "@mui/material";
import {
    AccessTime,
} from "@mui/icons-material";
import apiService from "../services/apiService";
import Button from "../components/Button";
import {coursePage} from "../commonStyles/coursePage";
import {calculateTime} from "../services/helper"

const Course = () => {
    const [courseData, setCourseData] = useState({
        featuredImg: "",
        title: "",
        category: "",
        partnerLogoURL: "",
        price: "",
        duration: "",
        description: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const token = sessionStorage.getItem("token");
    const {api} = apiService;
    const {slug} = useParams();
    let location = useLocation();
    let navigate = useNavigate();


    useEffect(() => {
        api.get(`/wp/v2/curso_ec?slug=${slug}&_embed`).then((res) => {
            const course = res.data[0];
            setCourseData({
                featuredImg: course["featured_image_src"],
                subtitle: "Eu Capacito",
                title: parse(`${course.title.rendered}`),
                category: course.categories.map((category) => category.name).join(", "),
                partnerLogoURL: course.responsavel.guid,
                price: "",
                duration: calculateTime(course.duration),
                description: parse(`${course.content.rendered}`),
                courseUrl: course.url,
            });
            setIsLoading(false);
        });
    }, [api]);

    const handleRedirect = (e) => {
        e.preventDefault();

        sessionStorage.setItem("redirectURL", location.pathname);
        navigate("/login");
    };

    return (
        <>
            {isLoading && <CircularProgress sx={coursePage.loading} />}
            {!isLoading && (
            <Box sx={coursePage.root}>
                <Box sx={coursePage.image}>
                    <img src={courseData.featuredImg} alt={courseData.title}/>
                </Box>

                <Box sx={coursePage.container}>
                    <Box sx={coursePage.description}>
                        <h1>{courseData.title}</h1>
                        <Grid container sx={coursePage.description.block}>
                            <Grid item xs={8} className="description-desk">
                                <p>
                                    Categoria: <span>{courseData.category}</span>
                                </p>
                                <p>
                                    Oferecido por:{" "}
                                    <img src={courseData.partnerLogoURL} alt="Logo Parceiro"/>
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
                                    {courseData.duration}
                                </p>
                            </Grid>
                        </Grid>

                        <div className="description">{courseData.description}</div>

                        <Box sx={coursePage.description.button}>
                            {token && (
                                <Button
                                    href={courseData.courseUrl}
                                    target="_blank"
                                    sx={coursePage.description.courseLink}
                                >
                                    Comece agora
                                </Button>
                            )}

                            {!token && (
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
            </Box>)}
        </>
    );
};

export default Course;

