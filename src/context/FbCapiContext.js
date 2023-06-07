import { createContext, useContext, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { hasCookie, getCookie } from 'cookies-next';

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

const FbCapiContext = createContext();

// Provider
export const FbCapiProvider = (props) => {
  const fbTestEvent = process.env.NEXT_PUBLIC_FB_APP_ENV == 'localhost' || process.env.NEXT_PUBLIC_FB_APP_ENV == 'develop' ? true : false;

  // Definir si disparar - contabilizar Scroll en cada pagina en particular
  // (No por defecto)
  const [triggerScroll, setTriggerScroll] = useState(false);

  // Disparar scroll
  const [scroll, setScroll] = useState(false);

  const router = useRouter();

  async function fbTracking(fbqName, eventName) {
    const eventTime = Math.round(Date.now() / 1000);
    const eventID = `${eventName}-${eventTime}`;

    const eventBrowser = {
      eventID: eventID,
      event: eventName,
    };

    const eventServer = {
      action_source: 'website',
      event_name: eventName,
      event_time: eventTime,
      event_id: eventID,
      user_data: {},
      custom_data: {},
    };

    // Fb Browser ID
    hasCookie('_fbp') ?? ((eventServer.user_data.fbp = getCookie('_fbp')), (eventBrowser.fbp = getCookie('_fbp')));

    // Fb Click ID
    hasCookie('_fbc') ?? ((eventServer.user_data.fbc = getCookie('_fbc')), (eventBrowser.fbc = getCookie('_fbc')));

    /* eslint-disable-next-line no-undef */
    fbq(fbqName, eventName, {}, eventBrowser);

    return fetch('api/fb-capi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventServer),
    })
      .then((response) => response.json())
      .then((response) => {
        fbTestEvent && console.log('response ', response);
      })
      .catch((error) => {
        fbTestEvent && console.log('error ', error);
      });
  }

  // Page view
  const fbPageView = () => {
    const fbqName = 'track';
    const eventName = 'PageView';

    fbTracking(fbqName, eventName);
  };

  // Scroll vertical
  const fbScrollDown = () => {
    const fbqName = 'trackCustom';
    const eventName = 'ScrollDown';

    fbTracking(fbqName, eventName);
  };

  // ------------------------------------
  // Hooks ------------------------------
  // ------------------------------------

  // Eventos a disparar una vez por pagina cargada
  useEffect(() => {
    fbPageView();

    const handleRouteChange = () => {
      fbPageView();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Scroll: una vez por pagina
  useEffect(() => {
    const handleScroll = () => {
      if (!scroll && triggerScroll) {
        const scrollValuePercent = 100;

        // alto total del documento en px
        const totalHeigth = Math.trunc(document.body.scrollHeight * (scrollValuePercent / 100));

        // alto porcion pagina visible en ventana
        const windowHeigth = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // Desplazamiento total vertical: porcion visible +  desplazamiento parcial
        let totalScroll = windowHeigth + window.pageYOffset;

        if (totalScroll >= totalHeigth) {
          setScroll(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    scroll && fbScrollDown();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scroll, triggerScroll]);

  // ------------------------------------
  // END Hooks --------------------------
  // ------------------------------------

  const value = { FB_PIXEL_ID, setTriggerScroll, fbTracking };

  return <FbCapiContext.Provider value={value} {...props} />;
};

//Consumer
export function useFbCapi() {
  const context = useContext(FbCapiContext);
  if (!context) {
    throw new Error('useFbCapi debe encontrarse definido dentro de un contexto');
  }
  return context;
}
