'use client';
import { useState, useEffect } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Send,
  ArrowUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
const [t] = useTranslation();
  useEffect(() => {
    setMounted(true);

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = ["About Us", "Services", "Doctors", "Testimonials"];
  const supportLinks = [
    "Help Center",
    "Privacy Policy",
    "Terms of Service",
    "FAQ",
  ];
  const contactInfo = [
    { icon: MapPin, text: "123 Healthcare Ave, Medical City" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: Mail, text: "support@mediai.com" },
  ];
  const bottomLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="relative bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Company Info */}
          <motion.div variants={item} className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-2xl font-bold text-white">M</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                MediAI
              </span>
            </motion.div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("footerdescription")}
            </p>

            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-full bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 hover:shadow-md transition-all"
                >
                  <social.Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="text-base font-semibold mb-3 text-slate-900 dark:text-white">
                {t("footernewsletter")}
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 rounded-l-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-r-lg text-white flex items-center"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item}>
            <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="h-1.5 w-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={item}>
            <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">
              {t("footersupport")}
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href="#"
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                  >
                    <span className="h-1.5 w-1.5 bg-green-600 dark:bg-green-400 rounded-full mr-2"></span>
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={item}>
            <h3 className="text-lg font-semibold mb-6 text-slate-900 dark:text-white">
              {t("footercontact")}
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-3 text-slate-600 dark:text-slate-300"
                >
                  <div className="mt-1 p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <item.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="leading-tight">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={item}
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          className="py-6 border-t border-slate-200 dark:border-slate-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {t("footerrights")}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {bottomLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ y: -5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg shadow-blue-500/30 z-50"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
