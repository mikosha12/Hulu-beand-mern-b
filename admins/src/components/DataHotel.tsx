import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Pagination,
  TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { fetchAllHotels, updateHotel, deleteHotel } from "../admin-Client";
import { HotelType } from "../../../backend/shared/types"; // Import types
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useTheme } from '../context/ThemeContext'; // Import your theme context

interface Order {
  column: keyof HotelType; // Use HotelTypes here
  direction: "asc" | "desc";
}

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<HotelType[]>([]); // Use HotelTypes here
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>({
    column: "name",
    direction: "asc",
  });

  const navigate = useNavigate(); // Initialize useNavigate
  const { isDarkMode } = useTheme(); // Use theme context

  // Function to fetch hotels
  useEffect(() => {
    const getHotels = async () => {
      try {
        const fetchedHotels = await fetchAllHotels();
        setHotels(fetchedHotels);
      } catch (error) {
        setError("Error fetching hotels");
      } finally {
        setLoading(false);
      }
    };

    getHotels();
  }, []);

  // Function to handle hotel update
  const handleUpdateHotel = async (hotel: HotelType) => {
    try {
      await updateHotel(hotel._id, hotel); // Implement actual update logic
      const updatedHotels = await fetchAllHotels();
      setHotels(updatedHotels);
    } catch (error) {
      setError("Error updating hotel");
    }
  };

  // Function to handle hotel deletion
  const handleDeleteHotel = async (hotel: HotelType) => {
    try {
      await deleteHotel(hotel._id); // Pass the hotel's _id as a string
      const updatedHotels = await fetchAllHotels();
      setHotels(updatedHotels);
    } catch (error) {
      setError("Error deleting hotel");
    }
  };

  // Function to handle hotel view
  const handleViewHotel = (hotel: HotelType) => {
    navigate(`/hotels/${hotel._id}`); // Navigate to the hotel detail view
  };

  // Sort the hotels based on the current order
  const sortedHotels = [...hotels].sort((a, b) => {
    const isAsc = order.direction === "asc";
    switch (order.column) {
      case "name":
        return (a.name < b.name ? -1 : 1) * (isAsc ? 1 : -1);
      case "country":
        return (a.country < b.country ? -1 : 1) * (isAsc ? 1 : -1);
      case "city":
        return (a.city < b.city ? -1 : 1) * (isAsc ? 1 : -1);
      case "starRating":
        return (a.starRating - b.starRating) * (isAsc ? 1 : -1);
      default:
        return 0;
    }
  });

  // Get current hotels to display
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = sortedHotels.slice(indexOfFirstHotel, indexOfLastHotel);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  // Function to handle column sorting
  const handleSort = (column: keyof HotelType) => {
    const isAsc = order.column === column && order.direction === "asc";
    setOrder({
      column,
      direction: isAsc ? "desc" : "asc",
    });
  };

  if (loading)
    return (
      <Typography variant="h6" align="center" className="p-4">
        Loading...
      </Typography>
    );
  if (error)
    return (
      <Typography variant="h6" align="center" color="error" className="p-4">
        {error}
      </Typography>
    );

  return (
    <div className={`container mx-auto p-4 ${isDarkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Hotel List</h1>
        <Tooltip title="Add New Hotel">
          <button
            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${isDarkMode ? 'bg-green-600' : 'bg-green-500'}`}
          >
            <Link to="/add-hotel" className="flex items-center">
              <AddIcon className="mr-2" /> Add New
            </Link>
          </button>
        </Tooltip>
      </div>

      <TableContainer component={Paper} className={`rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-black'}`}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                className={`px-4 py-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}
              >
                <TableSortLabel
                  active={order.column === "name"}
                  direction={order.direction}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                className={`px-4 py-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}
              >
                <TableSortLabel
                  active={order.column === "country"}
                  direction={order.direction}
                  onClick={() => handleSort("country")}
                >
                  Country
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                className={`px-4 py-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}
              >
                <TableSortLabel
                  active={order.column === "city"}
                  direction={order.direction}
                  onClick={() => handleSort("city")}
                >
                  City
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                className={`px-4 py-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}
              >
                <TableSortLabel
                  active={order.column === "starRating"}
                  direction={order.direction}
                  onClick={() => handleSort("starRating")}
                >
                  Rating
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                className={`px-4 py-2 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentHotels.map((hotel) => (
              <TableRow key={hotel._id}>
                <TableCell align="center" className={`px-4 py-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                  {hotel.name}
                </TableCell>
                <TableCell align="center" className={`px-4 py-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                  {hotel.country}
                </TableCell>
                <TableCell align="center" className={`px-4 py-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                  {hotel.city}
                </TableCell>
                <TableCell align="center" className={`px-4 py-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                  {hotel.starRating}
                </TableCell>
                <TableCell align="center" className={`px-4 py-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
                  <div className="flex gap-2 justify-center">
                    <Tooltip title="View Hotel">
                      <IconButton
                        aria-label="view"
                        onClick={() => handleViewHotel(hotel)}
                        className={`text-gray-500 hover:text-gray-700 ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : ''}`}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit Hotel">
                      <IconButton
                        aria-label="edit"
                        onClick={() => navigate(`/hotels/edit/${hotel._id}`)} // Navigate to edit route
                        className={`text-blue-500 hover:text-blue-600 ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : ''}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Hotel">
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteHotel(hotel)}
                        className={`text-red-500 hover:text-red-600 ${isDarkMode ? 'text-red-400 hover:text-red-300' : ''}`}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination component */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => paginate(page)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Box>
    </div>
  );
};

export default HotelList;
