import {Grid, FormGroup, FormControl, Select, MenuItem} from "@mui/material";
import formStyle from "../../commonStyles/formStyle";

const genderSelect = [
    "Mulher (Cisgênero)",
    "Mulher (Transgênero)",
    "Homem (Cisgênero)",
    "Homem (Transgênero)",
    "Pessoa de gênero não binário",
    "Travesti",
    "Outra opção/Não sei",
    "Prefiro não informar"
]

const colorSelect = [
    "Branca",
    "Preta",
    "Parda",
    "Amarela",
    "Raça/Etnia Indígena",
    "Não sei informar"
]

const GenderForm = ({form, handler}) => {

    return (
        <FormGroup sx={styles.root}>
            <p>Como você se identifica?</p>

            <Grid container rowSpacing={1} columnSpacing={2} sx={styles.grid}>
                <Grid item xs={12}>
                    <label htmlFor="gender">Gênero</label>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <Select
                            id="gender"
                            name="gender"
                            value={form.gender}
                            onChange={(e) => handler({...form, gender: e.target.value})}
                            sx={styles.input}
                        >
                          {genderSelect.map((gender) => (
                              <MenuItem value={gender}>{gender}</MenuItem>
                          ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <label htmlFor="color">Cor</label>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <Select
                            id="color"
                            name="color"
                            value={form.color}
                            onChange={(e) => handler({...form, color: e.target.value})}
                            sx={styles.input}
                        >
                          {colorSelect.map((color) => (
                              <MenuItem value={color}>{color}</MenuItem>
                          ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </FormGroup>
    );
};

export default GenderForm;

const styles = {...formStyle};
