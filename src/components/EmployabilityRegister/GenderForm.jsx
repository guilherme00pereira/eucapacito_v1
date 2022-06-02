import { useState } from "react";
import { Grid, FormGroup, FormControl, Select, MenuItem } from "@mui/material";
import formStyle from "./formStyle";

const GenderForm = () => {
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");

  const handleGender = (e) => setGender(e.target.value);
  const handleColor = (e) => setColor(e.target.value);

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
              value={gender}
              onChange={handleGender}
              sx={styles.input}
            >
              <MenuItem value="São Paulo">São Paulo</MenuItem>
              <MenuItem value="Rio de Janeiro">Rio de Janeiro</MenuItem>
              <MenuItem value="Curitiba">Curitiba</MenuItem>
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
              value={color}
              onChange={handleColor}
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

export default GenderForm;

const styles = { ...formStyle };
