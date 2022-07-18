import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import apiService from "../services/apiService";
import {Box, CircularProgress, Container, Stack, Typography} from "@mui/material";
import Button from "../components/Button";

const QuizzComplete = () => {
    const [certificate, setCertificate] = useState("");
    const {api} = apiService;
    const { id } = useParams();
    const token = sessionStorage.getItem("token");
    const userID = sessionStorage.getItem("userID");

    useEffect(() => {
        api.get(`/eucapacito/v1/get-certificate?quiz=${id}&user=${userID}`).then((res) => {
            setCertificate(res.data)
        });
    }, []);

    return (
        <Container sx={styles.container}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" size="8rem" value={80} sx={styles.circular} />
                <Box sx={styles.circular.box}>
                    <Typography variant="h5" align="center" sx={styles.circular.percent}>
                        80%
                    </Typography>
                    <Typography variant="caption" align="center" component="small" sx={styles.circular.number}>
                        8/10
                    </Typography>
                </Box>
            </Box>
            <Stack justifyContent="center" alignItems="center" spacing={3} sx={styles.message}>
                <h2>Parabéns</h2>
                <span>Você passou em todas as perguntas sobre Marketing Digital.</span>
            </Stack>
            <Box>
                <Button href={certificate} sx={styles.courseLink}>
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
    circular: {
        color: "#33ECAD",
        box: {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'center',
        },
        percent: {
            color: "#33ECAD",
            fontSize: "1.75rem",
            fontWeight: "600"
        },
        number: {
            fontSize: "1rem",
        }
    },
    message: {
        mt: "3rem",
        mb: "5rem",
        h2: {
            fontSize: "1.5rem",
            fontWeight: "500"
        },
        span: {
            fontSize: "0.875rem",
            color: "#77837F",
            width: "330px",
            textAlign: "center"
        }
    },
    button: {
        textAlign: "center",
        mt: {
            md: "30px",
        },
    },
}