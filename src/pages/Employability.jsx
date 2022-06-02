import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Box } from "@mui/material";
import Button from "../components/Button";
import eyLogo from "../assets/img/ey-logo.png";
import CourseCard from "../components/CourseCard";
import CourseImg1 from "../assets/img/home-curso1.png";
import CourseImg2 from "../assets/img/home-curso2.png";
import CourseLogoFiap from "../assets/img/home-curso-logo-fiap.png";
import CourseLogoMicrosoft from "../assets/img/home-curso-logo-microsoft.png";

const Employability = () => {
  const [title, setTitle] = useOutletContext();

  useEffect(() => {
    setTitle({
      main: "Empregabilidade",
      sub: "Participe do processo seletivo",
    });
  }, []);

  return (
    <Box sx={styles.root}>
      <h1>Empregabilidade</h1>

      <Box sx={{ textAlign: "center", mb: "90px", "& h3":{fontSize:"14px" }}}>
        <h3>VENHA PARA A EY! (TECNOLOGIA)</h3>
        <img src={eyLogo} alt="" />
      </Box>

      <Box>
        <h2>Quem somos</h2>
        <p>
          A EY é líder em serviços de Auditoria, Consultoria, Impostos,
          Estratégias e Transações, Serviços Financeiros e de Tecnologia.
        </p>
        <p>
          Movida pelo propósito de construir um mundo de negócios melhor, a EY
          acredita no crescimento econômico sustentável e inclusivo. Por isso,
          trabalha continuamente para melhorar a qualidade dos serviços,
          capacitando as pessoas e investindo em inovação tecnológica. Cada área
          de atuação da EY se conecta e, juntas, formam as competências
          necessárias para gerar as transformações que o mundo pede hoje.
        </p>
        <p>
          Preencha o formulário de inscrição e complete a trilha de conhecimento
          para concorrer às vagas abertas no site da EY!
        </p>
      </Box>

      <Box>
        <h2>Etapas do processo</h2>
        <p>
          1) Preencha o formulário de inscrição para concorrer às vagas (confira
          aqui todas as posições em aberto);
        </p>
        <p>
          2) Nossas pessoas especialistas em tecnologia fizeram uma curadoria
          para indicar alguns treinamentos que podem fortalecer suas
          competências para o mercado e diferenciar você nos processos
          seletivos;
        </p>
        <p>3) Complete o(s) treinamento(s) abaixo;</p>
        <p>
          Atenção: os treinamentos selecionados foram sugeridos devido à
          importância das competências digitais para o mercado de trabalho. A
          recomendação tem como objetivo apoiar a sua formação tecnológica;
        </p>
        <p>
          4) Ao completar todos os treinamentos abaixo, faça o upload dos
          certificados (ou tela que comprove a conclusão do curso) até 31 de
          janeiro de 2022 (quanto mais rápido, melhor!). Aproveite e
          diferencie-se;
        </p>
      </Box>

      <Box sx={styles.faq}>
        <h2>FAQ</h2>
        <p>1) A que vaga estou concorrendo?</p>
        <p>
          A todas as vagas abertas no site da EY. Quer conhecê-las?{" "}
          <a href="">Clique aqui.</a>
        </p>
        <p>
          2) A conclusão ou a aprovação dos cursos é obrigatória para se
          candidatar às vagas?
        </p>
        <p>
          Não, mas, sem dúvida, será um diferencial tanto para a EY, quanto para
          o mercado.
        </p>
        <p>
          3) Concluir os treinamentos digitais do Eu Capacito é uma garantia de
          aprovação?
        </p>
        <p>
          Não, mas, sem dúvida, será um diferencial tanto para a EY, quanto para
          o mercado.
        </p>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          display: {
            md: "block",
            xs: "none",
          },
          margin: "49px 0",
        }}
      >
        <p>
          Em caso de dúvidas adicionais: <br /> recrutamento.brasil@br.ey.com
        </p>
      </Box>

      <h1>Para ajudar no seu processo, conclua o(s) seguinte(s) curso(s):</h1>

      <Box sx={styles.cardsContainer}>
        <Box sx={styles.card}>
          <CourseCard
            coursePath={"#"}
            imagePath={CourseImg1}
            title="Python"
            subtitle="EY Tecnologia"
            logoPath={CourseLogoFiap}
            className="card-desk"
          />
        </Box>
        <Box sx={styles.card}>
          <CourseCard
            coursePath={"#"}
            imagePath={CourseImg2}
            title="Big Data & Analytics"
            subtitle="EY Tecnologia"
            logoPath={CourseLogoMicrosoft}
            className="card-desk"
          />
        </Box>

        <Box sx={styles.certificado}>
          <Button>Envie os certificados</Button>
          <input type="file" />
          <input type="file" />
          <p>
            Finalizando os cursos anexar nos campos correspondentes e comece o
            processo seletivo clicando em "comece agora”.
          </p>
        </Box>
      </Box>

      <Box sx={styles.button}>
        <Button>Comece agora!</Button>
      </Box>
    </Box>
  );
};

export default Employability;

const styles = {
  root: {
    h1: {
      mb: "1.875rem",
      color: "#CAC8C8",
      fontSize: {md:"1.15rem",xs:"16px"},
      fontWeight: {md:"500",xs:"700"},
      borderBottom: {
        xs: "none",
        md: "1px solid #77837F",
      },
      pb: {
        md: "13px",
        xs: "0",
      },
    },
    h2: {
      mb: "1rem",
      fontSize: { xs: "10px", md: "18px" },
      fontWeight: 500,
    },
    "& p": {
      color: "#77837F",
      fontSize: { xs: "10px", md: "18px" },
      fontWeight: 700,
      lineHeight: { xs: "1.7rem", md: "30px" },
    },
    "& p:last-of-type": {
      mb: {
        xs: "2rem",
        md: "0",
      },
    },
  },
  button: {
    mx: "1rem",
    textAlign: { md: "center", xs: "left" },
    "& .MuiButton-root": {
      width: { xs: "100%", md: "25%" },
    },
  },
  faq: {
    "& p:nth-of-type(odd)": {
      color: "#CAC8C8",
    },
    display: {
      md: "block",
      xs: "none",
    },
  },
  cardsContainer: {
    display: {
      md: "flex",
      xs: "none",
    },
  },
  card: {
    maxWidth: "30%",
    "& img": {
      border: "1px solid #77837f",
    },
    "& .MuiGrid-root img": {
      border: "none",
    },
    mr: "25px",
    mb: "40px",

    "& .MuiGrid-container": {
      border: "1px solid #77837f",
      boxSizing: "border-box",
      mt: "14px",
      borderRadius: "8px",
      padding: "24px",
      justifyContent: "space-between",
      alignItems: "end",
    },
    "& .desk-info": {
      mb: "50px",
    },
    "& small": {
      fontSize: "16px",
    },
  },
  certificado: {
    display: "flex",
    flexDirection: "column",
    width: "33%",
    margin: "0 auto",
    "& button": {
      width: "75%",
      margin: "0 auto 63px auto",
    },
    "& p": {
      fontSize: "12px !important",
      lineHeight: "20px",
      maxWidth: "359px",
    },
    "& input": {
      border: "1px solid #CAC8C8",
      borderRadius: "8px",
      margin: "10px 0",
    },
  },
};
