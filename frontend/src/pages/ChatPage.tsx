import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Send } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import SideNav from "@/components/SideNav";
import PageTransition from "@/components/PageTransition";
import { sendMessageToChatBot } from "@/services/ChatService";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setNewMessage("");
    setIsSending(true);

    try {
      const botResponse = await sendMessageToChatBot(JSON.stringify(updatedMessages));
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: "Sorry, something went wrong. Please try again later.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-plantcare-beige flex flex-col">
        <SideNav />

        <div className="flex-1 md:ml-64 flex flex-col">
          {/* Header */}
          <div className="bg-plantcare-green p-4 flex items-center">
            <button
              className="mr-2 text-white md:hidden"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-semibold text-white">Chat with us!</h1>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:ring-2 focus:ring-plantcare-green/30 focus:bg-white outline-none transition-all duration-200"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSending}
              />
              <button
                className={`ml-2 p-3 rounded-full transition-all duration-200 ${
                  newMessage.trim() && !isSending
                    ? "bg-plantcare-green text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isSending}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          <footer className="mt-8 mb-8 text-center text-sm text-gray-500">
            Made with <span className="text-red-500">❤️</span> by Akshata, Vaishnavi & Mayuresh
          </footer>
        </div>
      </div>
    </PageTransition>
  );
};

export default ChatPage;
