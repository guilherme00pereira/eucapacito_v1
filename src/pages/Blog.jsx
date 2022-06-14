import {useEffect, useState} from "react";
import {useOutletContext, useParams} from "react-router-dom";
import {Box, CircularProgress} from "@mui/material";
import parse from "html-react-parser";
import apiService from "../services/apiService";
import BlogSidebar from "../components/Content/BlogSidebar";
import {loading} from "../commonStyles/loading";

const Blog = () => {
    const [title, setTitle] = useOutletContext();
    const [isLoading, setIsLoading] = useState(true);
    const [blog, setBlog] = useState({
        featuredImg: "",
        title: "",
        category: "",
        offered: "",
        price: "",
        duration: "",
        description: "",
    });
    const {api} = apiService;
    const {id} = useParams();

    useEffect(() => {
        setTitle({
            main: "Blog",
            sub: "Leia o conteúdo da semana",
        });

        api.get(`/wp/v2/posts/${id}?_embed`).then((res) => {
            const blogData = res.data;
            setBlog({
                featuredImg: blogData.featured_image_src,
                title: parse(`${blogData.title.rendered}`),
                content: parse(`${blogData.content.rendered}`),
                date: new Date(blogData.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                }),
                cats: blogData.categories_object
                    .map((category) => category.name)
                    .join(", "),
            });
            setIsLoading(false);
        });
    }, [id]);

    return (
        <>
            {isLoading && <CircularProgress sx={loading.circular}/>}
            {!isLoading && (
                <Box sx={styles.root}>
                    <Box sx={styles.titlepage}>
                        <h1>Blog</h1>
                    </Box>
                    <Box sx={styles.image}>
                        <img src={blog.featuredImg} alt="Placeholder Blog"/>
                    </Box>

                    <Box sx={styles.content}>
                        <Box sx={styles.content.info}>
                            <small>{blog.date}</small>
                            <small>{blog.cats}</small>
                        </Box>

                        <hr/>

                        <h1>{blog.title}</h1>
                        <div className="content">{blog.content}</div>
                    </Box>
                    <BlogSidebar/>
                </Box>
            )}
        </>
    );
};

export default Blog;

const styles = {
    root: {
        width: {
            xs: "100%",
            md: "61%",
        },
        position: "relative",
        "h1, h2": {
            color: "#CAC8C8",
            fontWeight: 500,
            textTransform: "uppercase",
        },
    },
    image: {
        img: {
            width: "calc(100% + 32px)",
            height: "262px",
            position: "relative",
            left: "-16px",
            zIndex: -1,
        },
        pl: {
            xs: "0",
            md: "50px",
        },
    },
    content: {
        info: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "0.75rem",
            small: {
                color: "#77837F",
                fontSize: {md: "16px", xs: "6px"},
                fontWeight: 400,
                "&+small": {
                    textTransform: "uppercase",
                    textAlign: "right",
                    maxWidth: {
                        md: "70%",
                        xs: "100%",
                    },
                },
            },
            pl: {
                xs: "0",
                md: "35px",
            },
        },
        hr: {
            m: {
                md: "1rem 0 1.5rem 1.5rem",
                xs: "1rem 0 1.5rem",
            },
            border: 0,
            borderTop: "1px solid #77837F",
        },
        h1: {
            fontSize: {
                xs: "12px",
                md: "26px",
            },
            pl: {
                xs: "0",
                md: "35px",
            },
        },
        h2: {
            fontSize: "0.8rem",
            pl: {
                xs: "0",
                md: "35px",
            },
        },
        "& .content": {
            color: "#77837F",
            fontSize: {xs: "10px", md: "24px"},
            fontStyle: {
                md: "normal",
                xs: "italic",
            },
            fontWeight: 500,
            textAlign: "justify",
            lineHeight: "1.5rem",
            pl: {
                xs: "0",
                md: "35px",
            },
            "& p": {
                fontSize: "18px",
                fontFamily: "Gotham",
                fontWeight: 500,
            },
        },
        "& p+h2": {
            mt: "1rem",
        },
    },
    titlepage: {
        display: {
            xs: "none",
            md: "block",
        },
        mt: "46px",
        h1: {
            fontWeight: "700",
            textTransform: "none",
            borderBottom: "1px solid #77837F",
            width: "166%",
            pb: "13px",
        },
    },
};
