import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      {/* Image Gallery Card */}
      <div className="relative rounded-lg overflow-hidden shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* First Image (Larger) */}
          {hotel.imageUrls.length > 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[300px]"> 
              <img
                src={hotel.imageUrls[0]}
                alt={hotel.name}
                className="rounded-md w-full h-full object-cover object-center"
              />
            </div>
          )}

          {/* Remaining Images (Smaller) */}
          {hotel.imageUrls.slice(1, 7).map((image, index) => (
            <div key={index} className="h-[150px]">
              <img
                src={image}
                alt={hotel.name}
                className="rounded-md w-full h-full object-cover object-center"
              />
            </div>
          ))}
          {hotel.imageUrls.length > 7 && (
            <div className="h-[150px] flex items-center justify-center text-white bg-gray-800 rounded-md">
              {`+ ${hotel.imageUrls.length - 7} Photos`}
            </div>
          )}
        </div>
        {/* Add a 'View More' button if there are more images */}
        {hotel.imageUrls.length > 7 && (
          <button className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            View More
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;