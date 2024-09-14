import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useHeroVisibility } from "../contexts/HeroVisibilityContext";
import { MdCalendarToday, MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const { setHeroVisibility } = useHeroVisibility();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn || new Date());
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut || new Date());
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [isSearchPerformed, setIsSearchPerformed] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
    setHeroVisibility(false); // Hide the hero section
    setIsSearchPerformed(true); // Update the state to indicate search performed
    navigate("/search");
  };

  const handleClear = () => {
    navigate('/');
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(0);
    setHeroVisibility(true); // Show the hero section again
    setIsSearchPerformed(false); // Reset the search performed state
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className={`relative z-20 max-w-4xl mx-auto p-4 shadow-lg rounded-lg border border-gray-200 
      ${isSearchPerformed ? '-m-4 bg-black text-white' : '-mt-20 bg-white'}`}>
      <form
        onSubmit={handleSubmit}
        className={`grid grid-cols-1 gap-4 ${isSearchPerformed ? 'md:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-4'}`}
      >
        <div className={`flex items-center p-3 rounded-lg 
          ${isSearchPerformed ? 'col-span-4 bg-gray-100 text-black' : 'col-span-2 lg:col-span-4 bg-gray-100 text-black'}`}>
          <MdTravelExplore size={24} className="mr-3" />
          <input
            placeholder="Where are you going?"
            className="text-md w-full bg-transparent border-none focus:outline-none"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            style={{ color: isSearchPerformed ? 'black' : 'black' }}
          />
        </div>

        {isSearchPerformed && (
          <div className="flex items-center gap-4 col-span-4 bg-gray-100 text-black p-3 rounded-lg">
            <div className="flex flex-col items-center">
              <label className="block text-gray-700">Adults:</label>
              <input
                className="mt-1 w-16 p-2 border rounded-lg text-center focus:outline-none"
                type="number"
                min={1}
                max={20}
                value={adultCount}
                onChange={(event) => setAdultCount(parseInt(event.target.value))}
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="block text-gray-700">Children:</label>
              <input
                className="mt-1 w-16 p-2 border rounded-lg text-center focus:outline-none"
                type="number"
                min={0}
                max={20}
                value={childCount}
                onChange={(event) => setChildCount(parseInt(event.target.value))}
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="block text-gray-700">Check-in:</label>
              <div className="relative">
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date as Date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={minDate}
                  maxDate={maxDate}
                  placeholderText="Check-in Date"
                  className="w-40 p-2 bg-transparent border rounded-lg focus:outline-none"
                />
                <MdCalendarToday size={20} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
              </div>
              {checkIn && (
                <span className="text-gray-600 text-sm">
                  {checkIn.toLocaleDateString("en-US", { weekday: "long" })}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center">
              <label className="block text-gray-700">Check-out:</label>
              <div className="relative">
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date as Date)}
                  selectsEnd
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={checkIn}
                  maxDate={maxDate}
                  placeholderText="Check-out Date"
                  className="w-40 p-2 bg-transparent border rounded-lg focus:outline-none"
                />
                <MdCalendarToday size={20} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
              </div>
              {checkOut && (
                <span className="text-gray-600 text-sm">
                  {checkOut.toLocaleDateString("en-US", { weekday: "long" })}
                </span>
              )}
            </div>

            <button className="flex-1 bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-300">
              Search
            </button>
          </div>
        )}

        {!isSearchPerformed && (
          <>
            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="block text-gray-700">Adults:</label>
              <input
                className="mt-1 w-full p-2 border rounded-lg text-center focus:outline-none"
                type="number"
                min={1}
                max={20}
                value={adultCount}
                onChange={(event) => setAdultCount(parseInt(event.target.value))}
              />
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <label className="block text-gray-700">Children:</label>
              <input
                className="mt-1 w-full p-2 border rounded-lg text-center focus:outline-none"
                type="number"
                min={0}
                max={20}
                value={childCount}
                onChange={(event) => setChildCount(parseInt(event.target.value))}
              />
            </div>

            <div className="flex flex-col gap-2 bg-gray-100 p-3 rounded-lg">
              <label className="block text-gray-700">Check-in:</label>
              <div className="relative">
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date as Date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={minDate}
                  maxDate={maxDate}
                  placeholderText="Check-in Date"
                  className="w-full p-2 bg-transparent border rounded-lg focus:outline-none"
                />
                <MdCalendarToday size={20} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
              </div>
              {checkIn && (
                <span className="text-gray-600 text-sm">
                  {checkIn.toLocaleDateString("en-US", { weekday: "long" })}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 bg-gray-100 p-3 rounded-lg">
              <label className="block text-gray-700">Check-out:</label>
              <div className="relative">
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date as Date)}
                  selectsEnd
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={checkIn}
                  maxDate={maxDate}
                  placeholderText="Check-out Date"
                  className="w-full p-2 bg-transparent border rounded-lg focus:outline-none"
                />
                <MdCalendarToday size={20} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
              </div>
              {checkOut && (
                <span className="text-gray-600 text-sm">
                  {checkOut.toLocaleDateString("en-US", { weekday: "long" })}
                </span>
              )}
            </div>
          </>
        )}

        {!isSearchPerformed && (
          <div className="flex gap-4 col-span-2 lg:col-span-4">
            <button className="flex-1 bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-500 transition duration-300">
              Search
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-500 transition duration-300"
            >
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
