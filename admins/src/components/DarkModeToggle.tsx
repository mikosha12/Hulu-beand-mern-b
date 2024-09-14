// src/components/DarkModeToggle.tsx
import React from "react";
import { useTheme } from "../context/ThemeContext";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();

  const handleDarkModeClick = () => {
    setIsDarkMode(true);
  };

  const handleLightModeClick = () => {
    setIsDarkMode(false);
  };

  return (
    <div className="flex items-center p-2">
      <LightModeOutlinedIcon
        className={`w-5 h-5 rounded-md border cursor-pointer mr-2 ${
          isDarkMode ? "bg-gray-600" : "bg-gray-200"
        }`}
        onClick={handleLightModeClick}
      />

      <DarkModeOutlinedIcon
        className={`w-5 h-5 rounded-md border cursor-pointer mr-2 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-900"
        }`}
        onClick={handleDarkModeClick}
      />
    </div>
  );
};

export default DarkModeToggle;
