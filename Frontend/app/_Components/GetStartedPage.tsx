// components/GetStartedPage.jsx
import React from 'react';
import Navbar from './Navbar';
export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-green-500">
      {/* Navbar placeholder - You'll render your custom navbar here */}
      <div id="navbar-container" className="w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-7">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Get Started with MediAI</h1>
            <p className="mt-4 text-white text-lg opacity-90">
              Transform your healthcare experience with our cutting-edge AI solutions
            </p>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Steps Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">1</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Create Your Account</h3>
                  <p className="text-gray-600">Fill out a simple form with your basic information to get started.</p>
                </div>
                
                <div className="bg-teal-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">2</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Connect Your Data</h3>
                  <p className="text-gray-600">Securely link your health records or input your medical information.</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">3</div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">Get Personalized Care</h3>
                  <p className="text-gray-600">Receive AI-powered insights and recommendations tailored to your needs.</p>
                </div>
              </div>
            </div>
            
            {/* Benefits Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose MediAI?</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">24/7 Access</h3>
                    <p className="text-gray-600">Get healthcare insights whenever you need them, day or night.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">Data Security</h3>
                    <p className="text-gray-600">Your medical information is protected with bank-level encryption.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">Personalized Care</h3>
                    <p className="text-gray-600">AI algorithms that adapt to your unique health profile and needs.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">Expert Support</h3>
                    <p className="text-gray-600">Connect with healthcare professionals when you need additional guidance.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Registration Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Account</h2>
              
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Create a password"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
                  </label>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Your Account
                  </button>
                </div>
              </form>
              
              <p className="mt-6 text-center text-gray-600">
                Already have an account? <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Log in here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}