import { useState, useEffect } from "react";
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
  CircularProgress
} from "@mui/material";
import {
  MailOutlined,
  LockOpenRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Link from "../Link";
import Button from "../Button";
import apiService from "../../services/apiService";
import dynamic from 'next/dynamic'
import {loginRegisterStyles} from "../../commonStyles/loginRegisterStyles";
import { useRouter } from "next/router";

const SocialLoginBox = dynamic(() => import("./SocialLoginBox"), { ssr: false })


const LoginForm = () => {
  const router = useRouter()
  const [fields, setFields] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("false");

  const handleFieldChange = (field) => (e) =>
    setFields({ ...fields, [field]: e.target.value });

  const handleShowPassword = () => {
    setFields({
      ...fields,
      showPassword: !fields.showPassword,
    });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
    setAlertMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true)
    if (fields.email === "" || fields.password === "") {
      setAlertMessage("Preencha todos os campos!");
      setAlertOpen(true);
      return;
    }

    const token = await apiService.login(fields);

    if (token === 403) {
      setAlertMessage("E-mail e/ou senha incorreto(s).");
      setAlertOpen(true);
      setBtnLoading(false)
      return;
    }

    if (!token) {
      setAlertMessage("Houve um erro ao tentar logar.");
      setAlertOpen(true);
      setBtnLoading(false)
      return;
    }

    if (sessionStorage.getItem("redirectURL")) {
      const path = sessionStorage.getItem("redirectURL");
      sessionStorage.removeItem("redirectURL");
      router.push(path);
      return;
    }

    router.push("/");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://d335luupugsy2.cloudfront.net/js/loader-scripts/7a9b6985-dad9-4b02-af30-b014ac36349b-loader.js";
    script.async = true;
    document.body.appendChild(script);
  }, [])


  return (
    <Container maxWidth="" sx={loginRegisterStyles.container} >
      <Box sx={styles.container}>
        <h2>Login</h2>
        <p>Insira suas informações reais</p>

        <form onSubmit={handleSubmit}>
          <FormCtrl>
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <OutlinedInput
              required
              id="email"
              label="E-mail"
              type="email"
              value={fields.email}
              onChange={handleFieldChange("email")}
              startAdornment={
                <InputAdornment position="start" sx={loginRegisterStyles.iconBorder}>
                  <MailOutlined />
                </InputAdornment>
              }
            />
          </FormCtrl>

          <FormCtrl sx={{ "& .MuiInputBase-root": { width: { xs: "100%", md: "50%" } } }}>
            <InputLabel htmlFor="password">Senha</InputLabel>
            <OutlinedInput
              required
              id="password"
              label="Senha"
              type={fields.showPassword ? "text" : "password"}
              value={fields.password}
              onChange={handleFieldChange("password")}
              startAdornment={
                <InputAdornment position="start" sx={loginRegisterStyles.iconBorder}>
                  <LockOpenRounded />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {fields.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <Link to="/recuperar-senha" sx={{ textAlign: "right", mr: { md: "50%" }, fontSize: "16px" }} >
              Esqueceu a senha
            </Link>
          </FormCtrl>

          <FormCtrl sx={loginRegisterStyles.formControlAction}>
            <Button sx={loginRegisterStyles.btnAction} type="submit" onClick={handleSubmit}>
              {btnLoading ? <CircularProgress color="inherit" /> : "Entrar"}
            </Button>
          </FormCtrl>
        </form>
      </Box>
      {(typeof window !== 'undefined') &&
      <Box>
        <SocialLoginBox login={true} />
      </Box>
    }

      <Snackbar
        open={alertOpen}
        onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="error">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginForm;

const FormCtrl = styled(FormControl)(`
  width: 100%;
  margin: 0.55rem 0;
  .MuiInputLabel-root{
    font-size: 14px;
}
`);

const styles = {
  container: {
    mx: 1,
    "& h2": {
      fontSize: {
        md: "22px",
        xs: "22px",
      },
    },
    "& p": {
      fontSize: "16px",
      color: "#77837F",
    },
  },
  infoFooter: {
    display: "inline-block",
    mt: 10,
    marginTop: {
      md: "40px",
    },
    "& p": {
      fontSize: "14px",
    },
  },
};
