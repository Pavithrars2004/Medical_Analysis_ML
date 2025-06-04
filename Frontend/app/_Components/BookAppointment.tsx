"use client";
// pages/book-appointment.js
import { useState } from "react";
import Head from "next/head";
import Navbar from "./Navbar"; // Import your existing Navbar component

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: "",
    doctor: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Appointment data:", formData);
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const services = [
    "General Consultation",
    "Specialist Consultation",
    "Follow-up Visit",
    "Diagnostic Tests",
    "Annual Check-up",
  ];

  const doctors = [
    "Dr. Sarah Johnson - General Medicine",
    "Dr. Michael Chen - Cardiology",
    "Dr. Emily Rodriguez - Pediatrics",
    "Dr. David Wilson - Neurology",
    "Dr. Lisa Thompson - Dermatology",
  ];

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  return (
    <>
      <Head>
        <title>Book Appointment | MediAI</title>
        <meta
          name="description"
          content="Book your medical appointment with MediAI's qualified healthcare professionals"
        />
      </Head>

      {/* Your navbar will be rendered here */}
      <div>
        <Navbar />
      </div>

      <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mt-6 mb-3">
              Book Your Appointment
            </h1>
            <p className="text-lg text-gray-600">
              Schedule a consultation with our qualified medical professionals
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Appointment Requested!
              </h2>
              <p className="text-gray-600 mb-6">
                We&apos;ve received your appointment request and will confirm
                shortly via email.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="col-span-2">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Personal Information
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
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
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  {/* Appointment Details */}
                  <div className="col-span-2 mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                      Appointment Details
                    </h2>
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Service Type
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="doctor"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Preferred Doctor
                    </label>
                    <select
                      id="doctor"
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a doctor</option>
                      {doctors.map((doctor, index) => (
                        <option key={index} value={doctor}>
                          {doctor}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Preferred Time
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a time</option>
                      {availableTimes.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Additional Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Please describe your symptoms or reason for visit"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 text-white font-medium rounded-md ${
                      isSubmitting
                        ? "bg-blue-400"
                        : "bg-blue-600 hover:bg-blue-700"
                    } transition duration-200 flex justify-center items-center`}
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
                        Processing...
                      </>
                    ) : (
                      "Book Appointment"
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Need immediate assistance? Call us at{" "}
                  <a
                    href="tel:+1234567890"
                    className="text-blue-600 font-medium"
                  >
                    123-456-7890
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-gray-600 mt-2">Satisfied Patients</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600 mt-2">Medical Professionals</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600 mt-2">Accurate Diagnoses</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
