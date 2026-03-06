
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import SideNav from "@/components/SideNav";
import PageTransition from "@/components/PageTransition";
import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Using the categories data from HomePage
const categories = [
  { 
    id: "indoor", 
    name: "Indoor Plants",
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Plants that thrive indoors with moderate light and care requirements.",
    plants: [
      {
        id: "ip1",
        name: "Snake Plant",
        image: "https://images.unsplash.com/photo-1599598177991-ec67b5c37318?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
        watering: "Low - Once every 2-6 weeks",
        fertilizer: "Balanced liquid fertilizer once every 3 months",
        description: "A hardy, upright plant with sword-like leaves that's nearly impossible to kill."
      },
      {
        id: "ip2",
        name: "Pothos",
        image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
        watering: "Medium - Once every 1-2 weeks",
        fertilizer: "Balanced houseplant fertilizer every 2-3 months",
        description: "A trailing vine with heart-shaped leaves, perfect for hanging baskets."
      },
      {
        id: "ip3",
        name: "ZZ Plant",
        image: "https://plus.unsplash.com/premium_photo-1669870413077-93390b44baf0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        watering: "Low - Once every 2-3 weeks",
        fertilizer: "Diluted liquid fertilizer twice a year",
        description: "A tropical plant with glossy leaves that tolerates neglect and low light."
      }
    ]
  },
  { 
    id: "outdoor", 
    name: "Outdoor Plants",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Plants that flourish in outdoor environments with natural sunlight.",
    plants: [
      {
        id: "op1",
        name: "Hydrangea",
        image: "https://images.unsplash.com/photo-1621518856558-9b2ce2d0660d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        watering: "High - 1-2 times per week",
        fertilizer: "Balanced slow-release fertilizer in spring",
        description: "Shrubs with large, showy flower heads that change color based on soil pH."
      },
      {
        id: "op2",
        name: "Lavender",
        image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        watering: "Low - Drought tolerant once established",
        fertilizer: "Light feeding with balanced fertilizer in spring",
        description: "Aromatic herb with purple flowers, loved for its fragrance and medicinal properties."
      },
      {
        id: "op3",
        name: "Marigold",
        image: "https://images.unsplash.com/photo-1620005807545-2e08850d6591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        watering: "Medium - When soil is dry to touch",
        fertilizer: "All-purpose, water-soluble fertilizer monthly",
        description: "Annual with bright orange or yellow flowers, perfect for borders and pest control."
      }
    ]
  },
  { 
    id: "succulents", 
    name: "Succulents",
    image: "https://images.unsplash.com/photo-1446071103084-c257b5f70672?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
    description: "Water-storing plants adapted to arid conditions and minimal care.",
    plants: [
      {
        id: "sp1",
        name: "Aloe Vera",
        image: "https://images.unsplash.com/photo-1596397249129-c7a8f3c47f5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        watering: "Very Low - Once every 3-4 weeks",
        fertilizer: "Cactus fertilizer diluted to half strength in growing season",
        description: "A medicinal plant with thick, fleshy leaves containing soothing gel."
      },
      {
        id: "sp2",
        name: "Echeveria",
        image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        watering: "Very Low - When soil is completely dry",
        fertilizer: "Low nitrogen fertilizer once in spring and summer",
        description: "Rosette-forming succulents with colorful, fleshy leaves in various shapes."
      },
      {
        id: "sp3",
        name: "Jade Plant",
        image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        watering: "Low - When soil is completely dry",
        fertilizer: "Cactus fertilizer 2-3 times during growing season",
        description: "A tree-like succulent with oval-shaped, jade-green leaves, symbolizing prosperity."
      }
    ]
  },
  { 
    id: "flowering", 
    name: "Flowering Plants",
    image: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Plants known for their beautiful, colorful blooms and fragrances.",
    plants: [
      {
        id: "fp1",
        name: "Orchid",
        image: "https://images.unsplash.com/photo-1610397648930-477b8c7f0943?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        watering: "Medium - Once a week, allow to dry between waterings",
        fertilizer: "Specialized orchid fertilizer weekly at quarter strength",
        description: "Exotic flowering plants with unique, long-lasting blooms in many colors."
      },
      {
        id: "fp2",
        name: "Peace Lily",
        image: "https://images.unsplash.com/photo-1593482892290-f54927ae2321?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        watering: "Medium - When top inch of soil is dry",
        fertilizer: "Balanced houseplant fertilizer every 6-8 weeks",
        description: "Elegant plant with glossy leaves and white spathes, excellent air purifier."
      },
      {
        id: "fp3",
        name: "African Violet",
        image: "https://images.unsplash.com/photo-1619810230359-611b2c0a1303?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
        watering: "Medium - Keep soil moist but not soggy",
        fertilizer: "Specialized African violet fertilizer monthly",
        description: "Compact, fuzzy-leaved plants with purple, pink, or white flowers that bloom year-round."
      }
    ]
  },
  { 
    id: "medicinal", 
    name: "Medicinal Plants",
    image: "https://images.unsplash.com/photo-1485802007047-7774de7208e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    description: "Plants with healing properties and health benefits.",
    plants: [
      {
        id: "mp1",
        name: "Basil",
        image: "https://images.unsplash.com/photo-1618375531912-867852944df0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        watering: "Medium-High - When top inch of soil is dry",
        fertilizer: "Organic liquid fertilizer every 4-6 weeks",
        description: "Aromatic herb used in cooking and traditional medicine for digestion and inflammation."
      },
      {
        id: "mp2",
        name: "Mint",
        image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e0b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        watering: "High - Keep soil consistently moist",
        fertilizer: "Balanced liquid fertilizer monthly during growing season",
        description: "Fast-growing herb with aromatic leaves, used for digestive issues and breath freshening."
      },
      {
        id: "mp3",
        name: "Aloe Vera",
        image: "https://images.unsplash.com/photo-1596397249129-c7a8f3c47f5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        watering: "Low - When soil is completely dry",
        fertilizer: "Succulent fertilizer 2-3 times per year",
        description: "Succulent with healing gel for burns, wounds, and skin conditions."
      }
    ]
  },
];

const CategoriesPage = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (id: string) => {
    navigate(`/category/${id}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-plantcare-beige">
        <SideNav />
        
        <div className="md:ml-64 p-6">
          {/* Header with back button */}
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2" 
              onClick={handleBack}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">All Categories</h1>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <LazyImage
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <h3 className="text-white font-medium text-xl p-4">{category.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-2">{category.description}</p>
                  <p className="text-sm text-gray-500">{category.plants.length} plants</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </PageTransition>
  );
};

export default CategoriesPage;
