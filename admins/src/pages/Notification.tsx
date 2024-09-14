import React from "react";
import Notification from "../components/AdminNotfication";

const Notifcation: React.FC = () => {
  return (
    <div className="flex-1">
      <div className="flex-1 p-5">
        <div className="font-medium text-gray-600 mb-4"></div>
        <Notification />
      </div>
    </div>
  );
};

export default Notifcation;
