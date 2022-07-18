import {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Container, Box, Stack, Pagination, CircularProgress} from "@mui/material";
import Button from "../components/Button";
import apiService from "../services/apiService";
import QuestionCard from "../components/Quiz/QuestionCard";


const Quizz = () => {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(1);
    const [end, setEnd] = useState(false);
    const {api} = apiService;
    const {id} = useParams();
    const token = sessionStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        api.get(`/ldlms/v2/sfwd-question?quiz=${id}`, {
            headers: {Authorization: `Bearer ${token}`},
        }).then((res) => {
            const fetchedQuestions = [];
            res.data.forEach(question => {
                fetchedQuestions.push({
                    id: question.id
                })
                setQuestions([...fetchedQuestions])
            });
            setIsLoading(false);
        });
    }, []);

    const renderCard = () => {
        return <QuestionCard key={questions[current - 1].id} id={questions[current - 1].id}/>
    }

    const handlePagination = (e, v) => {
        setCurrent(v)
        v === questions.length && setEnd(true)
    }

    const handleSubmitAnswer = () => {

    }

    const handleEndQuiz = () => {
        navigate('/teste-concluido');
    }


    return (
        <Container sx={styles.root}>
            {isLoading && <CircularProgress sx={styles.loading}/>}
            {!isLoading && (
                <>

                    <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={styles.topinfo}>
                        <h2>Teste</h2>
                        <h2>Questões 1/{questions.length}</h2>
                    </Stack>
                    <hr/>

                    {questions.length > 0 && renderCard()}


                    <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                        <Box>Eu Capacito Logo</Box>
                        <Box>
                            {end ?
                                <Button onClick={handleEndQuiz} sx={styles.courseLink}>
                                    Finalizar
                                </Button> :
                                <Button onClick={handleSubmitAnswer} sx={styles.courseLink}>
                                    Próxima
                                </Button>
                            }

                        </Box>
                        <Stack spacing={2}>
                            <Pagination
                                count={questions.length}
                                variant="outlined"
                                shape="rounded"
                                page={current}
                                onChange={handlePagination}/>
                        </Stack>
                    </Stack>
                </>
            )}
        </Container>
    );
};

export default Quizz;


const styles = {
    root: {
        hr: {border: 0, borderTop: "1px solid #77837F"},
    },
    topinfo: {
        color: "#33EDAC",
        mb: "-10px"
    },
    statement: {
        mx: "50px",
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