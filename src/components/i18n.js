// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// const resources = {
//   en: {
//     translation: {
//       // ==== Header ====
//       title: "Vendor Registration",
//       subtitle: "Join our workforce network and get connected with clients",

//       // ==== Messages ====
//       success: "Registration successful!",
//       error: "Registration failed. Please try again.",

//       // ==== Section titles ====
//       personalInfo: "Personal Information",
//       serviceInfo: "Service Information",

//       // ==== Labels ====
//       fullName: "Full Name *",
//       contact: "Contact Number *",
//       email: "Email Address",
//       address: "Address *",
//       serviceCategory: "Service Category *",
//       rateType: "Rate Type",
//       rate: "Rate (Optional)",

//       // ==== Placeholders ====
//       phName: "Enter your full name",
//       phContact: "Enter your contact number",
//       phEmail: "Enter your email address",
//       phAddress: "Enter your complete address",
//       phRate: "0.00",

//       // ==== Select options ====
//       selectCategory: "Select a category",
//       hourly: "Hourly",
//       perJob: "Per Job",

//       // ==== Buttons ====
//       submit: "Register as Vendor",
//       submitting: "Registering...",

//       // ==== Language switcher ====
//       language: "Language",
//       en: "English",
//       hi: "हिंदी",
//     },
//   },
//   hi: {
//     translation: {
//       title: "विक्रेता पंजीकरण",
//       subtitle: "हमारे कार्यबल नेटवर्क से जुड़ें और ग्राहकों से जुड़ें",

//       success: "पंजीकरण सफल रहा!",
//       error: "पंजीकरण विफल। कृपया पुनः प्रयास करें।",

//       personalInfo: "व्यक्तिगत जानकारी",
//       serviceInfo: "सेवा जानकारी",

//       fullName: "पूरा नाम *",
//       contact: "संपर्क नंबर *",
//       email: "ईमेल पता",
//       address: "पता *",
//       serviceCategory: "सेवा श्रेणी *",
//       rateType: "दर का प्रकार",
//       rate: "दर (वैकल्पिक)",

//       phName: "अपना पूरा नाम दर्ज करें",
//       phContact: "अपना संपर्क नंबर दर्ज करें",
//       phEmail: "अपना ईमेल पता दर्ज करें",
//       phAddress: "अपना पूरा पता दर्ज करें",
//       phRate: "0.00",

//       selectCategory: "एक श्रेणी चुनें",
//       hourly: "प्रति घंटा",
//       perJob: "प्रति कार्य",

//       submit: "विक्रेता के रूप में पंजीकरण करें",
//       submitting: "पंजीकरण हो रहा है...",

//       language: "भाषा",
//       en: "अंग्रेज़ी",
//       hi: "हिंदी",
//     },
//   },
// };

// i18n
//   .use(LanguageDetector)               // auto-detect browser language
//   .use(initReactI18next)
//   .init({
//     resources,
//     fallbackLng: "en",
//     interpolation: { escapeValue: false },
//   });

// export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // ==== Candidate Registration ====
      candidate_title: "Candidate Registration",
      candidate_subtitle: "Join our workforce network and find your dream job",
      company_title: "Company Registration", 
      company_subtitle: "Find skilled professionals for your business needs",

      // ==== Steps ====
      personal_info: "Personal Information",
      professional_info: "Professional Information",
      payment: "Payment",
      review: "Review",

      // ==== Personal Info Labels ====
      full_name: "Full Name *",
      mobile: "Mobile Number *",
      send_otp: "Send OTP",
      enter_otp: "Enter OTP *",
      verify: "Verify",
      village_town_city: "Village/Town/City Name *",
      landmark: "Landmark (Optional)",
      pincode: "PIN Code *",
      photo: "Photo/Selfie *",
      upload_photo: "Upload Photo",
      take_selfie: "Take Selfie",
      change_photo: "Change Photo",

      // ==== Professional Info Labels ====
      select_category: "Select Category *",
      job_location: "Preferred Job Location City *",
      enter_city: "Enter City Name *",

      // ==== Payment Labels ====
      reg_fee: "Registration Fee: ₹199",
      scan_qr: "Scan QR Code to Pay",
      bank_transfer: "Bank Transfer Details",
      account_number: "Account Number",
      bank_name: "Bank Name", 
      ifsc_code: "IFSC Code",
      account_holder: "Account Holder",
      upi_transaction_id: "UPI Transaction ID",
      uid_number: "UID Number",

      // ==== Buttons ====
      next: "Next",
      previous: "Previous", 
      submit: "Submit Registration",
      registering: "Registering...",

      // ==== Messages ====
      otp_sent: "OTP sent to your mobile number",
      otp_verified: "OTP verified successfully!",
      registration_success: "Registration submitted successfully!",

      // ==== Categories ====
      office_work: "OFFICE WORK",
      accounts: "ACCOUNTS", 
      telecalling: "TELECALLING",
      marketing_work: "MARKETING WORK",
      cook_staff: "COOK STAFF",
      plumber: "PLUMBER",
      electrician: "ELECTRICIAN",
      painter: "PAINTER",
      driver: "DRIVER",
      event_work: "EVENT WORK", 
      security_service: "SECURITY SERVICE",
      labour_work: "LABOUR WORK",
      construction_work: "CONSTRUCTION WORK",
      pandit_ji_poojan: "PANDIT JI POOJAN WORK",
      other_work: "OTHER WORK (TYPING)",

      // ==== Cities ====
      indore: "Indore",
      bhopal: "Bhopal",
      sagar: "Sagar", 
      ujjain: "Ujjain",
      other: "Other",

      // ==== Company Registration ====
      company_name: "Company Name *",
      contact_person: "Contact Person Name *",
      email: "Email Address *",
      street_address: "Street Address *",
      city: "City *",
      state: "State *",
      required_categories: "Required Categories *",
      candidate_quantity: "Candidate Quantity Needed *",
      experience_required: "Experience Required",
      years: "Years",
      months: "Months", 
      days: "Days (Optional)",
      job_location_city: "Job Location City *",
      job_location_state: "Job Location State *",
      business_document: "Business Document *",
      complete_registration: "Complete Registration",

      // ==== Language Switcher ====
      language: "Language",
      english: "English",
      hindi: "हिंदी"
    }
  },
  hi: {
    translation: {
      candidate_title: "उम्मीदवार पंजीकरण",
      candidate_subtitle: "हमारे कार्यबल नेटवर्क से जुड़ें और अपनी सपनों की नौकरी पाएं",
      company_title: "कंपनी पंजीकरण",
      company_subtitle: "अपने व्यवसाय की जरूरतों के लिए कुशल पेशेवरों को ढूंढें",

      personal_info: "व्यक्तिगत जानकारी",
      professional_info: "पेशेवर जानकारी", 
      payment: "भुगतान",
      review: "समीक्षा",

      full_name: "पूरा नाम *",
      mobile: "मोबाइल नंबर *",
      send_otp: "OTP भेजें",
      enter_otp: "OTP दर्ज करें *", 
      verify: "सत्यापित करें",
      village_town_city: "गाँव/कस्बा/शहर का नाम *",
      landmark: "लैंडमार्क (वैकल्पिक)",
      pincode: "पिन कोड *",
      photo: "फोटो/सेल्फी *",
      upload_photo: "फोटो अपलोड करें",
      take_selfie: "सेल्फी लें", 
      change_photo: "फोटो बदलें",

      select_category: "श्रेणी चुनें *",
      job_location: "पसंदीदा नौकरी का स्थान शहर *",
      enter_city: "शहर का नाम दर्ज करें *",

      reg_fee: "पंजीकरण शुल्क: ₹500",
      scan_qr: "भुगतान करने के लिए QR कोड स्कैन करें",
      bank_transfer: "बैंक ट्रांसफर विवरण",
      account_number: "खाता संख्या",
      bank_name: "बैंक का नाम",
      ifsc_code: "IFSC कोड",
      account_holder: "खाता धारक",
      upi_transaction_id: "UPI लेनदेन आईडी", 
      uid_number: "UID नंबर",

      next: "अगला",
      previous: "पिछला",
      submit: "पंजीकरण जमा करें",
      registering: "पंजीकरण हो रहा है...",

      otp_sent: "आपके मोबाइल नंबर पर OTP भेजा गया",
      otp_verified: "OTP सफलतापूर्वक सत्यापित!",
      registration_success: "पंजीकरण सफलतापूर्वक जमा किया गया!",

      office_work: "ऑफिस वर्क",
      accounts: "अकाउंट्स",
      telecalling: "टेलीकॉलिंग", 
      marketing_work: "मार्केटिंग वर्क",
      cook_staff: "कुक स्टाफ",
      plumber: "प्लम्बर",
      electrician: "इलेक्ट्रीशियन",
      painter: "पेंटर",
      driver: "ड्राइवर",
      event_work: "इवेंट वर्क",
      security_service: "सिक्योरिटी सर्विस",
      labour_work: "लेबर वर्क",
      construction_work: "कंस्ट्रक्शन वर्क", 
      pandit_ji_poojan: "पंडित जी पूजन वर्क",
      other_work: "अन्य वर्क (टाइपिंग)",

      indore: "इंदौर",
      bhopal: "भोपाल",
      sagar: "सागर",
      ujjain: "उज्जैन", 
      other: "अन्य",

      company_name: "कंपनी का नाम *",
      contact_person: "संपर्क व्यक्ति का नाम *",
      email: "ईमेल पता *",
      street_address: "स्ट्रीट एड्रेस *",
      city: "शहर *",
      state: "राज्य *", 
      required_categories: "आवश्यक श्रेणियाँ *",
      candidate_quantity: "आवश्यक उम्मीदवारों की संख्या *",
      experience_required: "आवश्यक अनुभव",
      years: "वर्ष",
      months: "महीने",
      days: "दिन (वैकल्पिक)", 
      job_location_city: "नौकरी का स्थान शहर *",
      job_location_state: "नौकरी का स्थान राज्य *",
      business_document: "व्यवसाय दस्तावेज़ *",
      complete_registration: "पंजीकरण पूरा करें",

      language: "भाषा",
      english: "अंग्रेज़ी",
      hindi: "हिंदी"
    }
  }
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: { 
      escapeValue: false 
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;