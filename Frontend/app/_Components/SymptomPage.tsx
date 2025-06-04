// pages/symptom-checker.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";

// Type definitions
interface Symptom {
  id: string;
  name: string;
  category: string;
}

interface SelectedSymptom extends Symptom {
  duration: string;
  severity: number;
}

// New interface for prediction results
interface PredictionResult {
  prediction: string;
  confidence: number;
  medicines: string[];
  dosages: string[];
  prices_inr: string[];
}

type DurationType =
  | "< 24 hours"
  | "1-3 days"
  | "4-7 days"
  | "1-2 weeks"
  | "2-4 weeks"
  | "1+ month";

// Sample symptom data (would come from API in production)
const SYMPTOM_DATA: Symptom[] = [
  // General/Systemic Symptoms
  { id: "1", name: "Fatigue", category: "General" },
  { id: "2", name: "Fever", category: "General" },
  { id: "3", name: "Chills", category: "General" },
  { id: "4", name: "Sweating", category: "General" },
  { id: "5", name: "Weight loss", category: "General" },
  { id: "6", name: "Weight gain", category: "General" },
  { id: "7", name: "Night sweats", category: "General" },
  { id: "8", name: "Rapid heartbeat", category: "General" },
  { id: "9", name: "High blood pressure", category: "General" },
  { id: "10", name: "High cholesterol", category: "General" },
  { id: "11", name: "Excess body weight", category: "General" },
  { id: "12", name: "Pale skin", category: "General" },
  { id: "13", name: "Jaundice (yellowing of skin/eyes)", category: "General" },
  { id: "14", name: "Dark urine", category: "General" },

  // Head/Neurological Symptoms
  { id: "15", name: "Headache", category: "Neurological" },
  { id: "16", name: "Dizziness", category: "Neurological" },
  { id: "17", name: "Blurred vision", category: "Neurological" },
  { id: "18", name: "Sensitivity to light", category: "Neurological" },
  { id: "19", name: "Memory loss", category: "Neurological" },
  { id: "20", name: "Confusion", category: "Neurological" },
  { id: "21", name: "Difficulty in thinking", category: "Neurological" },
  { id: "22", name: "Seizures", category: "Neurological" },
  { id: "23", name: "Temporary unconsciousness", category: "Neurological" },
  { id: "24", name: "Tremors", category: "Neurological" },
  { id: "25", name: "Slow movement", category: "Neurological" },
  { id: "26", name: "Balance issues", category: "Neurological" },
  { id: "27", name: "Hallucinations", category: "Neurological" },
  { id: "28", name: "Delusions", category: "Neurological" },
  { id: "29", name: "Disorganized speech", category: "Neurological" },

  // Respiratory Symptoms
  { id: "30", name: "Shortness of breath", category: "Respiratory" },
  { id: "31", name: "Wheezing", category: "Respiratory" },
  { id: "32", name: "Chest tightness", category: "Respiratory" },
  { id: "33", name: "Cough (with or without mucus)", category: "Respiratory" },
  { id: "34", name: "Nasal congestion", category: "Respiratory" },
  { id: "35", name: "Runny nose", category: "Respiratory" },
  { id: "36", name: "Sneezing", category: "Respiratory" },
  { id: "37", name: "Sore throat", category: "Respiratory" },
  { id: "38", name: "Loss of taste/smell", category: "Respiratory" },
  { id: "39", name: "Ear pain", category: "Respiratory" },
  { id: "40", name: "Hearing loss", category: "Respiratory" },
  { id: "41", name: "Fluid drainage from ear", category: "Respiratory" },

  // Digestive/Abdominal Symptoms
  { id: "42", name: "Nausea", category: "Digestive" },
  { id: "43", name: "Vomiting", category: "Digestive" },
  { id: "44", name: "Abdominal pain", category: "Digestive" },
  { id: "45", name: "Stomach pain", category: "Digestive" },
  { id: "46", name: "Bloating", category: "Digestive" },
  { id: "47", name: "Burning stomach pain", category: "Digestive" },
  { id: "48", name: "Loss of appetite", category: "Digestive" },
  { id: "49", name: "Diarrhea", category: "Digestive" },
  { id: "50", name: "Constipation", category: "Digestive" },
  { id: "51", name: "Painful urination", category: "Digestive" },
  { id: "52", name: "Discharge", category: "Digestive" },
  { id: "53", name: "Dark urine", category: "Digestive" },

  // Musculoskeletal Symptoms
  { id: "54", name: "Joint pain", category: "Musculoskeletal" },
  { id: "55", name: "Joint stiffness", category: "Musculoskeletal" },
  { id: "56", name: "Joint swelling", category: "Musculoskeletal" },
  { id: "57", name: "Muscle aches", category: "Musculoskeletal" },
  { id: "58", name: "Generalized pain", category: "Musculoskeletal" },
  { id: "59", name: "Facial pain", category: "Musculoskeletal" },

  // Skin/Allergic Symptoms
  { id: "60", name: "Rash", category: "Dermatological" },
  { id: "61", name: "Itching", category: "Dermatological" },
  { id: "62", name: "Red eyes", category: "Dermatological" },
  { id: "63", name: "Eye discharge", category: "Dermatological" },
  { id: "64", name: "Scaly skin patches", category: "Dermatological" },
  { id: "65", name: "Dry/cracked skin", category: "Dermatological" },
  { id: "66", name: "Sores", category: "Dermatological" },
  { id: "67", name: "Swelling (edema)", category: "Dermatological" },

  // Cardiovascular Symptoms
  { id: "68", name: "Chest pain", category: "Cardiovascular" },
  {
    id: "69",
    name: "Palpitations (rapid heartbeat)",
    category: "Cardiovascular",
  },
  { id: "70", name: "High blood pressure", category: "Cardiovascular" },

  // Urinary/Reproductive Symptoms
  { id: "71", name: "Frequent urination", category: "Urinary" },
  { id: "72", name: "Painful urination", category: "Urinary" },
  { id: "73", name: "Discharge", category: "Urinary" },
  { id: "74", name: "Swelling (genital)", category: "Urinary" },
  { id: "75", name: "Lower abdominal pain", category: "Urinary" },

  // Psychological/Mental Health Symptoms
  { id: "76", name: "Persistent sadness", category: "Psychological" },
  { id: "77", name: "Lack of energy", category: "Psychological" },
  { id: "78", name: "Sleep issues", category: "Psychological" },
  { id: "79", name: "Excessive worry", category: "Psychological" },
  { id: "80", name: "Restlessness", category: "Psychological" },
  { id: "81", name: "Anxiety", category: "Psychological" },

  // Eye-Related Symptoms
  { id: "82", name: "Blurred vision", category: "Eye" },
  { id: "83", name: "Eye pain", category: "Eye" },
  { id: "84", name: "Red eyes", category: "Eye" },
  { id: "85", name: "Itching eyes", category: "Eye" },
  { id: "86", name: "Discharge from eyes", category: "Eye" },

  // ENT (Ear, Nose, Throat) Symptoms
  { id: "87", name: "Sore throat", category: "ENT" },
  { id: "88", name: "Ear pain", category: "ENT" },
  { id: "89", name: "Hearing loss", category: "ENT" },
  { id: "90", name: "Nasal congestion", category: "ENT" },
  { id: "91", name: "Runny nose", category: "ENT" },
  { id: "92", name: "Sneezing", category: "ENT" },
  { id: "93", name: "Loss of taste/smell", category: "ENT" },

  // Infectious/Disease-Specific Clusters
  {
    id: "94",
    name: "Cough + fever + shortness of breath",
    category: "Infectious",
  },
  { id: "95", name: "Fever + joint pain + rash", category: "Infectious" },
  {
    id: "96",
    name: "Night sweats + weight loss + fever",
    category: "Infectious",
  },
];

const DURATION_OPTIONS: DurationType[] = [
  "< 24 hours",
  "1-3 days",
  "4-7 days",
  "1-2 weeks",
  "2-4 weeks",
  "1+ month",
];

// Symptom category icons
const CATEGORY_ICONS: Record<string, JSX.Element> = {
  Neurological: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24"></path>
      <path d="M21 12a9 9 0 0 0-9-9"></path>
      <path d="M12 7v5l3 3"></path>
    </svg>
  ),
  Respiratory: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22a9 9 0 0 0 9-9h-3a6 6 0 0 1-6 6v3Z"></path>
      <path d="M12 22a9 9 0 0 1-9-9h3a6 6 0 0 0 6 6v3Z"></path>
      <path d="M12 2a9 9 0 0 1 9 9h-3a6 6 0 0 0-6-6V2Z"></path>
      <path d="M12 2a9 9 0 0 0-9 9h3a6 6 0 0 1 6-6V2Z"></path>
    </svg>
  ),
  Cardiovascular: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    </svg>
  ),
  Digestive: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 11c0-5-6-9-6-9s-6 4-6 9a6 6 0 0 0 12 0Z"></path>
      <path d="M6 11c0 4 3.49 8 6 8 1.35 0 2.58-.5 3.59-1.24a6.2 6.2 0 0 0 2.41-4.76"></path>
    </svg>
  ),
  Musculoskeletal: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 6.5h11"></path>
      <path d="m21 21-1-1"></path>
      <path d="m3 3 1 1"></path>
      <path d="m18 22-6-6"></path>
      <path d="m6 10-4-4"></path>
      <path d="m10 18-8 3 3-8"></path>
      <path d="m14 6 8-3-3 8"></path>
    </svg>
  ),
  Dermatological: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m8 14 1.5-1.5"></path>
      <path d="M10.5 16.5 12 15"></path>
      <path d="M10 11c-.5-1-1.5-2-2.5-2"></path>
      <path d="M14 6.5c1 .5 2 1.5 2 2.5"></path>
      <path d="M8.5 10.5c-.5.5-1.5 1-2 1"></path>
      <path d="M11.5 17.5c.5.5 2 .5 2.5 0"></path>
      <path d="M16 12c0 .5-.5 1.5-1 2"></path>
      <path d="M15.5 8.5c.5.5 1 2 .5 3"></path>
    </svg>
  ),
  General: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
      <path d="M12 3v6"></path>
    </svg>
  ),
};

// Group symptoms by category
const groupSymptomsByCategory = (symptoms: Symptom[]) => {
  const grouped: Record<string, Symptom[]> = {};

  symptoms.forEach((symptom) => {
    if (!grouped[symptom.category]) {
      grouped[symptom.category] = [];
    }
    grouped[symptom.category].push(symptom);
  });

  return grouped;
};

const SymptomPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<SelectedSymptom[]>(
    []
  );
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [currentSymptom, setCurrentSymptom] = useState<Symptom | null>(null);
  const [currentDuration, setCurrentDuration] =
    useState<DurationType>("1-3 days");
  const [currentSeverity, setCurrentSeverity] = useState<number>(5);
  const [durationDropdownOpen, setDurationDropdownOpen] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionMessage, setSubmissionMessage] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(1);
  const [predictionResult, setPredictionResult] =
    useState<PredictionResult | null>(null);
  const [apiError, setApiError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize first category as expanded
  useEffect(() => {
    if (
      Object.keys(expandedCategories).length === 0 &&
      SYMPTOM_DATA.length > 0
    ) {
      const categories = [...new Set(SYMPTOM_DATA.map((s) => s.category))];
      if (categories.length > 0) {
        setExpandedCategories({ [categories[0]]: true });
      }
    }

    // Focus search input on mount
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Filter symptoms based on search term
  const filteredSymptoms = SYMPTOM_DATA.filter((symptom) =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered symptoms by category
  const groupedSymptoms = groupSymptomsByCategory(filteredSymptoms);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDurationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Select/deselect symptom
  const toggleSymptom = (symptom: Symptom) => {
    const isSelected = selectedSymptoms.some((s) => s.id === symptom.id);

    if (isSelected) {
      setSelectedSymptoms((prev) => prev.filter((s) => s.id !== symptom.id));
    } else {
      if (selectedSymptoms.length < 4) {
        setCurrentSymptom(symptom);
      }
    }
  };

  // Add symptom with duration and severity
  const addSymptomWithDetails = () => {
    if (currentSymptom) {
      const symptomWithDetails: SelectedSymptom = {
        ...currentSymptom,
        duration: currentDuration,
        severity: currentSeverity,
      };

      setSelectedSymptoms((prev) => [...prev, symptomWithDetails]);
      setCurrentSymptom(null);
      setCurrentSeverity(5);
    }
  };

  // Move to review and analysis step
  const moveToReview = () => {
    if (selectedSymptoms.length > 0) {
      setActiveStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSubmissionMessage("Please select at least one symptom");
      setTimeout(() => setSubmissionMessage(""), 3000);
    }
  };

  // Convert selected symptoms to the format expected by the API
  const formatSymptomsForApi = (symptoms: SelectedSymptom[]): string => {
    return symptoms.map((symptom) => symptom.name).join(", ");
  };

  // Handle submission with actual API call
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionMessage("");
    setApiError("");
    setPredictionResult(null);
    setLoading(true);

    try {
      const payload = {
        symptom_text: formatSymptomsForApi(selectedSymptoms),
      };

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setPredictionResult(data);
      setSubmissionMessage("Analysis complete!");
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setApiError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setSubmissionMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  // Render severity label based on value
  const getSeverityLabel = (value: number): string => {
    if (value <= 3) return "Mild";
    if (value <= 6) return "Moderate";
    return "Severe";
  };

  // Get severity color class based on value
  const getSeverityColorClass = (value: number): string => {
    if (value <= 3) return "from-green-500 to-green-400";
    if (value <= 6) return "from-yellow-500 to-yellow-400";
    return "from-red-500 to-red-400";
  };

  // Get progress percentage for progress bar
  const getProgressPercentage = (): number => {
    return activeStep === 1
      ? Math.min(25 + selectedSymptoms.length * 15, 95)
      : isSubmitting
      ? 98
      : 95;
  };

  return (
    <>
      <Head>
        <title>Medi AI | Symptom Checker</title>
        <meta name="description" content="Check your symptoms with Medi AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header with Logo and Progress Bar */}
          <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-400 p-2 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 12h6"></path>
                    <path d="M8 12H2"></path>
                    <path d="M12 6v12"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
                    Medi AI
                  </h1>
                  <p className="text-gray-600">Advanced Symptom Checker</p>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span
                    className={`${
                      activeStep >= 1 ? "text-teal-600 font-medium" : ""
                    }`}
                  >
                    Symptoms
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                  <span
                    className={`${
                      activeStep >= 2 ? "text-teal-600 font-medium" : ""
                    }`}
                  >
                    Review
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                  <span
                    className={`${
                      isSubmitting ? "text-teal-600 font-medium" : ""
                    }`}
                  >
                    Analysis
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
                initial={{ width: "20%" }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>

            {/* Step Title */}
            <motion.h2
              className="text-2xl font-bold text-gray-800"
              key={`step-title-${activeStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeStep === 1
                ? "Tell us about your symptoms"
                : "Review and analyze symptoms"}
            </motion.h2>
            <motion.p
              className="text-gray-600"
              key={`step-desc-${activeStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {activeStep === 1
                ? "Select up to 4 symptoms you're experiencing for an AI-powered health assessment"
                : "Verify your symptom information before receiving an AI analysis"}
            </motion.p>
          </header>

          <AnimatePresence mode="wait">
            {activeStep === 1 ? (
              <motion.div
                key="symptom-selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Symptom Search & Selection */}
                <div className="border-b border-gray-100">
                  <div className="p-6">
                    <div className="relative mb-6">
                      <div className="absolute left-4 top-3.5 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search symptoms..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      {searchTerm && (
                        <button
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          onClick={() => setSearchTerm("")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600">
                          Selected symptoms:{" "}
                          <span className="font-medium">
                            {selectedSymptoms.length}/4
                          </span>
                        </p>

                        {selectedSymptoms.length > 0 && (
                          <button
                            className="text-sm text-teal-600 hover:text-teal-800 transition-colors"
                            onClick={() => setSelectedSymptoms([])}
                          >
                            Clear all
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 min-h-12">
                        <AnimatePresence>
                          {selectedSymptoms.map((symptom) => (
                            <motion.div
                              key={symptom.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-sm shadow-sm"
                            >
                              <span>{symptom.name}</span>
                              <button
                                onClick={() => toggleSymptom(symptom)}
                                className="ml-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-0.5 transition-colors"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Symptom Categories */}
                <div className="max-h-96 overflow-y-auto">
                  {Object.keys(groupedSymptoms).length > 0 ? (
                    Object.entries(groupedSymptoms).map(
                      ([category, symptoms]) => (
                        <div
                          key={category}
                          className="border-b border-gray-100 last:border-b-0"
                        >
                          <button
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                            onClick={() => toggleCategory(category)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-teal-100 text-teal-600">
                                {CATEGORY_ICONS[category] || (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 16v-4"></path>
                                    <path d="M12 8h.01"></path>
                                  </svg>
                                )}
                              </div>
                              <div>
                                <span className="font-medium text-gray-800">
                                  {category}
                                </span>
                                <p className="text-xs text-gray-500">
                                  {symptoms.length} symptoms
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500 mr-2">
                                {expandedCategories[category] ? "Hide" : "Show"}
                              </span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 text-gray-400 transform transition-transform ${
                                  expandedCategories[category]
                                    ? "rotate-180"
                                    : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </button>

                          <AnimatePresence>
                            {expandedCategories[category] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 py-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {symptoms.map((symptom) => {
                                    const isSelected = selectedSymptoms.some(
                                      (s) => s.id === symptom.id
                                    );
                                    const isDisabled =
                                      !isSelected &&
                                      selectedSymptoms.length >= 4;

                                    return (
                                      <div
                                        key={symptom.id}
                                        className={`flex items-center p-2 rounded-lg border ${
                                          isSelected
                                            ? "border-teal-500 bg-teal-50"
                                            : isDisabled
                                            ? "border-gray-200 bg-gray-50 opacity-60"
                                            : "border-gray-200 hover:border-teal-200 hover:bg-teal-50"
                                        } cursor-pointer transition-all`}
                                        onClick={() =>
                                          !isDisabled && toggleSymptom(symptom)
                                        }
                                      >
                                        <div
                                          className={`w-5 h-5 flex-shrink-0 rounded-md border ${
                                            isSelected
                                              ? "bg-teal-500 border-teal-500"
                                              : "border-gray-300"
                                          } flex items-center justify-center mr-3`}
                                        >
                                          {isSelected && (
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-3 w-3 text-white"
                                              viewBox="0 0 20 20"
                                              fill="currentColor"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          )}
                                        </div>
                                        <label
                                          className={`flex-grow ${
                                            isDisabled
                                              ? "text-gray-400"
                                              : "text-gray-700"
                                          }`}
                                        >
                                          {symptom.name}
                                        </label>
                                        {isSelected && (
                                          <div className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                                            Added
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <path d="M12 17h.01"></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No symptoms found
                      </h3>
                      <p className="text-gray-500">
                        Try searching with different terms or browse categories
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${
                        selectedSymptoms.length === 0
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md hover:shadow-lg hover:from-teal-600 hover:to-cyan-600"
                      }`}
                      onClick={moveToReview}
                      disabled={selectedSymptoms.length === 0}
                    >
                      Continue to Review
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline-block ml-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>
                  </div>

                  {submissionMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-center text-red-600 text-sm"
                    >
                      {submissionMessage}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : predictionResult ? (
              // Display results if we have them
              <motion.div
                key="prediction-results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Results Section */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    AI Health Assessment Results
                  </h3>

                  <div className="mb-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect
                              x="8"
                              y="2"
                              width="8"
                              height="4"
                              rx="1"
                              ry="1"
                            ></rect>
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            Possible Condition
                          </h4>
                          <div className="flex items-center">
                            <span className="text-xl font-bold text-blue-800">
                              {predictionResult.prediction}
                            </span>
                            <span className="ml-3 bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {(predictionResult.confidence * 100).toFixed(1)}%
                              confidence
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">
                        Based on your symptoms:{" "}
                        <strong>
                          {formatSymptomsForApi(selectedSymptoms)}
                        </strong>
                      </p>

                      <div className="text-xs text-blue-700">
                        <strong>Note:</strong> This is an AI-generated
                        assessment and should not replace professional medical
                        advice.
                      </div>
                    </div>
                  </div>

                  {/* Medications Section */}
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-800 mb-3">
                      Recommended Medications
                    </h4>

                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Medication
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Dosage
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Price (INR)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {predictionResult.medicines.map((medicine, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {medicine}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {predictionResult.dosages[index]}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ₹{predictionResult.prices_inr[index]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-xl"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-1">
                          Important Medical Disclaimer
                        </h4>
                        <p className="text-sm text-yellow-700">
                          This assessment is for informational purposes only.
                          The medications listed above may not be suitable for
                          your specific condition. Always consult with a
                          healthcare professional before taking any medication.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
                    <button
                      type="button"
                      className="flex items-center justify-center text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={() => {
                        setActiveStep(1);
                        setPredictionResult(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m15 18-6-6 6-6"></path>
                      </svg>
                      Start New Assessment
                    </button>

                    <button
                      type="button"
                      className="px-6 py-3 rounded-xl font-medium transition-all bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:shadow-lg hover:from-blue-600 hover:to-cyan-600"
                    >
                      Find a Doctor
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Review UI (original code)
              <motion.div
                key="symptom-review"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Review Section */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Symptom Summary
                  </h3>

                  <div className="space-y-4">
                    {selectedSymptoms.map((symptom, index) => (
                      <motion.div
                        key={symptom.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 border border-gray-100 rounded-xl shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                              {CATEGORY_ICONS[symptom.category] || (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-teal-600"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <path d="M12 16v-4"></path>
                                  <path d="M12 8h.01"></path>
                                </svg>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {symptom.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {symptom.category}
                              </p>
                            </div>
                          </div>
                          <button
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            onClick={() => {
                              setSelectedSymptoms((prev) =>
                                prev.filter((s) => s.id !== symptom.id)
                              );
                              if (selectedSymptoms.length === 1) {
                                setActiveStep(1);
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6 6 18"></path>
                              <path d="m6 6 12 12"></path>
                            </svg>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-blue-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 8v4l3 3"></path>
                                <circle cx="12" cy="12" r="10"></circle>
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Duration</p>
                              <p className="font-medium text-gray-800">
                                {symptom.duration}
                              </p>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Severity: {symptom.severity}/10
                            </p>
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${getSeverityColorClass(
                                  symptom.severity
                                )}`}
                                style={{
                                  width: `${(symptom.severity / 10) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <p className="text-xs text-right mt-1 font-medium text-gray-600">
                              {getSeverityLabel(symptom.severity)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Error message if API call failed */}
                  {apiError && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-red-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-red-800 mb-1">
                            Error Connecting to Server
                          </h4>
                          <p className="text-sm text-red-700">
                            {apiError}. Please try again later or contact
                            support.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Medical Disclaimer */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="M12 16v-4"></path>
                          <path d="M12 8h.01"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">
                          Medical Disclaimer
                        </h4>
                        <p className="text-sm text-blue-700">
                          This assessment is for informational purposes only and
                          doesn't replace medical advice. Please consult a
                          healthcare professional for diagnosis and treatment.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
                    <button
                      type="button"
                      className="flex items-center justify-center text-teal-600 hover:text-teal-800 transition-colors"
                      onClick={() => setActiveStep(1)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m15 18-6-6 6-6"></path>
                      </svg>
                      Back to Symptoms
                    </button>

                    <button
                      type="button"
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${
                        isSubmitting || loading
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md hover:shadow-lg hover:from-teal-600 hover:to-cyan-600"
                      }`}
                      onClick={handleSubmit}
                      disabled={isSubmitting || loading}
                    >
                      {isSubmitting || loading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Analyzing Symptoms...
                        </span>
                      ) : (
                        "Get AI Health Assessment"
                      )}
                    </button>
                  </div>

                  {submissionMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-center text-teal-600 text-sm"
                    >
                      {submissionMessage}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-5 border-l-4 border-cyan-500 flex items-center">
              <div className="mr-4 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-cyan-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-2c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"></path>
                    <path d="M18 18h-2c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1Z"></path>
                    <path d="M18 10h-2c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1Z"></path>
                    <path d="M8 2H6c-.6 0-1 .4-1 1v10c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"></path>
                    <path d="M8 14H6c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1Z"></path>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Need assistance?
                </h3>
                <p className="text-sm text-gray-600">
                  Our health assistants are available 24/7 to help you with any
                  questions about your symptoms.
                </p>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-cyan-500 text-sm font-medium rounded-lg text-cyan-700 bg-white hover:bg-cyan-50 transition-colors"
                >
                  Chat with assistant
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Symptom Details Modal */}
      <AnimatePresence>
        {currentSymptom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                    {CATEGORY_ICONS[currentSymptom.category] || (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-teal-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {currentSymptom.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {currentSymptom.category}
                    </p>
                  </div>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setCurrentSymptom(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Duration Selection */}
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2">
                  Duration of symptom
                </label>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    onClick={() =>
                      setDurationDropdownOpen(!durationDropdownOpen)
                    }
                  >
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-teal-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{currentDuration}</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        durationDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {durationDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                      >
                        {DURATION_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            className={`flex items-center w-full text-left px-4 py-3 hover:bg-teal-50 transition-colors ${
                              currentDuration === option
                                ? "bg-teal-100 text-teal-800"
                                : "text-gray-700"
                            }`}
                            onClick={() => {
                              setCurrentDuration(option);
                              setDurationDropdownOpen(false);
                            }}
                          >
                            {currentDuration === option && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2 text-teal-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            <span
                              className={`${
                                currentDuration === option ? "font-medium" : ""
                              }`}
                            >
                              {option}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Severity Slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-gray-700 font-medium">
                    Severity level
                  </label>
                  <span className="text-lg font-semibold bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">
                    {currentSeverity}/10
                  </span>
                </div>
                <div className="mb-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentSeverity}
                    onChange={(e) =>
                      setCurrentSeverity(parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #14b8a6 0%, #14b8a6 ${
                        currentSeverity * 10
                      }%, #e5e7eb ${currentSeverity * 10}%, #e5e7eb 100%)`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
                <div className="flex items-center justify-center">
                  <div
                    className={`py-2 px-4 rounded-full text-white text-sm font-medium ${
                      currentSeverity <= 3
                        ? "bg-green-500"
                        : currentSeverity <= 6
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {getSeverityLabel(currentSeverity)}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setCurrentSymptom(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-colors shadow-md"
                  onClick={addSymptomWithDetails}
                >
                  Add Symptom
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SymptomPage;
