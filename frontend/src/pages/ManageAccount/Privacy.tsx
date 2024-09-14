import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCog, FaStar, FaBookmark, FaSignOutAlt } from 'react-icons/fa';

const Privacy: React.FC = () => {
  const [shareDataWithPartners, setShareDataWithPartners] = useState<boolean>(false);
  const [allowTargetedAds, setAllowTargetedAds] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting privacy preferences:', {
      shareDataWithPartners,
      allowTargetedAds,
    });
    alert('Privacy preferences updated!');
  };

  return (
    <div className="container mx-auto p-4">
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-xl font-semibold">HULUBEAND</span>
        </div>
        <div className="flex items-center relative">
          <Link to="/" className="text-white text-xl font-semibold mr-4">Home</Link>
          <button
            onClick={handleToggleDropdown}
            className="flex items-center px-4 py-2 font-bold text-white"
          >
            <FaCog className="text-lg" />
          </button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
              style={{ top: '100%' }}
            >
              <div className="py-1">
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
                  onClick={() => handleNavigate("/manage-account")}
                >
                  <FaCog className="text-lg mr-2" />
                  Manage Account
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
                  onClick={() => handleNavigate("/reviews")}
                >
                  <FaStar className="text-lg mr-2" />
                  Reviews
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
                  onClick={() => handleNavigate("/saved")}
                >
                  <FaBookmark className="text-lg mr-2" />
                  Saved
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
                  onClick={() => alert('Signed out!')}
                >
                  <FaSignOutAlt className="text-lg mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="mb-8">
        <div className="flex items-center">
          <div className="ml-4">
            <h2 className="text-2xl font-bold">Privacy Settings</h2>
            <p className="text-gray-600">Manage your privacy preferences and control how your data is used.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mt-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="shareDataWithPartners" className="block text-sm font-medium text-gray-700">
                Share my data with partner companies:
              </label>
              <input
                type="checkbox"
                id="shareDataWithPartners"
                checked={shareDataWithPartners}
                onChange={(e) => setShareDataWithPartners(e.target.checked)}
                className="mt-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="allowTargetedAds" className="block text-sm font-medium text-gray-700">
                Allow targeted advertising:
              </label>
              <input
                type="checkbox"
                id="allowTargetedAds"
                checked={allowTargetedAds}
                onChange={(e) => setAllowTargetedAds(e.target.checked)}
                className="mt-2"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Save Changes</button>
          </form>
        </div>
      </div>

      <footer className="bg-blue-600 text-white py-4 px-6 mt-8">
        <div className="text-center">
          <p>&copy; 2024 HULUBEAND. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Privacy;
