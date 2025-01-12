import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Install react-icons

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="py-6 mt-10 bg-gray-900">
          <div className="container mx-auto px-6 text-center text-gray-400">
            <div className="flex justify-center space-x-6 mb-4">
              {/* Social Media Links (Replace with your actual links) */}
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>  
            <p className="mb-2">Created with ❤️ by Naman</p>
            <p>© {new Date().getFullYear()} Oratiq. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;