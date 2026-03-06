
import { useState } from "react";
import { Heart } from "lucide-react";
import LazyImage from "./LazyImage";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PlantCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  className?: string;
  isFavorite?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const PlantCard = ({
  id,
  name,
  image,
  description,
  isFavorite = false,
  onClick,
  className,
}: PlantCardProps) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
    
    if (newFavoriteState) {
      toast.success(`${name} added to favorites!`);
    } else {
      toast.info(`${name} removed from favorites`);
    }
  };

  return (
    <div 
      className={cn(
        "plant-card bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 relative",
        className
      )}
      onClick={onClick}
    >
      <button
        className={cn(
          "absolute top-5 right-5 z-10 p-2 rounded-full transition-all duration-300 bg-white/80 backdrop-blur-sm",
          favorite ? "text-red-500" : "text-gray-400"
        )}
        onClick={handleFavoriteClick}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart 
          className={cn(
            "transition-all duration-300",
            favorite ? "fill-red-500 scale-110" : "fill-none scale-100"
          )} 
          size={20} 
        />
      </button>
      
      <div className="mb-3 aspect-square overflow-hidden rounded-lg">
        <LazyImage
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <h3 className="font-medium text-lg mb-1">{name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
    </div>
  );
};

export default PlantCard;
