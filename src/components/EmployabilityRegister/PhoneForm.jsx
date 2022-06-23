import { Grid, FormGroup, FormControl, OutlinedInput } from "@mui/material";
import formStyle from "./formStyle";

const PhoneForm = ({form, handler}) => {
  return (
    <FormGroup sx={styles.root}>
      <p>Cel com o DDD</p>

      <Grid container rowSpacing={1} columnSpacing={2} sx={styles.grid}>
        <Grid item xs={12}>
          <label>Cel</label>
        </Grid>

        <Grid item xs={3}>
          <FormControl>
            <OutlinedInput
              type="text"
              id="ddd"
              name="ddd"
              required
              value={form.ddd}
              onChange={(e) => handler({...form, ddd: e.target.value})}
              sx={styles.input}
            />
          </FormControl>
        </Grid>

        <Grid item xs={9}>
          <FormControl>
            <OutlinedInput
              type="text"
              id="phone"
              name="phone"
              required
              value={form.phone}
              onChange={(e) => handler({...form, phone: e.target.value})}
              sx={styles.input}
            />
          </FormControl>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default PhoneForm;

const styles = {...formStyle};
