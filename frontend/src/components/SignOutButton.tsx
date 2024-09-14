import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { FaUser, FaCog, FaStar, FaBookmark, FaSignOutAlt } from "react-icons/fa";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
      navigate("/login"); // Redirect to login page after sign out
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSignOut = () => {
    mutation.mutate();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 font-bold focus:outline-none"
      >
        <FaUser className="text-lg mr-2 text-black" />
        <span className="text-black">Account</span>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
        >
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
              onClick={() => {
                setIsOpen(false);
                navigate("/manage-account"); // Navigate to Manage Account page
              }}
            >
              <FaCog className="text-lg mr-2" />
              Manage Account
            </button>
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
              onClick={() => {
                setIsOpen(false);
                navigate("/reviews"); // Navigate to Reviews page
              }}
            >
              <FaStar className="text-lg mr-2" />
              Reviews
            </button>
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
              onClick={() => {
                setIsOpen(false);
                navigate("/saved"); // Navigate to Saved items page
              }}
            >
              <FaBookmark className="text-lg mr-2" />
              Saved
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
            >
              <FaSignOutAlt className="text-lg mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
