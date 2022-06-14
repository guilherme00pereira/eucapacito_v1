import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import apiService from "../../services/apiService";
import Button from "../../components/Button";

const Filter = (handler) => {
  const {api} = apiService;
  const [categoryIDs, setCategoryIDs] = useState([]);
  const [filters, setFilters] = useState({
    levels: [],
    ranking: [],
    categories: [],
    partners: []
});

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

  useEffect(() => {
      api.get('/eucapacito/v1/filters').then((res) => {
        setFilters({
          levels: res.data.nivel,
          ranking: res.data.avaliao,
          categories: res.data.categoria_de_curso_ec,
          partners: res.data.parceiro_ec  
        });
    });
  }, []);

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
                    {
                      filters.categories.map((item) => ( 
                        <FormControlLabel
                            label={item.name + " (" + item.count + ")"}
                            control={<Checkbox onChange={handleCheckbox} />}
                            name="category"
                            value={item.id}
                        />
                    ))}
                    
                  </FormGroup>
                </Box>

                <Box sx={styles.group}>
                  <h2>Nível</h2>

                  <FormGroup>
                    {
                        filters.levels.map((item) => ( 
                          <FormControlLabel
                              label={item.name + " (" + item.count + ")"}
                              control={<Checkbox onChange={handleCheckbox} />}
                              name="level"
                              value={item.id}
                          />
                      ))}
                  </FormGroup>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>

                <Box sx={styles.group}>
                  <h2>Classificação</h2>

                  <FormGroup>
                    {
                        filters.ranking.map((item) => ( 
                          <FormControlLabel
                              label={item.name + " (" + item.count + ")"}
                              control={<Checkbox onChange={handleCheckbox} />}
                              name="ranking"
                              value={item.id}
                          />
                      ))}
                  </FormGroup>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box>
                  <h2>Parceiros</h2>

                  <FormGroup>
                    {
                        filters.partners.map((item) => ( 
                          <FormControlLabel
                              label={item.name + " (" + item.count + ")"}
                              control={<Checkbox onChange={handleCheckbox} />}
                              name="partners"
                              value={item.id}
                          />
                      ))}
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
