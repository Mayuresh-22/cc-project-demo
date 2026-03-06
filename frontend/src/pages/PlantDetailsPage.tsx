import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Sun, Droplet, Leaf, Info, Calendar, MapPin, CheckCircle, AlertTriangle } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import SideNav from "@/components/SideNav";
import { fetchPlantById } from "@/services/PlantService";

const PlantDetailsPage = () => {
  const { id: plant_id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlantDetails = async () => {
      try {
        if (plant_id) {
          const fetchedPlant = await fetchPlantById(plant_id);
          if (fetchedPlant && typeof fetchedPlant.care_recommendations === "string") {
            try {
              fetchedPlant.care_recommendations = JSON.parse(fetchedPlant.care_recommendations);
            } catch {
              fetchedPlant.care_recommendations = null;
            }
          }
          setPlant(fetchedPlant);
        }
      } catch (error) {
        console.error("Failed to fetch plant details:", error);
      } finally {
        setLoading(false);
      }
    };

    getPlantDetails();
  }, [plant_id]);

  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-plantcare-beige flex items-center justify-center">
          <motion.p
            className="text-lg font-medium text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading plant details...
          </motion.p>
        </div>
      </PageTransition>
    );
  }

  if (!plant) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-plantcare-beige flex items-center justify-center">
          <motion.p
            className="text-lg font-medium text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Plant not found.
          </motion.p>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-plantcare-beige">
        <SideNav />

        <div className="md:ml-64 p-6">
          <motion.button
            className="flex items-center text-plantcare-green mb-6"
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={20} className="mr-2" /> Back
          </motion.button>

          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 md:flex md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Plant Image */}
            <div className="md:w-1/2">
              <motion.img
                src={plant.image_url}
                alt={plant.plant_name}
                className="w-full h-80 object-cover rounded-lg shadow-md"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 mt-6 md:mt-0">
              <h1 className="text-4xl font-bold text-plantcare-green mb-4">{plant.plant_name}</h1>
              <p className="text-gray-500 text-lg mb-6 italic">{plant.nickname || "No nickname"}</p>

              <div className="space-y-4 text-sm">
                {[
                  { icon: Info, label: "Type", value: plant.plant_type || "N/A", color: "text-blue-500" },
                  { icon: Leaf, label: "Species", value: plant.species || "N/A", color: "text-green-500" },
                  { icon: MapPin, label: "Location in Home", value: plant.location_in_home || "N/A", color: "text-red-500" },
                  { icon: Droplet, label: "Last Watered", value: plant.last_watered || "N/A", color: "text-blue-500" },
                  { icon: Calendar, label: "Acquisition Date", value: plant.acquisition_date || "N/A", color: "text-yellow-500" },
                  { icon: Sun, label: "Sunlight Exposure", value: plant.sunlight_exposure || "N/A", color: "text-orange-500" },
                  { icon: Leaf, label: "Soil Type", value: plant.soil_type || "N/A", color: "text-green-500" },
                  { icon: Info, label: "Health Status", value: plant.health_status || "Healthy", color: "text-purple-500" },
                ].map(({ icon: Icon, label, value, color }, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className={color} size={20} />
                    <p>
                      <strong>{label}:</strong> {value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Care Recommendation Card */}
          {plant.care_recommendations && (
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-plantcare-green mb-4">
                Care Recommendations
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {plant.care_recommendations.recommendation}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fertilizers */}
                <motion.div
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-plantcare-green mb-3 flex items-center">
                    <CheckCircle className="mr-2 text-green-500" size={20} />
                    Recommended Fertilizers
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {plant.care_recommendations.fertilizers.map((fertilizer, index) => (
                      <li key={index}>{fertilizer}</li>
                    ))}
                  </ul>
                </motion.div>

                {/* Precautions */}
                <motion.div
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-plantcare-green mb-3 flex items-center">
                    <AlertTriangle className="mr-2 text-yellow-500" size={20} />
                    Precautions
                  </h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {plant.care_recommendations.precautions.map((precaution, index) => (
                      <li key={index}>{precaution}</li>
                    ))}
                  </ul>
                </motion.div>

                {/* Watering Frequency */}
                <motion.div
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-plantcare-green mb-3 flex items-center">
                    <Droplet className="mr-2 text-blue-500" size={20} />
                    Watering Frequency
                  </h3>
                  <p className="text-gray-600">
                    Water every <strong>{plant.care_recommendations.water_frequency}</strong> days.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
        <motion.footer
          className="mt-8 mb-8 text-center text-sm text-gray-500"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          Made with <span className="text-red-500">❤️</span> by Akshata, Vaishnavi & Mayuresh
        </motion.footer>
      </div>
    </PageTransition>
  );
};

export default PlantDetailsPage;
