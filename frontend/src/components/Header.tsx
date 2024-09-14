import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
import logo from "../assets/HULU.png"; // Assume you have a logo image

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-2">
          <Link to="/">
            {<img src={logo} alt="HULUBEAND Logo" className="h-10" />}
          </Link>
        </div>

        <nav className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-gray-800 px-4 py-2 font-bold rounded hover:bg-gray-200 transition duration-300"
                to="/my-bookings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7h18M9 12h6m-6 4h6m-3 4h6m-6-8h6"
                  />
                </svg>
                My Bookings
              </Link>
              <Link
                className="flex items-center text-gray-800 px-4 py-2 font-bold rounded hover:bg-gray-200 transition duration-300"
                to="/my-hotels"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2 2m0-6l2 2m6-6h6M9 3h6m-6 12h6m-3 4h6m-6-8h6"
                  />
                </svg>
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/signin"
              className="flex items-center text-blue-600 bg-gray-100 px-4 py-2 font-bold rounded hover:bg-gray-200 transition duration-300"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
