import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { HotelType } from "../../../backend/shared/types"; 

const MyBookings = () => {
  const { data: hotels } = useQuery<HotelType[]>(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {hotels.map((hotel) => (
        <div key={hotel._id} className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5 relative">
          <div className="lg:w-full lg:h-[250px]">
            <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center" />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">
              {hotel.name}
              <div className="text-xs font-normal">{hotel.city}, {hotel.country}</div>
            </div>
            {hotel.bookings.map((booking) => (
              <div key={booking._id}>
                <div>
                  <span className="font-bold mr-2">Dates: </span>
                  <span>{new Date(booking.checkIn).toDateString()} - {new Date(booking.checkOut).toDateString()}</span>
                </div>
                <div>
                  <span className="font-bold mr-2">Guests:</span>
                  <span>{booking.adultCount} adults, {booking.childCount} children</span>
                </div>
                {/* Write Review Button */}
                {new Date() > new Date(booking.checkOut) && (
                  <Link to={`/hotel/${hotel._id}/${booking._id}/review`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-5 right-5">
                      Write a Review
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;