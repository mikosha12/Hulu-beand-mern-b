// components/Layout.tsx
import React from 'react';
import Sidebar from '../components/Sidebar'; // Adjust import paths
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isDarkMode } = useTheme(); // Assuming you have a ThemeContext for dark mode

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-40 mt-0"> {/* Adjust margin-left and margin-top */}
        <Header />
        <main className="flex-1 p-4 overflow-auto"> {/* Padding and overflow handling */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
