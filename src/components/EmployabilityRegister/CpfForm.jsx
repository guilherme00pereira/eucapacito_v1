import { Grid, FormGroup, FormControl, OutlinedInput } from "@mui/material";
import formStyle from "./formStyle";

const CpfForm = () => {
  return (
    <FormGroup sx={styles.root}>
      <p>Qual é o seu CPF?</p>

      <Grid container rowSpacing={1} columnSpacing={2} sx={styles.grid}>
        <Grid item xs={12}>
          <label htmlFor="cpf">CPF</label>
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <OutlinedInput
              type="text"
              id="cpf"
              name="cpf"
              required
              // value={fields.cpf}
              // onChange={}
              sx={styles.input}
            />
          </FormControl>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default CpfForm;

const styles = {...formStyle};
