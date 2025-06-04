"use client";
import React, { useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Handle Email-Password Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const token = await user.getIdToken(); // Get Firebase token

      console.log("✅ User logged in:", user);

      // Send token to backend for authentication
      const response = await fetch("http://localhost:5001/api/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      console.log("✅ User authenticated:", data);

      // Redirect to dashboard after successful login
      window.location.href = "/SymptomPage";
    } catch (err) {
      setError((err as Error).message);
      console.error("❌ Login error:", err);
    }

    setIsLoading(false);
  };

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const token = await user.getIdToken();

      console.log("✅ User logged in with Google:", user);

      // Send token to backend for authentication
      const response = await fetch("http://localhost:5001/api/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      console.log("✅ Google authentication successful:", data);

      // Redirect to dashboard after successful login
      window.location.href = "/dashboard";
    } catch (err) {
      setError((err as Error).message);
      console.error("❌ Google Login error:", err);
    }

    setIsLoading(false);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome Back
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Log in to your MediAI account
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-center gap-2"
        >
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <motion.div variants={itemVariants}>
          <Label
            htmlFor="email"
            className="text-slate-700 dark:text-slate-300 font-medium"
          >
            Email
          </Label>
          <div className="relative mt-1">
            <motion.div
              animate={
                focusedField === "email"
                  ? { color: "#3B82F6", scale: 1.1 }
                  : { color: "#94A3B8", scale: 1 }
              }
              className="absolute left-3 top-3 h-5 w-5 text-slate-400"
            >
              <Mail className="h-5 w-5" />
            </motion.div>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 py-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label
            htmlFor="password"
            className="text-slate-700 dark:text-slate-300 font-medium"
          >
            Password
          </Label>
          <div className="relative mt-1">
            <motion.div
              animate={
                focusedField === "password"
                  ? { color: "#3B82F6", scale: 1.1 }
                  : { color: "#94A3B8", scale: 1 }
              }
              className="absolute left-3 top-3 h-5 w-5 text-slate-400"
            >
              <Lock className="h-5 w-5" />
            </motion.div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10 py-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-end">
          <a
            href="#"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Forgot password?
          </a>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              <>
                Login
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </motion.div>
      </form>

      <motion.div variants={itemVariants} className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            Or continue with
          </span>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button
          onClick={handleGoogleLogin}
          className="w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium py-2 rounded-lg transition-all duration-300 border border-slate-300 dark:border-slate-700 shadow-sm hover:shadow flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full"
            />
          ) : (
            <>
              <FcGoogle className="h-5 w-5 mr-2" />
              Continue with Google
            </>
          )}
        </Button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="text-center text-sm text-slate-600 dark:text-slate-400"
      >
        Don&apos;t have an account?{" "}
        <a
          href="#"
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Sign up
        </a>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
