import { Box } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import parse from "html-react-parser";
import Link from "../Link";
import Image from "next/image";

const BlogPost = ({ blog, sxContent, sxFull }) => {
  return (
      <Box sx={{...styles.post, ...sxFull}}>
        <Link to={`/${blog.slug}`}>
          <Box sx={styles.post.image}>
            <Image src={blog.featuredImg} alt="Placeholder Imagem" layout="fill" />
          </Box>
          <Box sx={{ ...styles.post.content, ...sxContent }}>
            <small>{parse(`${blog.categories}`)}</small>
            <hr />

            <h2>{parse(`${blog.title}`)}</h2>
            <div>{parse(`${blog.excerpt}`)}</div>
            <p>{blog.date}</p>

            <Box sx={styles.post.content.footer}>
                <CancelOutlined sx={styles.post.content.footer.icon} /> Leia mais
              {/* <p>Logo</p> */}
            </Box>
          </Box>
        </Link>
      </Box>
  );
};

export default BlogPost;

const styles = {
  post: {
    marginTop: "1rem",
    border: "1px solid #77837F",
    borderRadius: "0.5rem",
    image: { 
      position: "relative",
      width: {
        xs: "100%",
        md: "340px"
      },
      height: "200px",        
      borderRadius: "0.5rem",
        img: {
          borderRadius: "0.5rem 0.5rem 0 0",
      }
    },
    content: {
      p: 2,
      small: {
        display: "flex",
        justifyContent: "flex-end",
        color: "#77837F",
        fontSize: {
          md: "6px",
          xs: "6px !important",
        },
        fontWeight: {
          xs: "400",
          md: "400",
        },
        textAlign: "right",
        textTransform: "uppercase",
      },
      h2: {
        fontSize: "0.8rem",
        fontWeight: 500,
        lineHeight: "1.5rem",
        textTransform: "uppercase",
        height: "42px",
      },
      "& div": {
        margin: "0 0 0.75rem",
        color: "#77837F",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "20px",
        textAlign: "justify",
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        wordBreak: "break-word",
        minHeight: "38px",
      },
      "& div>p": {
        height: "80px",
      },
      "& div+p": {
        margin: "0 0 0.75rem",
        color: "#77837F",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "1.5rem",
      },
      footer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        a: {
          fontSize: "0.8rem",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
        },
        "& p": { margin: 0 },
        icon: {
          mr: "0.3rem",
          fontSize: "1.2rem",
          transform: "rotate(45deg)",
        },
      },
    },
  },
};
