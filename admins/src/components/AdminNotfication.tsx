import React, { useEffect, useState } from "react";
import { fetchNotifications, markNotificationAsRead } from "../admin-Client";
import { NotificationTypee } from "../../../backend/shared/types"; // Adjust import path as needed

const AdminDashboard: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationTypee[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    loadNotifications();
  }, []);

  const handleNotificationClick = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(
        notifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={`p-4 border-b cursor-pointer ${
                notification.read ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => handleNotificationClick(notification._id)}
            >
              <h3 className="font-semibold">{notification.type}</h3>
              <p>{notification.message}</p>
              <span className="text-gray-500 text-sm">
                {new Date(notification.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
