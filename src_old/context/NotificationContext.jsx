import { createContext, useState, useContext } from "react";
import Notification from "../components/Common/Notification";
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notificationList, setNotificationList] = useState([]);

  const showNotification = ({ title, message, type, duration = 5000 }) => {
    const id = Date.now();
    const newNotification = { id, title, message, type, duration };

    setNotificationList((prev) => [...prev, newNotification]);

    setTimeout(() => {
      setNotificationList((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }, duration);
  };

  return (
    <NotificationContext.Provider
      value={{ notificationList, showNotification }}
    >
      {children}

      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {notificationList.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
