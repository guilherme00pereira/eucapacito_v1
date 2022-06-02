import { Grid, FormGroup, FormControl, OutlinedInput } from "@mui/material";
import formStyle from "./formStyle";

const DateForm = () => {
  return (
    <FormGroup sx={styles.root}>
      <p>Inscreva-se para concorrer</p>

      <Grid container rowSpacing={1} columnSpacing={2} sx={styles.grid}>
        <Grid item xs={12}>
          <label>Data de Nascimento</label>
        </Grid>

        <Grid item xs={3}>
          <FormControl>
            <OutlinedInput
              type="text"
              id="day"
              name="day"
              required
              // value={fields.day}
              // onChange={}
              sx={styles.input}
            />
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl>
            <OutlinedInput
              type="text"
              id="month"
              name="month"
              required
              // value={fields.month}
              // onChange={}
              sx={styles.input}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl>
            <OutlinedInput
              type="text"
              id="year"
              name="year"
              required
              // value={fields.year}
              // onChange={}
              sx={styles.input}
            />
          </FormControl>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default DateForm;

const styles = {...formStyle};
