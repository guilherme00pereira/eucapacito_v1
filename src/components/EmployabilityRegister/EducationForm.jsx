import { useState } from "react";
import { Grid, FormGroup, FormControl, Select, MenuItem } from "@mui/material";
import formStyle from "./formStyle";

const EducationForm = () => {
  const [level, setLevel] = useState("");
  const [course, setCourse] = useState("");

  const handleLevel = (e) => setLevel(e.target.value);
  const handleCourse = (e) => setCourse(e.target.value);

  return (
    <FormGroup sx={styles.root}>
      <p>Formação acadêmica?</p>

      <Grid container rowSpacing={1} columnSpacing={2} sx={styles.grid}>
        <Grid item xs={12}>
          <label htmlFor="level">Nível</label>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select
              id="level"
              name="level"
              value={level}
              onChange={handleLevel}
              sx={styles.input}
            >
              <MenuItem value="São Paulo">São Paulo</MenuItem>
              <MenuItem value="Rio de Janeiro">Rio de Janeiro</MenuItem>
              <MenuItem value="Curitiba">Curitiba</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <label htmlFor="course">Qual seu curso?</label>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select
              id="course"
              name="course"
              value={course}
              onChange={handleCourse}
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

export default EducationForm;

const styles = { ...formStyle };
