import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ConfigProvider } from "antd";
import { AppProps } from "next/app";
import { store } from "@/store/store";
import { Provider } from "react-redux";

import "/styles/Main.scss";

const App = ({ Component, pageProps }: AppProps) => {
  //***************************
  // Import Hooks 
  //***************************
  const { locale } = useRouter();

  //***************************
  // Define State 
  //***************************

  const dir = locale === "en" ? "ltr" : "rtl";

  //***************************
  // Define useEffect 
  //***************************

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  return (
    <Provider store={store}>
      <ConfigProvider direction={dir}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <meta name="application-name" content="Avan" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Avan" />
          <meta name="description" content="Best PWA App in the world" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#E5B08A" />
          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/touch-icon-ipad.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/touch-icon-iphone-retina.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/icons/touch-icon-ipad-retina.png"
          />

          <link rel="manifest" href="/manifest.json" />
          <link
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="Avan" />
          <meta
            name="twitter:description"
            content="Best Avan in the world"
          />
          <meta name="twitter:creator" content="@DavidWShadow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Avan" />
          <meta property="og:description" content="Best Avan in the world" />
          <meta property="og:site_name" content="Avan" />
        </Head>
        <Component {...pageProps} />
      </ConfigProvider>
    </Provider>
  );
};
export default App;
