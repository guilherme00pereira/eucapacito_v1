import { useState, useEffect, useContext } from "react";
import {Box, CircularProgress} from "@mui/material";
import parse from "html-react-parser";
import apiService from "../../services/apiService";
import MultipleAnswer from "./MultipleAnswer";
import SingleAnswer from "./SingleAnswer";
import {QuizContext} from "../../ApplicationContexts"
import { genHash } from "../../services/helper";

const QuestionCard = ({id}) => {
    const [validation, setValidation] = useContext(QuizContext);
    const [question, setQuestion] = useState({
        id: "",
        title: "",
        statement: "",
        answers: [],
        type: ""
    });
    const { api } = apiService;
    const token = sessionStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(id)
        api.get(`/ldlms/v1/sfwd-questions/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            setQuestion({
                id: res.data.question_id,
                title: parse(res.data.question_post_title),
                statement: parse(res.data._question),
                answers: res.data._answerData,
                type: res.data._answerType,
            })
            setIsLoading(false);
        });
    }, []);

    const renderAnswer = (question) => {
        switch (question.type) {
            case "multiple":
                return <MultipleAnswer question={question.id} answers={question.answers} />
            default:
                return <SingleAnswer question={question.id} answers={question.answers} />
        }
    }

    return (
        <>
            {isLoading && <CircularProgress sx={styles.loading} />}
            {!isLoading && (
                <>
                    <Box sx={styles.statement}>
                        <p>{question.statement}</p>
                    </Box>
                    <hr />

                    <Box sx={styles.statement}>
                        <h4>{question.title}</h4>
                    </Box>
                    <hr />

                    <Box sx={styles.answers}>
                        {question.answers.length > 0 &&
                            renderAnswer(question)
                        }
                    </Box>
                </>
            )}
        </>
    );
};

export default QuestionCard;


const styles = {
    statement: {
        mx: "50px",
        lineHeight: "30px"
    },
    answers: {
        margin: "50px",
        color: "#CAC8C8",
    },
    loading: {
        display: "flex",
        margin: "1.5rem auto 0",
        color: "#77837F",
    },
}