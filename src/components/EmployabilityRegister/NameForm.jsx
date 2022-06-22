import { Grid, FormGroup, FormControl, OutlinedInput } from "@mui/material";
import formStyle from "./formStyle";
import {useContext} from "react";

const NameForm = ({form, handler}) => {
  return (
    <FormGroup sx={styles.root}>
      <p>Antes de iniciarmos,</p>
      <p>como podemos te chamar?</p>

      <Grid container rowSpacing={1} columnSpacing={2} sx={styles.grid}>
        <Grid item xs={12}>
          <label htmlFor="name">Nome completo</label>
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <OutlinedInput
              type="text"
              id="name"
              name="name"
              required
              value={form.name}
              onChange={(e) => handler({...form, name: e.target.value})}
              sx={styles.input}
            />
          </FormControl>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default NameForm;

const styles = {...formStyle};
