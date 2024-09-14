import React, { useState, useRef, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaCreditCard, FaShieldAlt, FaEnvelope, FaStar, FaBookmark, FaSignOutAlt } from 'react-icons/fa';
import { useMutation, useQueryClient } from 'react-query';
import { useAppContext } from "../../contexts/AppContext";
import * as apiClient from "../../api-client";

const ManageAccount: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({ message: 'Signed Out!', type: 'SUCCESS' });
      navigate('/login');
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-xl font-semibold">HULUBEAND</span>
        </div>
        <div className="flex items-center">
          <Link to="/" className="text-white text-xl font-semibold mr-4">Home</Link>
          <button
            onClick={toggleDropdown}
            className="flex items-center px-4 py-2 font-bold text-white"
          >
            <FaCog className="text-lg" />
          </button>
        </div>
      </header>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg z-20"
        >
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
              onClick={() => {
                setIsOpen(false);
                navigate("/manage-account");
              }}
            >
              <FaCog className="text-lg mr-2" />
              Manage Account
            </button>
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
              onClick={() => {
                setIsOpen(false);
                navigate("/reviews");
              }}
            >
              <FaStar className="text-lg mr-2" />
              Reviews
            </button>
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
              onClick={() => {
                setIsOpen(false);
                navigate("/saved");
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

      <h1 className="text-2xl font-bold mb-4 mt-8">Account settings</h1>
      <p className="text-gray-600 mb-6">Manage your HuluBeand experience</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaUser className="text-gray-600 text-2xl" />
            </div>
            <h2 className="ml-4 text-lg font-medium">Personal details</h2>
          </div>
          <p className="text-gray-600">Update your information and find out how it's used.</p>
          <Link
            to="personal-details"
            className="inline-block text-blue-600 hover:underline"
          >
            Manage personal details
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaCog className="text-gray-600 text-2xl" />
            </div>
            <h2 className="ml-4 text-lg font-medium">Security</h2>
          </div>
          <p className="text-gray-600">Manage your account security settings.</p>
          <Link
            to="security"
            className="inline-block text-blue-600 hover:underline"
          >
            Manage security settings
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaCreditCard className="text-gray-600 text-2xl" />
            </div>
            <h2 className="ml-4 text-lg font-medium">Payment Details</h2>
          </div>
          <p className="text-gray-600">Update your payment methods and billing information.</p>
          <Link
            to="payment-details"
            className="inline-block text-blue-600 hover:underline"
          >
            Manage payment details
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaShieldAlt className="text-gray-600 text-2xl" />
            </div>
            <h2 className="ml-4 text-lg font-medium">Privacy</h2>
          </div>
          <p className="text-gray-600">Manage your privacy settings and data preferences.</p>
          <Link
            to="privacy"
            className="inline-block text-blue-600 hover:underline"
          >
            Manage privacy settings
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <FaEnvelope className="text-gray-600 text-2xl" />
            </div>
            <h2 className="ml-4 text-lg font-medium">Email Notifications</h2>
          </div>
          <p className="text-gray-600">Manage your email notification preferences.</p>
          <Link
            to="email-notifications"
            className="inline-block text-blue-600 hover:underline"
          >
            Manage email notifications
          </Link>
        </div>
      </div>

      <Outlet />

      <footer className="bg-blue-600 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} HULUBEAND. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ManageAccount;
