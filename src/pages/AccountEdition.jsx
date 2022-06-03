import Button from "../components/Button";
import {CircularProgress} from "@mui/material";
import {
  Container,
  Box,
  FormControl,
  OutlinedInput,
  IconButton,
  InputLabel,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";

import {useEffect, useState} from "react";
import apiService from "../services/apiService";

const Account = () => {
  const [fields, setFields] = useState({
    avatar: "",
    username: "",
    full_name: "",
    email: "",
    b_day: "",
    b_month: "",
    b_year: "",
    phone_ddd: "",
    phone_number: "",
    country: "",
    state: "",
    city: "",
  });
  const token = sessionStorage.getItem('token');
  const {api} = apiService;
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    setIsLoading(true);
    const id = sessionStorage.getItem('userID');
    api.get(`/wp/v2/users/${id}?_embed`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then( (res) => {
      console.log(res.data)
          setFields({
            username: res.data.slug,
            avatar: res.data.avatar_urls[96],
            full_name: res.data.first_name + " " + res.data.last_name,
          })
        });
    setIsLoading(false);
  }, [token, api]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(fields);
  }

  return (
    <Container sx={styles}>
      {isLoading && <CircularProgress sx={styles.loading} />}
      <Box sx={styles.pagetitle}>
        <h1>Edição da conta</h1>
      </Box>

      <Box sx={styles.profile}>
        <img src={fields.avatar} alt="Foto de perfil" />
        <a href="/">
          <h2>Alterar Foto</h2>
        </a>
      </Box>

      <form sx={styles.form}>
        <Container sx={styles.formFirstContainer}>
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput required id="username" value={fields.username} type="text" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="full_name">Nome Completo</InputLabel>
            <OutlinedInput required id="full_name" value={fields.full_name} type="text" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput required id="email" value={fields.email} type="email" />
          </FormControl>

        </Container>

        <Container sx={styles.formSecondContainer}>
          <FormControl>
            <InputLabel htmlFor="birthdate">Data de nascimento</InputLabel>
            <Box sx={styles.dataN}>
              <OutlinedInput required id="b_day" value={fields.b_day} type="text" />
              <OutlinedInput required id="b_month" value={fields.b_month} type="text" />
              <OutlinedInput required id="b_year" value={fields.b_year} type="text" />
            </Box>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="phone">Cel</InputLabel>
            <Box sx={styles.cel}>
              <OutlinedInput required id="phone_ddd" value={fields.phone_ddd} type="text" />
              <OutlinedInput required id="phone_number" value={fields.phone_number} type="text" />
            </Box>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="country">País</InputLabel>
            <OutlinedInput required id="country" value={fields.country} type="text" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="state">Estado</InputLabel>
            <OutlinedInput required id="state" value={fields.state} type="text" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="city">Cidade</InputLabel>
            <OutlinedInput required id="city" value={fields.city} type="text" />
          </FormControl>
        </Container>

        <Button onClick={handleSubmit} sx={styles.button}>Salvar</Button>
      </form>
    </Container>
  );
};

export default Account;

const styles = {
  loading: {
    display: "flex",
    margin: "1.5rem auto 0",
    color: "#77837F",
  },
  profile: {
    mt: "43px",
    textAlign: "center",
    "& img": {
      borderRadius: "50px",
    },
    "& a": {
      fontWeight: "500",
      fontSize: "20px",
      color: "#CAC8C8",
    },
    "& h2": {
      fontWeight: "500",
      fontSize:{
          md:"20px",
          xs:"20px"
      }
    },
  },
  pagetitle: {
    "& h1": {
      color: "#CAC8C8",
      pb: "3px",
      borderBottom: {
        md: "1px solid #77837F",
        xs: "none",
      },
      textAlign: {
        md: "left",
        xs: "center",
      },
      display:{
          md:"block",
          xs:"none"
      }
    },
  },
  form: {
    position: "relative",
    display: "flex",
    flexDirection: {
      md: "row",
      xs: "column",
    },
    margin: "0 auto",
    "& .MuiInputBase-input": {
      maxHeight: "0px",
    },
    "& .MuiFormControl-root": {
      mt: "60px",
    },
    "& .MuiFormLabel-root": {
      left: "-13px",
      top: "-40px",
      fontSize: {md:"18px", xs:"16px"},
      color:"#77837F"
    },
    "& .MuiSvgIcon-root": {
      width: "22px",
    },
    "& .MuiIconButton-root": {
      display: {
        md: "block",
        xs: "none",
      },
    },
  },
  formFirstContainer: {
    width: "100%",
    "& .MuiFormControl-root": {
      width: { md: "85%", xs: "100%" },
    },
  },
  formSecondContainer: {
    width: {
      md: "90%",
      xs: "100%",
    },
    "& .MuiFormControl-root": {
      width: { md: "85%", xs: "100%" },
    },
  },
  dataN: {
    display: "flex",
    justifyContent: {
      md: "auto",
      xs: "space-between",
    },
    width: {
      md: "100%",
      xs: "100%",
    },
    "& .MuiOutlinedInput-root": {
      width: "20%",
    },
    "& .MuiOutlinedInput-root:last-child": {
      width: "40%",
    },
  },
  cel: {
    display: "flex",
    justifyContent: {
      md: "auto",
      xs: "space-between",
    },
    width: {
      md: "100%",
      xs: "100%",
    },
    "& .MuiOutlinedInput-root": {
      width: "20%",
    },
    "& .MuiOutlinedInput-root:last-child": {
      width: "70%",
    },
  },
  button: {
    width: "90%",
    margin: { md: "10px auto 0", xs: "10px 20px" },
    //css desktop
    width: {
      md: "30%",
    },
    position: {
      md: "absolute",
      xs: "relative",
    },
    top: {
      md: "450px",
      xs: "0",
    },
    left: {
      md: "30%",
      xs: "0",
    },
    mt: {
      md: "100px",
      xs: "50px",
    },
  },
};
