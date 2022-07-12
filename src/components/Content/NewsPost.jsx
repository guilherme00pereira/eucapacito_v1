import { Grid } from "@mui/material";
import Link from "../Link";

const NewsPost = ({post}) => {
  return (
    <Grid container sx={styles.post}>
      <Grid item sx={styles.column1} xs={4}>
        <img src={post.image_url} alt="placeholder" />
      </Grid>
      <Grid item sx={styles.column2} xs={8}>
        <h2>{post.title}</h2>
        <Link to={`/${post.slug}`} sx={styles.link}>
          Saiba mais
        </Link>
        <div style={styles.decoration}></div>
      </Grid>
    </Grid>
  );
};

export default NewsPost;

const styles = {
  post: {
    my: "1rem",
    justifyContent: "center",
    alignItems: "center",
    h2: {
      fontSize: "0.8rem",
      fontWeight: 500,
    },
  },
  column1: {
    img: {
      borderRadius: "25%",
      width: "100px",
      height: "100px",
      objectFit: "cover"
    }
  },
  column2: {},
  link: {
    position: 'relative',
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "0.8rem",
    textTransform: "uppercase",
  },
  decoration: {
    right: "67px",
    bottom: "-2px",
    borderBottom: "1px solid #33EDAC",
    width: "10px"
  }
};
