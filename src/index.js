import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import i18n from "i18next";
import {I18nextProvider, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";



i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "fr" , "ar" , "de" , "es" , "ko", "it", "ru", "tr", "pt", "hi", "zh",  "ja", "tl","bn", "id", "fa"],
    fallbackLng: "en",
    detection: {
      order: ["localStorage","htmlTag","cookie","subdomain","path"],
      caches: ["cookie"],
    },

    backend: {
      loadPath: "/localiz/{{lng}}/translation.json",
    },

    react: { useSuspense: false },
    interpolation: {
      escapeValue: false, 
    },
  });



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
    <App />
    </HashRouter>
);


