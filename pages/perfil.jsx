import {useEffect, useState, useContext} from "react";
import { Box } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { AppContext } from "../src/services/context";
import Badge from "../src/components/Badge";
import apiService from "../src/services/apiService";
import { useRouter } from "next/router";
import Link from 'next/link';
import Image from 'next/image';
import PlayIcon from "../public/assets/img/perfil-menu-play.png";
import UserIcon from "../public/assets/img/perfil-menu-usuario.png";
import KeyIcon from "../public/assets/img/perfil-menu-chave.png";
import TermsIcon from "../public/assets/img/perfil-menu-termos.png"


const Perfil = () => {
  const ctx = useContext(AppContext);
  const router = useRouter()
  const [logged, setLogged] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setLogged(!!token);
    setAvatar(sessionStorage.getItem("avatarURL") ?? UserIcon);
    setFirstName(sessionStorage.getItem("username"));
    if (!token) {
      return router.push('/login');
    }
    ctx.setTitle({
      main: "Perfil",
      sub: false,
    });
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    apiService.logout();
    return router.push('/login');
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.user}>
        <Image src={avatar} alt="Foto de perfil" referrerPolicy="no-referrer" width="150" height="150" />
        <h2>{firstName}</h2>
        <Badge value="VIP" />
      </Box>

      <h2>Conta</h2>
      <Box sx={styles.accountBox}>
        <Link href="/cursos">
          <Box sx={styles.menu}>
            <Box sx={styles.menu.left}>
              <Image src={PlayIcon} alt="Ícone - Play" />
              <p>Meus cursos</p>
            </Box>
            <ArrowForwardIos
              sx={{
                //css desktop
                marginLeft: { md: "55px" },
              }}
            />
          </Box>
        </Link>

        <Link href="/editar-conta">
          <Box sx={styles.menu}>
            <Box sx={styles.menu.left}>
              <Image src={UserIcon} alt="Ícone - Usuário" />
              <p>Editar Perfil</p>
            </Box>
            <ArrowForwardIos
              sx={{
                //css desktop
                marginLeft: { md: "55px" },
              }}
            />
          </Box>
        </Link>

        <Link href="/editar-senha">
          <Box sx={styles.menu}>
            <Box sx={styles.menu.left}>
              <Image src={KeyIcon} alt="Ícone - Chave" />
              <p>Alterar a senha</p>
            </Box>
            <ArrowForwardIos
              sx={{
                //css desktop
                marginLeft: { md: "55px" },
              }}
            />
            
          </Box>
        </Link>

        <Link href="/termos-e-servicos">
          <Box sx={styles.menu}>
            <Box sx={styles.menu.left}>
              <Image src={TermsIcon} alt="Ícone - Termos" />
              <p>Termos de Uso</p>
            </Box>
            <ArrowForwardIos
                sx={{
                  //css desktop
                  marginLeft: { md: "55px" },
                }}
            />

          </Box>
        </Link>

        
      </Box>
        <Box sx={styles.logout} onClick={handleLogout}>
          <p>Sair</p>
        </Box>
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
