import { useState } from "react";
import { Box, FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import { PersonOutlined, MailOutlined } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Button from "../Button";

const UpdateForm = () => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
  });

  const handleFieldChange = (field) => (e) =>
    setFields({ ...fields, [field]: e.target.value });

  const handleSubmit = (e) => e.preventDefault();

  return (
    <Box
      sx={{
        m: "2.5rem 1.5rem 2rem",
        "& p": {
          textAlign: "center",
          fontSize:"12px",
          fontWeight:"300"
        },
        "& .MuiOutlinedInput-input": {
          padding: "10px 7px",
          fontSize:"14px",
          fontWeight:"500"
        },
      }}
    >
      <p>Inscreva-se para receber atualizações</p>

      <form onSubmit={handleSubmit}>
        <FormCtrl>
          <OutlinedInput
            required
            id="name"
            type="text"
            value={fields.name}
            onChange={handleFieldChange("name")}
            placeholder="Nome"
            startAdornment={
              <InputAdornment position="start">
                <PersonOutlined />
              </InputAdornment>
            }
          />
        </FormCtrl>

        <FormCtrl>
          <OutlinedInput
            required
            id="email"
            type="email"
            value={fields.email}
            onChange={handleFieldChange("email")}
            placeholder="E-mail"
            startAdornment={
              <InputAdornment position="start">
                <MailOutlined />
              </InputAdornment>
            }
          />
        </FormCtrl>

        <FormCtrl
          sx={{
            //css desktop
            alignItems: {
              md: "center",
            },
            //css desktop
            "& .MuiButton-root": {
              padding: {
                md: "6px 116px",
              },
            },
          }}
        >
          <Button type="submit" sx={{ mt: 2 }}>
            Enviar
          </Button>
        </FormCtrl>
      </form>
    </Box>
  );
};

export default UpdateForm;

const FormCtrl = styled(FormControl)(`
  width: 100%;
  margin: 0.5rem 0;
  p{
      font-weight:300;
      color:#FFFFFF,
  }
`);
