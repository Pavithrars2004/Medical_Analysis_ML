import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LangDetector from "i18next-browser-languagedetector";

i18n
  .use(LangDetector)
  .use(initReactI18next) // Ensure this is correctly imported
  .init({
    debug: true,
    fallbackLng: "en", // Fallback language in case detection fails
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    resources: {
      en: {
        translation: {
          features: "Features",
          solutions: "Solutions",
          about: "About Us",
          contact: "Contact",
          signIn: "Sign In",
          subtitle: "AI-Powered Healthcare Platform",
          title1: "Revolutionary Healthcare",
          title2: "At Your Fingertips",
          description:
            "Experience the future of healthcare with AI-powered diagnosis and instant access to qualified medical professionals anytime.",
          checkSymptoms: "Check Symptoms",
          bookConsultation: "Book Consultation",
          patients: "Satisfied Patients",
          professionals: "Medical Professionals",
          accuracy: "Accurate Diagnosis",
          featureTitle: "Advanced Healthcare Features",
          featureSubtitle: "Cutting-Edge Technology",
          featureDescription:
            "Experience reimagined healthcare with innovative features designed for your convenience and well-being.",
          featureTitleDiagnosis: "AI Diagnosis",
          featureDescriptionDiagnosis:
            "Receive instant AI-powered medical suggestions based on your symptoms with high accuracy and personalized treatment recommendations.",
          featureTitleConsultation: "Video Consultation",
          featureDescriptionConsultation:
            "Connect with qualified doctors anytime, anywhere through high-quality video calls without leaving the comfort of your home.",
          featureTitleSupport: "24/7 Support",
          featureDescriptionSupport:
            "Get medical assistance anytime through an advanced chat system with real-time responses from our AI and medical professionals.",
          footerdescription:
            "Revolutionizing healthcare with AI-powered solutions for everyone. Making quality healthcare accessible to all.",
          footernewsletter: "Subscribe to our Newsletter",
          quickLinks: "Quick Links",
          footersupport: "Support",
          footercontact: "Contact",
          footerrights: "© 2024 MediAI. All rights reserved.",
        },
      },
      hi: {
        translation: {
          features: "सुविधाएँ",
          solutions: "समाधान",
          about: "हमारे बारे में",
          contact: "संपर्क करें",
          signIn: "साइन इन",
          subtitle: "एआई-संचालित स्वास्थ्य सेवा प्लेटफ़ॉर्म",
          title1: "क्रांतिकारी स्वास्थ्य सेवा",
          title2: "आपकी उंगलियों पर",
          description:
            "एआई-संचालित निदान और किसी भी समय योग्य चिकित्सा पेशेवरों तक तत्काल पहुंच के साथ स्वास्थ्य सेवा का भविष्य अनुभव करें।",
          checkSymptoms: "लक्षण जांचें",
          bookConsultation: "परामर्श बुक करें",
          patients: "संतुष्ट मरीज़",
          professionals: "चिकित्सा पेशेवर",
          accuracy: "सटीक निदान",
          featureTitle: "उन्नत स्वास्थ्य सुविधाएँ",
          featureSubtitle: "अत्याधुनिक प्रौद्योगिकी",
          featureDescription:
            "आपकी सुविधा और कल्याण के लिए डिज़ाइन की गई नवीन सुविधाओं के साथ पुनर्कल्पित स्वास्थ्य सेवा का अनुभव करें",
          featureTitleDiagnosis: "एआई निदान",
          featureDescriptionDiagnosis:
            "उच्च सटीकता और व्यक्तिगत उपचार सिफारिशों के साथ अपने लक्षणों के आधार पर तत्काल एआई-संचालित चिकित्सा सुझाव प्राप्त करें।",
          featureTitleConsultation: "वीडियो परामर्श",
          featureDescriptionConsultation:
            "घर के आराम को छोड़े बिना किसी भी समय, कहीं से भी योग्य डॉक्टरों के साथ उच्च गुणवत्ता वाले वीडियो कॉल के माध्यम से जुड़ें।",
          featureTitleSupport: "24/7 समर्थन",
          featureDescriptionSupport:
            "हमारे एआई और चिकित्सा पेशेवरों से वास्तविक समय प्रतिक्रियाओं के साथ उन्नत चैट प्रणाली के माध्यम से किसी भी समय चिकित्सा सहायता प्राप्त करें।",
          footerdescription:
            "सभी के लिए एआई-संचालित समाधानों के साथ स्वास्थ्य सेवा में क्रांति। सभी के लिए गुणवत्तापूर्ण स्वास्थ्य सेवा को सुलभ बनाना।",
          footernewsletter: "हमारे न्यूज़लेटर की सदस्यता लें",
          quickLinks: "त्वरित लिंक",
          footersupport: "समर्थन",
          footercontact: "संपर्क करें",
          footerrights: "© 2024 MediAI. सर्वाधिकार सुरक्षित।",
        },
      },
    },
  });

export default i18n;
