import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import PlantCard from "@/components/PlantCard";
import SideNav from "@/components/SideNav";
import PageTransition from "@/components/PageTransition";

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleRemoveFavorite = (plantId) => {
    const updatedFavorites = favorites.filter(
      (plant) => plant.plant_id !== plantId
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-plantcare-beige">
        <SideNav />
        <div className="md:ml-64">
          <div className="bg-plantcare-green p-4 flex items-center">
            <button
              className="mr-2 text-white md:hidden"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-semibold text-white">Favorites</h1>
          </div>
          <div className="p-6">
            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  You don't have any favorite plants yet.
                </p>
                <button
                  className="mt-4 bg-plantcare-green text-white px-4 py-2 rounded-lg"
                  onClick={() => navigate("/home")}
                >
                  Explore Plants
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((plant) => (
                  <div
                    key={plant.plant_id}
                    className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
                  >
                    <div className="aspect-square overflow-hidden rounded-lg mb-4 relative">
                      <img
                        src={plant.image_url}
                        alt={plant.plant_name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-2 right-2 p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-red-500 hover:text-white transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFavorite(plant.plant_id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <h3 className="text-lg font-semibold text-center text-plantcare-green">
                      {plant.plant_name}
                    </h3>
                    <p className="text-sm text-center text-gray-500 mb-4">
                      {plant.description || "No description available"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <footer className="mt-8 text-center justify-center items-center text-sm text-gray-500">
            Made with <span className="text-red-500">❤️</span> by Akshata,
            Vaishnavi & Mayuresh
          </footer>
        </div>
      </div>
    </PageTransition>
  );
};

export default FavoritesPage;
