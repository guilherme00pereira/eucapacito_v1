import {useState} from "react";
import {
    Container,
    Box,
    FormControl,
    OutlinedInput,
    IconButton,
    InputLabel,
    InputAdornment,
    Alert,
    Snackbar,
} from "@mui/material";
import {
    PersonOutlined,
    MailOutlined,
    LockOpenRounded,
    Visibility,
    VisibilityOff,
    ArrowRight,
} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import Link from "../Link";
import Button from "../Button";
import apiService from "../../services/apiService";
import {useNavigate} from "react-router-dom";
import SocialLoginBox from "./SocialLoginBox";

const RegisterForm = ({registerMessage}) => {
    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
        showPassword: false,
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("false");
    const [alertType, setAlertType] = useState("success");
    let navigate = useNavigate();

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
            registerMessage(true)
            navigate("/login");
        } else {
            setAlertType('error')
            setAlertMessage(response.message);
            setAlertOpen(true);
        }

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
                                <InputAdornment position="start" sx={styles.iconBorder}>
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
                                <InputAdornment position="start" sx={styles.iconBorder}>
                                    <MailOutlined/>
                                </InputAdornment>
                            }
                        />
                    </FormCtrl>

                    <FormCtrl
                        sx={{
                            //css desktop
                            "& .MuiInputBase-root": {
                                width: {
                                    sx: "100%",
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

                    <FormCtrl>
                        <p>Ao inscrever-se, concordo com os Termos de uso e Política de
                        privacidade do Eu Capacito e com os Termos de uso e Política
                            de privacidade da plataforma de aprendizagem.</p>
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
                            Inscrever-se
                        </Button>
                    </FormCtrl>
                </form>
            </Box>
            <Box>
                <SocialLoginBox login={false} registerMessage={registerMessage} />
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
    iconBorder: {
        marginRight: "16px",
        borderRight: "1px solid rgba(119, 131, 127, 0.6)",
        paddingRight: "12px",
        height: "32px",
    },
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
};
