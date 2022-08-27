import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TagManager from 'react-gtm-module'

import 'swiper/css/bundle';

import './fonts.css';
import './index.css';

const tagManagerArgs = {
    gtmId: 'GTM-K77MBFD'
}

TagManager.initialize(tagManagerArgs)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);