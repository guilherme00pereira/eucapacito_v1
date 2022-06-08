import {useState, useEffect} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import parse from "html-react-parser";
import {Box, CircularProgress, Grid} from "@mui/material";
import {
    AccessTime,
} from "@mui/icons-material";
import licaoIcon from "../assets/icons/licaoIcon.png";
import acessIcon from "../assets/icons/acessIcon.png";
import audioIcon from "../assets/icons/audioIcon.png";
import certificadoIcon from "../assets/icons/certificadoIcon.png";
import nivelIcon from "../assets/icons/nivelIcon.png";
import questIcon from "../assets/icons/questIcon.png";
import techIcon from "../assets/icons/techIcon.png";
import apiService from "../services/apiService";

import Button from "../components/Button";
// import CourseCurriculum from "../components/Course/CourseCurriculum";

// import imagemFundo from "../assets/img/bg-desktop.png";
import imagemFundo from "../assets/img/fundo_original-2.jpg";

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
    const {id} = useParams();
    let location = useLocation();
    let navigate = useNavigate();

    const calcDuration = (v) => {
        v = parseInt(v, 10);
        const h = Math.floor(v / 3600);
        const m = Math.floor((v - (h * 3600)) / 60);
        let text = h + " horas";
        if(m > 0) text += " e " + m + " minutos";
        return (text)
    }

    useEffect(() => {
        api.get(`/wp/v2/curso_ec/${id}?_embed`).then((res) => {
            const course = res.data;
            setCourseData({
                featuredImg: course["featured_image_src"],
                subtitle: "Eu Capacito",
                title: parse(`${course.title.rendered}`),
                category: course.categories.map((category) => category.name).join(", "),
                partnerLogoURL: course.responsavel.guid,
                price: "",
                duration: calcDuration(course.duration),
                description: parse(`${course.content.rendered}`),
                courseUrl: course.url,
            });
            setIsLoading(false);
        });
    }, [id, api]);

    const handleRedirect = (e) => {
        e.preventDefault();

        sessionStorage.setItem("redirectURL", location.pathname);
        navigate("/login");
    };

    return (
        <>
            {isLoading && <CircularProgress sx={styles.loading} />}
            {!isLoading && (
                <Box sx={styles.root}>
                <Box sx={styles.image}>
                    <img src={courseData.featuredImg} alt={courseData.title}/>
                </Box>

                <Box sx={styles.container}>
                    <Box sx={styles.description}>
                        <h1>{courseData.title}</h1>
                        <Grid container sx={styles.description.block}>
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
                                <p><AccessTime sx={styles.description.block.icons}/> {courseData.duration}
                                </p>
                            </Grid>
                        </Grid>

                        <div className="description">{courseData.description}</div>

                        {/*<Box sx={styles.description.desktopBonus}>
              <p>O que você vai conseguir</p>
              <p>
                <Box>
                  <img src={licaoIcon} alt="" /> 25 lições
                </Box>
                <Box>
                  <img src={techIcon} alt="" />
                  Acesso no celular, desktop
                </Box>
                <Box>
                  <img src={nivelIcon} alt="" />
                  Nível iniciante
                </Box>
                <Box>
                  <img src={audioIcon} alt="" />
                  Áudio / Vídeo
                </Box>
                <Box>
                  <img src={acessIcon} alt="" />
                  Acesso vitalício
                </Box>
                <Box>
                  <img src={questIcon} alt="" />
                  Questionários
                </Box>
                <Box>
                  <img src={certificadoIcon} alt="" />
                  Certificado
                </Box>
              </p>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "block" },
                "& p": { fontSize: "20px", fontWeight: "500" },
              }}
            >
              <p>Currículo</p>
              <Box sx={styles.description.desktopBonus.containerButton}>
                <Button
                  href={courseData.courseUrl}
                  target="_blank"
                  sx={styles.description.desktopBonus.button}
                >
                  Conteúdo Programático
                </Button>

                <Button
                  href={courseData.courseUrl}
                  target="_blank"
                  sx={styles.description.desktopBonus.button}
                >
                  Informações Básicas
                </Button>

                <Button
                  href={courseData.courseUrl}
                  target="_blank"
                  sx={styles.description.desktopBonus.button}
                >
                  F.A.Q
                </Button>
              </Box>
            </Box>*/}

                        <Box sx={styles.description.button}>
                            {token && (
                                <Button
                                    href={courseData.courseUrl}
                                    target="_blank"
                                    sx={styles.description.courseLink}
                                >
                                    Comece agora
                                </Button>
                            )}

                            {!token && (
                                <Button
                                    sx={styles.description.courseLink}
                                    onClick={handleRedirect}
                                >
                                    Faça o Login
                                </Button>
                            )}
                        </Box>
                    </Box>

                    {/* <Box sx={styles.specs}>
            <h2>O que você vai conseguir</h2>

            <Grid container>
              <Grid item xs={12}>
                <p>
                  <MenuBook /> 25 lições
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <ScreenRotation /> Acesso no celular, desktop e TV
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <SignalCellularAlt /> Nível iniciante
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <OndemandVideo /> Áudio / Vídeo
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <AllInclusive /> Acesso vitalício
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <Extension /> Questionários
                </p>
              </Grid>
              <Grid item xs={12}>
                <p>
                  <WorkspacePremium /> Certificado de conclusão
                </p>
              </Grid>
            </Grid>
          </Box> */}

                    {/* <Box sx={styles.curriculum}>
            <h2>Currículo</h2>

            <CourseCurriculum
              number="01"
              title="Introdução"
              duration="1:43"
              link="#"
            />
            <CourseCurriculum
              number="02"
              title="Ferramentas"
              duration="1:43"
              link="#"
            />
            <CourseCurriculum
              number="03"
              title="Professores"
              duration="1:43"
              link="#"
            />
            <CourseCurriculum
              number="04"
              title="Começando"
              duration="1:43"
              link="#"
            />
          </Box> */}
                </Box>
            </Box>)}
        </>
    );
};

export default Course;

const styles = {
    root: {
        mx: "-16px",
        h1: {
            fontSize: {xs: "16px", md: "32px"},
            fontWeight: {md: "500", xs: "700"},
            color: "#CAC8C8",
            textAlign: {
                md: "center",
                xs: "left",
            },
            borderBottom: {
                xs: "none",
                md: "1px solid #77837f",
            },
            paddingBottom: {
                md: "23px",
                xs: "0",
            },
        },
        h2: {
            fontSize: "1.3rem",
            fontWeight: 500,
        },
    },
    image: {
        minHeight: "350px",
        mt: "-24px",
        img: {
            width: "100%",
        },
    },
    container: {
        p: {
            md: "1rem 70px",
            xs: "1rem 1.5rem 2rem",
        },
        mt: "-149px",
        borderRadius: "20px 20px 0 0",
        filter: {
            md: "drop-shadow(0px -6px 12px #33EDAC)",
            xs: "drop-shadow(0px -6px 44px #33EDAC)",
        },
        minHeight: {
            md: "calc(100vh - 600px)",
            xs: "calc(100vh - 250px)",
        },
        backgroundImage: "linear-gradient(to right, #0E0E0E, #292C2F)", //`url(${imagemFundo})`,
        backgroundSize: "cover",
        backgroundPosition: "50%",
        position: "relative",
        zIndex: 9,
    },
    description: {
        "& h3": {
            fontSize: {md: "20px", xs: "16px"},
        },
        "& .description": {
            m: "1rem 0 1.5rem",
            color: "#77837F",
            lineHeight: "1.625rem",
            "& p": {
                fontSize: {
                    md: "18px",
                    xs: "15px",
                },
                fontWeight: "500",
            },
            "& li": {
                fontSize: {
                    md: "18px",
                    xs: "15px",
                },
                fontWeight: "500",
            },
        },
        block: {
            //css desktop
            flexWrap: {
                md: "nowrap",
                xs: "wrap",
            },
            textAlign: "right",
            "& p": {
                m: 0,
                fontSize: {xs: "12px", md: "18px"},
                fontWeight: "500",
            },
            "& p span": {
                color: "#FAE62E",
            },
            "& .MuiGrid-item:first-of-type p": {
                mb: {
                    md: "0",
                    xs: "0.5rem",
                },
                textAlign: "left",
            },
            "& .MuiGrid-item:nth-of-type(2) p": {
                fontSize: {md: "1.5rem", xs: "24px"},
                fontWeight: 700,
                color: {
                    md: "#77837F",
                },
                mb: {md: "8px"}
            },
            "& .MuiGrid-item:last-of-type": {
                maxWidth: {
                    md: "17%",
                    xs: "100%",
                },
                //mt: "1rem",
                mb: {
                    md: "0",
                    //xs: "0.5rem",
                },
                "& p": {
                    color: "#33EDAC",
                    display: "flex",
                    //css desktop
                    justifyContent: {
                        md: "flex-start",
                        xs: "flex-end",
                    },
                    fontSize: {
                        md: "18px",
                        xs: "14px",
                    },
                    alignItems: "center",
                },
            },
            icons: {
                ml: "0.85rem",
                mr: "0.35rem",
                fontSize: {
                    md: "2.2rem",
                    xs: "1.2rem",
                },
            },
            //css desktop
            pb: {
                md: "38px",
                xs: "0",
            },

            borderBottom: {
                xs: "none",
                md: "1px solid #77837f",
            },
            alignItems: {
                md: "flex-end",
            },
            "& .description-desk": {
                display: {
                    md: "flex",
                    xs: "block",
                },
                justifyContent: "space-around",
                order: {
                    md: "2",
                },
                img: {
                    maxWidth: {
                        md: "100px",
                        xs: "70px",
                    },
                    mb: {
                        md: "-14px",
                        xs: "-10px",
                    },
                    verticalAlign: {
                        md: "top",
                        xs: "super",
                    },
                },
                mb: "8px",
            },
            "& .description-desk-value": {
                order: {
                    md: "3",
                },
                maxWidth: {
                    md: "17% !important",
                },
                "& .desk-curso": {
                    display: {
                        md: "inline-block",
                        xs: "none",
                    },
                    color: "#DADADA",
                    fontSize: "18px",
                    fontWeight: "500",
                },
            },
        },
        "& .MuiGrid-root + p": {
            color: "#77837F",
            lineHeight: "1.625rem",
        },
        courseLink: {
            width: {
                md: "28%",
                xs: "100%",
            },
            padding: {
                md: "15px 65px",
                xs: "6px 16px",
            },
        },
        button: {
            textAlign: "center",
            mt: {
                md: "30px",
            },
        },
        desktopBonus: {
            display: {
                xs: "none",
                md: "block",
            },
            "& p:last-of-type": {
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                alignItems: "center",
                "& img": {
                    mr: "10px",
                },
                mb: "35px",
            },
            "& p:first-of-type": {
                margin: "85px 0 35px 0",
                fontWeight: "500",
            },
            containerButton: {
                display: {
                    md: "flex",
                    xs: "none",
                },
                justifyContent: "space-around",
                mt: "30px",
                pb: "23px",
                borderBottom: "1px solid #77837f",
            },
            button: {
                minWidth: "30%",
                padding: "2% 3%",
                background: "none",
                border: "1px solid #77837F",
                boxShadow: "none",
                color: "#CAC8C8",
                "&:hover": {
                    background: "none",
                },
            },
        },
    },
    specs: {
        "& .MuiGrid-root p": {
            mt: 0,
            mb: "0.625rem",
            display: "flex",
            alignItems: "center",
            color: "#77837F",
            svg: {
                mr: "1rem",
                color: "#CAC8C8",
            },
        },
    },
    loading: {
        display: "flex",
        margin: "1.5rem auto 0",
        color: "#77837F",
    },
};
