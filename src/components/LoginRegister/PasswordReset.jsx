import { useState } from "react";
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
    ArrowRight,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Link from "../Link";
import Button from "../Button";
import apiService from "../../services/apiService";

const PasswordReset = () => {

    const [fields, setFields] = useState({
        password: "",
        confirmPassword: "",
        showPassword: false,
        showConfirmPassword: false

    });
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("false");
    const [alertType, setAlertType] = useState("success");
    const [btnLoading, setBtnLoading] = useState(false);
    
    let navigate = useNavigate();

    const handleFieldChange = (field) => (e) =>
        setFields({ ...fields, [field]: e.target.value });

    
    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setAlertOpen(false);
        setAlertMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await apiService.resetPassword(fields);
        if (response.status) {
            navigate("/login");
        } else {
            setAlertType('error');
            setAlertMessage(response.message);
            setAlertOpen(true);
        }
    };


    return (
        <Container maxWidth="" sx={{ width: { sx: "100%", md: "60%" } }} >
            <Box sx={styles.container}>
                <h2>Redefinição de senha</h2>
                <p>Informe a sua nova senha e em seguida faça o login</p>

                <form onSubmit={handleSubmit}>
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
                                <InputAdornment position="start" sx={styles.iconBorder}>
                                    <LockOpenRounded />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => {
                                            setFields({
                                                ...fields,
                                                showPassword: !fields.showPassword,
                                            });
                                        }}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {fields.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormCtrl>

                    <FormCtrl sx={{ "& .MuiInputBase-root": { width: { xs: "100%", md: "50%" } } }}>
                        <InputLabel htmlFor="confirmPassword">Repetir a senha</InputLabel>
                        <OutlinedInput
                            required
                            id="confirmPassword"
                            label="Repetir a senha"
                            type={fields.showConfirmPassword ? "text" : "password"}
                            value={fields.confirmPassword}
                            onChange={handleFieldChange("confirmPassword")}
                            startAdornment={
                                <InputAdornment position="start" sx={styles.iconBorder}>
                                    <LockOpenRounded />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => {
                                            setFields({
                                                ...fields,
                                                showConfirmPassword: !fields.showConfirmPassword,
                                            });
                                        }}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {fields.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormCtrl>

                    <FormCtrl sx={{ alignItems: "center", "& .MuiButton-root": { padding: { md: "6px 116px" } } }}>
                        <Button sx={styles.loginBtn} type="submit" onClick={handleSubmit}>
                            {btnLoading ? <CircularProgress color="inherit" /> : "Salvar"}
                        </Button>
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

export default PasswordReset;

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
    loginBtn: {
        mt: 3, width: { sx: "100%", md: "50%" }
    }
};
