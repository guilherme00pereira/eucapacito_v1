import {Grid, FormGroup, FormControl, OutlinedInput} from "@mui/material";
import formStyle from "./formStyle";

const CityForm = ({form, handler}) => {

    return (
        <FormGroup sx={styles.root}>
            <p>Cidade de residência</p>

            <Grid container rowSpacing={1} columnSpacing={2} sx={styles.grid}>
                <Grid item xs={12}>
                    <label htmlFor="city">Cidade</label>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <OutlinedInput
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={form.city}
                            onChange={(e) => handler({...form, city: e.target.value})}
                            sx={styles.input}
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </FormGroup>
    );
};

export default CityForm;

const styles = {...formStyle};
