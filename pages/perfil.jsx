import {useEffect, useState} from "react";
import { Box } from "@mui/material";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { ArrowForwardIos } from "@mui/icons-material";

import Badge from "../components/Badge";
import apiService from "../services/apiService";

import PlayIcon from "../assets/img/perfil-menu-play.png";
import UserIcon from "../assets/img/perfil-menu-usuario.png";
import KeyIcon from "../assets/img/perfil-menu-chave.png";
import TermsIcon from "../assets/img/perfil-menu-termos.png"
import MetadataManager from "../layouts/MetadataManager";

const Perfil = () => {
  const [title, setTitle] = useOutletContext();
  const token = sessionStorage.getItem('loggedIn');
  let navigate = useNavigate();
  const avatar = sessionStorage.getItem("avatarURL") ?? UserIcon;

  useEffect(() => {
    if (!token) {
      return navigate('/login');
    }
    setTitle({
      main: "Perfil",
      sub: false,
    });
  }, [token, navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    
    apiService.logout();
    return navigate('/login');
  }

  return (
    <Box sx={styles.root}>
      <MetadataManager ispage={true} value="default" />
      <Box sx={styles.user}>
        <img src={avatar} alt="Foto de perfil" referrerPolicy="no-referrer" />
        <h2>{sessionStorage.getItem('username')}</h2>
        <Badge value="VIP" />
      </Box>

      <h2>Conta</h2>
      <Box sx={styles.accountBox}>
        <NavLink to="/cursos">
          <Box sx={styles.menu}>
            <Box sx={styles.menu.left}>
              <img src={PlayIcon} alt="Ícone - Play" />
              <p>Meus cursos</p>
            </Box>
            <ArrowForwardIos
              sx={{
                //css desktop
                marginLeft: { md: "55px" },
              }}
            />
          </Box>
        </NavLink>

        <NavLink to="/editar-conta">
          <Box sx={styles.menu}>
            <Box sx={styles.menu.left}>
              <img src={UserIcon} alt="Ícone - Usuário" />
              <p>Editar Perfil</p>
            </Box>
            <ArrowForwardIos
              sx={{
                //css desktop
                marginLeft: { md: "55px" },
              }}
            />
          </Box>
        </NavLink>

        <NavLink to="/editar-senha">
          <Box sx={styles.menu}>
            <Box sx={styles.menu.left}>
              <img src={KeyIcon} alt="Ícone - Chave" />
              <p>Alterar a senha</p>
            </Box>
            <ArrowForwardIos
              sx={{
                //css desktop
                marginLeft: { md: "55px" },
              }}
            />
            
          </Box>
        </NavLink>

        <NavLink to="/termos-e-servicos">
          <Box sx={styles.menu}>
            <Box sx={styles.menu.left}>
              <img src={TermsIcon} alt="Ícone - Termos" />
              <p>Termos de Uso</p>
            </Box>
            <ArrowForwardIos
                sx={{
                  //css desktop
                  marginLeft: { md: "55px" },
                }}
            />

          </Box>
        </NavLink>

        
      </Box>
      <NavLink to="/" onClick={handleLogout}>
        <Box sx={styles.logout}>
          <p>Sair</p>
        </Box>
      </NavLink>
    </Box>
  );
};

export default Perfil;

const styles = {
  root: {
    h2: {
      fontSize: {xs:"20px", md:"20px"},
      fontWeight: 500,
    },
  },
  accountBox: {
    //css desktop
    display: {
      md: "flex",
    },
    //css desktop
    justifyContent: {
      md: "space-between",
    },
    //css desktop
    flexWrap: {
      md: "wrap",
    },
    //css desktop
    maxWidth: {
      md: "90%",
    },
    //css deskto
    margin: {
      md: "0 auto",
    },
  },
  user: {
    textAlign: "center",
    img: {
      width: "5rem",
      borderRadius: "2.5rem",
    },
    h2: {
      mb: "0.5rem",
      fontSize:"20px"
    },
  },
  menu: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
    border: "1px solid #77837F",
    borderRadius: "0.5rem",
    padding: "0.5rem 0.75rem",
    width: {
      md: "300px",
      xs: "100%"
    },
    left: {
      display: "flex",
      "& p": {
        marginLeft: "0.5rem",
        color: "#77837F",
        fontWeight: 500,
        fontSize:"16px"
      },
    },
  },
  logout: {
    marginTop: "3rem",
    textAlign: "center",
    "& p": {
      fontSize: {xs:"20px", md:"20px"},
      fontWeight: "500"
    },
  },
};
