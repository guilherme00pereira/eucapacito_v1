import {useState, useEffect} from "react";
import {useParams, useLocation, useNavigate, useOutletContext} from "react-router-dom";
import parse from "html-react-parser";
import {Box, CircularProgress, Grid} from "@mui/material";
import {
    AccessTime,
} from "@mui/icons-material";
import apiService from "../services/apiService";
import Button from "../components/Button";
import {coursePage} from "../commonStyles/coursePage";
import MetadataManager from "../layouts/MetadataManager";

const CourseLD = () => {
    const [courseData, setCourseData] = useState({
        id: "",
        featuredImg: "",
        title: "",
        category: "",
        partnerLogoURL: "",
        price: "",
        duration: "",
        description: "",
        yoast: {}
    });
    const [title, setTitle] = useOutletContext();
    const [isLoading, setIsLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const token = sessionStorage.getItem("token");
    const {api} = apiService;
    const {slug} = useParams();
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        api.get(`/ldlms/v2/sfwd-courses?slug=${slug}`).then((res) => {
            const course = res.data[0];
            setCourseData({
                id: course.id,
                slug: course.slug,
                featuredImg: course.image,
                title: parse(`${course.title.rendered}`),
                //category: course.categories.map((category) => category.name).join(", "),
                duration: course.duracao,
                description: parse(`${course.content.rendered}`),
                yoast: course.yoast_head_json
            });
            setTitle({
                main: "Curso",
                sub: courseData.title,
              });
            const myEnrollments = sessionStorage.getItem("userCourses");
            if(myEnrollments !== null) {
                setIsEnrolled(myEnrollments.includes(course.id))
            }
            setIsLoading(false);
        });

    }, []);

    const handleAssignment = ( course ) => {
        if(!isEnrolled) {
            api.post("/eucapacito/v1/enroll-user-to-course", {
                user: sessionStorage.getItem("userID"),
                course: course.id
            }).then((res) => {
                navigate(`/${slug}/aulas/${course.id}`)
            })
        } else {
            navigate(`/${slug}/aulas/${course.id}`)
        }
    }

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
                    <MetadataManager ispage={false} value={courseData.yoast} />
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
                                        {courseData.duration}
                                    </p>
                                </Grid>
                            </Grid>

                            <div className="description">{courseData.description}</div>

                            <Box sx={coursePage.description.button}>
                                {token && (
                                    <Button
                                        onClick={() => handleAssignment(courseData)}
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
                </Box>)}
        </>
    );
};

export default CourseLD;
