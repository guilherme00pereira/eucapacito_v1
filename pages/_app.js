import { useState } from "react";
import '../public/assets/css/global.css';
import Layout from '../src/layout';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../src/Theme';
import { AppContext } from '../src/services/context';
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [title, setTitle] = useState('')
  const renderLayout = Component.noLayout ? <Component {...pageProps} /> : <Layout><Component {...pageProps} /></Layout>
  return (
    <AppContext.Provider value={{title, setTitle}}>
      <ThemeProvider theme={Theme}>
            <Head>
                <title>Eu Capacito</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
            </Head>
            {renderLayout}
        </ThemeProvider>
    </AppContext.Provider>
  )
}

export default MyApp
