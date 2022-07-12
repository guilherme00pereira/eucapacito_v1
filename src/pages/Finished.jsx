import {Box, Container} from "@mui/material";
import {Link} from "react-router-dom";
import EuCapacitoLogo from "../assets/img/logo.png";
import SendMessageImage from "../assets/img/edit.png"
import {messageReturn} from "../commonStyles/messageReturn";


const Finished = () => {

    return (
        <Container sx={styles.container}>
            <Box elevation={0} sx={{mt: '25px', mb: '50px', textAlign: 'center'}}>
                <Link to="/">
                    <img src={EuCapacitoLogo} alt="Logo EuCapacito"/>
                </Link>
            </Box>
            <Box sx={messageReturn}>
                <img src={SendMessageImage} alt={"inscrição confirmada"} />
                <h2>inscrição confirmada</h2>
                <span>Aguarde novas informações por email.</span>
            </Box>
        </Container>
    );
};

export default Finished;

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
}