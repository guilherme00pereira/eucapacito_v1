import React from 'react';
import {FormGroup, FormControl, FormControlLabel, Radio, Stack, RadioGroup} from "@mui/material";
import formStyle from "../../commonStyles/formStyle";

const SingleAnswer = ({answers}) => {
    return (
        <Stack>
            <FormGroup>
                <FormControl>
                    <RadioGroup name="">
                        {answers.length > 0 &&
                            answers.map((answer, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={answer._answer}
                                    control={<Radio/>}
                                    label={answer._answer}
                                    sx={styles.checkbox}
                                    style={{color: "#CAC8C8"}}
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