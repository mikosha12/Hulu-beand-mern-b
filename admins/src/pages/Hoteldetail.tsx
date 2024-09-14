import React from "react";
import HotelDetailView from "../components/HotelDetailView";

const Hoteldetail: React.FC = () => {
  return (
    <div className="flex-1">
      <div className="flex-1 p-5">
        <div className="font-medium text-gray-600 mb-4"></div>
        <HotelDetailView />
      </div>
    </div>
  );
};

export default Hoteldetail;