import { AppProps } from "next/app";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Layout from "./quiz-22.03.30/layout";
import { Global } from "@emotion/react";
import { globalStyles } from "../pages/quiz-22.03.30/layout/globalStyle";
import { RecoilRoot } from "recoil";
import ApolloSetting from "./quiz-22.04.13/01/apollo";
// import ApolloSetting from "./quiz-22.04.13/apollo";
// import ApolloSetting from "./quiz-22.04.12/apollo";

// import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <Global styles={globalStyles}></Global>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloSetting>
    </RecoilRoot>
  );
}

export default MyApp;
