import en from "./assets/translations/en";
import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import it from "./assets/translations/it";

const resources: Resource = {
	en: {
		translation: en,
	},
	it: {
		translation: it,
	},
};

i18n.use(initReactI18next).init({
	resources,
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});
export default i18n;
