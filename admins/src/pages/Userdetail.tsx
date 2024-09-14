import React from "react";

import UserDetailView from "../components/UserDetailView";

const Userdetail: React.FC = () => {
  return (
    <div className="flex-1">
      <div className="flex-1 p-5">
        <div className="font-medium text-gray-600 mb-4"></div>
        <UserDetailView />
      </div>
    </div>
  );
};

export default Userdetail;