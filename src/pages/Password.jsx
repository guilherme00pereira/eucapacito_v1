import {useState} from "react";
import Button from "../components/Button";
import Logo from "../assets/img/logo.png";
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
    LockOpenRounded,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import apiService from "../services/apiService";

const Password = () => {
    const [fields, setFields] = useState({
        id: sessionStorage.getItem('userID'),
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        showOldPassword: false,
        showNewPassword: false,
    });

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

    const handleFieldChange = (field) => (e) =>
        setFields({...fields, [field]: e.target.value});

    const handleMouseDownPassword = (e) => e.preventDefault();

    const handleShowPassword = (old) => {
        if(old) {
            setFields({
                ...fields,
                showOldPassword: !fields.showOldPassword,
            });
        } else {
            setFields({
                ...fields,
                showNewPassword: !fields.showNewPassword,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await apiService.changePassword(fields);
        if (response.status)
            setAlertType('success')
        else
            setAlertType('error');
        setAlertMessage(response.message);
        setAlertOpen(true);
    }

    return (
        <Container sx={styles}>
            <Box sx={styles.pagetitle}>
                <h1>Alteração de senha</h1>
            </Box>
            <img src={Logo} alt="logo"/>

            <form sx={styles.form}>
                <FormControl>
                    <InputLabel htmlFor="password">Senha Antiga</InputLabel>
                    <OutlinedInput
                        required
                        id="old-password"
                        type={fields.showOldPassword ? "text" : "password"}
                        value={fields.oldPassword}
                        onChange={handleFieldChange("oldPassword")}
                        startAdornment={
                            <InputAdornment position="start">
                                <LockOpenRounded/>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleShowPassword(true)}
                                    onMouseDown={handleMouseDownPassword}>
                                    {fields.showOldPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="password">Nova Senha</InputLabel>
                    <OutlinedInput
                        required
                        id="new-password"
                        type={fields.showNewPassword ? "text" : "password"}
                        value={fields.newPassword}
                        onChange={handleFieldChange("newPassword")}
                        startAdornment={
                            <InputAdornment position="start">
                                <LockOpenRounded/>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleShowPassword(false)}
                                    onMouseDown={handleMouseDownPassword}>
                                    {fields.showNewPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <Button onClick={handleSubmit} sx={styles.button}>Alterar</Button>
            </form>
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

export default Password;

const styles = {
    button: {
        margin: {md: "100px auto 0", xs: "10px 20px"},
        //css desktop
        width: {
            md: "45%",
            xs: "90%"
        }
    },
    img: {
        display: {
            md: "block",
            xs: "none",
        },
        margin: "80px auto 0 auto",
    },
    pagetitle: {
        "& h1": {
            color: "#CAC8C8",
            pb: "3px",
            borderBottom: {
                md: "1px solid #77837F",
                xs: "none",
            },
            textAlign: {
                md: "left",
                xs: "center",
            },
        },
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: {
            md: "50%",
            xs: "100%",
        },
        margin: "0 auto",
        "& .MuiInputBase-input": {
            maxHeight: "0px",
        },
        "& .MuiFormControl-root": {
            mt: "70px",
        },
        "& .MuiFormLabel-root": {
            left: "-13px",
            top: "-16px",
        },
        "& .MuiSvgIcon-root": {
            width: "22px",
        },
        "& .MuiIconButton-root": {
            display: {
                md: "block",
                xs: "block",
            },
            margin: {xs: "8px auto 0"},
        },
    },
}
