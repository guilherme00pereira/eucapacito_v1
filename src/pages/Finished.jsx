
import {Box, Container} from "@mui/material";
import {Link} from "react-router-dom";
import EuCapacitoLogo from "../assets/img/logo.png";


const Finished = () => {

    return (
        <Container sx={styles.container}>
            <Box elevation={0} sx={{mt: '25px', mb: '50px', textAlign: 'center'}}>
                <Link to="/">
                    <img src={EuCapacitoLogo} alt="Logo EuCapacito"/>
                </Link>
            </Box>
            <Box>
                <p>sua inscrição foi realizada com sucesso, aguarde mais informações por e-mail</p>
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