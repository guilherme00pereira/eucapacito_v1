import { Grid } from "@mui/material";
import Link from "../Link";
import NoticiasImg from "../../assets/img/noticias.png";
import LinkDecoration from './LinkDecoration';

const NewsPost = () => {
  return (
    <Grid container sx={styles.post}>
      <Grid item sx={styles.column1} xs={4}>
        <img src={NoticiasImg} alt="placeholder" />
      </Grid>
      <Grid item sx={styles.column2} xs={8}>
        <h2>NOVAS VAGAS PARA O CURSO DE DESIGN GRÁFICO</h2>
        <Link to="#" sx={styles.link}>
          Saiba mais
          <LinkDecoration />
        </Link>
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
  column1: {},
  column2: {},
  link: {
    position: 'relative',
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "0.8rem",
    textTransform: "uppercase",
  },
};
