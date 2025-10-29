import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // ==== Header ====
      title: "Vendor Registration",
      subtitle: "Join our workforce network and get connected with clients",

      // ==== Messages ====
      success: "Registration successful!",
      error: "Registration failed. Please try again.",

      // ==== Section titles ====
      personalInfo: "Personal Information",
      serviceInfo: "Service Information",

      // ==== Labels ====
      fullName: "Full Name *",
      contact: "Contact Number *",
      email: "Email Address",
      address: "Address *",
      serviceCategory: "Service Category *",
      rateType: "Rate Type",
      rate: "Rate (Optional)",

      // ==== Placeholders ====
      phName: "Enter your full name",
      phContact: "Enter your contact number",
      phEmail: "Enter your email address",
      phAddress: "Enter your complete address",
      phRate: "0.00",

      // ==== Select options ====
      selectCategory: "Select a category",
      hourly: "Hourly",
      perJob: "Per Job",

      // ==== Buttons ====
      submit: "Register as Vendor",
      submitting: "Registering...",

      // ==== Language switcher ====
      language: "Language",
      en: "English",
      hi: "हिंदी",
    },
  },
  hi: {
    translation: {
      title: "विक्रेता पंजीकरण",
      subtitle: "हमारे कार्यबल नेटवर्क से जुड़ें और ग्राहकों से जुड़ें",

      success: "पंजीकरण सफल रहा!",
      error: "पंजीकरण विफल। कृपया पुनः प्रयास करें।",

      personalInfo: "व्यक्तिगत जानकारी",
      serviceInfo: "सेवा जानकारी",

      fullName: "पूरा नाम *",
      contact: "संपर्क नंबर *",
      email: "ईमेल पता",
      address: "पता *",
      serviceCategory: "सेवा श्रेणी *",
      rateType: "दर का प्रकार",
      rate: "दर (वैकल्पिक)",

      phName: "अपना पूरा नाम दर्ज करें",
      phContact: "अपना संपर्क नंबर दर्ज करें",
      phEmail: "अपना ईमेल पता दर्ज करें",
      phAddress: "अपना पूरा पता दर्ज करें",
      phRate: "0.00",

      selectCategory: "एक श्रेणी चुनें",
      hourly: "प्रति घंटा",
      perJob: "प्रति कार्य",

      submit: "विक्रेता के रूप में पंजीकरण करें",
      submitting: "पंजीकरण हो रहा है...",

      language: "भाषा",
      en: "अंग्रेज़ी",
      hi: "हिंदी",
    },
  },
};

i18n
  .use(LanguageDetector)               // auto-detect browser language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;