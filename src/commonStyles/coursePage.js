export const coursePage = {
    root: {
        mx: "-16px",
        mt: {
            md: "-48px",
            xs: "-24px"
        },
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
        minHeight: {
            xs: "250px",
            md: "350px"
        },
        maxHeight: "650px",
        //mt: "-24px",
        img: {
            width: "100%",
        },
    },
    container: {
        p: {
            md: "1rem 70px",
            xs: "1rem 1.5rem 2rem",
        },
        mt: "-30px",
        borderRadius: "20px 20px 0 0",
        filter: {
            md: "drop-shadow(0px -6px 12px #33EDAC)",
            xs: "drop-shadow(0px -6px 16px #33EDAC)",
        },
        minHeight: {
            md: "100%",// "calc(100vh - 600px)",
            xs: "100%", //"calc(100vh - 250px)",
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
            alignItems: "center",
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
            "& .MuiGrid-item:first-of-type": {
                display: "flex",
                alignItems: "center !important"
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
                        md: "text-bottom",
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
                md: "30%",
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
}