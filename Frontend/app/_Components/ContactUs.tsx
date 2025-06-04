"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useTranslation } from "next-i18next";

const ContactUs = () => {
  const { t } = useTranslation("common");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState(null); // null, 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formData.phone && !/^\+?[0-9\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }

    if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormStatus("error");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    }, 1500);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerFormItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Contact Us
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Have questions, feedback, or need support with MediAI? We're here to
            help you. Reach out to our friendly team for assistance with our
            services or to explore partnership opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Send us a message
            </h2>

            {formStatus === "success" && (
              <motion.div
                className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Thank you! Your message has been sent successfully.</span>
              </motion.div>
            )}

            {formStatus === "error" && (
              <motion.div
                className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>Please correct the errors in the form.</span>
              </motion.div>
            )}

            <motion.form onSubmit={handleSubmit} variants={staggerFormItems}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.fullName ? "border-red-300" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? "border-red-300" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                    placeholder="+1 (123) 456-7890"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </motion.div>
              </div>

              <motion.div className="mt-5" variants={fadeInUp}>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message ? "border-red-300" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                  placeholder="Your message here..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </motion.div>

              <motion.div className="mt-8" variants={fadeInUp}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Contact Information */}
          <div>
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Contact Information
              </h2>

              <div className="space-y-6">
                <motion.div className="flex items-start" variants={fadeInUp}>
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-900">
                      Email
                    </h3>
                    <p className="mt-1 text-gray-600">support@mediai.com</p>
                    <p className="text-gray-600">info@mediai.com</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start" variants={fadeInUp}>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-900">
                      Phone
                    </h3>
                    <p className="mt-1 text-gray-600">+1 (800) MED-IAAI</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start" variants={fadeInUp}>
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-900">
                      Address
                    </h3>
                    <p className="mt-1 text-gray-600">
                      MediAI Headquarters
                      <br />
                      123 Innovation Drive
                      <br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </motion.div>

                <motion.div className="flex items-start" variants={fadeInUp}>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-900">
                      Working Hours
                    </h3>
                    <p className="mt-1 text-gray-600">
                      Monday - Friday: 9AM - 6PM PST
                      <br />
                      Saturday: 10AM - 4PM PST
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
                  >
                    <Facebook className="w-5 h-5 text-gray-700" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-gray-700" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-gray-700" />
                  </a>
                  <a
                    href="#"
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-gray-700" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl h-80 md:h-96"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.8670145603384!2d72.5285919!3d22.998037699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b767b0a48ed%3A0x6c7f5e6ccaefaf!2sAlpha%202%20Commercial%20Complex!5e0!3m2!1sen!2sin!4v1713395981584!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200 text-center text-gray-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <p>© 2024 MediAI. All rights reserved.</p>
      </motion.div>
    </section>
  );
};

export default ContactUs;
