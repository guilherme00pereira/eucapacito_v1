import { Box } from "@mui/material";
import Link from "../Link";
import PostImgUm from "../../assets/img/blog-home-1.png";
import PostImgDois from "../../assets/img/blog-home-2.png";
import PostImgTres from "../../assets/img/conteudo-blog.png";
import LogoPostUm from "../../assets/img/logo-blog-home-1.png";
import LogoPostTres from "../../assets/img/logo-blog-home-3.png";
import LeiaIcon from "../../assets/img/plus-blog-home.png"

const BlogPostUm = () => {
  return (
    <div>
      <Box sx={styles.post}>
        <Box sx={styles.post.image}>
          <img src={PostImgUm} alt="Placeholder Imagem" />
        </Box>
        <Box sx={styles.post.content}>
          <small>AGILE, INDÚSTRIA 4.0, MERCADO, PROFISSÕES, SOFT SKILLS, TECNOLOGIA</small>
          <hr />

          <h2>
            Conheça as 7 habilidades mais buscadas em profissionais de
            tecnologia
          </h2>
          <p>
            Ter o domínio do idioma inglês, boa comunicação e perfil
            colaborativo são algumas...
          </p>
          <p>03 de novembro de 2021</p>

          <Box sx={styles.post.content.footer}>
            <Link to="#"> <img src={LeiaIcon} alt="" />Leia mais</Link>
            <p> <img src={LogoPostUm} alt="logo" /></p>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

const BlogPostDois = () => {
  return (
    <div>
      <Box sx={styles.post}>
        <Box sx={styles.post.image}>
          <img src={PostImgDois} alt="Placeholder Imagem" />
        </Box>
        <Box sx={styles.post.content}>
          <small></small>
          <hr />

          <h2>
            Customer experience entenda melhor sobre essa profissão em alta no
            mercado
          </h2>
          <p>
            Customer Experience: entenda melhor sobre essa profissão em alta no
            mercado. Baixe o e-book grátis!
          </p>
          <p>03 de novembro de 2021</p>

          <Box sx={styles.post.content.footer}>
            <Link to="#">Baixar Aqui</Link>
            <p><img src={LogoPostTres} alt="logo" /></p>            
          </Box>
        </Box>
      </Box>
    </div>
  );
};

const BlogPostTres = () => {
  return (
    <div>
      <Box sx={styles.post}>
        <Box sx={styles.post.image}>
          <img src={PostImgTres} alt="Placeholder Imagem" />
        </Box>
        <Box sx={styles.post.content}>
          <small>Cursos, Design, Fluência Digital</small>
          <hr />

          <h2>
            Marketing Digital: conheca os cargos e salários relacionados à área
          </h2>
          <p>
            O marketing digital já é conhecido e procurado por diversas
            empresas. A área está em constante evolução...
          </p>
          <p>03 de novembro de 2021</p>

          <Box sx={styles.post.content.footer}>
            <Link to="#"> <img src={LeiaIcon} alt="" />Leia mais</Link>
            <p> <img src={LogoPostTres} alt="logo" /></p>
          </Box>
        </Box>
      </Box>
    </div>
  );
};
export { BlogPostTres, BlogPostDois, BlogPostUm };

const styles = {
  post: {   
    marginBottom: "53px",
    border: "1px solid #77837F",
    borderRadius: "8px",
    image: {
      width: "100%",
      borderRadius: "8px",
      minHeight: "190px",
      img: {
        width: "100%",
      },
    },
    content: {
      p: 2,
      small: {
        display: "flex",
        justifyContent: "flex-end",
        color: "#77837F",
        fontSize: "9px",
        fontWeight: 500,
        textTransform: "uppercase",
        textAlign:"right",
        minHeight:"29px"
      },
      h2: {
        fontSize: "18px",
        fontWeight: 500,
        lineHeight: "1.2rem",
      },
      "& p": {
        margin: "16px 0 0 0",
        color: "#77837F",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: "20px",
      },
      "& p+p": {
        fontSize: "0.7rem",
      },
      footer: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        a: {
          mt:"9px",
          fontSize: "0.8rem",
          textTransform: "uppercase",
        },

        "& p": { margin: 0 },
        img:{
            marginRight:"6px",
        }
      },
    },
  },
};
