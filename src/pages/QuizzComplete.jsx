import {Box, Container} from "@mui/material";
import Button from "../components/Button";
import TestProgress from "../assets/img/test-progress.png";

const QuizzComplete = () => {
    return (
        <Container sx={styles.container}>
            <Box elevation={0} sx={{mt: '25px', mb: '50px', textAlign: 'center'}}>
                <img src={TestProgress} alt="progresso" />
            </Box>
            <Box>
                <h2>Parabéns</h2>
                <span>Você passou em todas as perguntas sobre Marketing Digital.</span>
            </Box>
            <Box>
                <Button href="#" sx={styles.courseLink}>
                    Gerar Certificado
                </Button>
            </Box>
        </Container>
    );
};

export default QuizzComplete;


const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        textAlign: "center",
        mt: {
            md: "30px",
        },
    },
}