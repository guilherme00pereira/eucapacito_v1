
import {Checkbox, FormControlLabel, Stack} from "@mui/material";
import formStyle from "../../commonStyles/formStyle";

const MultipleAnswer = ({answers}) => {

    return (
        <Stack>
            {answers.length > 0 &&
                answers.map((answer) => (
                    <FormControlLabel
                        control={
                            <Checkbox value={answer._correct}/>
                        }
                        label={answer._answer}
                        sx={styles.checkbox}
                        style={{color: "#CAC8C8"}}
                    />
                ))
            }
        </Stack>
    );
};

export default MultipleAnswer;

const styles = {
    ...formStyle,
};