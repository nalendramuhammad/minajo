import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug:true,
        fallbackLng:'en',
        interpolation: {
            escapeValue:false,
        },
        resources:{
            en: {
                translation:{
                    desc: {
                        first :"At Perkasa Charcoal Industries, we are dedicated to providing the finest quality charcoal products, including, rice husk charcoal and coconut shell charcoal",
                    }
                }
            }
        }
    })

export default i18n;