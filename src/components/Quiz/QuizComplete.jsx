import { useState, useEffect, useContext } from "react";
import {useNavigate, useParams} from "react-router-dom";
import apiService from "../../services/apiService";
import {Box, CircularProgress, Container, Stack, Typography} from "@mui/material";
import Button from "../Button";
import {QuizContext} from "../../ApplicationContexts"

const QuizComplete = () => {
    const [validation, setValidation] = useContext(QuizContext);
    const [certificate, setCertificate] = useState("");//https://wp.eucapacito.com.br/certificates/cinco-habilidades-essenciais-para-impulsionar-a-sua-carreira/?quiz=9841&cert-nonce=097bbc7731
    const [result, setResult] = useState({
        total: 1,
        points: 1,
        percent: 100
    })
    const [message, setMessage] = useState({
        title: "",
        summary: "",
        passed: false
    })
    const {api} = apiService;
    const { id } = useParams();
    const userID = sessionStorage.getItem("userID");

    useEffect(() => {
        console.log(validation)
        api.get(`/eucapacito/v1/get-certificate?quiz=${id}&user=${userID}`).then((res) => {
            setCertificate(res.data)
        });
        const pts = countPoints(validation)
        const pct = (( pts/validation.length ) * 100).toFixed(2)
        setResult({
            total: validation.length,
            points: pts,
            percent: pct
        })
        if( pct >= 70 ) {
            setMessage({
                title: "Parabéns",
                summary: 'Você passou em todas as perguntas',
                passed: true
            })
        } else {
            setMessage({
                title: "Não foi desta vez",
                summary: 'Refaça a prova e tente novamente',
                passed: false
            })
        }
    }, []);

    const countPoints = (arr) => {
        let i = 0;
        arr.forEach( (item) => {
            item.a && i++
        })
        return i
    }

    return (
        <Container sx={styles.container}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate" size="8rem" value={result.percent} sx={styles.circular} />
                <Box sx={styles.circular.box}>
                    <Typography variant="h5" align="center" sx={styles.circular.percent}>
                        {result.percent}%
                    </Typography>
                    <Typography variant="caption" align="center" component="small" sx={styles.circular.number}>
                        {result.points}/{result.total}
                    </Typography>
                </Box>
            </Box>
            <Stack justifyContent="center" alignItems="center" spacing={3} sx={styles.message}>
                <h2>{message.title}</h2>
                <span>{message.summary}</span>
            </Stack>
            <Box>
                {message.passed &&
                    <Button href={certificate} target="_blank" sx={styles.courseLink}>
                        Gerar Certificado
                    </Button>
                }
            </Box>
        </Container>
    );
};

export default QuizComplete;


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