import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/shared/types";
import { AiFillStar } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";

type Props = {
  hotel: HotelType;
};

const SearchResultsCardForMap = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="block mb-4" // Add margin for spacing
    >
      <div className="border border-slate-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-blue-50 p-2">
        {/* Image and Hotel Details */}
        <div className="flex gap-4">
          <div className="w-6/12 relative rounded-lg overflow-hidden"> {/* Reduced image width to 6/12 (half) */}
            <img
              src={hotel.imageUrls[0]}
              alt={hotel.name}
              className="w-full h-32 object-cover object-center" // Adjust height as needed
            />
            <span className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-bold">
              {hotel.pricePerNight} Birr/night
            </span>
          </div>
          <div className="w-6/12 flex flex-col justify-between"> {/* Increased text area width to 6/12 (half) */}
            <div>
              <div className="text-md font-bold cursor-pointer text-gray-800 hover:text-blue-600 transition-colors duration-300">
                {hotel.name}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {Array.from({ length: hotel.starRating }).map((_, index) => (
                    <AiFillStar key={index} className="fill-yellow-400 text-lg" />
                  ))}
                </div>
                <div className="flex items-center text-sm text-blue-600">
                  <FaMapMarkerAlt className="mr-1" />
                  {hotel.city}, {hotel.country}
                </div>
              </div>
            </div>
            <div className="mt-2 text-gray-600 text-sm">
              <p className="line-clamp-2">{hotel.description}</p>
            </div>
            <div className="flex justify-end items-end mt-2">
              <div className="bg-blue-600 text-white py-1 px-3 font-bold text-sm rounded-lg hover:bg-blue-500 transition-colors duration-300">
                View More
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsCardForMap;