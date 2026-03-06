
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";

const Notification = ({
  title,
  message,
  time,
  isRead = false,
  type = "default",
  onClick,
}) => {
  const getIcon = () => {
    const className = "mr-3";
    
    switch (type) {
      case "water":
        return <Bell className={className} />;
      case "fertilize":
        return <Bell className={className} />;
      case "repot":
        return <Bell className={className} />;
      case "prune":
        return <Bell className={className} />;
      default:
        return <Bell className={className} />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "water":
        return "bg-blue-50";
      case "fertilize":
        return "bg-amber-50";
      case "repot":
        return "bg-purple-50";
      case "prune":
        return "bg-rose-50";
      default:
        return "bg-plantcare-green-light";
    }
  };

  return (
    <div 
      className={cn(
        "p-4 rounded-xl mb-3 transition-all cursor-pointer",
        getBackgroundColor(),
        isRead ? "opacity-70" : "opacity-100",
      )}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-grow">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{message}</p>
          {time && <p className="text-xs text-gray-500 mt-1">{time}</p>}
        </div>
        {!isRead && (
          <div className="flex-shrink-0 ml-2">
            <div className="w-2 h-2 bg-plantcare-green rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
