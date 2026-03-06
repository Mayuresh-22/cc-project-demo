import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  ChevronRight, 
  CreditCard, 
  Flower, 
  Globe, 
  HelpCircle, 
  Info, 
  Lock, 
  LogOut, 
  Moon, 
  Shield, 
  Smartphone, 
  Sun, 
  ToggleLeft, 
  User, 
  Volume2 
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SideNav from "@/components/SideNav";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [waterReminders, setWaterReminders] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [weeklyTips, setWeeklyTips] = useState(true);
  const [useBiometrics, setUseBiometrics] = useState(false);
  const [autoWateringMode, setAutoWateringMode] = useState(false);
  const { logout } = useAuth();

  const handleThemeChange = (value: boolean) => {
    setDarkMode(value);
    toast.info(`Theme changed to ${value ? "dark" : "light"} mode`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />
      <PageTransition>
        <div className="flex-1 md:pl-72 w-full min-h-screen flex justify-center">
          <div className="w-full px-4 py-10">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Settings</h1>
              <Button variant="outline" size="sm" onClick={() => toast.info("Settings saved!")}>
                Save Changes
              </Button>
            </div>
                
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-lg font-medium mb-4">Notifications</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-gray-500" />
                      <div>
                        <span className="block">Push Notifications</span>
                        <span className="text-xs text-gray-500">Receive alerts about your plants</span>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications} 
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <ToggleLeft className="h-5 w-5 text-gray-500" />
                      <div>
                        <span className="block">Water Reminders</span>
                        <span className="text-xs text-gray-500">Get reminded when to water your plants</span>
                      </div>
                    </div>
                    <Switch 
                      checked={waterReminders} 
                      onCheckedChange={setWaterReminders}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Flower className="h-5 w-5 text-gray-500" />
                      <div>
                        <span className="block">Weekly Plant Tips</span>
                        <span className="text-xs text-gray-500">Receive weekly care tips</span>
                      </div>
                    </div>
                    <Switch 
                      checked={weeklyTips} 
                      onCheckedChange={setWeeklyTips}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-5">
                <h2 className="text-lg font-medium mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Volume2 className="h-5 w-5 text-gray-500" />
                      <div>
                        <span className="block">Sound Effects</span>
                        <span className="text-xs text-gray-500">Enable sound for app interactions</span>
                      </div>
                    </div>
                    <Switch 
                      checked={soundEffects} 
                      onCheckedChange={setSoundEffects}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-gray-500" />
                      <div>
                        <span className="block">Auto Watering Mode</span>
                        <span className="text-xs text-gray-500">For smart devices integration</span>
                      </div>
                    </div>
                    <Switch 
                      checked={autoWateringMode} 
                      onCheckedChange={setAutoWateringMode}
                    />
                  </div>
                  
                  <button 
                    className="flex w-full items-center justify-between py-2"
                    onClick={() => toast.info("Language settings coming soon")}
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-gray-500" />
                      <div>
                        <span className="block">Language</span>
                        <span className="text-xs text-gray-500">Change app language</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <span className="mr-2">English</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-5">
                <Button 
                  variant="destructive" 
                  className="w-full justify-start" 
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default SettingsPage;
