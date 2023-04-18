import React, { ComponentType } from 'react';
import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import store from "../redux/store";
import Header from './head';
import axios from "axios";
import { getCookie } from '../../cookies';

const token = typeof window != 'undefined' ? localStorage.getItem("token") : null;

axios.defaults.baseURL = "https://l3mshop.onrender.com";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] =
  "Bearer " + token;

axios.interceptors.request.use((config) => {
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

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
