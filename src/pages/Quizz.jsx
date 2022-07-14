import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Box, Stack, Pagination, PaginationItem } from "@mui/material";
import Button from "../components/Button";
import apiService from "../services/apiService";


const Quizz = () => {
    const [questions, setQuestions] = useState([]);
    const { api } = apiService;
    const { id } = useParams();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        api.get(`/ldlms/v2/sfwd-question?quiz=${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            const fetchedQuestions = [];
            console.log(res.data)
            res.data.forEach(question => {
                fetchedQuestions.push({
                    id: question.id,
                    question: question.title.rendered,
                })
                setQuestions([...fetchedQuestions])
            });
        });
    }, []);


    return (
        <Container sx={styles.root}>

            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={styles.topinfo}>
                <h2>Teste</h2>
                <h2>Questões 1/10</h2>
                
            </Stack>
            <hr />

            <Box sx={styles.resume}>
                <p>
                A comunicação é um importante elo entre as pessoas, pois é a partir dela que estabelecemos relações de confiança, manifestamos pensamentos e sentimentos, prestamos auxílio, compartilhamos conhecimentos, entre outras funções. Desde os primórdios, a emissão de sons e sinais, as gravuras nas cavernas e registros dos mais variados fazem parte da nossa comunicação e, consequentemente, das nossas relações.
                </p>
            </Box>
            <hr />

            <Box>

            </Box>
            <hr />

            <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                <Box>dsadas</Box>
                <Box>
                <Button href="#" sx={styles.courseLink}>
                    Próxima
                </Button>
                </Box>
                <Stack spacing={2}>
                    <Pagination 
                        count={questions.length} 
                        variant="outlined" 
                        shape="rounded"
                        renderItem={item => (
                            <PaginationItem component={Link} to={''} {...item} />
                        )} />
                </Stack>
            </Stack>
        </Container>
    );
};

export default Quizz;


const styles = {
    root: {
        hr: { border: 0, borderTop: "1px solid #77837F" },
    },
    topinfo: {
        color: "#33EDAC",
        mb: "-10px"
    },
    resume: {
        ml: "50px",
        lineHeight: "30px"
    },
    button: {
        textAlign: "center",
        mt: {
            md: "30px",
        },
    },
    loading: {
        display: "flex",
        margin: "1.5rem auto 0",
        color: "#77837F",
    },
}