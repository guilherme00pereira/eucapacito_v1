import {Box, Container} from "@mui/material";
import EuCapacitoLogo from "../public/assets/img/logo.png";
import SendMessageImage from "../public/assets/img/edit.png"
import {messageReturn} from "../src/commonStyles/messageReturn";
import Link from "next/link";
import Image from 'next/image'


const Concluido = () => {

    return (
        <Container sx={styles.container}>
            <Box elevation={0} sx={{mt: '25px', mb: '50px', textAlign: 'center'}}>
                <Link href="/">
                    <Image src={EuCapacitoLogo} alt="Logo EuCapacito"/>
                </Link>
            </Box>
            <Box sx={messageReturn}>
                <Image src={SendMessageImage} alt={"inscrição confirmada"} />
                <h2>inscrição confirmada</h2>
                <span>Aguarde novas informações por email.</span>
            </Box>
        </Container>
    );
};

export default Concluido;

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
}