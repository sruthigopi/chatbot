import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import { store } from './store/store.ts'
// microsoft sharepoint connection
import { MsalProvider } from "@azure/msal-react";
import {   PublicClientApplication } from "@azure/msal-browser";
import { config  } from "./config.ts";

const pca = new PublicClientApplication( config );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <MsalProvider instance={pca}>
    <Provider store={store}>
      <App />
      </Provider>
   </MsalProvider>

   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
