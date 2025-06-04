"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Navigation items with their routes
  const navItems = [
    { key: "features", path: "#" },
    { key: "solutions", path: "#" },
    { key: "about", path: "/AboutUs" },
    { key: "contact", path: "/ContactUs" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full backdrop-blur-md z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 shadow-lg"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
              <span className="text-2xl font-bold text-white">M</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              MediAI
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link href={item.path} key={index}>
                <motion.span
                  className="text-slate-700 dark:text-slate-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t(item.key)}
                </motion.span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </motion.button>

            <Link href="/Auth">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="default"
                  size="sm"
                  className="hidden sm:inline-flex bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-md shadow-blue-500/30 font-medium"
                >
                  {t("signIn")}
                </Button>
              </motion.div>
            </Link>

            <div>
              <LanguageSelector />
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-slate-900 shadow-lg"
        >
          <div className="px-4 py-5 space-y-4">
            {navItems.map((item, index) => (
              <Link href={item.path} key={index}>
                <motion.span
                  className="block text-slate-700 dark:text-slate-200 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  whileHover={{ x: 10 }}
                >
                  {t(item.key)}
                </motion.span>
              </Link>
            ))}
            <Link href="/Auth">
              <Button
                variant="default"
                size="sm"
                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-md"
              >
                {t("signIn")}
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
