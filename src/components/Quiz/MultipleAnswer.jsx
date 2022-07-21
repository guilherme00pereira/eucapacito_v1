import { useState, useContext } from "react";
import {FormGroup, Checkbox, FormControlLabel, Stack} from "@mui/material";
import formStyle from "../../commonStyles/formStyle";
import {QuizContext} from "../../ApplicationContexts"

const MultipleAnswer = ({question, answers}) => {
    const [validation, setValidation] = useContext(QuizContext);
    const [options, setOptions] = useState([])

    const handleValidateAnswer = (e) => {
        console.log(options)
        let answer = true
        const v = e.target.value.split("_")
        const item = { idx: v[0], a: v[1] }
        const newOptions = options.filter(x => x.idx !== v[0])
        newOptions.push(item)
        setOptions(newOptions)
        newOptions.forEach((o) => {
            if(o.a === 'false') {
                answer = false
            }
        })
        const obj = { q: question, a: answer }
        const newArr = validation.filter(x => x.q !== question)
        setValidation([...newArr, obj])
    }

    return (
        <Stack>
            <FormGroup>
            {answers.length > 0 &&
                answers.map((answer, index) => (
                    <FormControlLabel
                        key={index}
                        value={index + "_" + answer._correct}
                        control={<Checkbox/>}
                        label={answer._answer}
                        sx={styles.checkbox}
                        style={{color: "#CAC8C8"}}
                        onChange={(e) => handleValidateAnswer(e)}
                    />
                ))
            }
            </FormGroup>
        </Stack>
    );
};

export default MultipleAnswer;

const styles = {
    ...formStyle,
};