import {useState, useEffect, useContext} from "react";
import parse from "html-react-parser";
import {Box, CircularProgress, Grid} from "@mui/material";
import {
    AccessTime,
} from "@mui/icons-material";
import apiService from "../../src/services/apiService";
import Button from "../../src/components/Button";
import {coursePage} from "../../src/commonStyles/coursePage";
import { AppContext } from "../../src/services/context";
import { useRouter } from "next/router";
import SEO from '../../src/seo'

const CourseLD = ({ course }) => {
    const router = useRouter()
    const ctx = useContext(AppContext);
    const [isEnrolled, setIsEnrolled] = useState(false);
    
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        ctx.setTitle({
            main: "Curso",
            sub: course.title,
          });
    }, [])


    const handleAssignment = ( course ) => {
        if(!isEnrolled) {
            api.post("/eucapacito/v1/enroll-user-to-course", {
                user: sessionStorage.getItem("userID"),
                course: course.id
            }).then((res) => {
                router.push(`/${slug}/aulas/${course.id}`)
            })
        } else {
            router.push(`/${slug}/aulas/${course.id}`)
        }
    }

    const handleRedirect = (e) => {
        e.preventDefault();
        sessionStorage.setItem("redirectURL", location.pathname);
        router.push("/login");
    };

    return (
        <>
            <SEO metadata={course.yoast} />
            <Box sx={coursePage.root}>
                <Box sx={coursePage.image}>
                    <img src={course.featuredImg} alt={course.title}/>
                </Box>

                <Box sx={coursePage.container}>
                    <Box sx={coursePage.description}>
                        <h1>{course.title}</h1>
                        <Grid container sx={coursePage.description.block}>
                            <Grid item xs={8} className="description-desk">
                                <p>
                                    Categoria: <span>{course.category}</span>
                                </p>
                                <p>
                                    Oferecido por: Eu Capacito
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
                            {token && (
                                <Button
                                    onClick={() => handleAssignment(course)}
                                    sx={coursePage.description.courseLink}
                                >
                                    {isEnrolled ? "Continuar curso" : "Comece agora"}
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
            </Box>
        </>
    );
};

export async function getServerSideProps(context) {
    const {api}     = apiService;
    let res             = await  api.get(`/ldlms/v2/sfwd-courses?slug=${context.params.slug}`)
    const courseData    = res.data[0];
    const course = {
            id: courseData.id,
            slug: courseData.slug,
            featuredImg: courseData.image,
            title: courseData.title.rendered,
            duration: courseData.duracao,
            description: courseData.content.rendered,
            yoast: courseData.yoast_head_json
        }

    return { props: { course }}
}

export default CourseLD;
