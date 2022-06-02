import { useState, useEffect } from "react";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  HomeRounded,
  SearchRounded,
  ArticleRounded,
  PersonOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";

const FooterBar = () => {
  const [value, setValue] = useState(null);
  const [token, setToken] = useState(null);

  const path = useLocation().pathname;
  let navigate = useNavigate();

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));

    switch (path) {
      case "/":
        setValue(0);
        break;
      // case "/procurar":
      //   setValue(1);
      //   break;
      case "/cursos":
        setValue(2);
        break;
      case "/login":
        setValue(3);
        break;
      default:
        setValue(1);
        break;
    }
  }, [token, path]);

  const handleNavChange = (event, newValue) => setValue(newValue);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        //css desktop
        right: {
          md: "94%",
          xs: "0",
        },
        bottom: {
          md: "40%",
          xs: "0",
        },
        backgroundImage: {
          md: "none",
        },
        boxShadow: {
          md: "none",
        },
        backgroundColor:{
            md:"unset"
        } 
        
      }}
      elevation={3}
    >
      <Nav showLabels value={value} onChange={handleNavChange}>
        <NavAction
          component={Link}
          to="/"
          label="Home"
          icon={<HomeRounded />}
        />
        <NavAction
          component={Link}
          to="/procurar?search="
          label="Procurar"
          icon={<SearchRounded />}
        />
        <NavAction
          component={Link}
          to="/cursos"
          label="Ver cursos"
          icon={<ArticleRounded />}
        />
        {token ? (
          <NavAction
            component={Link}
            to="/perfil"
            label="Perfil"
            icon={<PersonOutlined />}
          />
        ) : (
          <NavAction
            component={Link}
            to="/login"
            label="Entrar"
            icon={<PersonOutlined />}
          />
        )}
      </Nav>
    </Paper>
  );
};

export default FooterBar;

const Nav = styled(BottomNavigation)(`
  background-color: #ffffff;
  //css desktop
  @media(min-width:1024px){
      min-height: 270px;
      flex-direction: column;
      text-align: center;
      width: 52px;
      .MuiBottomNavigationAction-label, .MuiBottomNavigationAction-label.Mui-selected {
          font-size:5px;
      }
      .MuiBottomNavigationAction-root{
          padding: 0px 4px 0px 4px;
          min-width: 0;
      }
      
  } 
  
`);

const NavAction = styled(BottomNavigationAction)(`
  color: #77837F;
  font-weight: 500;
  &.Mui-selected {
    color: #33EDAC;
    //css desktop
    text-align: center;
  }
`);
