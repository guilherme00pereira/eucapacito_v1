import { useState } from "react";
import { Grid, FormGroup, FormControl, Select, MenuItem } from "@mui/material";
import formStyle from "./formStyle";

const CityForm = () => {
  const [city, setCity] = useState("");

  const handleCity = (e) => setCity(e.target.value);

  return (
    <FormGroup sx={styles.root}>
      <p>Cidade de residência</p>

      <Grid container rowSpacing={1} columnSpacing={2} sx={styles.grid}>
        <Grid item xs={12}>
          <label htmlFor="city">Cidade</label>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select
              id="city"
              name="city"
              value={city}
              onChange={handleCity}
              sx={styles.input}
            >
              <MenuItem value="São Paulo">São Paulo</MenuItem>
              <MenuItem value="Rio de Janeiro">Rio de Janeiro</MenuItem>
              <MenuItem value="Curitiba">Curitiba</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

export default CityForm;

const styles = { ...formStyle };
