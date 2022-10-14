import React, { useState } from 'react';
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import Link from "../Link";
import GoogleIcon from '../../../public/assets/img/google-icon-button.png'
import { LoginSocialGoogle } from "reactjs-social-login";
import apiService from "../../services/apiService";
import { useRouter } from 'next/router';
import Image from 'next/image'

const SocialLoginBox = ({ login, registerMessage }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSocialLogin = (resp) => {
        setLoading(true)
        sessionStorage.setItem('avatarURL', resp.data.picture);
        apiService.socialLoginOrRegister({
            name: resp.data.name,
            email: resp.data.email,
            password: resp.data.id
        }).then(resp => {
            router.push("/")
        })
    }

    return (

        <Stack justifyContent="center" alignItems="center" sx={styles.wrapper}>
            <Box>
                Ou {login ? "entre" : "inscreva-se"} com
            </Box>
            <Stack direction="row" sx={styles.buttonsBox}>
                <LoginSocialGoogle
                    client_id="449941794756-14e3ile2nkbsi8qlsu7os0624s8ro75t.apps.googleusercontent.com"
                    scope="openid profile email"
                    discoveryDocs="claims_supported"
                    access_type="offline"
                    onReject={err => {
                        console.log(err)
                    }}
                    onResolve={(resp) => handleSocialLogin(resp)}
                >
                    <Button sx={styles.google}>
                        {loading ?
                            <CircularProgress color="inherit" /> :
                            <>
                                <Image src={GoogleIcon} alt="Google Icon" />
                                <span>Google</span>
                            </>
                        }
                    </Button>
                </LoginSocialGoogle>
            </Stack>
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
                                sx={{ fontSize: "1.7rem", verticalAlign: "middle" }}
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