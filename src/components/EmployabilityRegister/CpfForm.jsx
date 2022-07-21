import { Grid, FormGroup, FormControl, OutlinedInput } from "@mui/material";
import formStyle from "../../commonStyles/formStyle";

const CpfForm = ({form, handler}) => {

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
              value={form.cpf}
              onChange={(e) => handler({...form, cpf: e.target.value})}
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
