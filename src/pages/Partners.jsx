import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import Button from "../components/Button";
import partnerIcon from "../assets/icons/parceiros.svg";
import microsoftLogo from "../assets/img/microsoft-partners.png";
import oracleLogo from "../assets/img/oracle-partners.png";
import golLogo from "../assets/img/gol-partners.png";
import eyLogo from "../assets/logos/ey.png";
import itmidiaLogo from "../assets/img/itmidia-partners.png";
import fiapLogo from "../assets/img/fiap-partners.png";
import soulcodeLogo from "../assets/img/soulCode-partners.png";
import ciscoLogo from "../assets/logos/cisco.png";
import deloitteLogo from "../assets/logos/deloitte.png";
import engieLogo from "../assets/logos/engie.png";
import idpLogo from "../assets/logos/idp.png";
import sabinLogo from "../assets/logos/sabin.png";
import fdcLogo from "../assets/logos/fdc.png";
import arcelorLogo from "../assets/img/arcelor-partners.png";
import googleLogo from "../assets/img/google-partners.png";

const Partners = () => {
  const [title, setTitle] = useOutletContext();



  useEffect(() => {
    setTitle({
      main: "Parceiros",
      sub: "Conheça os nossos parceiros",
    });
  }, []);

  return (
    <Box sx={styleParagraph}>
      <Box sx={{ textAlign: "center", mb: "48px" }}>
        <p className="subtitle">Conheça quem apoia o Eu Capacito</p>
      </Box>

      <Box
        sx={{
          hr: {
            mt: "13px",
            mb: "66px",
            border: 0,
            borderTop: "1px solid #77837F",
            
          },
          "& p":{
            fontSize:{
                md:"22px",
            xs:"16px",            
        },
        fontWeight:"700"
          }
        }}
      >
        <p>Mantenedores</p>
        <hr />
      </Box>

      <Box sx={boxSx}>
        <Paper sx={paperSx}>
          <img src={microsoftLogo} alt="Logo - Microsoft" />
        </Paper>

        <Paper sx={paperSx}>
          <img src={oracleLogo} alt="Logo - Oracle" />
        </Paper>

        <Paper sx={paperSx}>
          <img src={golLogo} alt="Logo - Gol" />
        </Paper>

        <Paper sx={paperSx}>
          <img src={googleLogo} alt="Logo - Google" />
        </Paper>

        <Paper sx={paperSx}>
          <img src={ciscoLogo} alt="Logo - Cisco" />
        </Paper>

        <Paper sx={paperSx}>
          <img src={itmidiaLogo} alt="Logo - EY" />
        </Paper>
      </Box>

      <Box
        sx={{
          hr: {
            mt: "13px",
            mb: "66px",
            border: 0,
            borderTop: "1px solid #77837F",
          },
          "& p":{
            fontSize:{
                md:"22px",
            xs:"16px",            
        },
        fontWeight:"700"
          }
        }}
      >
        <p>Associados</p>
        <hr />
      </Box>

      <Box sx={boxSx}>
        <Paper sx={paperSxDesk}>
          <img src={arcelorLogo} alt="Logo - Arcelor" />
        </Paper>

        <Paper sx={paperSxDesk}>
          <img src={deloitteLogo} alt="Logo - Deloitte" />
        </Paper>

        <Paper sx={paperSxDesk}>
          <img src={engieLogo} alt="Logo - Engie" />
        </Paper>

        <Paper sx={paperSxDesk}>
          <img src={sabinLogo} alt="Logo - Sabin" />
        </Paper>
      </Box>

      <Box
        sx={{
          hr: {
            mt: "13px",
            mb: "66px",
            border: 0,
            borderTop: "1px solid #77837F",
          },
          "& p":{
            fontSize:{
                md:"22px",
            xs:"16px",            
        },
        fontWeight:"700"
          }
        }}
      >
        <p>Parceiros institucionais</p>
        <hr />
      </Box>

      <Box sx={boxSx}>
        <Paper sx={paperSxDeskLast}>
          <img src={fiapLogo} alt="Logo - FIAP" />
        </Paper>

        <Paper sx={paperSxDeskLast}>
          <img src={soulcodeLogo} alt="Logo - SoulCode" />
        </Paper>

        <Paper sx={paperSxDeskLast}>
          <img src={fdcLogo} alt="Logo - FDC" />
        </Paper>

        <Paper sx={paperSxDeskLast}>
          <img src={idpLogo} alt="Logo - IDP" />
        </Paper>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          small: { fontSize: "11px" },
          //css desktop
          display: "flex",

          //css desktop
          flexDirection: "column",

          //css desktop
          mt: {
            md: "198px",
            xs: "48px",
          },
          "& .text-footer": {
            fontSize: {
              md: "18px",
              xs: "11px",
            },
          },
        }}
      >
        <small className="text-footer">FAÇA PARTE DESSE PROJETO</small>
        <Button
          sx={{
            margin: { md: "10px auto 0", xs: "10px 20px" },
            //css desktop
            width: {md: "30%", xs: "90%"},
            mt: {md: "42px", xs: "15px",},
          }}
        >
          Quero ser parceiro
        </Button>
      </Box>
    </Box>
  );
};

export default Partners;


const boxSx = {
    display: "flex",
    flexWrap: "wrap",
    img: {
        filter: "grayscale(1)",

        maxWidth: {
            md: "100%",
            xs: "85px",
        },
        maxHeight: {
            md: "auto",
            xs: "50px",
        },
    },
    "& img:hover": {
        filter: "grayscale(0)",
    },
    width: {
        md: "90%",
        xs: "100%",
    },
    margin: {
        xs: "0",
        md: "0 auto",
    },
    //css desktop
    justifyContent: {
        md: "space-evenly",
        xs: "space-evenly",
    },
};

const paperSx = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #77837F",
    borderRadius: "5px",
    background: "unset",
    padding: {
        md: "0",
        xs: "5% 0",
    },
    //css desktop
    width: { md: "28%", xs: "45%" },
    minHeight: { md: "130px", xs: "82px" },
    //css desktop
    margin: { md: "0 0 50px 0", xs: "0 auto 12px" },
};

const paperSxDesk = {
    display: "flex",
    justifyContent: { xs: "center", md: "space-evenly" },
    alignItems: "center",
    border: "1px solid #77837F",
    borderRadius: "5px",
    //minHeight: "82px",
    background: "unset",
    padding: {
        md: "0",
        xs: "5% 0",
    },
    //css desktop
    width: { md: "20%", xs: "45%" },
    minHeight: { md: "90px", xs: "auto" },
    //css desktop
    margin: { md: "0 0 50px 0", xs: "0 auto 12px" },
};

const paperSxDeskLast = {
    display: "flex",
    justifyContent: { xs: "center", md: "space-evenly" },
    alignItems: "center",
    border: "1px solid #77837F",
    borderRadius: "5px",
    //minHeight: "82px",
    background: "unset",
    padding: {
        md: "0",
        xs: "5% 0",
    },
    //css desktop
    width: { md: "16%", xs: "45%" },
    minHeight: { md: "90px", xs: "auto" },
    maxHeight: { md: "auto", xs: "55px" },
    //css desktop
    margin: { md: "0 0 50px 0", xs: "0 auto 12px" },
};

const styleParagraph = {
    fontSize: {
        md: "22px",
        xs: "18px",
    },
    fontWeight: {
        md: "700",
        xs: "500",
    },
    "& .text-footer":{
        fontSize: {
            md: "18px",
            xs: "9px !important",
        },
        fontWeight:{md:"400", xs:"500"}

    },
    "& .subtitle":{
        display:{
            md:"block",
            xs:"none"
        }
    }
};