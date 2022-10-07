import { Grid } from '@mui/material'
import Link from '../components/Link';

const TemporaryMenu = () => {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Menu Temporário</h1>

      <Grid container>
        <Grid item xs={6}>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/perfil">Perfil</Link></p>
          <p><Link to="/curso">Curso</Link></p>
          <p><Link to="/cursos">Cursos</Link></p>
          {/* <p><Link to="/cursos-ec">Cursos EC</Link></p> */}
          <p><Link to="/aula">Aula</Link></p>
          <p><Link to="/parceiros">Parceiros</Link></p>
          <p><Link to="/conteudo">Conteúdo</Link></p>
          <p><Link to="/blog">Blog</Link></p>
          <p><Link to="/noticias">Notícias</Link></p>
          <p><Link to="/contato">Contato</Link></p>
          <p><Link to="/faq">F.A.Q.</Link></p>
          <p><Link to="/filtro">Filtro</Link></p>
        </Grid>  

        <Grid item xs={6}>
          <p><Link to="/oportunidades">Oportunidades</Link></p>
          <p><Link to="/empregabilidade">Empregabilidade</Link></p>
          <p><Link to="/empregabilidade/registrar">Registro Empregabilidade</Link></p>
          <hr />
          <p><Link to="/registrar">Registrar</Link></p>
          <p><Link to="/login">Login</Link></p>
          <p><Link to="/recuperar-senha">Recuperar Senha</Link></p>
        </Grid>  
      </Grid>

    </>
  );
}

export default TemporaryMenu;