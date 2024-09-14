import React from "react";
import TransactionsTable from "../components/Trasaction";

const Transaction: React.FC = () => {
  return (
    <div className="flex-1">
      <div className="flex-1 p-5">
        <div className="font-medium text-gray-600 mb-4"></div>
        <TransactionsTable/>
      </div>
    </div>
  );
};

export default Transaction;
