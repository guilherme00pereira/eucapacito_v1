import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Paper, FormControl, OutlinedInput, InputLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "../components/Button";
import apiService from "../services/apiService";
import SendMessageImage from "../assets/img/mensagem-enviada.png"
import {messageReturn} from "../commonStyles/messageReturn";

const Partners = () => {
  const [fields, setFields] = useState({
    name: "",
    company: "",
    contact: "",
  });
  const [title, setTitle] = useOutletContext();
  const [showPartnerButton, setShowPartnerButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [partners, setPartners] = useState([]);
  const { api } = apiService;

  const handleFieldChange = (field) => (e) =>
    setFields({ ...fields, [field]: e.target.value });

  const handleSteps = (step) => {
    if("2" === step) {
      setShowForm(true)
      setShowPartnerButton(false)
      setShowMessage(false)
    }
    if("3" === step) {
      setShowForm(false)
      setShowPartnerButton(false)
      setShowMessage(true)
    }
  }

  useEffect(() => {
    setTitle({
      main: "Parceiros",
      sub: "Conheça os nossos parceiros",
    });

    api.get('eucapacito/v1/partners').then((res) => {
      setPartners(res.data)
    })

    const script = document.createElement("script");
    script.src = "https://d335luupugsy2.cloudfront.net/js/loader-scripts/7a9b6985-dad9-4b02-af30-b014ac36349b-loader.js";
    script.async = true;
    document.body.appendChild(script);

  }, []);

  return (
    <Box sx={styles.styleParagraph}>
      <Box sx={{ textAlign: "center", mb: "48px" }}>
        <p className="subtitle">Conheça quem apoia o Eu Capacito</p>
      </Box>

      <Box sx={styles.boxTitle}>
        <h1>Mantenedores</h1>
        <hr />
      </Box>

      <Box sx={styles.boxSx}>
        {partners.map((partner, index) => {
          if (partner.category === 'Mantenedores') {
            return (<Paper sx={styles.paperSx}>
              <img src={partner.image} alt="Logo - {partner.name}" />
            </Paper>)
          }
        })}
      </Box>

      <Box sx={styles.boxTitle}>
        <h1>Associados</h1>
        <hr />
      </Box>

      <Box sx={styles.boxSx}>
        {partners.map((partner, index) => {
          if (partner.category === 'Associados') {
            return (
              <Paper sx={styles.paperSxDesk}>
                <img src={partner.image} alt="Logo - {partner.name}" />
              </Paper>)
          }
        })}
      </Box>

      <Box sx={styles.boxTitle}>
        <h1>Parceiros institucionais</h1>
        <hr />
      </Box>

      <Box sx={styles.boxSx}>

        {partners.map((partner, index) => {
          if (partner.category === 'Parceiros Institucionais') {
            return (
              <Paper sx={styles.paperSxDeskLast}>
                <img src={partner.image} alt="Logo - {partner.name}" />
              </Paper>)
          }
        })}
      </Box>

      {showPartnerButton &&
        <Box sx={styles.boxBePart}>
          <small style={styles.textFooter}>FAÇA PARTE DESSE PROJETO</small>
          <Button sx={styles.button} onClick={() => handleSteps("2")}>
            Quero ser parceiro
          </Button>
        </Box>
      }

      { showForm &&
        <Box sx={styles.boxForm}>
          <h3>Quero ser parceiro</h3>
          <small>Envie as informações abaixo que entraremos em contato.</small>
          <form>
            <FormCtrl sx={styles.formControl}>
              <InputLabel htmlFor="name" sx={styles.nameInput}>
                Nome Completo
              </InputLabel>
              <OutlinedInput
                required
                id="name"
                label="Nome Completo"
                type="text"
                value={fields.name}
                onChange={handleFieldChange("name")}
              />
            </FormCtrl>
            <FormCtrl sx={styles.formControl}>
              <InputLabel htmlFor="name" sx={styles.nameInput}>
                Empresa
              </InputLabel>
              <OutlinedInput
                required
                id="company"
                label="Empresa"
                type="text"
                value={fields.company}
                onChange={handleFieldChange("company")}
              />
            </FormCtrl>
            <FormCtrl sx={styles.formControl}>
              <InputLabel htmlFor="name" sx={styles.nameInput}>
                Contato
              </InputLabel>
              <OutlinedInput
                required
                id="contact"
                label="Contato"
                type="text"
                value={fields.contact}
                onChange={handleFieldChange("contact")}
              />
            </FormCtrl>
            <FormCtrl sx={styles.formControl}>
            <Button type="submit" sx={styles.button} onClick={() => handleSteps("3")}>
              Enviar
            </Button>
          </FormCtrl>
          </form>
        </Box>
      }

      {showMessage &&
        <Box sx={messageReturn}>
        <img src={SendMessageImage} alt={"mensagem enviada"} />
        <h2>Enviado</h2>
      </Box>
      }
    </Box>
  );
};

export default Partners;

const FormCtrl = styled(FormControl)(`
  width: 100%;
  margin: 0.35rem 0;
`);

const styles = {
  formControl: {
    "& .MuiOutlinedInput-input": {
      //css desktop
      padding: {
        md: "5px 14px",
      },
    },
  },
  nameInput: {
    //css desktop
    top: { md: "-9px" },
    color: "#77837F",
    fontSize: { md: "14px", xs: "1rem" },
    fontWeight: {
      md: "500",
      xs: "400",
    },
  },
  boxTitle: {
    hr: {
      mt: "13px",
      mb: "66px",
      border: 0,
      borderTop: "1px solid #77837F",

    },
    "& h1": {
      fontSize: {
        md: "22px",
        xs: "16px",
      },
      fontWeight: "700",
      color: "#CAC8C8"
    }
  },
  boxBePart: {
    textAlign: "center",
    small: { fontSize: "11px" },
    display: "flex",
    flexDirection: "column",
    my: {
      md: "120px",
      xs: "48px",
    },
    "& .text-footer": {
      fontSize: {
        md: "18px",
        xs: "11px",
      },
    },
  },
  boxForm: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    maxWidth: "700px",
    h3: {
      fontSize: "22px",
    },
    small: {
      fontSize: "14px",
      fontWeight: "normal"
    },
    mt: "48px",
    pb: "100px",
    "& .MuiBox-root": {
      margin: {
          md: "6.5rem 5.5rem 2rem",
      },
  },
  margin: "0 auto",
  },
  button: {
    margin: { md: "10px auto 0", xs: "10px 20px" },
    //css desktop
    width: { md: "30%", xs: "90%" },
    mt: { md: "42px", xs: "15px", },
  },
  boxSx: {
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
  },
  paperSx: {
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
  },
  paperSxDesk: {
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
  },
  paperSxDeskLast: {
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
  },
  styleParagraph: {
    fontSize: {
      md: "22px",
      xs: "18px",
    },
    fontWeight: {
      md: "700",
      xs: "500",
    },
    "& .text-footer": {
      fontSize: {
        md: "18px",
        xs: "9px !important",
      },
      fontWeight: { md: "400", xs: "500" }

    },
    "& .subtitle": {
      display: {
        md: "block",
        xs: "none"
      }
    }
  },
  textFooter: {
    fontSize: "16px"
  }

}

