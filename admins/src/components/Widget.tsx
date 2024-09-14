import React, { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { fetchAllUsers, fetchHotelCount, fetchAllTransactions } from "../admin-Client";
import { useTheme } from '../context/ThemeContext'; // Import your theme context
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

interface WidgetProps {
  type: "user" | "hotel" | "earning" | "balance";
}

interface Transaction {
  commissionAmount: number;
  hotelOwnerAmount: number;
}

const Widget: React.FC<WidgetProps> = ({ type }) => {
  const [userData, setUserData] = useState<{ usersCount: number }>({ usersCount: 0 });
  const [hotelsCount, setHotelsCount] = useState<number>(0);
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [totalHotelOwnerAmount, setTotalHotelOwnerAmount] = useState<number>(0);

  const { isDarkMode } = useTheme(); // Use theme context

  let data = {
    title: "Unknown",
    isMoney: false,
    link: "No link available",
    linkTo: "#", // Default link
    icon: <div className="text-gray-400">Icon</div>,
    amount: 0,
  };

  const diff = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchAllUsers();
        setUserData({ usersCount: users.length });

        const hotelCount = await fetchHotelCount();
        setHotelsCount(hotelCount);

        const transactions: Transaction[] = await fetchAllTransactions();

        // Calculate total earnings
        const earningsTotal = transactions.reduce((sum, transaction) => sum + transaction.commissionAmount, 0);
        setTotalEarnings(earningsTotal);

        // Calculate total hotel owner amount
        const hotelOwnerTotal = transactions.reduce((sum, transaction) => sum + transaction.hotelOwnerAmount, 0);
        setTotalHotelOwnerAmount(hotelOwnerTotal);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        linkTo: "/users", // Update with the correct route
        icon: (
          <PersonOutlinedIcon className={`p-2 rounded-md ${isDarkMode ? 'text-red-400 bg-red-800' : 'text-red-600 bg-red-100'}`} />
        ),
        amount: userData.usersCount,
      };
      break;
    case "hotel":
      data = {
        title: "HOTELS",
        isMoney: false,
        link: "View all hotels",
        linkTo: "/hotels", // Update with the correct route
        icon: (
          <ShoppingCartOutlinedIcon className={`p-2 rounded-md ${isDarkMode ? 'text-yellow-400 bg-yellow-800' : 'text-yellow-600 bg-yellow-100'}`} />
        ),
        amount: hotelsCount,
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        linkTo: "/transaction", // Update with the correct route
        icon: (
          <MonetizationOnOutlinedIcon className={`p-2 rounded-md ${isDarkMode ? 'text-green-400 bg-green-800' : 'text-green-600 bg-green-100'}`} />
        ),
        amount: totalEarnings,
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        linkTo: "/transaction", // Update with the correct route
        icon: (
          <AccountBalanceWalletOutlinedIcon className={`p-2 rounded-md ${isDarkMode ? 'text-purple-400 bg-purple-800' : 'text-purple-600 bg-purple-100'}`} />
        ),
        amount: totalHotelOwnerAmount,
      };
      break;
    default:
      break;
  }

  return (
    <div className={`flex justify-between flex-1 p-3 shadow-md rounded-lg h-24 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`}>
      <div className="flex flex-col justify-between">
        <span className={`font-bold text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{data.title}</span>
        <span className={`text-2xl font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {data.isMoney && "$"} {data.amount}
        </span>
        <Link to={data.linkTo} className={`text-xs border-b ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-400'}`}>
          {data.link}
        </Link>
      </div>
      <div className="flex flex-col justify-between items-end p-0">
        <div
          className={`flex items-center text-sm ${
            diff > 0 ? (isDarkMode ? "text-green-400" : "text-green-600") : (isDarkMode ? "text-red-400" : "text-red-600")
          }`}
        >
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
