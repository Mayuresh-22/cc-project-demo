import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import SideNav from "@/components/SideNav";
import { addPlant } from "@/services/PlantService";
import { useAuth } from "@/contexts/AuthContext";

const AddPlantPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    plant_name: "Test Plant",
    nickname: "Tester",
    plant_type: "Indoor",
    species: "Test Species",
    image: null as File | null,
    location_in_home: "Living Room",
    pot_size: "Medium",
    acquisition_date: "2023-01-01",
    last_watered: "2023-01-10",
    last_fertilized: "2023-01-15",
    sunlight_exposure: "Partial Sun",
    soil_type: "Loamy",
    health_status: "Healthy",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addPlant({
        ...formData,
        user_id: user.id,
      });
      console.log("Plant Added:", response);
      navigate("/my-plants");
    } catch (error) {
      console.error("Failed to add plant:", error);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-plantcare-beige flex">
        <SideNav />

        <div className="flex flex-col items-center justify-center w-full md:ml-64 py-10 px-4">
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-plantcare-green">
              Add New Plant 🌿
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Plant Name</label>
                <input
                  type="text"
                  name="plant_name"
                  value={formData.plant_name}
                  onChange={handleChange}
                  placeholder="e.g. Snake Plant"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Nickname</label>
                <input
                  type="text"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  placeholder="e.g. Greeny"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Plant Type</label>
                <input
                  type="text"
                  name="plant_type"
                  value={formData.plant_type}
                  onChange={handleChange}
                  placeholder="e.g. Indoor"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Species</label>
                <input
                  type="text"
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  placeholder="e.g. Sansevieria"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Location in Home</label>
                <input
                  type="text"
                  name="location_in_home"
                  value={formData.location_in_home}
                  onChange={handleChange}
                  placeholder="e.g. Balcony"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Pot Size</label>
                <select
                  name="pot_size"
                  value={formData.pot_size}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Acquisition Date</label>
                <input
                  type="date"
                  name="acquisition_date"
                  value={formData.acquisition_date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Last Watered</label>
                <input
                  type="date"
                  name="last_watered"
                  value={formData.last_watered}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Last Fertilized</label>
                <input
                  type="date"
                  name="last_fertilized"
                  value={formData.last_fertilized}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Sunlight Exposure</label>
                <input
                  type="text"
                  name="sunlight_exposure"
                  value={formData.sunlight_exposure}
                  onChange={handleChange}
                  placeholder="e.g. Full Sun"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Soil Type</label>
                <input
                  type="text"
                  name="soil_type"
                  value={formData.soil_type}
                  onChange={handleChange}
                  placeholder="e.g. Sandy"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Health Status</label>
                <select
                  name="health_status"
                  value={formData.health_status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="Healthy">Healthy</option>
                  <option value="Needs Attention">Needs Attention</option>
                  <option value="Unhealthy">Unhealthy</option>
                </select>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-plantcare-green text-white">
                  Add Plant
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AddPlantPage;