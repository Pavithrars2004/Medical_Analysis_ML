"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";

const languages = [
  { code: "en", lang: "English", flag: "🇺🇸" },
  { code: "hi", lang: "हिंदी", flag: "🇮🇳" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLanguage =
    languages.find((lng) => lng.code === i18n.language) || languages[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-blue-200/30 dark:border-blue-700/30 text-slate-700 dark:text-slate-200 hover:shadow-md transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-40 rounded-lg shadow-xl bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-800 overflow-hidden z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {languages.map((lng) => (
              <motion.button
                key={lng.code}
                onClick={() => changeLanguage(lng.code)}
                className={`flex items-center w-full px-4 py-2.5 text-left text-sm transition-colors
                  ${
                    lng.code === i18n.language
                      ? "bg-gradient-to-r from-blue-500/10 to-teal-500/10 text-blue-600 dark:text-blue-400 font-medium"
                      : "hover:bg-slate-100 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300"
                  }`}
                whileHover={{ x: 3 }}
              >
                <span className="mr-2">{lng.flag}</span>
                {lng.lang}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
