import { useState } from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Helmet } from "react-helmet";
import { MetadataContext } from './ApplicationContexts';

import './App.css';

const TRACKING_ID = "G-NGP1WFMVFV";

const AppSettings = () => {
  const [headerMetadata, setHeaderMetadata] = useState({
    title: "Eu Capacito",
    description: "",
    og_title: "",
    og_description: "",
    article_modified_time: ""
  });
  ReactGA.initialize(TRACKING_ID);
  ReactGA.send("pageview");

  return (
    <MetadataContext.Provider value={setHeaderMetadata}>
      <Container className="App" sx={{ 
        p: 0,
        h1: { fontSize: "22px", color: '#33EDAC' },
        h2: { fontSize: "18px" },
        h3: { fontSize: "16px" },
      }} >
        <Helmet>
          <title>{headerMetadata.title}</title>
          <meta name="description" content={headerMetadata.description} />
          <link rel="canonical" href="https://www.eucapacito.comm.br/" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.eucapacito.comm.br/" />
          <meta property="og:site_name" content="Eu Capacito" />
          <meta property="og:title" content={headerMetadata.og_title} />
          <meta property="og:description" content={headerMetadata.og_description} />
          <meta property="article:modified_time" content={headerMetadata.article_modified_time} />
        </Helmet>
        <Outlet />
      </Container>
     </MetadataContext.Provider>
  );
};

export default AppSettings;