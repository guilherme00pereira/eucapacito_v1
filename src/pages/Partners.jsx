import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Paper } from "@mui/material";
import Button from "../components/Button";
import apiService from "../services/apiService";

const Partners = () => {
  const [title, setTitle] = useOutletContext();
  const [partners, setPartners] = useState([]);
  const {api} = apiService;

  useEffect(() => {
    setTitle({
      main: "Parceiros",
      sub: "Conheça os nossos parceiros",
      });

      api.get('eucapacito/v1/partners').then((res) => {
        setPartners(res.data)
      })

  }, []);

  return (
    <Box sx={styleParagraph}>
      <Box sx={{ textAlign: "center", mb: "48px" }}>
        <p className="subtitle">Conheça quem apoia o Eu Capacito</p>
      </Box>

      <Box sx={boxTitle}>
        <h1>Mantenedores</h1>
        <hr />
      </Box>

      <Box sx={boxSx}>
        {partners.map( (partner, index) => {
          if(partner.category === 'Mantenedores') {
              return(<Paper sx={paperSx}>
                <img src={partner.image} alt="Logo - {partner.name}" />
            </Paper>)
          }
        })}        
      </Box>

      <Box sx={boxTitle}>
        <h1>Associados</h1>
        <hr />
      </Box>

      <Box sx={boxSx}>
        {partners.map( (partner, index) => {
            if(partner.category === 'Associados') {
                return(
                <Paper sx={paperSxDesk}>
                  <img src={partner.image} alt="Logo - {partner.name}" />
              </Paper>)
            }
          })}
      </Box>

      <Box sx={boxTitle}>
        <h1>Parceiros institucionais</h1>
        <hr />
      </Box>

      <Box sx={boxSx}>

        {partners.map( (partner, index) => {
            if(partner.category === 'Parceiros Institucionais') {
                return(
                <Paper sx={paperSxDeskLast}>
                  <img src={partner.image} alt="Logo - {partner.name}" />
              </Paper>)
            }
          })}
      </Box>

      <Box sx={boxBePart}>
        <small className="text-footer">FAÇA PARTE DESSE PROJETO</small>
        <Button sx={button}>
          Quero ser parceiro
        </Button>
      </Box>
    </Box>
  );
};

export default Partners;

const boxTitle = {
    hr: {
        mt: "13px",
        mb: "66px",
        border: 0,
        borderTop: "1px solid #77837F",

    },
    "& h1":{
        fontSize:{
            md:"22px",
            xs:"16px",
        },
        fontWeight:"700",
        color: "#CAC8C8"
    }
}

const boxBePart = {
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
}

const button = {
    margin: { md: "10px auto 0", xs: "10px 20px" },
    //css desktop
    width: {md: "30%", xs: "90%"},
    mt: {md: "42px", xs: "15px",},
}

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
            xs: "100px",
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