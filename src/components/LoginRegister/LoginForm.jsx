import {useState, useEffect} from "react";
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
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Link from "../Link";
import Button from "../Button";
import apiService from "../../services/apiService";

const LoginForm = ({registerMessage}) => {
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

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
    setAlertMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fields.email === "" || fields.password === "") {
      setAlertMessage("Preencha todos os campos!");
      setAlertOpen(true);
      return;
    }

    const token = await apiService.login(fields);

    if (token === 403) {
      setAlertMessage("E-mail e/ou senha incorreto(s).");
      setAlertOpen(true);
      return;
    }

    if (!token) {
      setAlertMessage("Houve um erro ao tentar logar.");
      setAlertOpen(true);
      return;
    }

    if (sessionStorage.getItem("redirectURL")) {
      const path = sessionStorage.getItem("redirectURL");
      sessionStorage.removeItem("redirectURL");
      navigate(path);
      return;
    }

    navigate("/");
  };

  useEffect(() => {
    // const script = document.createElement("script");
    // script.src = "https://d335luupugsy2.cloudfront.net/js/loader-scripts/7a9b6985-dad9-4b02-af30-b014ac36349b-loader.js";
    // script.async = true;
    // document.body.appendChild(script);
}, [])


  return (
    <Container
      maxWidth=""
      sx={{
        //css desktop
        width: {
          sx: "100%",
          md: "60%",
        },
      }}
    >
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
                <InputAdornment position="start" sx={styles.iconBorder}>
                  <MailOutlined />
                </InputAdornment>
              }
            />
          </FormCtrl>

          <FormCtrl
            sx={{
              //css desktop
              "& .MuiInputBase-root": {
                width: {
                  xs: "100%",
                  md: "50%",
                },
              },
            }}
          >
            <InputLabel htmlFor="password">Senha</InputLabel>
            <OutlinedInput
              required
              id="password"
              label="Senha"
              type={fields.showPassword ? "text" : "password"}
              value={fields.password}
              onChange={handleFieldChange("password")}
              startAdornment={
                <InputAdornment position="start" sx={styles.iconBorder}>
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

            <Link
              to="/recuperar-senha"
              sx={{
                textAlign: "right",
                //css desktop
                mr: {
                  md: "50%",
                },
                fontSize: "16px",
              }}
            >
              Esqueceu a senha
            </Link>
          </FormCtrl>

          <FormCtrl
            sx={{
              //css desktop
              alignItems: "center",
              "& .MuiButton-root": {
                padding: {
                  md: "6px 116px",
                },
              },
            }}
          >
            <Button
              type="submit"
              onClick={handleSubmit}
              sx={{
                mt: 3,
                //css desktop
                width: {
                  sx: "100%",
                  md: "60%",
                },
              }}
            >
              Entrar
            </Button>
            <Box sx={styles.infoFooter}>
              <p>
                Não tem uma conta?{" "}
                <Link to="/registrar" onClick={() => registerMessage(false)}>
                  Inscrever-se
                  <ArrowRight
                    sx={{ fontSize: "1.7rem", verticalAlign: "middle" }}
                  />
                </Link>
              </p>
            </Box>
          </FormCtrl>
        </form>
      </Box>

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
  iconBorder: {
    marginRight: "16px",
    borderRight: "1px solid rgba(119, 131, 127, 0.6)",
    paddingRight: "12px",
    height: "32px",
  },
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
