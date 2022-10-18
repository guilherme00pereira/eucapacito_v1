import {useState, useEffect} from "react";
import {Paper, BottomNavigation, BottomNavigationAction} from "@mui/material";
import {
    HomeRounded,
    SearchRounded,
    ArticleRounded,
    PersonOutlined,
} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import Link from 'next/link'
import {useRouter} from "next/router";

const FooterBar = () => {
    const router = useRouter()
    const [value, setValue] = useState(null);
    const [token, setToken] = useState(null);
    const [path, setPath] = useState(null)

    useEffect(() => {
        setToken(sessionStorage.getItem("token"));
        const path = router.pathname
        setPath(path)
        switch (path) {
            case "/":
                setValue(0);
                break;
            case "/procurar":
                setValue(1);
                break;
            case "/cursos":
                setValue(2);
                break;
            case "/login":
                setValue(3);
                break;
            default:
                setValue(9);
                break;
        }
    }, [token, path]);

    const handleNavChange = (event, newValue) => setValue(newValue);

    const handleClickEvent = (to) => {
        router.push(to)
    }
    return (
        <Paper
            sx={{
                position: "fixed",
                left: 0,
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
                backgroundColor: {
                    md: "unset"
                }

            }}
            elevation={3}
        >
            <Nav showLabels value={value} onChange={handleNavChange}>
                <NavAction
                    label="Home"
                    icon={<HomeRounded/>}
                    onClick={() => handleClickEvent('/')}
                />
                <NavAction
                    label="Procurar"
                    icon={<SearchRounded/>}
                    onClick={() => handleClickEvent('/procurar?search=')}
                />
                <NavAction
                    label="Ver cursos"
                    icon={<ArticleRounded/>}
                    onClick={() => handleClickEvent('/cursos')}
                />
                {token ? (
                    <NavAction
                        label="Perfil"
                        icon={<PersonOutlined/>}
                        onClick={() => handleClickEvent('/perfil')}
                    />
                ) : (
                    <NavAction
                        label="Entrar"
                        icon={<PersonOutlined/>}
                        onClick={() => handleClickEvent('/login')}
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
