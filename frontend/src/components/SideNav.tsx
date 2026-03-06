import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Home, 
  Leaf, 
  Heart, 
  Bell, 
  MessageSquare, 
  Settings, 
  LogOut,
  Info
} from "lucide-react";
import { toast } from "sonner";

interface SideNavProps {
  userName?: string;
}

const SideNav = ({ userName }: SideNavProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const displayName = userName || user.user_metadata.username || "User";

  const navItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: Leaf, label: "My Plants", path: "/my-plants" },
    { icon: Heart, label: "Favorites", path: "/favorites" },
    { icon: MessageSquare, label: "Chat with us!", path: "/chat" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: Info, label: "About us", path: "/about" }
  ];

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white shadow-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-5 h-5 flex flex-col justify-between">
          <span className={cn(
            "w-full h-0.5 bg-black rounded-full transition-transform",
            isOpen ? "translate-y-2 rotate-45" : ""
          )}/>
          <span className={cn(
            "w-full h-0.5 bg-black rounded-full transition-opacity",
            isOpen ? "opacity-0" : "opacity-100"
          )}/>
          <span className={cn(
            "w-full h-0.5 bg-black rounded-full transition-transform",
            isOpen ? "-translate-y-2 -rotate-45" : ""
          )}/>
        </div>
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-green-100 md:hidden"
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-8 mt-8">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  {displayName.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Hi,</p>
                  <p className="font-medium">{displayName}!</p>
                </div>
              </div>

              <nav className="flex-1 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={cn(
                      "flex items-center p-3 rounded-lg transition-colors",
                      location.pathname === item.path
                        ? "bg-green-600 text-white"
                        : "text-gray-700 hover:bg-green-200 hover:text-green-900"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon size={20} className="mr-3" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <button
                  className="flex items-center p-3 rounded-lg transition-colors w-full text-left text-gray-700 hover:bg-red-100 hover:text-red-700"
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut size={20} className="mr-3" />
                  <span>Log out</span>
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col bg-green-100 shadow-lg z-10">
        <div className="p-6">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
              {displayName.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Hi,</p>
              <p className="font-medium">{displayName}!</p>
            </div>
          </div>
          
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "flex items-center p-3 rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-green-200 hover:text-green-900"
                )}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              className="flex items-center p-3 rounded-lg transition-colors w-full text-left text-gray-700 hover:bg-red-100 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-3" />
              <span>Log out</span>
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideNav;
