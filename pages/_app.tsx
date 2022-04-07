import "../styles/globals.css";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { AppProps } from "next/app";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { createUploadLink } from "apollo-upload-client";
import { Global } from "@emotion/react";
import { globalStyles } from "../pages/quiz-22.03.30/layout/globalStyle";
import Layout from "./quiz-22.03.30/layout";

function MyApp({ Component, pageProps }: AppProps) {
  // 아폴로에서 이렇게 맨듬 ㅠㅠ 바꾸면 작동이 안된다....
  const uploadLink = createUploadLink({
    uri: "http://backend06.codebootcamp.co.kr/graphql",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Global styles={globalStyles}></Global>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
