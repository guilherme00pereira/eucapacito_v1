import { Grid, FormGroup, FormControl, OutlinedInput } from "@mui/material";
import formStyle from "./formStyle";

const EmailForm = ({form, handler}) => {
  return (
    <FormGroup sx={styles.root}>
      <p>Qual é o seu e-mail?</p>

      <Grid container rowSpacing={1} columnSpacing={2} sx={styles.grid}>
        <Grid item xs={12}>
          <label htmlFor="email">E-mail</label>
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <OutlinedInput
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={(e) => handler({...form, email: e.target.value})}
              sx={styles.input}
            />
          </FormControl>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default EmailForm;

const styles = {...formStyle};
