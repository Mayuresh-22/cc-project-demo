import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SideNav from "@/components/SideNav";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-plantcare-green-light min-h-screen">
      {/* Sidebar - fixed on large screens */}
      <div className="hidden md:block fixed top-0 left-0 h-full w-64 z-10">
        <SideNav />
      </div>

      {/* Main Content with sidebar space */}
      <PageTransition>
        <div className="flex-1 md:pl-64 w-full min-h-screen bg-plantcare-green-light flex justify-center">
          <div className="w-full px-4 py-10">
            {/* Back Button */}
            <Button
              variant="ghost"
              className="mb-6 flex items-center gap-2 text-plantcare-green"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow p-6 mx-auto"
            >
              <h1 className="text-3xl font-bold mb-4">About Us</h1>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to <span className="font-semibold">GreenGuardian</span> — your all-in-one companion for nurturing a greener, healthier, and happier lifestyle. We believe that plants aren't just decorations—they're living companions that bring beauty, calmness, and life to our spaces. Whether you're a seasoned plant parent or just starting out, we're here to guide you every step of the way.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">💡 Our Inspiration</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our journey began when we realized how easily life gets in the way of taking care of the little things that matter—like our plants. What started as a personal struggle to remember watering schedules soon turned into a mission to make plant care more approachable, intuitive, and even enjoyable. We've all watched a beloved succulent turn brown and brittle, or seen leaves droop from neglect—and we knew there had to be a better way.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <span className="font-semibold">GreenGuardian</span> was born from a desire to combine smart technology with a deep love for greenery. With backgrounds in tech, design, and environmental science, we united around a simple but powerful idea: help people care for their plants, and they'll grow to care more about the planet.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">🌱 Features</h2>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
                <li>Custom reminders for watering, fertilizing, and rotating plants for even sunlight</li>
                <li>Personalized care guides tailored to your exact plant species</li>
                <li>Push notifications that feel like a gentle nudge from a friend</li>
                <li>Dark mode for cozy late-night browsing</li>
                <li>Clean, minimalist interface designed to help you focus and relax</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-2">🌍 Our Vision</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We envision a world where people don’t just own plants—they connect with them. A world where homes, schools, and offices are filled with thriving greenery. Where kids learn to care for their first basil plant, and elders pass down garden wisdom with pride. Our vision is rooted in reconnection—with nature, with calm, and with ourselves.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Technology often pulls us away from the natural world. At GreenGuardian, we use it to bring us closer—to remind us to slow down, to nurture, and to celebrate small daily rituals. We believe caring for a plant is a form of caring for ourselves.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">🌿 Why Plants Matter</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Plants are more than aesthetics—they are healers, listeners, and silent companions. Studies show that having plants indoors improves mental well-being, reduces stress, enhances creativity, and purifies the air we breathe. Yet, despite their benefits, many plants are neglected due to lack of time, knowledge, or support. That's what we're here to change.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our platform is built not just to help you care for plants, but to help you discover why they matter—why the act of watering, pruning, or simply observing new leaves is grounding and joyful. The world needs more green. And every new plant parent is a step toward that greener future.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-2">🤝 Meet the Team</h2>
              <div className="flex flex-wrap justify-center gap-8 mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/lovable-uploads/mayuresh.png"
                    alt="Team member"
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Mayuresh Choudhary</p>
                    <p className="text-sm text-gray-600">Backend Developer</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src="/lovable-uploads/vaishnavi.png"
                    alt="Team member"
                    className="w-14 h-14 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">Vaishnavi Kadam</p>
                    <p className="text-sm text-gray-600">UI/UX Designer</p>
                  </div>
                </div>
                <div className="sm:col-span-2 flex justify-center">
                  <div className="flex items-center gap-4">
                    <img
                      src="/lovable-uploads/akshata.png"
                      alt="Team member"
                      className="w-14 h-14 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">Akshata Majgaonkar</p>
                      <p className="text-sm text-gray-600">Frontend Developer</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Thank you for being a part of our story. Your support means the world to us. Together, let’s grow something beautiful—rooted in care, nourished by community, and reaching for the sky. 🌿
              </p>
            </motion.div>


            {/* Footer */}
            <footer className="text-center text-sm text-gray-600 mt-10">
              &copy; {new Date().getFullYear()} GreenGuardian. All rights reserved.
            </footer>
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default AboutUsPage;
