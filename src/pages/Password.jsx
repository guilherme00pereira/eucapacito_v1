import { useState } from "react";
import Button from "../components/Button";
import Logo from "../assets/img/logo.png";
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

import {
  MailOutlined,
  LockOpenRounded,
  Visibility,
  VisibilityOff,
  ArrowRight,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Password = () => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("false");
  let navigate = useNavigate();

  const handleFieldChange = (field) => (e) =>
    setFields({ ...fields, [field]: e.target.value });

  const handleShowPassword = () => {
    setFields({
      ...fields,
      showPassword: !fields.showPassword,
    });
  };

  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <Container sx={styles}>
      <Box sx={styles.pagetitle}>
        <h1>Alteração de senha</h1>
      </Box>
      <img src={Logo} alt="logo" />

      <form sx={styles.form}>
        <FormControl>
          <InputLabel htmlFor="password">Senha Antiga</InputLabel>
          <OutlinedInput
            required
            id="old-password"
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <LockOpenRounded />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {fields.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="password">Nova Senha</InputLabel>
          <OutlinedInput
            required
            id="new-password"
            type="password"
            startAdornment={
              <InputAdornment position="start">
                <LockOpenRounded />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {fields.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          sx={{
            width: "90%",
            margin: { md: "100px auto 0", xs: "10px 20px" },
            //css desktop
            width: {
              md: "45%",
            },
          }}
        >
          Salvar
        </Button>
      </form>
    </Container>
  );
};

export default Password;

const styles = {
  img: {
    display: {
      md: "block",
      xs: "none",
    },
    margin: "80px auto 0 auto",
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
    },
  },

  form: {
    display: "flex",
    flexDirection: "column",
    width: {
      md: "50%",
      xs: "100%",
    },
    margin: "0 auto",
    "& .MuiInputBase-input": {
      maxHeight: "0px",
    },
    "& .MuiFormControl-root": {
      mt: "70px",
    },
    "& .MuiFormLabel-root": {
      left: "-13px",
      top: "-16px",
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
};
