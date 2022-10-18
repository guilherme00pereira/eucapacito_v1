import { useEffect, useState, useContext } from "react";
import { Box } from "@mui/material";
import parse from "html-react-parser";
import apiService from "../../src/services/apiService";
import Button from "../../src/components/Button";
import {AppContext} from "../../src/services/context";
import {useRouter} from "next/router";

const DynamicPage = () => {
    const ctx = useContext(AppContext);
    const router = useRouter()
    const [logged, setLogged] = useState(false);
    const [ebook, setEbook] = useState({
        title: "",
        content: "",
        yoast: {}
    });

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setLogged(!!token)
        const { api } = apiService;
        ctx.setTitle({
            main: "E-book",
            sub: false,
        });
        if(router.isReady) {
            api.get(`/wp/v2/ebooks?slug=${router.query.slug}`).then((res) => {
                const ebookData = res.data[0];
                setEbook({
                    title: parse(ebookData.title.rendered),
                    content: parse(ebookData.content.rendered),
                    download: ebookData.arquivo.guid,
                    yoast: ebookData.yoast_head_json
                });
            });
        }
    }, []);

    const handleRedirect = (e) => {
        e.preventDefault();
        sessionStorage.setItem("redirectURL", location.pathname);
        router.push("/login");
    };

    return (
        <Box sx={styles.root}>
            
            <h1 className="title">{ebook.title}</h1>
            <div className="description">{ebook.content}</div>
            <Box sx={styles.button}>
                {logged && (
                    <Button href={ebook.download} target="_blank" sx={styles.ebookLink}>
                        Baixar E-book
                    </Button>
                )}

                {!logged && (
                    <Button
                        sx={styles.ebookLink}
                        onClick={handleRedirect}>
                        Faça o Login
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default DynamicPage;

const styles = {
    root: {
        textAlign: "center",
        "& .title": {
            my: "2.5rem",
            color: "#CAC8C8",
            fontSize: "2rem",
            fontWeight: 500,
            width: "80%",
            textAlign: "center",
            display: "inline-block"
        },
        "& .description": {
            color: "#77837F",
            fontWeight: 600,
            textAlign: "left",
            lineHeight: "2rem",
            "& p:last-of-type": {
                mt: "4.5rem",
                textAlign: "center",
            },
            "& iframe": {
                maxWidth: "100%",
            },
        },
    },
    ebookLink: {
        width: {
            md: "25%",
            xs: "100%",
        },
        padding: {
            md: "10px",
            xs: "6px 16px",
        },
    },
    button: {
        textAlign: "center",
        mt: {
            md: "30px",
        },
    },
};