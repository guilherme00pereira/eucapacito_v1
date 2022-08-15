import { useEffect, useState } from "react";
import {useLocation, useNavigate, useOutletContext, useParams} from "react-router-dom";
import { Box } from "@mui/material";
import parse from "html-react-parser";
import apiService from "../services/apiService";
import Button from "../components/Button";

const Ebook = () => {
    const token = sessionStorage.getItem('token');
    const [title, setTitle] = useOutletContext();
    const [ebook, setEbook] = useState({
        title: "",
        content: "",
    });

    const { api } = apiService;
    const { slug } = useParams();
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        setTitle({
            main: "E-book",
            sub: false,
        });

        api.get(`/wp/v2/ebooks?slug=${slug}`).then((res) => {
            const ebookData = res.data[0];
            setEbook({
                title: parse(ebookData.title.rendered),
                content: parse(ebookData.content.rendered),
                download: ebookData.arquivo.guid,
            });
        });
    }, []);

    const handleRedirect = (e) => {
        e.preventDefault();
        sessionStorage.setItem("redirectURL", location.pathname);
        navigate("/login");
    };

    return (
        <Box sx={styles.root}>
            <h1 className="title">{ebook.title}</h1>
            <div className="description">{ebook.content}</div>
            <Box sx={styles.button}>
                {token && (
                    <Button href={ebook.download} target="_blank" sx={styles.ebookLink}>
                        Baixar E-book
                    </Button>
                )}

                {!token && (
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

export default Ebook;

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