import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useTheme } from '../context/ThemeContext'; // Import your theme context
import DarkModeToggle from "./DarkModeToggle";

const Header: React.FC = () => {
  const navigate = useNavigate(); // Get the navigation function
  const { isDarkMode } = useTheme(); // Use theme context

  const handleNotificationClick = () => {
    navigate("/notification"); // Navigate to the notifications page
  };

  return (
    <div
      className={`h-12 border-b mt-0 ${
        isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-300' : 'border-gray-200 bg-white text-gray-600'
      } flex items-center text-sm`}
    >
      <div className="w-full px-5 flex items-center justify-between">
        <div
          className={`flex items-center border ${
            isDarkMode ? 'border-gray-600' : 'border-gray-300'
          } p-0 rounded-md`}
        >
          <input
            type="text"
            placeholder="Search..."
            className={`border-none outline-none bg-transparent text-xs placeholder-gray-500 ${
              isDarkMode ? 'text-gray-300 placeholder-gray-400' : 'text-gray-600'
            }`}
          />
          <SearchOutlinedIcon className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </div>
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-1">
            <LanguageOutlinedIcon className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>English</span>
          </div>
          <div className="flex items-center">
            <FullscreenExitOutlinedIcon className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </div>
          <div
            className="relative flex items-center"
            onClick={handleNotificationClick}
          >
            {/* Add onClick event listener to the notification icon */}
            <NotificationsNoneOutlinedIcon className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white flex items-center justify-center text-xs font-bold rounded-full">
              1
            </div>
          </div>
          <div className="relative flex items-center">
            <ChatBubbleOutlineOutlinedIcon className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white flex items-center justify-center text-xs font-bold rounded-full">
              2
            </div>
          </div>
          <div className="flex items-center">
            <ListOutlinedIcon className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </div>
          <div className="p-2 border-t">
          <DarkModeToggle />
        </div>
          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
