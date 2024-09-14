// components/Sidebar.tsx
import React from "react";
import {
  Dashboard as DashboardIcon,
  PersonOutline as PersonOutlineIcon,
  Hotel as HotelIcon,
  InsertChart as InsertChartIcon,
  ExitToApp as ExitToAppIcon,
  NotificationsNone as NotificationsNoneIcon,
  KingBed as KingBedIcon,
  BookOnline as BookOnlineIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext"; // Import your theme context
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";

const Sidebar: React.FC = () => {
  const { logOut } = useAuth();
  const { isDarkMode } = useTheme(); // Get the dark mode state

  return (
    <div
      className={`fixed top-0 left-0 w-40 h-full  ${
        isDarkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-800"
      }`}
      style={{ zIndex: 1000 }} // Ensure the sidebar is above other content
    >
      <div className="h-12 flex items-center justify-center">
        <Link
          to="/"
          className={`text-xl font-bold ${
            isDarkMode ? "text-purple-400" : "text-purple-500"
          }`}
        >
          HULU-BEAND
        </Link>
      </div>
      <hr
        className={`border-gray-700 ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      />
      <div className="flex flex-col h-full">
        <div className="flex-1 px-2 overflow-y-auto">
          {" "}
          {/* Allow scrolling within the sidebar if content overflows */}
          <ul className="list-none p-0 m-0">
            <p className="text-xs font-bold mt-4 mb-2">MAIN</p>
            <li
              className={`flex items-center p-2 cursor-pointer hover:bg-${
                isDarkMode ? "purple-700" : "purple-100"
              }`}
            >
              <DashboardIcon
                className={`text-lg ${
                  isDarkMode ? "text-purple-400" : "text-purple-500"
                }`}
              />
              <span
                className={`ml-2 text-sm font-semibold ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Link to="/" className="no-underline">
                  Dashboard
                </Link>
              </span>
            </li>
            <p className="text-xs font-bold mt-4 mb-2">LISTS</p>
            <Link to="/users" className="no-underline">
              <li
                className={`flex items-center p-2 cursor-pointer hover:bg-${
                  isDarkMode ? "purple-700" : "purple-100"
                }`}
              >
                <PersonOutlineIcon
                  className={`text-lg ${
                    isDarkMode ? "text-purple-400" : "text-purple-500"
                  }`}
                />
                <span
                  className={`ml-2 text-sm font-semibold ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Users
                </span>
              </li>
            </Link>
            <Link to="/Hotels" className="no-underline">
              <li
                className={`flex items-center p-2 cursor-pointer hover:bg-${
                  isDarkMode ? "purple-700" : "purple-100"
                }`}
              >
                <HotelIcon
                  className={`text-lg ${
                    isDarkMode ? "text-purple-400" : "text-purple-500"
                  }`}
                />
                <span
                  className={`ml-2 text-sm font-semibold ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Hotels
                </span>
              </li>
            </Link>
            <Link to="/Rooms" className="no-underline">
              <li
                className={`flex items-center p-2 cursor-pointer hover:bg-${
                  isDarkMode ? "purple-700" : "purple-100"
                }`}
              >
                <KingBedIcon
                  className={`text-lg ${
                    isDarkMode ? "text-purple-400" : "text-purple-500"
                  }`}
                />
                <span
                  className={`ml-2 text-sm font-semibold ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Rooms
                </span>
              </li>
            </Link>
            <li
              className={`flex items-center p-2 cursor-pointer hover:bg-${
                isDarkMode ? "purple-700" : "purple-100"
              }`}
            >
              <BookOnlineIcon
                className={`text-lg ${
                  isDarkMode ? "text-purple-400" : "text-purple-500"
                }`}
              />
              <span
                className={`ml-2 text-sm font-semibold ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Link to="/Bookings" className="no-underline">
                  Bookings
                </Link>
              </span>
            </li>
            <li
              className={`flex items-center p-2 cursor-pointer hover:bg-${
                isDarkMode ? "purple-700" : "purple-100"
              }`}
            >
              <CurrencyExchangeOutlinedIcon
                className={`text-lg ${
                  isDarkMode ? "text-purple-400" : "text-purple-500"
                }`}
              />
              <span
                className={`ml-2 text-sm font-semibold ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Link to="/transaction" className="no-underline">
                  Transactions
                </Link>
              </span>
            </li>
            <p className="text-xs font-bold mt-4 mb-2">USEFUL</p>
            <li
              className={`flex items-center p-2 cursor-pointer hover:bg-${
                isDarkMode ? "purple-700" : "purple-100"
              }`}
            >
              <InsertChartIcon
                className={`text-lg ${
                  isDarkMode ? "text-purple-400" : "text-purple-500"
                }`}
              />
              <span
                className={`ml-2 text-sm font-semibold ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Stats
              </span>
            </li>
            <li
              className={`flex items-center p-2 cursor-pointer hover:bg-${
                isDarkMode ? "purple-700" : "purple-100"
              }`}
            >
              <PendingOutlinedIcon
                className={`text-lg ${
                  isDarkMode ? "text-purple-400" : "text-purple-500"
                }`}
              />
              <span
                className={`ml-2 text-sm font-semibold ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <Link to="/pending-hotels" className="no-underline">
                  Pending-Hotels
                </Link>
              </span>
            </li>
            <li
              className={`flex items-center p-2 cursor-pointer hover:bg-${
                isDarkMode ? "purple-700" : "purple-100"
              }`}
            >
              <NotificationsNoneIcon
                className={`text-lg ${
                  isDarkMode ? "text-purple-400" : "text-purple-500"
                }`}
              />
              <span
                className={`ml-2 text-sm font-semibold ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Notifications
              </span>
            </li>
            <p className="text-xs font-bold mt-4 mb-2">USER</p>
            <li
              className={`flex items-center p-2 cursor-pointer hover:bg-${
                isDarkMode ? "purple-700" : "purple-100"
              }`}
              onClick={logOut}
            >
              <ExitToAppIcon
                className={`text-lg ${
                  isDarkMode ? "text-purple-400" : "text-purple-500"
                }`}
              />
              <span
                className={`ml-2 text-sm font-semibold ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
