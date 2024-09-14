import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Header";
import Widget from "../components/Widget";
import Featured from "../components/Featured";
import Chart from "../components/Chart";
import Table from "../components/Table";

const Home: React.FC = () => {
  return (
    <div className="flex">
      <div className="flex-1 p-5">
        <div className="flex gap-5 p-5">
          <Widget type="user" />
          <Widget type="hotel" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="flex gap-5 p-5">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default Home;
