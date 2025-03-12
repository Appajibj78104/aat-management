import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  heroImage, 
  bmsitLogo, 
  aatIcon, 
  monitoringIcon, 
  remedialIcon, 
  accessIcon 
} from '../assets';

const LandingPage = () => {
  const features = [
    {
      title: "AAT Management",
      description: "Efficiently manage Alternative Assessment Tests with automated grading and tracking.",
      icon: aatIcon,
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      title: "Real-time Monitoring",
      description: "Track student progress and performance with instant updates and analytics.",
      icon: monitoringIcon,
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      title: "Remedial Sessions",
      description: "Schedule and manage remedial sessions for students needing additional support.",
      icon: remedialIcon,
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      title: "Multi-role Access",
      description: "Dedicated dashboards for students, faculty, admin, and superadmin.",
      icon: accessIcon,
      gradient: "from-cyan-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Navbar with fixed width and padding */}
      <nav className="bg-black/50 backdrop-blur-md shadow-lg fixed w-full z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <img
                src={bmsitLogo}
                alt="BMSIT&M Logo"
                className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                BMSIT&M
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <Link
                to="/login"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full
                  font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Login
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section with proper spacing */}
      <div className="relative pt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center pt-20 pb-16">
            {/* Left Content */}
            <motion.div 
              className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 mb-6">
                AAT Management System
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                BMS Institute of Technology and Management's comprehensive solution for managing Alternative Assessment Tests, streamlining the academic evaluation process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full
                    font-medium shadow-lg hover:shadow-cyan-500/25 transform hover:-translate-y-1 transition-all duration-300
                    flex items-center justify-center"
                >
                  Get Started
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </motion.svg>
                </Link>
                <a
                  href="#features"
                  className="px-8 py-4 bg-gray-800 text-cyan-400 rounded-full font-medium
                    hover:bg-gray-700 transform hover:-translate-y-1 transition-all duration-300
                    flex items-center justify-center"
                >
                  Learn More
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </motion.svg>
                </a>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                className="w-full h-auto rounded-2xl shadow-2xl shadow-cyan-500/20 hero-image"
                src={heroImage}
                alt="AAT Management System"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
              Features
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to manage and track Alternative Assessment Tests efficiently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className={`bg-gray-800 rounded-xl p-6 shadow-lg group-hover:shadow-cyan-500/25 
                  transform transition-all duration-300 hover:-translate-y-2`}>
                  <div className="flex items-center justify-center w-16 h-16 mb-6 mx-auto
                    bg-gradient-to-br ${feature.gradient} rounded-lg shadow-lg">
                    <img 
                      src={feature.icon} 
                      alt={feature.title} 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white text-center mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-center">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.img
              src={bmsitLogo}
              alt="BMSIT&M Logo"
              className="h-16 mx-auto mb-6 invert opacity-75"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.75, y: 0 }}
              transition={{ duration: 0.8 }}
            />
            <motion.p 
              className="text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              © {new Date().getFullYear()} BMSIT&M. All rights reserved.
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 