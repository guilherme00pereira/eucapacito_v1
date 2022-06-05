import Button from "../components/Button";
import {
  Container,
  Box,
  FormControl,
  OutlinedInput,
  Select,
  MenuItem,
  InputLabel, Alert, Snackbar,
} from "@mui/material";

import {useEffect, useState} from "react";
import apiService from "../services/apiService";  

const extractBirthdate = (data) => {
  let [bd, bm, by] = "";
  if(data !== undefined && data !== null) {
    bd = data.substr(6,2)
    bm = data.substr(4,2)
    by = data.substr(0,4)
  }
  return {bd, bm, by};
}

const extractPhone = (phone) => {
  let [ddd, num] = "";
  if(phone !== undefined) {
    ddd = phone.substr(0,2)
    num = phone.substr(2)
  }
  return {ddd, num};
}

const Account = () => {
  const [fields, setFields] = useState({
    id: sessionStorage.getItem('userID'),
    avatar: "",
    username: "",
    full_name: "",
    email: "",
    b_day: "",
    b_month: "",
    b_year: "",
    phone_ddd: "",
    phone_number: "",
    country: "",
    state: "",
    city: "",
  });
  const token = sessionStorage.getItem('token');
  const {api} = apiService;

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("false");
  const [alertType, setAlertType] = useState("success");

  const handleFieldChange = (field) => (e) =>
      setFields({ ...fields, [field]: e.target.value });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
    setAlertMessage("");
  };

  useEffect( () => {
    
    const id = sessionStorage.getItem('userID');
    api.get(`/wp/v2/users/${id}?_embed`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then( (res) => {

      let {bd, bm, by} = extractBirthdate(res.data.acf.data_de_nascimento)
      let {ddd, num} = extractPhone(res.data.acf.telefone)
          setFields({
            ...fields,
            username: res.data.slug,
            avatar: res.data.avatar_urls[96],
            full_name: res.data.first_name + " " + res.data.last_name,
            b_day: bd,
            b_month: bm,
            b_year: by,
            phone_ddd: ddd,
            phone_number: num,
            email: res.data.email,
            country: res.data.acf.pais ? res.data.acf.pais : 'Brasil',
            state: res.data.acf.estado,
            city: res.data.acf.cidade
          })
        });
    
  }, [token, api]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await apiService.updateProfile(fields);
    if(response.status)
      setAlertType('success')
    else
      setAlertType('error');
    setAlertMessage(response.message);
    setAlertOpen(true);
  }

  return (
    <Container sx={styles}>
      
      <Box sx={styles.pagetitle}>
        <h1>Edição da conta</h1>
      </Box>

      <Box sx={styles.profile}>
        <img src={fields.avatar} alt="Foto de perfil" />
      </Box>

      <form sx={styles.form}>
        <Container sx={styles.formFirstContainer}>
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <OutlinedInput id="username" value={fields.username} type="text" disabled={true} />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="full_name">Nome Completo</InputLabel>
            <OutlinedInput required id="full_name" value={fields.full_name} type="text" onChange={handleFieldChange("full_name")} />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput required id="email" value={fields.email} type="email" disabled={true} />
          </FormControl>

        </Container>

        <Container sx={styles.formSecondContainer}>
          <FormControl>
            <InputLabel htmlFor="birthdate">Data de nascimento</InputLabel>
            <Box sx={styles.dataN}>
              <OutlinedInput required id="b_day" value={fields.b_day} type="text" inputProps={{ maxLength: 2 }} onChange={handleFieldChange("b_day")} />
              <OutlinedInput required id="b_month" value={fields.b_month} type="text" inputProps={{ maxLength: 2 }} onChange={handleFieldChange("b_month")} />
              <OutlinedInput required id="b_year" value={fields.b_year} type="text" inputProps={{ maxLength: 4 }} onChange={handleFieldChange("b_year")} />
            </Box>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="phone">Celular</InputLabel>
            <Box sx={styles.cel}>
              <OutlinedInput required id="phone_ddd" value={fields.phone_ddd} type="text" inputProps={{ maxLength: 2 }} onChange={handleFieldChange("phone_ddd")} />
              <OutlinedInput required id="phone_number" value={fields.phone_number} type="text" inputProps={{ maxLength: 9 }} onChange={handleFieldChange("phone_number")} />
            </Box>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="country">País</InputLabel>
            <OutlinedInput required id="country" value={fields.country} type="text" onChange={handleFieldChange("country")} />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="state">Estado</InputLabel>
            <Select required id="state" value={fields.state} type="text" onChange={handleFieldChange("state")}>
              <MenuItem value={'AC'}>Acre</MenuItem>
              <MenuItem value={'AL'}>Alagoas</MenuItem>
              <MenuItem value={'AP'}>Amapá</MenuItem>
              <MenuItem value={'AM'}>Amazonas</MenuItem>
              <MenuItem value={'BA'}>Bahia</MenuItem>
              <MenuItem value={'CE'}>Ceará</MenuItem>
              <MenuItem value={'DF'}>Distrito Federal</MenuItem>
              <MenuItem value={'ES'}>Espírito Santo</MenuItem>
              <MenuItem value={'GO'}>Goías</MenuItem>
              <MenuItem value={'MA'}>Maranhão</MenuItem>
              <MenuItem value={'MT'}>Mato Grosso</MenuItem>
              <MenuItem value={'MS'}>Mato Grosso do Sul</MenuItem>
              <MenuItem value={'MG'}>Minas Gerais</MenuItem>
              <MenuItem value={'PA'}>Pará</MenuItem>
              <MenuItem value={'PB'}>Paraíba</MenuItem>
              <MenuItem value={'PR'}>Paraná</MenuItem>
              <MenuItem value={'PE'}>Pernambuco</MenuItem>
              <MenuItem value={'PI'}>Piauí</MenuItem>
              <MenuItem value={'RJ'}>Rio de Janeiro</MenuItem>
              <MenuItem value={'RN'}>Rio Grande do Norte</MenuItem>
              <MenuItem value={'RS'}>Rio Grande do Sul</MenuItem>
              <MenuItem value={'RO'}>Rondônia</MenuItem>
              <MenuItem value={'RR'}>Roraíma</MenuItem>
              <MenuItem value={'SC'}>Santa Catarina</MenuItem>
              <MenuItem value={'SP'}>São Paulo</MenuItem>
              <MenuItem value={'SE'}>Sergipe</MenuItem>
              <MenuItem value={'TO'}>Tocantins</MenuItem>

            </Select>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="city">Cidade</InputLabel>
            <OutlinedInput required id="city" value={fields.city} type="text" onChange={handleFieldChange("city")} />
          </FormControl>
        </Container>

        <Button onClick={handleSubmit} sx={styles.button}>Salvar</Button>
      </form>
      <Snackbar
          open={alertOpen}
          onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Account;

const styles = {
  loading: {
    display: "flex",
    margin: "1.5rem auto 0",
    color: "#77837F",
  },
  profile: {
    mt: "43px",
    textAlign: "center",
    "& img": {
      borderRadius: "50px",
    },
    "& a": {
      fontWeight: "500",
      fontSize: "20px",
      color: "#CAC8C8",
    },
    "& h2": {
      fontWeight: "500",
      fontSize:{
          md:"20px",
          xs:"20px"
      }
    },
  },
  pagetitle: {
    "& h1": {
      color: "#CAC8C8",
      pb: "3px",
      borderBottom: {
        md: "1px solid #77837F",
        xs: "none",
      },
      textAlign: {
        md: "left",
        xs: "center",
      },
      display:{
          md:"block",
          xs:"none"
      }
    },
  },
  form: {
    position: "relative",
    display: "flex",
    flexDirection: {
      md: "row",
      xs: "column",
    },
    margin: "0 auto",
    "& .MuiInputBase-input": {
      maxHeight: "0px",
    },
    "& .MuiFormControl-root": {
      mt: "60px",
    },
    "& .MuiFormLabel-root": {
      left: "-13px",
      top: "-40px",
      fontSize: {md:"18px", xs:"16px"},
      color:"#77837F"
    },
    "& .MuiSvgIcon-root": {
      width: "22px",
    },
    "& .MuiIconButton-root": {
      display: {
        md: "block",
        xs: "none",
      },
    },
  },
  formFirstContainer: {
    width: "100%",
    "& .MuiFormControl-root": {
      width: { md: "85%", xs: "100%" },
    },
  },
  formSecondContainer: {
    width: {
      md: "90%",
      xs: "100%",
    },
    "& .MuiFormControl-root": {
      width: { md: "85%", xs: "100%" },
    },
  },
  dataN: {
    display: "flex",
    justifyContent: {
      md: "auto",
      xs: "space-between",
    },
    width: {
      md: "100%",
      xs: "100%",
    },
    "& .MuiOutlinedInput-root": {
      width: "20%",
    },
    "& .MuiOutlinedInput-root:last-child": {
      width: "40%",
    },
  },
  cel: {
    display: "flex",
    justifyContent: {
      md: "auto",
      xs: "space-between",
    },
    width: {
      md: "100%",
      xs: "100%",
    },
    "& .MuiOutlinedInput-root": {
      width: "20%",
    },
    "& .MuiOutlinedInput-root:last-child": {
      width: "70%",
    },
  },
  button: {
    margin: { md: "10px auto 0", xs: "10px 20px" },
    //css desktop
    width: {
      md: "30%",
      xs: "90%"
    },
    position: {
      md: "absolute",
      xs: "relative",
    },
    top: {
      md: "450px",
      xs: "0",
    },
    left: {
      md: "30%",
      xs: "0",
    },
    mt: {
      md: "100px",
      xs: "50px",
    },
  },
};
