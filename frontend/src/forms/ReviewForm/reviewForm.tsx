import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as apiClient from '../../api-client';
import { useAppContext } from '../../contexts/AppContext';
import { FaUserTie, FaHotel, FaWifi, FaBed, FaMoneyBillWave, FaMapMarkerAlt, FaBrush } from 'react-icons/fa'; // Import icons

// Define ReviewFormData type
export type ReviewFormData = {
  hotelId: string;
  userId: string;
  bookingId: string;
  staffRating: number;
  facilitiesRating: number;
  cleanlinessRating: number;
  comfortRating: number;
  valueForMoneyRating: number;
  locationRating: number;
  freeWifiRating: number;
  comment: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

const ReviewForm = () => {
  const { hotelId, bookingId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useAppContext(); // Access showToast

  const [formData, setFormData] = useState<ReviewFormData>({
    hotelId: hotelId!,
    userId: '', 
    bookingId: bookingId!,
    staffRating: 0,
    facilitiesRating: 0,
    cleanlinessRating: 0,
    comfortRating: 0,
    valueForMoneyRating: 0,
    locationRating: 0,
    freeWifiRating: 0,
    comment: '',
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.submitReview(formData);
      showToast({ message: "Review submitted successfully!", type: "SUCCESS" }); // Success message
      navigate(`/hotel/${hotelId}`); // Redirect to hotel page or another page after submission
    } catch (error) {
      console.error('Error submitting review:', error);
      showToast({ message: "Error submitting review", type: "ERROR" }); // Error message
    }
  };

  return (
    <div className="max-w-xl mx-auto rounded-lg shadow-lg p-6 bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Share Your Experience</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="staffRating" className="flex items-center gap-2 font-bold text-gray-700">
              <FaUserTie /> Staff Rating:
            </label>
            <input
              type="number"
              name="staffRating"
              id="staffRating"
              value={formData.staffRating} 
              onChange={handleChange}
              min="1"
              max="10"
              placeholder="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onFocus={(e) => {
                if (e.target.value === '0') {
                  e.target.value = ''; // Clear the input value if it's "0"
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="facilitiesRating" className="flex items-center gap-2 font-bold text-gray-700">
              <FaHotel /> Facilities Rating:
            </label>
            <input
              type="number"
              name="facilitiesRating"
              id="facilitiesRating"
              value={formData.facilitiesRating} 
              onChange={handleChange}
              min="1"
              max="10"
              placeholder="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onFocus={(e) => {
                if (e.target.value === '0') {
                  e.target.value = ''; // Clear the input value if it's "0"
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="cleanlinessRating" className="flex items-center gap-2 font-bold text-gray-700">
              <FaBrush /> Cleanliness Rating:
            </label>
            <input
              type="number"
              name="cleanlinessRating"
              id="cleanlinessRating"
              value={formData.cleanlinessRating} 
              onChange={handleChange}
              min="1"
              max="10"
              placeholder="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onFocus={(e) => {
                if (e.target.value === '0') {
                  e.target.value = ''; // Clear the input value if it's "0"
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="comfortRating" className="flex items-center gap-2 font-bold text-gray-700">
              <FaBed /> Comfort Rating:
            </label>
            <input
              type="number"
              name="comfortRating"
              id="comfortRating"
              value={formData.comfortRating} 
              onChange={handleChange}
              min="1"
              max="10"
              placeholder="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onFocus={(e) => {
                if (e.target.value === '0') {
                  e.target.value = ''; // Clear the input value if it's "0"
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="valueForMoneyRating" className="flex items-center gap-2 font-bold text-gray-700">
              <FaMoneyBillWave /> Value for Money Rating:
            </label>
            <input
              type="number"
              name="valueForMoneyRating"
              id="valueForMoneyRating"
              value={formData.valueForMoneyRating} 
              onChange={handleChange}
              min="1"
              max="10"
              placeholder="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onFocus={(e) => {
                if (e.target.value === '0') {
                  e.target.value = ''; // Clear the input value if it's "0"
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="locationRating" className="flex items-center gap-2 font-bold text-gray-700">
              <FaMapMarkerAlt /> Location Rating:
            </label>
            <input
              type="number"
              name="locationRating"
              id="locationRating"
              value={formData.locationRating} 
              onChange={handleChange}
              min="1"
              max="10"
              placeholder="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onFocus={(e) => {
                if (e.target.value === '0') {
                  e.target.value = ''; // Clear the input value if it's "0"
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="freeWifiRating" className="flex items-center gap-2 font-bold text-gray-700">
              <FaWifi /> Free Wifi Rating:
            </label>
            <input
              type="number"
              name="freeWifiRating"
              id="freeWifiRating"
              value={formData.freeWifiRating} 
              onChange={handleChange}
              min="1"
              max="10"
              placeholder="0"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onFocus={(e) => {
                if (e.target.value === '0') {
                  e.target.value = ''; // Clear the input value if it's "0"
                }
              }}
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="comment" className="block font-bold text-gray-700">Comment:</label>
          <textarea
            name="comment"
            id="comment"
            value={formData.comment}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
            rows={5}
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;