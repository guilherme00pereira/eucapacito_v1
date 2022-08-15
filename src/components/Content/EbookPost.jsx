import parse from "html-react-parser";
import { Box } from "@mui/material";
import Link from "../Link";

const EbookPost = ({ ebook, sxFull }) => {

  return (
    <Box sx={{...styles.post,...sxFull}}>
      <Link to={`/e-book/${ebook.slug}`}>
        <Box sx={styles.post.image}>
          <img src={ebook.featuredImg} alt="Imagem Placeholder" />
        </Box>
        <Box sx={styles.post.content}>
          <h2>{ebook.title}</h2>
          {parse(`${ebook.excerpt}`)}

          <Box sx={styles.post.content.footer}>
          </Box>
        </Box>
      </Link>
    </Box>
  );
};

export default EbookPost;

const styles = {
  post: {
    marginTop: "1rem",
    border: "1px solid #77837F",
    borderBottom: "2px solid #77837F",
    borderRadius: "8px",
    image: {
      width: "100%",
      borderRadius: "8px",
      minHeight: "190px",
      img: {
        width: "100%",
        height: "240px",
        borderTopLeftRadius: "7px",
        borderTopRightRadius: "7px",
      },
    },
    content: {
      p: 2,
      h2: {
        fontSize: { xs: "0.8rem", md: "10px" },
        fontWeight: 400,
        lineHeight: "1.5rem",
        textTransform: "uppercase",
        height: "40px",
      },
      "& p": {
        margin: "0 0 0.75rem",
        color: "#77837F",
        fontSize: "0.75rem",
        fontWeight: 500,
        lineHeight: "1.5rem",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        wordBreak: "break-word",
        minHeight: "38px",
      },
      footer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        a: {
          fontSize: "0.8rem",
          textTransform: "uppercase",
        },
        "& p": {
          margin: 0,
          color: "#77837F",
          fontSize: "7px",
          fontWeight: 400,
        },
      },
    },
  },
};
