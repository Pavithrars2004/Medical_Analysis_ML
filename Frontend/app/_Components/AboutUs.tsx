"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { Button } from "../../components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  Brain,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle,
  Users,
  Stethoscope,
} from "lucide-react";

// Define team member type
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

const AboutUs = () => {
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  // Ensure components only render client-side to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants for Framer Motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Team members data
  const teamMembers: TeamMember[] = [
    {
      name: "Dr. Vansh Mehta",
      role: "Chief Medical Officer",
      bio: "Board-certified physician with expertise in AI-driven healthcare solutions.",
      image: "/microsoft.jpg",
      socials: {
        linkedin: "https://linkedin.com",
        email: "vansh@mediai.com",
      },
    },
    {
      name: "Dr. Avantika Sharma",
      role: "AI Research Lead",
      bio: "Former DeepMind researcher specializing in healthcare ML models.",
      image: "/avantika.png",
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        email: "alex@mediai.com",
      },
    },
    {
      name: "Dr. Arjun Agarwal",
      role: "Product Design Director",
      bio: "Passionate about creating accessible healthcare interfaces.",
      image: "/arjun.png",
      socials: {
        linkedin: "https://linkedin.com",
        email: "maya@mediai.com",
      },
    },
    {
      name: "Dr. Vanshita Khadelwal",
      role: "Medical Ethics Advisor",
      bio: "Specializes in ethical implications of AI in healthcare.",
      image: "/bareilly.png",
      socials: {
        linkedin: "https://linkedin.com",
        email: "james@mediai.com",
      },
    },
  ];

  // Timeline/journey events
  const journeyEvents = [
    {
      year: "2020",
      title: "The Idea",
      description:
        "MediAI was born from a vision to make quality healthcare accessible to everyone, regardless of location.",
    },
    {
      year: "2021",
      title: "Research & Development",
      description:
        "Our team of medical and AI experts began developing our proprietary diagnostic algorithms.",
    },
    {
      year: "2022",
      title: "Beta Launch",
      description:
        "We launched our beta platform to select healthcare partners and received valuable feedback.",
    },
    {
      year: "2023",
      title: "Global Expansion",
      description:
        "MediAI expanded to serve patients across 15 countries with support for 8 languages.",
    },
    {
      year: "2024",
      title: "Recognition & Growth",
      description:
        "Recognized as one of the top healthcare innovations, serving over 1 million patients worldwide.",
    },
  ];

  if (!mounted) {
    return null; // Prevent rendering until client-side
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-green-500/10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="space-y-6"
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white"
                variants={fadeIn}
              >
                Revolutionizing Healthcare with AI
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300"
                variants={fadeIn}
              >
                Making quality healthcare accessible to everyone, everywhere
                through the power of artificial intelligence and human
                expertise.
              </motion.p>

              <motion.div variants={fadeIn} className="inline-block">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Healthcare professionals using MediAI"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-10 -left-10 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-5 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Patients Helped
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      1M+
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center transform transition-transform hover:scale-105">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              20K+
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Daily Active Users
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center transform transition-transform hover:scale-105">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              500+
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Healthcare Providers
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center transform transition-transform hover:scale-105">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              98%
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Diagnostic Accuracy
            </p>
          </div>
        </motion.div>
      </section> */}

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission & Vision
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              Leveraging the latest advancements in artificial intelligence to
              transform how healthcare is delivered and experienced.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.1 },
                },
              }}
            >
              <Card className="h-full border-none shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-950">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Trust & Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    We prioritize patient safety, data privacy, and
                    evidence-based healthcare above all else. Our AI models
                    undergo rigorous testing and validation by medical
                    professionals.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.2 },
                },
              }}
            >
              <Card className="h-full border-none shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-emerald-950">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Accessibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Healthcare should be available to everyone. We're breaking
                    down barriers of distance, cost, and language to make
                    quality medical care universally accessible.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.3 },
                },
              }}
            >
              <Card className="h-full border-none shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-950">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>AI For Good</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Technology should enhance, not replace, human care. Our AI
                    is designed to augment the capabilities of healthcare
                    providers while maintaining the human touch in medicine.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              From an ambitious idea to a global healthcare platform, follow our
              path of innovation and growth.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

            {journeyEvents.map((event, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.2 },
                  },
                }}
                className={`flex flex-col md:flex-row items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="md:w-1/2 mb-6 md:mb-0 flex md:justify-end px-4">
                  {index % 2 === 0 ? (
                    <div className="md:text-right">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  ) : (
                    <div className="h-0 md:h-auto"></div>
                  )}
                </div>

                <div className="md:mx-auto relative z-10">
                  <div className="h-10 w-10 rounded-full border-4 border-white dark:border-gray-800 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                </div>

                <div className="md:w-1/2 px-4">
                  {index % 2 !== 0 ? (
                    <div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  ) : (
                    <div className="h-0 md:h-auto"></div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              The passionate individuals behind MediAI who are dedicated to
              transforming healthcare through technology.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.1 },
                  },
                }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-6">
                  <Avatar className="w-40 h-40 border-4 border-white dark:border-gray-700 shadow-lg">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 mb-2 text-center">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  {member.bio}
                </p>

                <div className="flex space-x-3">
                  <TooltipProvider>
                    {member.socials.github && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={member.socials.github}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          >
                            <Github className="h-5 w-5" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>GitHub</TooltipContent>
                      </Tooltip>
                    )}

                    {member.socials.linkedin && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={member.socials.linkedin}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>LinkedIn</TooltipContent>
                      </Tooltip>
                    )}

                    {member.socials.email && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={`mailto:${member.socials.email}`}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          >
                            <Mail className="h-5 w-5" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>Email</TooltipContent>
                      </Tooltip>
                    )}
                  </TooltipProvider>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-full h-80 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Join Us in Reshaping Healthcare
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the future of healthcare today. Whether you're a
              patient seeking care or a healthcare provider looking to expand
              your reach, MediAI is here to support you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                Get Started Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
