import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Phone, MapPin, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import AuthInput from "@/components/AuthInput";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
      valid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
        const metadata = {
          username: formData.name,
          mobile: formData.mobile,
          location: formData.address,
          email: formData.email,
        };

        const success = await signup(formData.email, formData.password, metadata);
        if (success) {
          toast.success("Registration successful! Welcome to GreenGuardian. Please login.");
          navigate("/login");
        } else {
          toast.error("Registration failed on GreenGuardian. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred during registration on GreenGuardian");
        console.error("Registration error:", error);
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
              <h1 className="text-2xl font-bold text-gray-900">New User Registration</h1>
              <p className="text-gray-500 mt-2">Create your GreenGuardian account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthInput
                label="Name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                icon={<User size={18} />}
              />

              <AuthInput
                label="Mobile No."
                name="mobile"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleChange}
                error={errors.mobile}
                icon={<Phone size={18} />}
              />

              <AuthInput
                label="Address"
                name="address"
                placeholder="Eg. Pune/Mumbai"
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
                icon={<MapPin size={18} />}
              />

              <AuthInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                icon={<Mail size={18} />}
              />

              <AuthInput
                label="Password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={<Lock size={18} />}
              />

              <AuthInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                icon={<Lock size={18} />}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-plantcare-green text-white py-3 rounded-lg font-medium transition-all duration-200 hover:bg-plantcare-green-dark btn-hover-effect mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-plantcare-green-dark hover:underline font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default RegisterPage;
