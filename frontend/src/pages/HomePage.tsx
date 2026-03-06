import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import SideNav from "@/components/SideNav";
import PlantCard from "@/components/PlantCard";
import PageTransition from "@/components/PageTransition";
import LazyImage from "@/components/LazyImage";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserPlants } from "@/services/PlantService";
import { supabase } from "@/services/SupabaseService";
import { Sun, Droplet, Leaf } from "lucide-react";

const categories = [
  {
    id: "indoor",
    name: "Indoor Plants",
    image:
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description:
      "Plants that thrive indoors with moderate light and care requirements.",
    plants: [
      {
        id: "ip1",
        name: "Snake Plant",
        image:
          "https://images.unsplash.com/photo-1599598177991-ec67b5c37318?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
        watering: "Low - Once every 2-6 weeks",
        fertilizer: "Balanced liquid fertilizer once every 3 months",
        description:
          "A hardy, upright plant with sword-like leaves that's nearly impossible to kill.",
      },
      {
        id: "ip2",
        name: "Pothos",
        image:
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
        watering: "Medium - Once every 1-2 weeks",
        fertilizer: "Balanced houseplant fertilizer every 2-3 months",
        description:
          "A trailing vine with heart-shaped leaves, perfect for hanging baskets.",
      },
      {
        id: "ip3",
        name: "ZZ Plant",
        image:
          "https://plus.unsplash.com/premium_photo-1669870413077-93390b44baf0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        watering: "Low - Once every 2-3 weeks",
        fertilizer: "Diluted liquid fertilizer twice a year",
        description:
          "A tropical plant with glossy leaves that tolerates neglect and low light.",
      },
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor Plants",
    image:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description:
      "Plants that flourish in outdoor environments with natural sunlight.",
    plants: [
      {
        id: "op1",
        name: "Hydrangea",
        image:
          "https://images.unsplash.com/photo-1621518856558-9b2ce2d0660d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        watering: "High - 1-2 times per week",
        fertilizer: "Balanced slow-release fertilizer in spring",
        description:
          "Shrubs with large, showy flower heads that change color based on soil pH.",
      },
      {
        id: "op2",
        name: "Lavender",
        image:
          "https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        watering: "Low - Drought tolerant once established",
        fertilizer: "Light feeding with balanced fertilizer in spring",
        description:
          "Aromatic herb with purple flowers, loved for its fragrance and medicinal properties.",
      },
      {
        id: "op3",
        name: "Marigold",
        image:
          "https://images.unsplash.com/photo-1620005807545-2e08850d6591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        watering: "Medium - When soil is dry to touch",
        fertilizer: "All-purpose, water-soluble fertilizer monthly",
        description:
          "Annual with bright orange or yellow flowers, perfect for borders and pest control.",
      },
    ],
  },
  {
    id: "succulents",
    name: "Succulents",
    image:
      "https://images.unsplash.com/photo-1446071103084-c257b5f70672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
    description:
      "Water-storing plants adapted to arid conditions and minimal care.",
    plants: [
      {
        id: "sp1",
        name: "Aloe Vera",
        image:
          "https://images.unsplash.com/photo-1596397249129-c7a8f3c47f5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        watering: "Very Low - Once every 3-4 weeks",
        fertilizer:
          "Cactus fertilizer diluted to half strength in growing season",
        description:
          "A medicinal plant with thick, fleshy leaves containing soothing gel.",
      },
      {
        id: "sp2",
        name: "Echeveria",
        image:
          "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        watering: "Very Low - When soil is completely dry",
        fertilizer: "Low nitrogen fertilizer once in spring and summer",
        description:
          "Rosette-forming succulents with colorful, fleshy leaves in various shapes.",
      },
      {
        id: "sp3",
        name: "Jade Plant",
        image:
          "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        watering: "Low - When soil is completely dry",
        fertilizer: "Cactus fertilizer 2-3 times during growing season",
        description:
          "A tree-like succulent with oval-shaped, jade-green leaves, symbolizing prosperity.",
      },
    ],
  },
  {
    id: "flowering",
    name: "Flowering Plants",
    image:
      "https://images.unsplash.com/photo-1496062031456-07b8f162a322?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description:
      "Plants known for their beautiful, colorful blooms and fragrances.",
    plants: [
      {
        id: "fp1",
        name: "Orchid",
        image:
          "https://images.unsplash.com/photo-1610397648930-477b8c7f0943?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        watering: "Medium - Once a week, allow to dry between waterings",
        fertilizer: "Specialized orchid fertilizer weekly at quarter strength",
        description:
          "Exotic flowering plants with unique, long-lasting blooms in many colors.",
      },
      {
        id: "fp2",
        name: "Peace Lily",
        image:
          "https://images.unsplash.com/photo-1593482892290-f54927ae2321?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        watering: "Medium - When top inch of soil is dry",
        fertilizer: "Balanced houseplant fertilizer every 6-8 weeks",
        description:
          "Elegant plant with glossy leaves and white spathes, excellent air purifier.",
      },
      {
        id: "fp3",
        name: "African Violet",
        image:
          "https://images.unsplash.com/photo-1619810230359-611b2c0a1303?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
        watering: "Medium - Keep soil moist but not soggy",
        fertilizer: "Specialized African violet fertilizer monthly",
        description:
          "Compact, fuzzy-leaved plants with purple, pink, or white flowers that bloom year-round.",
      },
    ],
  },
  {
    id: "medicinal",
    name: "Medicinal Plants",
    image:
      "https://images.unsplash.com/photo-1485802007047-7774de7208e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Plants with healing properties and health benefits.",
    plants: [
      {
        id: "mp1",
        name: "Basil",
        image:
          "https://images.unsplash.com/photo-1618375531912-867852944df0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        watering: "Medium-High - When top inch of soil is dry",
        fertilizer: "Organic liquid fertilizer every 4-6 weeks",
        description:
          "Aromatic herb used in cooking and traditional medicine for digestion and inflammation.",
      },
      {
        id: "mp2",
        name: "Mint",
        image:
          "https://images.unsplash.com/photo-1628556270448-4d4e4148e0b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        watering: "High - Keep soil consistently moist",
        fertilizer: "Balanced liquid fertilizer monthly during growing season",
        description:
          "Fast-growing herb with aromatic leaves, used for digestive issues and breath freshening.",
      },
      {
        id: "mp3",
        name: "Aloe Vera",
        image:
          "https://images.unsplash.com/photo-1596397249129-c7a8f3c47f5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        watering: "Low - When soil is completely dry",
        fertilizer: "Succulent fertilizer 2-3 times per year",
        description:
          "Succulent with healing gel for burns, wounds, and skin conditions.",
      },
    ],
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [greeting, setGreeting] = useState("");
  const [featuredPlants, setFeaturedPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Fetch user's plants from backend
    const fetchPlants = async () => {
      try {
        const currentUser = await supabase.auth.getUser();
        const userId = currentUser.data?.user?.id;
        if (userId) {
          const plants = await fetchUserPlants(userId);
          setFeaturedPlants(plants.slice(0, 4)); // Top 4 plants
          setFilteredPlants(plants);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };

    fetchPlants();
  }, [user]);

  const handlePlantClick = (id: string) => {
    navigate(`/plant/${id}`);
  };

  const handleCategoryPlantClick = (categoryId: string, plantId: string) => {
    // In a real app, you would navigate to a detailed plant page
    console.log(`Navigating to plant ${plantId} in category ${categoryId}`);
  };

  const handleCategoryClick = (id: string) => {
    navigate(`/category/${id}`);
  };

  const toggleFavorite = (plant) => {
    const isFavorite = favorites.some((fav) => fav.plant_id === plant.plant_id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.plant_id !== plant.plant_id)
      : [...favorites, plant];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (plantId) => {
    return favorites.some((fav) => fav.plant_id === plantId);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-plantcare-beige">
        <SideNav />

        <div className="md:ml-64 p-6">
          {/* Search Bar */}
          <div className="flex items-center mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for plants..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-plantcare-green/30 focus:border-plantcare-green outline-none transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-8">
            <motion.h1
              className="text-3xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {greeting} !!
            </motion.h1>
            <motion.p
              className="text-xl text-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {user.user_metadata.username || "User"}
            </motion.p>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Categories</h2>
              <button
                className="text-plantcare-green-dark flex items-center text-sm"
                onClick={() => navigate("/categories")}
              >
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  className="rounded-xl overflow-hidden shadow-sm"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <LazyImage
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <h3 className="text-white font-medium text-xl p-4">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                  <div className="bg-white p-4">
                    <p className="text-sm text-gray-600 mb-3">
                      {category.description}
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-gray-800">
                        Popular Plants:
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {category.plants.map((plant, idx) => (
                          <motion.div
                            key={plant.id}
                            className="cursor-pointer rounded-md overflow-hidden bg-gray-50 border border-gray-100"
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCategoryPlantClick(category.id, plant.id);
                            }}
                          >
                            <div className="h-16 overflow-hidden">
                              <LazyImage
                                src={plant.image}
                                alt={plant.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-2">
                              <p className="text-xs font-medium truncate">
                                {plant.name}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Featured Plants */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Featured Plants</h2>
              <button
                className="text-plantcare-green-dark flex items-center text-sm"
                onClick={() => navigate("/my-plants")}
              >
                View All <ChevronRight size={16} />
              </button>
            </div>
            {featuredPlants.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  You don't have any featured plants yet.
                </p>
                <button
                  className="mt-4 bg-plantcare-green text-white px-4 py-2 rounded-lg"
                  onClick={() => navigate("/add-plant")}
                >
                  Add a Plant
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredPlants.map((plant) => (
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
                        className={`absolute top-2 right-2 p-2 rounded-full ${
                          isFavorite(plant.plant_id)
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(plant);
                        }}
                      >
                        {isFavorite(plant.plant_id) ? "♥" : "♡"}
                      </button>
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
          <footer className="mt-8 mb-8 text-center text-sm text-gray-500">
            Made with <span className="text-red-500">❤️</span> by Akshata,
            Vaishnavi & Mayuresh
          </footer>
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;
