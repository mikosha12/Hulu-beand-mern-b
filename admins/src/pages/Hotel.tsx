import React from "react";
import Datatable from "../components/DataHotel";

const Hotel: React.FC = () => {
  return (
    <div className="flex-1">
      <div className="flex-1 p-5">
        <div className="font-medium text-gray-600 mb-4"></div>
        <Datatable />
      </div>
    </div>
  );
};

export default Hotel;
