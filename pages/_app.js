import { useState } from "react";
import '../public/assets/css/global.css';
import Layout from '../src/layout';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '../src/Theme';
import { AppContext } from '../src/services/context';

function MyApp({ Component, pageProps }) {
  const [title, setTitle] = useState('')
  return (
    <AppContext.Provider value={{title, setTitle}}>
      <ThemeProvider theme={Theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
    </AppContext.Provider>
  )
}

export default MyApp
