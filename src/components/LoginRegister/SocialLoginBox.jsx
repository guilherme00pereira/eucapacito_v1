import React from 'react';
import {Box, Button, Stack} from "@mui/material";
import {ArrowRight} from "@mui/icons-material";
import Link from "../Link";
import FacebookIcon from './../../assets/img/facebook-icon-btn.png'
import GoogleIcon from './../../assets/img/google-icon-button.png'

const SocialLoginBox = ({login, registerMessage}) => {

    const handleFacebookClick = {

    }

    const handleGoogleClick = {

    }

    return (
        <Stack justifyContent="center" alignItems="center" sx={styles.wrapper}>
            {/*<Box>*/}
            {/*    Ou inscreva-se com*/}
            {/*</Box>*/}
            {/*<Stack direction="row" sx={styles.buttonsBox}>*/}
            {/*    <Button sx={styles.facebook} onClick={handleFacebookClick}>*/}
            {/*        <img src={FacebookIcon} alt="Facebook Icon" />*/}
            {/*        <span>Facebook</span>*/}
            {/*    </Button>*/}
            {/*    <Button sx={styles.google} onClick={handleGoogleClick}>*/}
            {/*        <img src={GoogleIcon} alt="Google Icon" />*/}
            {/*        <span>Google</span>*/}
            {/*    </Button>*/}
            {/*</Stack>*/}
            <Stack direction="row">
                <p>
                    {login ? "Não" : "Já"}  tem uma conta?
                    {login ?
                        <Link to="/registrar" onClick={() => registerMessage(false)}>
                            Inscrever-se
                            <ArrowRight
                                sx={{ fontSize: "1.7rem", verticalAlign: "middle" }}
                            />
                        </Link> :
                        <Link to="/login">
                            Conecte-se
                            <ArrowRight
                            sx={{fontSize: "1.7rem", verticalAlign: "middle"}}
                            />
                        </Link>
                    }
                </p>
            </Stack>
        </Stack>
    );
};

export default SocialLoginBox;

const styles = {
    wrapper: {
        color: "##CAC8C8",
        my: {
            xs: "30px",
            md: "40px"
        },
        "& p": {
            fontSize: "16px",
            color: "#77837F",
        },
        "& a": {
            ml: "10px"
        }
    },
    buttonsBox: {
        my: "10px",
        "& .MuiButton-root": {
            mx: "14px",
            width: "130px",
            padding: "8px 12px",
            borderRadius: "0.5em"
        },
        "& span": {
            ml: "10px",
            textTransform: "capitalize",
        }
    },
    facebook: {
        border: "2px solid #507CC0",
        color: "#507CC0",
    },
    google: {
        border: "2px solid #DF4930",
        color: "#DF4930",
    }
}