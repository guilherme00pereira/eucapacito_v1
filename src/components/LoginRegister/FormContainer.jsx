import React from 'react';
import { Container, Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import EuCapacitoLogo from "../../../public/assets/img/logo.png";

const FormContainer = ({children}) => {
    return (
        <Container>
            <Box elevation={0} sx={{ mt: "100px", mb: "50px", textAlign: "center" }}>
                <Link href="/">
                    <Image src={EuCapacitoLogo} alt="Logo EuCapacito" />
                </Link>
                <p>Aprenda em casa</p>
            </Box>
            <Box sx={{ a: { marginTop: "0.4rem" } }}>
                {children}
            </Box>
        </Container>
    );
};

export default FormContainer;