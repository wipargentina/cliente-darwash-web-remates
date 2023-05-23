import Layout from 'layout';

import '@styles/app.scss';

import moment from 'moment';
import locale from 'moment/locale/es';
moment.updateLocale('es', locale);

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
