import {Paper, Box, Container, Link as MuiLink} from "@mui/material";
import {Instagram, Facebook, LinkedIn} from "@mui/icons-material";
import YouTube from "@mui/icons-material/YouTube";
import rodapeLogos from "../../public/assets/img/logo-eucapacito-itmidia.png";

const Footer = () => {
    return (
        <Container
            sx={{
                display: {xs: "none", md: "flex"},
                justifyContent: "space-between",
                alignItems: "flex-end",
                mt: "90px",
            }}
        >
            <Box sx={styles.copyright}>
                <p>Copyright © Eu Capacito</p>
                <MuiLink sx={styles.termLink} href={'/termos-e-servicos'}>
                    Terms and Services - Privacy Policy
                </MuiLink>
            </Box>

            <Container
                sx={{
                    textAlign: "center",
                    width: "45%",
                    "& p": {
                        fontSize: "14px",
                    },
                }}
            >
                <Box
                    sx={{
                        "& > p": {
                            fontSize: "18px",
                            fontStyle: "italic",
                            color: "#77837F",
                            fontWeight: "500",
                            margin: "0",
                        },
                    }}
                >
                    <p>CONTATO</p>
                    <MuiLink
                        href="mailto:eucapacito@institutoitmidia.com.br"
                        sx={{
                            textDecoration: "none",
                            fontSize: "14px",
                            fontStyle: "italic",
                            color: "#77837F",
                            fontWeight: "500",
                        }}
                    >
                        eucapacito@institutoitmidia.com.br
                    </MuiLink>
                </Box>
                <Box>
                    <MuiLink href="https://www.facebook.com/eucapacito/" target="_blank">
                        <Facebook sx={styles.email}/>
                    </MuiLink>

                    <MuiLink href="https://www.instagram.com/eucapacito/" target="_blank">
                        <Instagram sx={styles.email}/>
                    </MuiLink>

                    <MuiLink href="https://www.youtube.com/c/EuCapacito" target="_blank">
                        <YouTube sx={styles.email}/>
                    </MuiLink>

                    <MuiLink href="https://www.linkedin.com/company/eucapacito/" target="_blank">
                        <LinkedIn sx={styles.email}/>
                    </MuiLink>
                </Box>
                <Box
                    sx={{
                        fontSize: "14px",
                        fontStyle: "italic",
                        color: "#77837F",
                        fontWeight: "500",
                    }}
                >
                    <p>Avenida Chedid Jafet Nº222 Bloco B, 1 andar São Paulo - SP</p>
                </Box>
            </Container>

            <Box sx={{display: "flex"}}>
                <Paper sx={styles.footerLogo}>
                    <MuiLink href="https://www.institutoitmidia.com.br/" target="_blank">
                        <img src={rodapeLogos} alt="Logo - Eu Capacito"/>
                    </MuiLink>
                </Paper>
            </Box>
        </Container>
    );
};

export default Footer;

const styles = {
    email: {
        mx: 1,
        mt: "12px",
        color: "#77837F",
        fontSize: "25px",
    },
    footerLogo: {
        background: "none",
        boxShadow: "none",
    },
    copyright: {
        textAlign: "center",
        "& p": {fontSize: "14px", color: "#77837F", fontWeight: "400"},
        "& p:last-child": {fontSize: "12px"},
    },
    termLink: {
        textDecoration: "none",
        fontSize: "14px",
        color: "#77837F",
        fontWeight: "400",
        cursor: "pointer"
    }
};
