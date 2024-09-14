import React from "react";
import HotelEdite from "../components/HotelEdit";

const HotelEdit: React.FC = () => {
  return (
    <div className="flex-1">
      <div className="flex-1 p-5">
        <div className="font-medium text-gray-600 mb-4"></div>
        <HotelEdite/>
      </div>
    </div>
  );
};

export default HotelEdit;