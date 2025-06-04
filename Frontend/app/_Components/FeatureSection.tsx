"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "../../components/ui/card";
import {
  Brain,
  Video,
  MessageSquare,
  Clock,
  Shield,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const FeaturesSection = () => {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation(); // Correctly destructure `t` from `useTranslation`

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: t("featureTitleDiagnosis"), // Correct usage of `t`
      description: t("featureDescriptionDiagnosis"), // Correct usage of `t`
    },
    {
      icon: <Video className="h-8 w-8 text-green-600" />,
      title: t("featureTitleConsultation"), // Correct usage of `t`
      description: t("featureDescriptionConsultation"), // Correct usage of `t`
      route: "/VideoConsultationPage",
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      title: t("featureTitleSupport"), // Correct usage of `t`
      description: t("featureDescriptionSupport"), // Correct usage of `t`
    },
    // {
    //   icon: <Clock className="h-8 w-8 text-blue-600" />,
    //   title: t("featureTitleQuickPrescriptions"), // Add translation key for "Quick Prescriptions"
    //   description: t("featureDescriptionQuickPrescriptions"), // Add translation key for description
    // },
    // {
    //   icon: <Shield className="h-8 w-8 text-green-600" />,
    //   title: t("featureTitleSecureRecords"), // Add translation key for "Secure Health Records"
    //   description: t("featureDescriptionSecureRecords"), // Add translation key for description
    // },
    // {
    //   icon: <FileText className="h-8 w-8 text-purple-600" />,
    //   title: t("featureTitleHealthTracking"), // Add translation key for "Health Tracking"
    //   description: t("featureDescriptionHealthTracking"), // Add translation key for description
    // },
  ];

  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-green-500/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              mounted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-green-500/10 backdrop-blur-sm border border-blue-200/30 dark:border-blue-700/30"
          >
            <span className="text-blue-700 dark:text-blue-400 font-medium text-sm">
              {t("featureSubtitle")} {/* Use translation for subtitle */}
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            {t("featureTitle")} {/* Use translation for title */}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto text-lg">
            {t("featureDescription")} {/* Use translation for description */}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={mounted ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 h-full">
                <CardContent className="p-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex flex-col items-center text-center h-full"
                  >
                    <div className="mb-4 p-4 rounded-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 shadow-md shadow-blue-500/10">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                      {feature.description}
                    </p>
                    
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturesSection;
