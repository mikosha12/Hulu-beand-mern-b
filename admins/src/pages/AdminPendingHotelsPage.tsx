import React, { useEffect, useState } from "react";
import { fetchPendingHotels, fetchHotelById } from "../admin-Client";
import { HotelType } from "../../../backend/shared/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Divider,
  Box,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const AdminPendingHotelsPage: React.FC = () => {
  const [pendingHotels, setPendingHotels] = useState<HotelType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPendingHotels = async () => {
      try {
        const hotels = await fetchPendingHotels();
        setPendingHotels(hotels);
      } catch (err) {
        setError("Error fetching pending hotels");
      }
    };

    loadPendingHotels();
  }, []);

  const handleApprove = async (hotelId: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/approve/${hotelId}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Error approving hotel");
      }
      // Update the state to remove the approved hotel
      setPendingHotels(pendingHotels.filter((hotel) => hotel._id !== hotelId));
    } catch (err) {
      setError("Error approving hotel");
    }
  };

  const handleReject = async (hotelId: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/reject/${hotelId}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Error rejecting hotel");
      }

      // Update the state to remove the rejected hotel
      setPendingHotels(pendingHotels.filter((hotel) => hotel._id !== hotelId));
    } catch (err) {
      setError("Error rejecting hotel");
    }
  };

  // No need for handleHotelClick anymore, since we're using Link to navigate

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Pending Hotels</h1>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <TableContainer
        component={Paper}
        className="rounded-lg shadow-md"
        sx={{ maxWidth: "800px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                className="px-4 py-2 font-medium text-gray-700"
                sx={{ paddingY: "10px" }}
              >
                Name
              </TableCell>
              <TableCell
                align="center"
                className="px-4 py-2 font-medium text-gray-700"
                sx={{ paddingY: "10px" }}
              >
                City
              </TableCell>
              <TableCell
                align="center"
                className="px-4 py-2 font-medium text-gray-700"
                sx={{ paddingY: "10px" }}
              >
                Country
              </TableCell>
              <TableCell
                align="center"
                className="px-4 py-2 font-medium text-gray-700"
                sx={{ paddingY: "10px" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingHotels.length > 0 ? (
              pendingHotels.map((hotel) => (
                <TableRow key={hotel._id}>
                  <TableCell
                    align="center"
                    className="px-4 py-2 cursor-pointer"
                  >
                    <Link to={`/hotels/${hotel._id}`}>
                      {" "}
                      {/* Link to HotelDetailView */}
                      {hotel.name}
                    </Link>
                  </TableCell>
                  <TableCell align="center" className="px-4 py-2">
                    {hotel.city}
                  </TableCell>
                  <TableCell align="center" className="px-4 py-2">
                    {hotel.country}
                  </TableCell>
                  <TableCell align="center" className="px-4 py-2">
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleApprove(hotel._id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleReject(hotel._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" className="px-4 py-2">
                  <p>No pending hotels found.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminPendingHotelsPage;
