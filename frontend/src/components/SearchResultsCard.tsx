import { Link } from "react-router-dom";
import { HotelType, ReviewType } from "../../../backend/shared/types";
import { AiFillStar } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { useState } from "react";

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  const averageRating = hotel.averageRating || 0;
  const ratingDisplay = averageRating > 0 ? averageRating.toFixed(1) : "No Rating Yet";
  const reviewCount = hotel.reviews.length;

  // Calculate category averages
  const getCategoryAverage = (ratingCategory: keyof ReviewType) => {
    const ratings = hotel.reviews
      .map(review => review[ratingCategory])
      .filter((rating): rating is number => typeof rating === 'number');

    if (ratings.length === 0) return 0;

    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  const [hovered, setHovered] = useState(false);

  // Function to get rating message based on averageRating
  const getRatingMessage = (averageRating: number) => {
    if (averageRating >= 9) {
      return "Exceptional";
    } else if (averageRating >= 8) {
      return "Excellent";
    } else if (averageRating >= 7) {
      return "Very Good";
    } else if (averageRating >= 6) {
      return "Good";
    } else if (averageRating >= 5) {
      return "Average";
    } else if (averageRating >= 4) {
      return "Below Average";
    } else if (averageRating >= 3) {
      return "Poor";
    } else if (averageRating >= 2) {
      return "Very Poor";
    } else {
      return "Terrible";
    }
  };

  return (
    <Link to={`/detail/${hotel._id}`} className="block">
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-blue-50">
        <div className="w-full h-[300px] relative rounded-lg overflow-hidden">
          <img
            src={hotel.imageUrls[0]}
            alt={hotel.name}
            className="w-full h-full object-cover object-center"
          />
          <span className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-bold">
            {hotel.pricePerNight} Birr/night
          </span>
          <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg text-sm font-bold text-gray-800">
            {hotel.type}
          </div>
        </div>

        <div className="flex flex-col justify-between p-2">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xl font-bold cursor-pointer text-gray-800 hover:text-blue-600 transition-colors duration-300">
                {hotel.name}
              </div>
              <div className="flex items-center gap-4 mt-1">
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
            <div
              className="relative flex flex-col items-end"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {averageRating > 0 && (
                <>
                  <span className="text-sm text-gray-800">
                    {getRatingMessage(averageRating)}
                  </span>
                  <span className="text-xs text-gray-600">{reviewCount} reviews</span>
                </>
              )}
              <div className="bg-blue-600 text-white py-1 px-3 font-bold text-sm rounded-lg hover:bg-blue-500 transition-colors duration-300 mt-1">
                <span className="text-lg">{ratingDisplay}</span>
              </div>

              {/* Pop-up card with progress bars */}
              {hovered && (
                <div className="absolute top-10 right-2 bg-white p-4 border border-gray-300 rounded-lg shadow-lg text-gray-800 w-64">
                  <div className="flex items-center justify-center mb-2">
                    <BsFillEmojiSmileFill className="text-blue-600 text-2xl" />
                    <span className="ml-2 text-sm font-bold text-gray-800">
                      Rating Breakdown
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2"> {/* Two-column layout */}
                    {[
                      { label: "Staff", value: getCategoryAverage("staffRating") },
                      { label: "Facilities", value: getCategoryAverage("facilitiesRating") },
                      { label: "Cleanliness", value: getCategoryAverage("cleanlinessRating") },
                      { label: "Comfort", value: getCategoryAverage("comfortRating") },
                      { label: "Value for Money", value: getCategoryAverage("valueForMoneyRating") },
                    ].map((category, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-600">{category.label}</span>
                          <span className="text-xs text-gray-600">{category.value}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Number(category.value) * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    {[
                      { label: "Location", value: getCategoryAverage("locationRating") },
                      { label: "Free WiFi", value: getCategoryAverage("freeWifiRating") },
                    ].map((category, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-600">{category.label}</span>
                          <span className="text-xs text-gray-600">{category.value}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Number(category.value) * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-2">
            <p className="line-clamp-3 text-gray-600 text-sm">{hotel.description}</p>
          </div>

          <div className="flex justify-between items-end mt-2">
            <div className="flex gap-1 items-center">
              {hotel.facilities.slice(0, 3).map((facility) => (
                <span
                  key={facility}
                  className="bg-slate-200 p-1 rounded-lg font-bold text-xs whitespace-nowrap text-gray-800"
                >
                  {facility}
                </span>
              ))}
              {hotel.facilities.length > 3 && (
                <span className="text-xs text-gray-600">
                  +{hotel.facilities.length - 3} more
                </span>
              )}
            </div>
            <div className="bg-blue-600 text-white py-1 px-3 font-bold text-sm rounded-lg hover:bg-blue-500 transition-colors duration-300">
              View More
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultsCard;