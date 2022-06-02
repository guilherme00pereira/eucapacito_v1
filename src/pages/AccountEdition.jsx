import Button from "../components/Button";
import { Select } from "@mui/material";
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

import { useNavigate } from "react-router-dom";

const Account = () => {
  const token = sessionStorage.getItem("token");
  let navigate = useNavigate();

  return (
    <Container sx={styles}>
      <Box sx={styles.pagetitle}>
        <h1>Edição da conta</h1>
      </Box>

      <Box sx={styles.profile}>
        <img src={sessionStorage.getItem("avatarURL")} alt="Foto de perfil" />
        <a href="/">
          <h2>Alterar Foto</h2>
        </a>
      </Box>

      <form sx={styles.form}>
        <Container sx={styles.formFirstContainer}>
          <FormControl>
            <InputLabel htmlFor="password">Username</InputLabel>
            <OutlinedInput required id="" type="text" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="password">Nome Completo</InputLabel>
            <OutlinedInput required id="" type="text" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="password">Email</InputLabel>
            <OutlinedInput required id="" type="email" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="password">Email Secundário</InputLabel>
            <OutlinedInput required id="" type="email" />
          </FormControl>
        </Container>

        <Container sx={styles.formSecondContainer}>
          <FormControl>
            <InputLabel htmlFor="password">Data de nascimento</InputLabel>
            <Box sx={styles.dataN}>
              <OutlinedInput required id="" type="text" />
              <OutlinedInput required id="" type="text" />
              <OutlinedInput required id="" type="text" />
            </Box>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="password">Cel</InputLabel>
            <Box sx={styles.cel}>
              <OutlinedInput required id="" type="text" />
              <OutlinedInput required id="" type="text" />
            </Box>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="password">País</InputLabel>
            <OutlinedInput required id="" type="password" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="password">Estado</InputLabel>
            <OutlinedInput required id="" type="password" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="password">Cidade</InputLabel>
            <OutlinedInput required id="" type="password" />
          </FormControl>
        </Container>

        <Button sx={styles.button}>Salvar</Button>
      </form>
    </Container>
  );
};

export default Account;

const styles = {
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
