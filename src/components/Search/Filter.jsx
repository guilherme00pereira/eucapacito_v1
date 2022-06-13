import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import Button from "../../components/Button";

const Filter = () => {
  const [categoryIDs, setCategoryIDs] = useState([]);

  // useEffect(() => {
  //   console.log(categoryIDs);
  // }, [categoryIDs]);

  const handleCheckbox = (e) => {
    const checkboxID = parseInt(e.target.value);

    if (e.target.checked) {
      setCategoryIDs([...categoryIDs, checkboxID]);
    } else {
      setCategoryIDs([
        ...categoryIDs.filter((categoryID) => categoryID !== checkboxID),
      ]);
    }
  };

  return (
      <Box sx={styles.root}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Box sx={styles.submit}>
              <h1>Filtro</h1>
              <Button to="#" sx={styles.submit.button}>
                Aplicar
              </Button>
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={12} md={4}>
                <Box sx={styles.group}>
                  <h2>Categorias</h2>

                  <FormGroup>
                    <FormControlLabel
                        label="Empreendedorismo (2.313)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="category"
                        value="1"
                    />
                    <FormControlLabel
                        label="Fluência Digital (4.236)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="category"
                        value="2"
                    />
                    <FormControlLabel
                        label="Tech (499)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="category"
                        value="3"
                    />
                    <FormControlLabel
                        label="Soft skills (799)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="category"
                        value="4"
                    />
                    <FormControlLabel
                        label="Eu Capacito (299)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="category"
                        value="5"
                    />
                    <FormControlLabel
                        label="Todas as trilhas (8.468)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="category"
                        value="6"
                    />
                  </FormGroup>
                </Box>

                <Box sx={styles.group}>
                  <h2>Nível</h2>

                  <FormGroup>
                    <FormControlLabel
                        label="Todos os níveis (213)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="level"
                        value="7"
                    />
                    <FormControlLabel
                        label="Básico (1.299)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="level"
                        value="8"
                    />
                    <FormControlLabel
                        label="Intermediário (364)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="level"
                        value="9"
                    />
                    <FormControlLabel
                        label="Avançado (199)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="level"
                        value="10"
                    />
                  </FormGroup>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={styles.group}>
                  <h2>Preço</h2>

                  <FormGroup>
                    <FormControlLabel
                        label="Pago (32)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="price"
                        value="11"
                    />
                    <FormControlLabel
                        label="Grátis (12.099)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="price"
                        value="12"
                    />
                  </FormGroup>
                </Box>

                <Box sx={styles.group}>
                  <h2>Classificação</h2>

                  <FormGroup>
                    <FormControlLabel
                        label="1 estrela (23.173)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="star"
                        value="13"
                    />
                    <FormControlLabel
                        label="2 estrelas (1.625)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="star"
                        value="14"
                    />
                    <FormControlLabel
                        label="3 estrelas (399)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="star"
                        value="15"
                    />
                    <FormControlLabel
                        label="4 estrelas (28)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="star"
                        value="16"
                    />
                    <FormControlLabel
                        label="5 estrelas (18)"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="star"
                        value="17"
                    />
                  </FormGroup>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box>
                  <h2>Parceiros</h2>

                  <FormGroup>
                    <FormControlLabel
                        label="Todos os parceiros"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="partner"
                        value="18"
                    />
                    <FormControlLabel
                        label="Cisco"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="partner"
                        value="19"
                    />
                    <FormControlLabel
                        label="EY"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="partner"
                        value="20"
                    />
                    <FormControlLabel
                        label="FIAP"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="partner"
                        value="21"
                    />
                    <FormControlLabel
                        label="Google"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="partner"
                        value="22"
                    />
                    <FormControlLabel
                        label="IBM"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="partner"
                        value="23"
                    />
                    <FormControlLabel
                        label="IDP"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="partner"
                        value="24"
                    />
                    <FormControlLabel
                        label="Microsoft"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="partner"
                        value="25"
                    />
                    <FormControlLabel
                        label="Oracle"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="partner"
                        value="26"
                    />
                    <FormControlLabel
                        label="Salesforce"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="partner"
                        value="27"
                    />
                    <FormControlLabel
                        label="Serasa"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="partner"
                        value="28"
                    />
                    <FormControlLabel
                        label="SoulCode"
                        control={<Checkbox onChange={handleCheckbox} />}
                        name="partner"
                        value="29"
                    />
                  </FormGroup>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
  );
};

export default Filter;

const styles = {
  root: {
    padding: "1.5rem",
    height: "auto",
    h1: {
      my: "0",
      maxWidth: "1440px",
      color: "#CAC8C8",
      fontSize: "22px",
      fontWeight: 600,
      textAlign: "left",
    },
    h2: {
      m: "0 auto 0.75rem",
      maxWidth: "1440px",
      color: "#CAC8C8",
      fontSize: "1.25rem",
      fontWeight: 500,
    },
  },
  group: {
    mb: "2rem",
  },
  submit: {
    mx: "2rem",
    pr: "2rem",
    pl: "1rem",
    borderRight: "1px solid #77837F",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    h1: {
      mt: 0,
      fontSize: "22px",
    },
    button: {
      display: "flex",
      width: "100%",
    },
  },
};
