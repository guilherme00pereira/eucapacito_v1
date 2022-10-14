import { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import EuCapacitoLogo from "../public/assets/img/logo.png";
import LoginForm from "../src/components/LoginRegister/LoginForm";
import { messageReturn } from "../src/commonStyles/messageReturn";
import CheckImage from "../public/assets/img/check.png";
import { useRouter } from "next/router";
import Image from 'next/image'
import Link from '../src/components/Link'

const LoginRegister = () => {
    const router = useRouter()
    const [token, setToken] = useState(null);
    const [showRegisterMessage, setShowRegisterMessage] = useState(false);

    const display = showRegisterMessage && router.pathname === "/login";

    useEffect(() => {
        setToken(sessionStorage.getItem('token'));
        if (token) {
            return router.push('/');
        }
    }, [token]);

    return (
        <Container>
            <Box elevation={0} sx={{ mt: "100px", mb: "50px", textAlign: "center" }}>
                <Link href="/">
                    <Image src={EuCapacitoLogo} alt="Logo EuCapacito" />
                </Link>
                <p>Aprenda em casa</p>
            </Box>

            {display &&
                <Box sx={messageReturn}>
                    <Image src={CheckImage} alt={"inscrição concluída"} />
                    <h2>Inscrição Concluída</h2>
                    <span>Realize o login com seu usuário e senha e acesse todos os cursos disponíveis.</span>
                </Box>
            }

            <Box sx={{ a: { marginTop: "0.4rem" } }}>
                <LoginForm registerMessage={setShowRegisterMessage} />
            </Box>
        </Container>
    );
};

export default LoginRegister;
