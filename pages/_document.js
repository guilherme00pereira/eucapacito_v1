import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
        <Head>
            <meta charSet="utf-8" />
            <link rel="icon" href="favicon.ico" />
            <link rel="apple-touch-icon" href="favicon.png" />
            <link rel="manifest" href="manifest.json" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
            <Script strategy='afterInteractive' dangerouslySetInnerHTML={{
                __html: "function gtag_report_conversion(url) { var callback = function () { if (typeof(url) != 'undefined') { window.open(url, '_blank'); } }; gtag('event', 'conversion', { 'send_to': 'AW-520362395/y5epCNXc2fsBEJuzkPgB', 'value': 1.0, 'currency': 'USD', 'event_callback': callback }); return false; }"
            }} />
        </Head>
      <body>
        <Main />
        <NextScript />
        <Script strategy='afterInteractive' src="https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js" />
      </body>
    </Html>
  )
}