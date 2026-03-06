
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Notification from "@/components/Notification";
import SideNav from "@/components/SideNav";
import PageTransition from "@/components/PageTransition";

const initialNotifications = [
  {
    id: "1",
    title: "Watering Reminder!",
    message: "Water Your Monstera Today!",
    time: "10 minutes ago",
    isRead: false,
    type: "water",
  },
  {
    id: "2",
    title: "Fertilizing Time",
    message: "Your Money Plant needs fertilizing this week.",
    time: "2 hours ago",
    isRead: false,
    type: "fertilize",
  },
  {
    id: "3",
    title: "Rose Care Tip",
    message: "Prune your roses to encourage blooming.",
    time: "Yesterday",
    isRead: true,
    type: "prune",
  },
  {
    id: "4",
    title: "Repotting Reminder",
    message: "Your Snake Plant has outgrown its pot. Time to repot!",
    time: "3 days ago",
    isRead: true,
    type: "repot",
  },
];

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleNotificationClick = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

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
              <h1 className="text-xl font-semibold text-white">Notifications</h1>
            </div>
            {unreadCount > 0 && (
              <button
                className="text-sm text-white bg-plantcare-green-dark px-3 py-1 rounded-full"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="p-6">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No notifications to display.</p>
              </div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <Notification
                    key={notification.id}
                    title={notification.title}
                    message={notification.message}
                    time={notification.time}
                    isRead={notification.isRead}
                    type={notification.type as "default" | "water" | "fertilize" | "repot" | "prune"}
                    onClick={() => handleNotificationClick(notification.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotificationsPage;
