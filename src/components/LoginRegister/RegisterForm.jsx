import { useState, useEffect } from "react";
import {
  Container,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
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
  PersonOutlined
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Button from "../Button";
import apiService from "../../services/apiService";
import dynamic from 'next/dynamic'
import {loginRegisterStyles} from "../../commonStyles/loginRegisterStyles";
import { useRouter } from "next/router";

const SocialLoginBox = dynamic(() => import("./SocialLoginBox"), { ssr: false })

const RegisterForm = () => {
    const router = useRouter()
    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
        showPassword: false,
        agree: false
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("false");
    const [alertType, setAlertType] = useState("success");

    const handleFieldChange = (field) => (e) =>
        setFields({...fields, [field]: e.target.value});

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

    const handleMouseDownPassword = (e) => e.preventDefault();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fields.email === "" || fields.password === "" || fields.name === "") {
            setAlertMessage("Preencha todos os campos!");
            setAlertOpen(true);
        }
        const response = await apiService.register(fields);
        if (response.status) {
            router.push("/login");
        } else {
            setAlertType('error')
            setAlertMessage(response.message);
            setAlertOpen(true);
        }

    }

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://d335luupugsy2.cloudfront.net/js/loader-scripts/7a9b6985-dad9-4b02-af30-b014ac36349b-loader.js";
        script.async = true;
        document.body.appendChild(script);
    }, [])

    return (
        <Container maxWidth="" sx={loginRegisterStyles.container}>
            <Box sx={styles.container}>
                <h2>Inscrever-se</h2>
                <p>Insira suas informações reais</p>

                <form onSubmit={handleSubmit}>
                    <FormCtrl>
                        <InputLabel htmlFor="name">Nome</InputLabel>
                        <OutlinedInput
                            required
                            id="name"
                            label="Nome"
                            type="text"
                            value={fields.name}
                            onChange={handleFieldChange("name")}
                            startAdornment={
                                <InputAdornment position="start" sx={loginRegisterStyles.iconBorder}>
                                    <PersonOutlined/>
                                </InputAdornment>
                            }
                        />
                    </FormCtrl>

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
                                    <MailOutlined/>
                                </InputAdornment>
                            }
                        />
                    </FormCtrl>

                    <FormCtrl sx={loginRegisterStyles.formControlPassword}>
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
                                    <LockOpenRounded/>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {fields.showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormCtrl>

                    <FormCtrl sx={styles.agree}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={fields.agree}
                                    onChange={handleFieldChange("agree")}
                                />
                            }
                            label="Eu aceito receber comunicação do Eu Capacito e seus parceiros"
                            sx={styles.checkbox}
                        />
                            <p>Ao inscrever-se, concordo com os Termos de uso e Política de
                            privacidade do Eu Capacito e com os Termos de uso e Política
                                de privacidade da plataforma de aprendizagem.</p>
                    </FormCtrl>

                    <FormCtrl sx={loginRegisterStyles.formControlAction}>
                        <Button onClick={handleSubmit} sx={loginRegisterStyles.btnAction}>
                            Inscrever-se
                        </Button>
                    </FormCtrl>
                </form>
            </Box>
            <Box>
                <SocialLoginBox login={false} />
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

export default RegisterForm;

const FormCtrl = styled(FormControl)(`
  width: 100%;
  margin: 0.55rem 0;
  .MuiInputLabel-root{
      font-size: 14px;
  }
`);

const styles = {
    container: {
        mx: "1",
        "& h2": {
            fontSize: {
                xs: "22px",
                md: "22px",
            },
        },
        "& p": {
            fontSize: "16px",
            color: "#77837F",
        },
    },
    infoFooter: {
        display: "inline-block",
        marginTop: {
            md: "40px",
        },
        "& p": {
            fontSize: "14px",
        },
    },
    agree: {
        px: "30px",
    }
};
