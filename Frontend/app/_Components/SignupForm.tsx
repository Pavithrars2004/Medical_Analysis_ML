"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Mail, Lock, User, ArrowRight, CheckCircle, X } from "lucide-react";
import { motion } from "framer-motion";

const SignupForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState({
    hasLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  // Password validation
  useEffect(() => {
    setPasswordStrength({
      hasLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
    });
  }, [password]);

  // Check overall password strength
  const getPasswordStrengthScore = () => {
    const { hasLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecial } =
      passwordStrength;
    const score = [
      hasLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecial,
    ].filter(Boolean).length;

    if (score === 0) return "none";
    if (score <= 2) return "weak";
    if (score <= 4) return "moderate";
    return "strong";
  };

  const getPasswordStrengthColor = () => {
    const score = getPasswordStrengthScore();
    if (score === "none") return "bg-slate-200 dark:bg-slate-700";
    if (score === "weak") return "bg-red-500";
    if (score === "moderate") return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate password strength
    const score = getPasswordStrengthScore();
    if (score === "weak") {
      setError("Password is too weak. Please improve it.");
      setIsLoading(false);
      return;
    }

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password }),
      };

      const response = await fetch(
        "http://localhost:5001/api/users/register",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to register. Please try again.");
      }

      console.log("Account created successfully!");

      // Redirect to home page after successful signup
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      console.error("Signup error:", err);
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
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Create an account
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Join MediAI for better healthcare access
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-center gap-2"
        >
          <X className="h-5 w-5" />
          <p>{error}</p>
        </motion.div>
      )}

      <form onSubmit={handleSignup} className="space-y-5">
        <motion.div variants={itemVariants}>
          <Label
            htmlFor="name"
            className="text-slate-700 dark:text-slate-300 font-medium"
          >
            Full Name
          </Label>
          <div className="relative mt-1">
            <motion.div
              animate={
                focusedField === "name"
                  ? { color: "#3B82F6", scale: 1.1 }
                  : { color: "#94A3B8", scale: 1 }
              }
              className="absolute left-3 top-3 h-5 w-5 text-slate-400"
            >
              <User className="h-5 w-5" />
            </motion.div>
            <Input
              value={fullName}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="pl-10 py-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label
            htmlFor="signup-email"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              className="pl-10 py-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Label
            htmlFor="signup-password"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="signup-password"
              type="password"
              placeholder="Create a password"
              className="pl-10 py-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
            />
          </div>

          {/* Password strength indicator */}
          <div className="mt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Password strength:
              </span>
              <span
                className={`text-xs font-medium ${
                  getPasswordStrengthScore() === "strong"
                    ? "text-green-500"
                    : getPasswordStrengthScore() === "moderate"
                    ? "text-yellow-500"
                    : getPasswordStrengthScore() === "weak"
                    ? "text-red-500"
                    : "text-slate-400"
                }`}
              >
                {getPasswordStrengthScore() === "none"
                  ? ""
                  : getPasswordStrengthScore()}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${getPasswordStrengthColor()}`}
                initial={{ width: "0%" }}
                animate={{
                  width:
                    getPasswordStrengthScore() === "strong"
                      ? "100%"
                      : getPasswordStrengthScore() === "moderate"
                      ? "60%"
                      : getPasswordStrengthScore() === "weak"
                      ? "30%"
                      : "0%",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Password requirements */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div
              className={`text-xs flex items-center ${
                passwordStrength.hasLength ? "text-green-500" : "text-slate-500"
              }`}
            >
              <CheckCircle
                className={`h-3.5 w-3.5 mr-1 ${
                  passwordStrength.hasLength ? "opacity-100" : "opacity-40"
                }`}
              />
              At least 8 characters
            </div>
            <div
              className={`text-xs flex items-center ${
                passwordStrength.hasUpperCase
                  ? "text-green-500"
                  : "text-slate-500"
              }`}
            >
              <CheckCircle
                className={`h-3.5 w-3.5 mr-1 ${
                  passwordStrength.hasUpperCase ? "opacity-100" : "opacity-40"
                }`}
              />
              Uppercase letter
            </div>
            <div
              className={`text-xs flex items-center ${
                passwordStrength.hasLowerCase
                  ? "text-green-500"
                  : "text-slate-500"
              }`}
            >
              <CheckCircle
                className={`h-3.5 w-3.5 mr-1 ${
                  passwordStrength.hasLowerCase ? "opacity-100" : "opacity-40"
                }`}
              />
              Lowercase letter
            </div>
            <div
              className={`text-xs flex items-center ${
                passwordStrength.hasNumber ? "text-green-500" : "text-slate-500"
              }`}
            >
              <CheckCircle
                className={`h-3.5 w-3.5 mr-1 ${
                  passwordStrength.hasNumber ? "opacity-100" : "opacity-40"
                }`}
              />
              Number
            </div>
            <div
              className={`text-xs flex items-center ${
                passwordStrength.hasSpecial
                  ? "text-green-500"
                  : "text-slate-500"
              }`}
            >
              <CheckCircle
                className={`h-3.5 w-3.5 mr-1 ${
                  passwordStrength.hasSpecial ? "opacity-100" : "opacity-40"
                }`}
              />
              Special character
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center mt-6"
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
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4"
        >
          Already have an account?{" "}
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Log in
          </a>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default SignupForm;
