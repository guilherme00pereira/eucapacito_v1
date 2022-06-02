import { Container, Box } from "@mui/material";
import Link from "../components/Link";

const Faq = () => {
  return (
    <Container
      sx={{
        h1: { fontSize: "22px", color: '#33EDAC' },
        h2: { fontSize: "18px" },
        h3: { fontSize: "16px" },
        p: { fontSize: "14px", lineHeight: '26px', color: '#CAC8C8' },
        "a > h1": { color: '#CAC8C8' },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/contato">
          <h1>Mensagem</h1>
        </Link>
        <h1>F.A.Q.</h1>
      </Box>

      <Box>
        <h2>Dúvidas Frequentes Eu Capacito</h2>

        <h3>Os cursos são gratuitos?</h3>
        <p>
          Sim. Os cursos do Eu Capacito são gratuitos e fornecidos pelos
          apoiadores do projeto.
        </p>

        <h3>Como me cadastro nos cursos?</h3>
        <p>
          Primeiro passo, cadastre-se plataforma Eu Capacito. Depois, basta
          selecionar o curso de seu interesse na parte externa e clicar no botão
          INSCREVA-SE. Você será direcionado para a plataforma do parceiro, onde
          será solicitado um novo cadastro.
        </p>

        <h3>Estou com problemas para me cadastrar, o que eu faço?</h3>

        <p>
          Verifique se o seu nome de usuário contém espaços e se sua senha deve
          conter pelo menos uma letra minúscula, uma letra maiúscula e um
          número.
        </p>

        <h3>Existe limite de vagas por cursos?</h3>
        <p>
          A maioria dos cursos não possuem limite de vagas, mas temos 2 cursos
          na plataforma que são limitados e, por isso, vão exigir um processo de
          seleção.
        </p>

        <h3>Os cursos possuem certificação?</h3>
        <p>
          Alguns cursos possuem certificação após o término que são oferecidos
          pelo provedor do curso. Ele vem com seu nome e nome da Instituição que
          concede. Os certificados têm validade para fins curriculares e em
          provas de títulos, como certificado de atualização/aperfeiçoamento. Em
          breve, desenvolveremos o nosso próprio certificado, por isso, caso
          ainda não tenha feito, faça um cadastro no site Eu Capacito.
        </p>

        <h3>Os certificados são reconhecidos pelo MEC?</h3>
        <p>
          Não. O MEC só certifica cursos de graduação e pós graduação, enquanto
          secretarias Estaduais de Educação autorizam cursos técnicos
          profissionalizantes e do ensino médio.
        </p>
      </Box>
    </Container>
  );
};

export default Faq;
