"use client";
import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

const AuthPages = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50 mb-20">
        <Navbar />
      </div>
      <div className=" mt-20 min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-emerald-100 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-800 flex items-center justify-center p-4 overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1],
              x: [0, 10, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -top-32 -left-32 w-64 h-64 bg-blue-300 dark:bg-blue-800 rounded-full filter blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1],
              x: [0, -10, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
            className="absolute -bottom-32 -right-32 w-64 h-64 bg-green-300 dark:bg-green-800 rounded-full filter blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="backdrop-blur-sm bg-white/60 dark:bg-slate-900/60 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700"
          >
            <Tabs
              defaultValue="login"
              className="w-full"
              onValueChange={(value) => setActiveTab(value)}
            >
              <TabsList className="grid grid-cols-2 w-full mb-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-t-xl">
                <TabsTrigger
                  value="login"
                  className={`rounded-lg transition-all duration-300 ${
                    activeTab === "login"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                      : ""
                  }`}
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className={`rounded-lg transition-all duration-300 ${
                    activeTab === "signup"
                      ? "bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-md"
                      : ""
                  }`}
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <div className="p-4">
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>

                <TabsContent value="signup">
                  <SignupForm />
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPages;
