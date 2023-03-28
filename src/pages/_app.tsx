import React, { ComponentType } from 'react';
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import store from "../redux/store";
import Header from './head';

const queryClient = new QueryClient();
type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: any;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Header />
        {Component.PageLayout ? (
          <Component.PageLayout>
            <Component {...pageProps} />
          </Component.PageLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
