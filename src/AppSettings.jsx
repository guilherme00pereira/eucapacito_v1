import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import ReactGA from 'react-ga';

import './App.css';

const TRACKING_ID = "G-NGP1WFMVFV";

const AppSettings = () => {
  ReactGA.initialize(TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
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