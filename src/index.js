import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import TagManager from 'react-gtm-module'

import 'swiper/css/bundle';

import './fonts.css';
import './index.css';

const tagManagerArgs = {
    gtmId: 'GTM-K77MBFD'
}

TagManager.initialize(tagManagerArgs)

const root = createRoot(document.getElementById('root'))
root.render(<App />);
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );