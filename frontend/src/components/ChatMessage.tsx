
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "mb-4",
      isUser ? "ml-auto" : "mr-auto",
      isUser ? "text-right" : "text-left",
    )}>
      <div className={cn(
        "rounded-2xl px-4 py-3 inline-block animate-fade-up",
        isUser 
          ? "bg-plantcare-green text-white rounded-tr-none" 
          : "bg-gray-100 text-gray-800 rounded-tl-none"
      )}>
        <p className="text-sm">
          {message.replace(/\\"/g, "\"").split(/(\*\*.*?\*\*)/).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      </div>
      {timestamp && (
        <p className={cn(
          "text-xs mt-1 text-gray-500",
          isUser ? "text-right" : "text-left"
        )}>
          {timestamp}
        </p>
      )}
    </div>
  );
};

export default ChatMessage;
