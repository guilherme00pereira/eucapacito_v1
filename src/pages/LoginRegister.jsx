import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import EuCapacitoLogo from "../assets/img/logo.png";
import LoginForm from "../components/LoginRegister/LoginForm";
import RegisterForm from "../components/LoginRegister/RegisterForm";
import PasswordRecoveryForm from "../components/LoginRegister/PasswordRecoveryForm";
import {messageReturn} from "../commonStyles/messageReturn";
import CheckImage from "../assets/img/check.png";

const LoginRegister = () => {
  const path = window.location.pathname;
  const [token, setToken] = useState(null);
  const [showRegisterMessage, setShowRegisterMessage] = useState(false);

  let navigate = useNavigate();

  const display = showRegisterMessage && path === "/login";

  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
    if (token) {
      return navigate('/');
    }
  }, [navigate, token]);

  return (
    <Container>
      <Box elevation={0} sx={{ mt: "100px", mb: "50px", textAlign: "center" }}>
        <Link to="/">
          <img src={EuCapacitoLogo} alt="Logo EuCapacito" />
        </Link>
        <p>Aprenda em casa</p>
      </Box>

      {display &&
          <Box sx={messageReturn}>
            <img src={CheckImage} alt={"inscrição concluída"} />
            <h2>Inscrição Concluída</h2>
            <span>Realize o login com seu usuário e senha e acesse todos os cursos disponíveis.</span>
          </Box>
      }

      <Box sx={{ a: { marginTop: "0.4rem" } }}>
        {path === "/login" && <LoginForm registerMessage={setShowRegisterMessage} />}
        {path === "/registrar" && <RegisterForm registerMessage={setShowRegisterMessage} />}
        {path === "/recuperar-senha" && <PasswordRecoveryForm registerMessage={setShowRegisterMessage}/>}
      </Box>
    </Container>
  );
};

export default LoginRegister;
