import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import LazyImage from "@/components/LazyImage";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-plantcare-beige p-6">
      <motion.div 
        className="max-w-md w-full mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 w-48 h-48 mx-auto rounded-full overflow-hidden">
          <LazyImage
            src="/login-icon.png"
            alt="GreenGuardian Logo"
            className="w-full h-full object-cover"
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        <h1 className="text-3xl font-bold mb-2 text-plantcare-green-dark">GreenGuardian</h1>
        <p className="text-gray-600 mb-8">Your personal plant care assistant</p>

        <div className="space-y-4">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="w-full py-3 px-4 bg-plantcare-green text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 btn-hover-effect"
            onClick={() => handleNavigate("/login")}
          >
            User Login
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="w-full py-3 px-4 bg-plantcare-green-light text-plantcare-green-dark border border-transparent rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 btn-hover-effect"
            onClick={() => handleNavigate("/register")}
          >
            New User? Register
          </motion.button>
        </div>
      </motion.div>
      <footer className="mt-8 mb-8 text-center text-sm text-gray-500">
        Made with <span className="text-red-500">❤️</span> by Akshata, Vaishnavi & Mayuresh
      </footer>
    </div>
  );
};

export default WelcomePage;
