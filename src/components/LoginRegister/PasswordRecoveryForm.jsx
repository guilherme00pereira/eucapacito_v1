import { useState } from "react";
import {
  Container,
  Box,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment, Alert, Snackbar,
} from "@mui/material";
import { MailOutlined, ArrowRight } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Link from "../Link";
import Button from "../Button";
import apiService from "../../services/apiService";

const PasswordRecoveryForm = () => {
  const [email, setEmail] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("false");
  const [alertType, setAlertType] = useState("success");

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
    setAlertMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.recoverPassword(email);
    if(response.status)
      setAlertType('success')
    else
      setAlertType('error');
    setAlertMessage(response.message);
    setAlertOpen(true);
  }

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
      <Box sx={{ mx: 1 }}>
        <h2>Recuperar senha</h2>
        <p>Coloque seu e-mail</p>

        <form onSubmit={handleSubmit}>
          <FormCtrl>
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <OutlinedInput
              required
              id="email"
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startAdornment={
                <InputAdornment position="start" sx={styles.iconBorder}>
                  <MailOutlined />
                </InputAdornment>
              }
            />
          </FormCtrl>

          <FormCtrl>
            <Button onClick={handleSubmit} sx={{ mt: 3 }}>Recuperar</Button>
            <Box sx={{ display: "inline-block" }}>
              <p>
                Já tem uma conta?{" "}
                <Link to="/login">
                  Conecte-se
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
        <Alert onClose={handleCloseAlert} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PasswordRecoveryForm;

const FormCtrl = styled(FormControl)(`
  width: 100%;
  margin: 0.55rem 0;
`);

const styles = {
  iconBorder: {
    marginRight: "16px",
    borderRight: "1px solid rgba(119, 131, 127, 0.6)",
    paddingRight: "12px",
    height: "32px",
  },
};
