
import {FormGroup, Checkbox, FormControlLabel, Stack} from "@mui/material";
import formStyle from "../../commonStyles/formStyle";

const MultipleAnswer = ({answers}) => {

    return (
        <Stack>
            <FormGroup>
            {answers.length > 0 &&
                answers.map((answer) => (
                    <FormControlLabel
                        control={<Checkbox/>}
                        label={answer._answer}
                        sx={styles.checkbox}
                        style={{color: "#CAC8C8"}}
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