import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import {
  Wand2,
  Globe2,
  Zap,
  FileAudio,
  FileText,
  Languages,
  Clock,
  Check,
  ShieldCheck,
  User,
  Headphones,
  CheckCircle,
  Mic,
  File,
  Loader2,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [minutesTranscribed, setMinutesTranscribed] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const initialMinutes = 640;
    setMinutesTranscribed(initialMinutes);

    const transcribedInterval = setInterval(() => {
      setMinutesTranscribed((prev) => prev + 10);
    }, 500);

    return () => {
      clearInterval(transcribedInterval);
    };
  }, []);

  const combinedFeatures = [
    {
      icon: <Languages className="w-10 h-10 text-blue-400" />,
      title: "Advanced Language Support",
      description:
        "Our AI accurately transcribes audio in over 50 languages, understanding nuances and dialects for global communication.",
    },
    {
      icon: <Zap className="w-10 h-10 text-blue-400" />,
      title: "Ultra-Fast Transcription",
      description:
        "Experience near-instantaneous transcription, reducing wait times from hours to minutes. Ideal for time-sensitive projects.",
    },
    {
      icon: <FileAudio className="w-10 h-10 text-blue-400" />,
      title: "Extensive Format Compatibility",
      description:
        "Upload audio and video in any format. Our system automatically handles conversion, ensuring a seamless user experience.",
    },
    {
      icon: <Check className="w-10 h-10 text-blue-400" />,
      title: "Unparalleled Accuracy",
      description:
        "Leverage the precision of the Gemini API for transcriptions that boast a 99.9% accuracy rate, capturing every word with confidence.",
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-400" />,
      title: "24/7 Availability",
      description:
        "Our service is available around the clock. Transcribe audio whenever you need, with reliable support always at hand.",
    },
    {
      icon: <Wand2 className="w-10 h-10 text-blue-400" />,
      title: "AI-Powered Enhancement",
      description:
        "Beyond transcription, our AI enhances your audio by reducing noise and clarifying speech, improving the quality of your text output.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-blue-400" />,
      title: "Secure and Confidential",
      description:
        "Your data's privacy is paramount. We employ robust security measures to ensure your audio files and transcriptions are protected.",
    },
    {
      icon: <User className="w-10 h-10 text-blue-400" />,
      title: "User-Friendly Interface",
      description:
        "Our platform is designed for ease of use, making the transcription process intuitive and accessible to everyone, regardless of tech expertise.",
    },
    {
      icon: <Headphones className="w-10 h-10 text-blue-400" />,
      title: "Dedicated Support Team",
      description:
        "Our expert support team is on hand to assist with any queries, ensuring you get the most out of our transcription service.",
    },
  ];

  const pricingPlan = {
    title: "Free Plan",
    price: "$0",
    features: [
      "Up to 10 minutes of audio transcription per month",
      "Access to core features",
      "Support for major audio formats",
      "Standard transcription accuracy",
      "24/7 availability",
    ],
    buttonText: "Get Started for Free",
    buttonAction: () => handleNavigation("/dashboard"),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const your_telegram_bot_api_key = "Enter Your Telegram Bot Api Key";
  const your_telegram_chat_id = "Enter Your Telegram ChatID";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const apiUrl = `https://api.telegram.org/bot${your_telegram_bot_api_key}/sendMessage`;

    const message = `
      New Contact Form Submission:
      Name: ${formData.name}
      Email: ${formData.email}
      Message: ${formData.message}
    `;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: your_telegram_chat_id, 
          text: message,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" }); // Clear the form
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSubmitError("An error occurred while submitting the form.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
      <div className="flex-grow">
        {/* Hero Section */}
        <div
          className={`transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Wand2 className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Oratiq
              </span>
            </div>
            <div className="space-x-6">
              <ScrollLink
                to="features"
                smooth={true}
                duration={500}
                offset={-70}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Features
              </ScrollLink>
              <ScrollLink
                to="pricing"
                smooth={true}
                duration={500}
                offset={-70}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Pricing
              </ScrollLink>
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                offset={-70}
                className="hover:text-blue-400 transition-colors cursor-pointer"
              >
                Contact Us
              </ScrollLink>
              <button
                onClick={() => handleNavigation("/dashboard")}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          </nav>

          <div className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Transform Speech into Text with AI
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Leverage the power of advanced AI to convert your audio into
              high-quality, multilingual text with unmatched accuracy and
              efficiency.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleNavigation("/dashboard")}
                className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
              >
                Try for Free
              </button>
              <button className="border border-blue-400 hover:bg-blue-400/10 px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Combined Features Section */}
        <div className="container mx-auto px-6 py-10" id="features">
          <h2 className="text-4xl font-bold mb-10 text-center">
            Discover the Power of Oratiq
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {combinedFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 flex flex-col items-center text-center transition-all duration-500 hover:scale-105 hover:border-blue-400"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Pricing Section */}
        <div className="container mx-auto px-6 py-10 relative" id="pricing">
          {/* Waveform Background */}
          <div
            className="absolute inset-0 z-0 bg-no-repeat bg-center pointer-events-none opacity-10"
            style={{
              backgroundImage: `url('your-wave-image')`,
              backgroundSize: "100%",
            }}
          />
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-8 rounded-xl shadow-lg relative z-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                Start Transcribing for Free
              </h2>
              <p className="text-lg mb-2">
                Turn your audio into text in minutes – fast, accurate, and free!
              </p>
              {/* Testimonial (Static Example) */}
              <div className="mb-4">
                <p className="text-gray-400 italic">
                  "Oratiq has changed the game for me. It's incredibly fast and
                  accurate. I can't imagine going back to manual
                  transcription!"
                </p>
                <p className="text-gray-400 font-bold mt-2">
                  - John S., Freelance Journalist
                </p>
              </div>
              <div className="flex justify-center space-x-4 mb-8">
                {/* Replace these with actual icons and data */}
                <div className="flex items-center">
                  <Clock className="text-blue-400 mr-2 w-5 h-5" />
                  <span className="text-sm">
                    Under <span className="font-semibold">5 mins</span>{" "}
                    processing
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2 w-5 h-5" />
                  <span className="text-sm">
                    <span className="font-semibold">99.9%</span> accuracy
                  </span>
                </div>
                <div className="flex items-center">
                  <Languages className="text-purple-400 mr-2 w-5 h-5" />
                  <span className="text-sm">
                    <span className="font-semibold">50+</span> languages
                  </span>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-md mx-auto">
                <div className="mb-4 flex justify-center">
                  <Mic className="text-blue-400 w-8 h-8" />
                  <FileText className="text-purple-400 w-8 h-8 ml-2" />
                </div>
                <h3 className="text-3xl font-semibold mb-2 text-blue-400">
                  {pricingPlan.title}
                </h3>
                <p className="text-6xl font-bold text-purple-400 mb-6">
                  {pricingPlan.price}
                  <span className="text-xl text-gray-400">/month</span>
                </p>
                <ul className="text-gray-400 mb-6 space-y-2">
                  {pricingPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2 w-5 h-5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={pricingPlan.buttonAction}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 w-full"
                >
                  {pricingPlan.buttonText}
                </button>
              </div>
              <div className="mt-6 text-center">
                {/* Example dynamic numbers */}
                <p className="text-gray-400">
                  Over{" "}
                  <span className="text-white font-bold">
                    {minutesTranscribed.toLocaleString()}
                  </span>{" "}
                  minutes transcribed globally
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-6 py-10 bg-gray-800/30 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <FileText />, value: "99.9%", label: "Accuracy" },
              { icon: <Languages />, value: "50+", label: "Languages" },
              { icon: <Clock />, value: "<5min", label: "Processing Time" },
              { icon: <Check />, value: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-blue-400 flex justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Contact Us Section */}
        <div className="container mx-auto px-6 py-16" id="contact">
          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-400 text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-400 text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-400 text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              {submitError && (
                <div className="mb-4 text-red-500">{submitError}</div>
              )}
              {submitSuccess && (
                <div className="mb-4 text-green-500">
                  Message sent successfully!
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-all w-full"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;