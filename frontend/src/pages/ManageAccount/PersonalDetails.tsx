import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCamera, FaUserEdit, FaEnvelope, FaPhone, FaCalendarAlt, FaGlobe, FaMapMarkerAlt, FaIdCard, FaCog, FaStar, FaBookmark, FaSignOutAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchCurrentUser, updatePersonalDetails } from '../../api-client';


export type PersonalDetailsFormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: Date | null;
  nationality?: string;
  gender?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  passportDetails?: {
    firstName?: string;
    lastName?: string;
    issuingCountry?: string;
    number?: string;
    expiryDate?: Date | null;
  };
  // Only `dynamicProperties` allows dynamic keys
};
const PersonalDetails: React.FC = () => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<PersonalDetailsFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: null, 
    nationality: '',
    gender: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    passportDetails: {
      firstName: '',
      lastName: '',
      issuingCountry: '',
      number: '',
      expiryDate: null,
    },
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [profilePic, setProfilePic] = useState<string | ArrayBuffer | null>('/path-to-your-default-profile-pic.jpg');

  const navigate = useNavigate();

  const handleEditClick = (field: string) => {
    setIsEditing(field);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    const [field, subField] = name.split('.') as [keyof PersonalDetailsFormData, string | undefined]; 
  
    if (subField) {
      setFormData({
        ...formData,
        [field]: {
          ...(formData[field] as any), // Type assertion here
          [subField]: value,
        },
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };
  

  const handleDateChange = (date: Date | null, field: string) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Assuming you have imported updatePersonalDetails from your apiClient
      await updatePersonalDetails(formData); // Update using your API call
      alert('Personal details updated!');

  
    } catch (error) {
      console.error(error);
      alert('Error updating personal details. Please try again.');
    }
  };

  const handleSignOut = () => {
    alert('Signed out!');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await fetchCurrentUser(); 
        if (userDetails.dateOfBirth) { 
          userDetails.dateOfBirth = new Date(userDetails.dateOfBirth);
        } 

        // Convert passportDetails.expiryDate 
        if (userDetails.passportDetails?.expiryDate) {
          userDetails.passportDetails.expiryDate = new Date(userDetails.passportDetails.expiryDate); 
        }        setFormData(userDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle errors appropriately, like displaying an error message
      }
    };
    fetchUserDetails();
  }, []); 

  return (
    <div className="container mx-auto p-4">
      <header className="bg-blue-600 text-white py-4 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-xl font-semibold">HULUBEAND</span>
        </div>
        <div className="flex items-center relative">
          <Link to="/" className="text-white text-xl font-semibold mr-4">Home</Link>
          <button
            onClick={toggleDropdown}
            className="flex items-center px-4 py-2 font-bold text-white text-lg"
          >
            <FaCog className="text-xl" />
          </button>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 origin-top-right"
            >
              <div className="py-1">
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center text-lg"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/manage-account");
                  }}
                >
                  <FaCog className="text-lg mr-2" />
                  Manage Account
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center text-lg"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/reviews");
                  }}
                >
                  <FaStar className="text-lg mr-2" />
                  Reviews
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center text-lg"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/saved");
                  }}
                >
                  <FaBookmark className="text-lg mr-2" />
                  Saved
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center text-lg"
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
        <div className="flex items-center mb-6">
          <div className="relative">
            <img
              src={profilePic as string}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-gray-300"
            />
            <input
              type="file"
              accept="image/*"
              id="profile-pic-input"
              className="hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="profile-pic-input" className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer">
              <FaCamera className="text-gray-600 text-2xl" />
            </label>
          </div>
          <div className="ml-6">
            <h2 className="text-3xl font-bold">Personal Details</h2>
            <p className="text-gray-700 mt-2">Update your information and find out how it's used.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {[
            { label: 'Name', field: 'name', icon: <FaUserEdit />, value: `${formData.firstName} ${formData.lastName}` },
            { label: 'Email Address', field: 'email', icon: <FaEnvelope />, value: formData.email },
            { label: 'Phone Number', field: 'phoneNumber', icon: <FaPhone />, value: formData.phoneNumber },
            { label: 'Date of Birth', field: 'dateOfBirth', icon: <FaCalendarAlt />, value: formData.dateOfBirth ? (formData.dateOfBirth as Date).toLocaleDateString() : 'N/A' },
            { label: 'Nationality', field: 'nationality', icon: <FaGlobe />, value: formData.nationality },
            { label: 'Gender', field: 'gender', icon: <FaUserEdit />, value: formData.gender },
            { 
              label: 'Address', 
              field: 'address', 
              icon: <FaMapMarkerAlt />, 
              value: formData.address 
                ? `${formData.address.street || ''} ${formData.address.city || ''}, ${formData.address.state || ''} ${formData.address.postalCode || ''}` 
                : 'N/A'
            },
            { 
              label: 'Passport Details', 
              field: 'passportDetails', 
              icon: <FaIdCard />, 
              value: formData.passportDetails 
                ? `${formData.passportDetails.firstName || ''} ${formData.passportDetails.lastName || ''}` 
                : 'N/A' 
            },
          ].map((item) => (
            <div
              key={item.field}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col cursor-pointer hover:bg-gray-50 transition"
              onClick={() => handleEditClick(item.field)}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 flex items-center justify-center text-gray-600">{item.icon}</div>
                <div className="ml-4 flex-1">
                  <h3 className="text-xl font-semibold">{item.label}</h3>
                  <p className="text-gray-600">{item.value || 'N/A'}</p>
                </div>
                <div className="flex items-center">
                  <FaUserEdit className="text-gray-600 text-lg" />
                </div>
              </div>
              {isEditing === item.field && (
                <form onSubmit={handleSubmit} className="mt-4">
                  {item.field === 'name' && (
                    <>
                      <label className="block mb-2">
                        First Name
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="block w-full mt-1 border rounded p-2"
                        />
                      </label>
                      <label className="block mb-2">
                        Last Name
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="block w-full mt-1 border rounded p-2"
                        />
                      </label>
                    </>
                  )}
                  {item.field === 'email' && (
                    <label className="block mb-2">
                      Email Address
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full mt-1 border rounded p-2"
                      />
                    </label>
                  )}
                  {item.field === 'phoneNumber' && (
                    <label className="block mb-2">
                      Phone Number
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="block w-full mt-1 border rounded p-2"
                      />
                    </label>
                  )}
                  {item.field === 'dateOfBirth' && (
                    <label className="block mb-2">
                      Date of Birth
                      <DatePicker
                        selected={formData.dateOfBirth}
                        onChange={(date) => handleDateChange(date, 'dateOfBirth')}
                        className="block w-full mt-1 border rounded p-2"
                        dateFormat="MM/dd/yyyy"
                      />
                    </label>
                  )}
                  {item.field === 'nationality' && (
                    <label className="block mb-2">
                      Nationality
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className="block w-full mt-1 border rounded p-2"
                        />
                    </label>
                  )}
                  {item.field === 'gender' && (
                    <label className="block mb-2">
                      Gender
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="block w-full mt-1 border rounded p-2"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </label>
                  )}
                  {item.field === 'address' && (
                    <>
                      <label className="block mb-2">
                        Country
                        <input
                          type="text"
                          name="address.country"
                          value={formData.address?.country}
                          onChange={handleChange}
                          className="block w-full mt-1 border rounded p-2"
                        />
                      </label>
                      <label className="block mb-2">
                        Address
                        <input
                          type="text"
                          name="address.street"
                          value={formData.address?.street}
                          onChange={handleChange}
                          className="block w-full mt-1 border rounded p-2"
                        />
                      </label>
                      <label className="block mb-2">
                        Town/City
                        <input
                          type="text"
                          name="address.city"
                          value={formData.address?.city}
                          onChange={handleChange}
                          className="block w-full mt-1 border rounded p-2"
                        />
                      </label>
                      <label className="block mb-2">
                        Postal Code
                        <input
                          type="text"
                          name="address.postalCode"
                          value={formData.address?.postalCode}
                          onChange={handleChange}
                          className="block w-full mt-1 border rounded p-2"
                        />
                      </label>
                    </>
                  )}
                  {item.field === 'passportDetails' && (
                    <>
                      <label className="block mb-2">
                        First Name
                        <input
                          type="text"
                          name="passportDetails.firstName"
                          value={formData.passportDetails?.firstName}
                          onChange={handleChange}
                          className="block w-full mt-1 border rounded p-2"
                        />
                      </label>
                      <label className="block mb-2">
                        Last Name
                        <input
                          type="text"
                          name="passportDetails.lastName"
                          value={formData.passportDetails?.lastName}
                          onChange={handleChange}
                          className="block w-full mt-1 border rounded p-2"
                        />
                      </label>
                      <label className="block mb-2">
                        Issuing Country
                        <input
                          type="text"
                          name="passportDetails.issuingCountry"
                          value={formData.passportDetails?.issuingCountry}
                          onChange={handleChange}
                          className="block w-full mt-1 border rounded p-2"
                        />
                      </label>
                      <label className="block mb-2">
                        Passport Number
                        <input
                          type="text"
                          name="passportDetails.number"
                          value={formData.passportDetails?.number}
                          onChange={handleChange}
                          className="block w-full mt-1 border rounded p-2"
                        />
                      </label>
                      <label className="block mb-2">
                        Expiry Date
                        <DatePicker
                          selected={formData.passportDetails?.expiryDate}
                          onChange={(date) => handleDateChange(date, 'passportDetails.expiryDate')}
                          className="block w-full mt-1 border rounded p-2"
                          dateFormat="MM/dd/yyyy"
                        />
                      </label>
                    
                    </>
                  )}
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2024 HULUBEAND. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
export default PersonalDetails;

