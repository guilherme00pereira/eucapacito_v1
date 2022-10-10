import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import ReactGA from 'react-ga4';
import apiService from './services/apiService';
import Header from './layouts/Header';
import FooterBar from './layouts/Footer';


const TRACKING_ID = "G-NGP1WFMVFV";

const Layout = ({children}) => {
  ReactGA.initialize(TRACKING_ID);
  ReactGA.send("pageview");

  const { api } = apiService;

  useEffect( () => {
    /* if( sessionStorage.getItem( 'pages_metadata' ) === null ) {
      api.get('eucapacito/v1/config').then( res => {
        sessionStorage.setItem( "pages_metadata", JSON.stringify(res.data) )
      })
    } */
  }, [])

  return (
      <Container sx={{ 
        p: 0,
        h1: { fontSize: "22px", color: '#33EDAC' },
        h2: { fontSize: "18px" },
        h3: { fontSize: "16px" },
      }} >
        <Header />
          <Container sx={{ pt: 3, pb: 10 }}>
            {children}
          </Container>
          <FooterBar />
      </Container>
  );
};

export default Layout;