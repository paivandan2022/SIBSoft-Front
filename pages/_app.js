import "antd/dist/antd.css";
import Head from "next/head";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@200;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />;
    </>
  );
};

export default MyApp;
