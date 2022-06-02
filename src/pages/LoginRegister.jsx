import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import EuCapacitoLogo from "../assets/img/logo.png";
import LoginForm from "../components/LoginRegister/LoginForm";
import RegisterForm from "../components/LoginRegister/RegisterForm";
import PasswordRecoveryForm from "../components/LoginRegister/PasswordRecoveryForm";

const LoginRegister = () => {
  const path = window.location.pathname;
  const [token, setToken] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
    
    if (token) {
      return navigate('/');
    }

  }, [navigate, token]);

  return (
    <Container>
      <Box elevation={0} sx={{ mt: "100px", mb: "100px", textAlign: "center" }}>
        <Link to="/">
          <img src={EuCapacitoLogo} alt="Logo EuCapacito" />
        </Link>
        <p>Aprenda em casa</p>
      </Box>

      <Box sx={{ a: { marginTop: "0.4rem" } }}>
        {path === "/login" && <LoginForm />}
        {path === "/registrar" && <RegisterForm />}
        {path === "/recuperar-senha" && <PasswordRecoveryForm />}
      </Box>
    </Container>
  );
};

export default LoginRegister;
