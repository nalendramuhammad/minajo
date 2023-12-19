// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: "Home",
        about: "About",
        product: "Product",
        contact: "Contact",
        // Add more translations as needed
      },
    },
    id: {
      translation: {
        home: "Beranda",
        about: "Tentang",
        product: "Produk",
        contact: "Kontak",
        // Add more translations as needed
      },
    },
    // Add more languages as needed
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
