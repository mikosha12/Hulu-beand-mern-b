import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";

const MyHotels = () => {
  const { data: hotelData, isLoading, isError } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  );

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (isError || !hotelData || hotelData.length === 0) {
    return <div className="flex justify-center items-center h-screen">No Hotels found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-10 mb-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">My Hotels</h1>
            <Link
              to="/add-hotel"
              className="flex items-center bg-white text-blue-600 text-xl font-bold p-2 rounded-lg hover:bg-gray-100"
            >
              <FiPlus className="mr-2" />
              Add Hotel
            </Link>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold mb-2">{hotel.name}</h2>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <BsMap className="mr-2 text-gray-600" />
                <span className="text-gray-700">{hotel.city}, {hotel.country}</span>
              </div>
              <div className="flex items-center">
                <BsBuilding className="mr-2 text-gray-600" />
                <span className="text-gray-700">{hotel.type}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <BiMoney className="mr-2 text-gray-600" />
                <span className="text-gray-700">{hotel.pricePerNight} Birr per night</span>
              </div>
              <div className="flex items-center">
                <BiStar className="mr-2 text-gray-600" />
                <span className="text-gray-700">{hotel.starRating} Star Rating</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <BiHotel className="mr-2 text-gray-600" />
                <span className="text-gray-700">
                  {hotel.adultCount} adults, {hotel.childCount} children
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-blue-600 text-white text-xl font-bold p-2 rounded-lg hover:bg-blue-500"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;