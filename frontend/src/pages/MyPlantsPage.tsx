import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus, Sun, Droplet, Leaf } from "lucide-react";
import SideNav from "@/components/SideNav";
import PageTransition from "@/components/PageTransition";
import { fetchUserPlants } from "@/services/PlantService";
import { supabase } from "@/services/SupabaseService";

const MyPlantsPage = () => {
  const navigate = useNavigate();
  const [myPlants, setMyPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const user = await supabase.auth.getUser();
        const userId = user.data?.user?.id;
        if (userId) {
          const plants = await fetchUserPlants(userId);
          setMyPlants(plants);
        }
      } catch (error) {
        console.error("Failed to fetch plants:", error);
      }
    };

    fetchPlants();
  }, []);

  const handleAddPlant = () => {
    navigate("/add-plant");
  };

  const handlePlantClick = (id: string) => {
    navigate(`/plant/${id}`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-plantcare-beige">
        <SideNav />

        <div className="md:ml-64">
          {/* Header */}
          <div className="bg-plantcare-green p-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="mr-2 text-white md:hidden"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-xl font-semibold text-white">My Plants</h1>
            </div>
            <button
              className="bg-white rounded-full p-2 shadow-sm"
              onClick={handleAddPlant}
            >
              <Plus size={20} className="text-plantcare-green" />
            </button>
          </div>

          {/* Plant Grid */}
          <div className="p-6">
            {myPlants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">You don't have any plants yet.</p>
                <button
                  className="bg-plantcare-green text-white px-4 py-2 rounded-lg"
                  onClick={handleAddPlant}
                >
                  Add Your First Plant
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {myPlants.map((plant) => (
                  <div
                    key={plant.plant_id}
                    onClick={() => handlePlantClick(plant.plant_id)}
                    className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
                  >
                    <div className="aspect-square overflow-hidden rounded-lg mb-4">
                      <img
                        src={plant.image_url}
                        alt={plant.plant_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-center text-plantcare-green">
                      {plant.plant_name}
                    </h3>
                    <p className="text-sm text-center text-gray-500 mb-4">
                      {plant.nickname || "No nickname"}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <div className="flex items-center">
                        <Sun className="w-4 h-4 mr-1 text-yellow-500" />
                        <span>{plant.sunlight_exposure || "N/A"}</span>
                      </div>
                      <div className="flex items-center">
                        <Droplet className="w-4 h-4 mr-1 text-blue-500" />
                        <span>{plant.last_watered || "N/A"}</span>
                      </div>
                      <div className="flex items-center">
                        <Leaf className="w-4 h-4 mr-1 text-green-500" />
                        <span>{plant.health_status || "Healthy"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MyPlantsPage;