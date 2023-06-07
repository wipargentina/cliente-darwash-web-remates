import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GTM_ID } from '../lib/gtm';
import { FB_PIXEL_ID } from '../context/FbCapiContext';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <noscript>
            <iframe title="fbcapi" src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
          </noscript>
        </Head>
        <body>
          <noscript>
            <iframe title="gtm" src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
