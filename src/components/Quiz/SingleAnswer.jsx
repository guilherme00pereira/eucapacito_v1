import { useContext } from "react";
import {FormGroup, FormControl, FormControlLabel, Radio, Stack, RadioGroup} from "@mui/material";
import formStyle from "../../commonStyles/formStyle";
import {QuizContext} from "../../services/context"

const SingleAnswer = ({question, answers}) => {
    const [validation, setValidation] = useContext(QuizContext);


    const handleValidateAnswer = (e) => {
        const v = e.target.value.split("_")[1]
        const obj = { q: question, a: v === "true" }
        const newArr = validation.filter(x => x.q !== question)
        setValidation([...newArr, obj])
    }

    return (
        <Stack>
            <FormGroup>
                <FormControl>
                    <RadioGroup name="">
                        {answers.length > 0 &&
                            answers.map((answer, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={index + "_" + answer._correct}
                                    control={<Radio/>}
                                    label={answer._answer}
                                    sx={styles.checkbox}
                                    style={{color: "#CAC8C8"}}
                                    onChange={(e) => handleValidateAnswer(e)}
                                />
                            ))
                        }
                    </RadioGroup>
                </FormControl>
            </FormGroup>
        </Stack>
    );
};

export default SingleAnswer;

const styles = {
    ...formStyle,
};