import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import ReactGA from 'react-ga4';
import { MetadataContext } from './services/context';
import apiService from './services/apiService';


const TRACKING_ID = "G-NGP1WFMVFV";

const Layout = ({children}) => {
  const [headerMetadata, setHeaderMetadata] = useState({
    title: "Eu Capacito",
    description: "",
    og_title: "",
    og_description: "",
    article_modified_time: ""
  });
  ReactGA.initialize(TRACKING_ID);
  ReactGA.send("pageview");

  const { api } = apiService;

  useEffect( () => {
    if( sessionStorage.getItem( 'pages_metadata' ) === null ) {
      api.get('eucapacito/v1/config').then( res => {
        sessionStorage.setItem( "pages_metadata", JSON.stringify(res.data) )
      })
    }
  }, [])

  return (
    <MetadataContext.Provider value={setHeaderMetadata}>
      <Container sx={{ 
        p: 0,
        h1: { fontSize: "22px", color: '#33EDAC' },
        h2: { fontSize: "18px" },
        h3: { fontSize: "16px" },
      }} >
        {children}
      </Container>
     </MetadataContext.Provider>
  );
};

export default Layout;