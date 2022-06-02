import { useState } from "react";
import {
  Container,
  Box,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { MailOutlined, ArrowRight } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Link from "../Link";
import Button from "../Button";

const PasswordRecoveryForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
            <Button sx={{ mt: 3 }}>Recuperar</Button>
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
