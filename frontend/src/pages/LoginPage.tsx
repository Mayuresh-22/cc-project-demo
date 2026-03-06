import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Lock, UserRound } from "lucide-react";
import { toast } from "sonner";
import AuthInput from "@/components/AuthInput";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error on change
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        const success = await login(formData.email, formData.password);
        if (success) {
          toast.success("Login successful!");
          navigate("/home");
        } else {
          toast.error("Invalid credentials. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred during login");
        console.error("Login error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-plantcare-beige p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">User Login</h1>
              <p className="text-gray-500 mt-2">Welcome back to GreenGuardian</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthInput
                label="Email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={<User size={18} />}
                autoComplete="username"
              />

              <AuthInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={<Lock size={18} />}
                autoComplete="current-password"
              />

              <div className="flex justify-end mb-6">
                <Link
                  to="/forgot-password"
                  className="text-sm text-plantcare-green-dark hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-plantcare-green text-white py-3 rounded-lg font-medium transition-all duration-200 hover:bg-plantcare-green-dark btn-hover-effect disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                New to GreenGuardian?{" "}
                <Link
                  to="/register"
                  className="text-plantcare-green-dark hover:underline font-medium"
                >
                  Register
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default LoginPage;
