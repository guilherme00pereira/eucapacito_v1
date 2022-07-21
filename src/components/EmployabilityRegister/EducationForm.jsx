import {Grid, FormGroup, FormControl, Select, MenuItem, OutlinedInput} from "@mui/material";
import formStyle from "../../commonStyles/formStyle";

const educationSelect = [
    "Ensino médio",
    "Superior incompleto",
    "Superior completo",
    "Pós graduação incompleta",
    "Pós graduação completa",
    "Mestrado",
    "Doutorado"
];

const EducationForm = ({form, handler}) => {

    return (
        <FormGroup sx={styles.root}>
            <p>Formação acadêmica?</p>

            <Grid container rowSpacing={1} columnSpacing={2} sx={styles.grid}>
                <Grid item xs={12}>
                    <label htmlFor="level">Nível</label>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <Select
                            id="level"
                            name="level"
                            value={form.level}
                            onChange={(e) => handler({...form, level: e.target.value})}
                            sx={styles.input}
                        >
                            {educationSelect.map((education) => (
                                <MenuItem value={education}>{education}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <label htmlFor="course">Qual seu curso?</label>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <OutlinedInput
                            type="text"
                            id="course"
                            name="course"
                            value={form.course}
                            onChange={(e) => handler({...form, course: e.target.value})}
                            sx={styles.input}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </FormGroup>
    );
};

export default EducationForm;

const styles = {...formStyle};
