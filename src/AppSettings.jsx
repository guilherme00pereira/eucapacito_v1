import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import './App.css';

const AppSettings = () => {
  return (
    <Container className="App" sx={{ 
      p: 0,
      h1: { fontSize: "22px", color: '#33EDAC' },
      h2: { fontSize: "18px" },
      h3: { fontSize: "16px" },
     }} >
       <Outlet />
     </Container>
  );
};

export default AppSettings;