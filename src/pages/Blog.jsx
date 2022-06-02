import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import parse from "html-react-parser";
import apiService from "../services/apiService";
import BlogImg from "../assets/img/blog-page.png";
import NewsPost from "../components/News/NewsPost";

const Blog = () => {
  const [title, setTitle] = useOutletContext();
  const [blog, setBlog] = useState({
    featuredImg: "",
    title: "",
    category: "",
    offered: "",
    price: "",
    duration: "",
    description: "",
  });

  const { api } = apiService;
  const { id } = useParams();

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
    });
  }, [id]);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.titlepage}>
        <h1>Blog</h1>
      </Box>
      <Box sx={styles.image}>
        <img src={blog.featuredImg} alt="Placeholder Blog" />
      </Box>

      <Box sx={styles.content}>
        <Box sx={styles.content.info}>
          <small>{blog.date}</small>
          <small>{blog.cats}</small>
        </Box>

        <hr />

        <h1>{blog.title}</h1>
        <div className="content">{blog.content}</div>
      </Box>
      <Box sx={styles.newsContainer}>
        <p>Últimas notícias</p>
        <Box container sx={styles.news}>
          <NewsPost />
          <NewsPost />
          <NewsPost />
          <NewsPost />
        </Box>
      </Box>
    </Box>
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
        fontSize: { md: "16px", xs: "6px" },
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
      fontSize: { xs: "10px", md: "24px" },
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
  newsContainer: {
    display: {
      md: "block",
      xs: "none",
    },
    margin: "0 auto 130px auto",
    position: "absolute",
    top: "3%",
    left: "105%",
    width: "57%",
    "& p": {
      textTransform: "uppercase",
      color: "#33EDAC",
      fontWeight: "400",
      fontSize: "18px",
      mt: "20px",
    },
    borderLeft: "1px solid #77837F",
    pl: "20px",
  },
  news: {
    display: {
      md: "flex",
      xs: "none",
    },

    flexDirection: "column",
    justifyContent: "space-between",
    "& .MuiGrid-root": {
      width: {
        md: "100%",
        "& h2": {
          fontSize: "15px",
          fontWeight: "400",
        },
        "& a": {
          fontSize: "12px",
          fontStyle: "italic",
        },
        "& .decoration": {
          left: "0",
        },
      },
    },
    "& .MuiTypography-root": {
      justifyContent: "flex-start",
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
