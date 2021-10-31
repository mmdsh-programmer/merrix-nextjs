import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import "../styles/globals.css";
import RTL from "../components/RTL";
import Layout from "../components/Layout";
import Loading from "components/Loading";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>شرکت مریخ (لوتوس)</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="شرکت مریخ (لوتوس) - تولید کننده ملزومات هدیه"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <RTL>
          <CssBaseline />
          {!loading ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Loading loading={true} />
          )}
        </RTL>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
