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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { fetchAllRooms, updateRoom, deleteRoom } from "../admin-Client"; // Update import paths as necessary

interface RoomType {
  _id: string;
  roomType: string;
  numberOfRooms: number;
  pricePerNight: number;
  availability: boolean;
}

interface Order {
  column: keyof RoomType;
  direction: "asc" | "desc";
}

const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>({
    column: "roomType",
    direction: "asc",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getRooms = async () => {
      try {
        const fetchedRooms = await fetchAllRooms();
        setRooms(fetchedRooms);
      } catch (error) {
        setError("Error fetching rooms");
      } finally {
        setLoading(false);
      }
    };

    getRooms();
  }, []);

  const handleUpdateRoom = async (room: RoomType) => {
    try {
      await room._id; // Implement actual update logic
      const updatedRooms = await fetchAllRooms();
      setRooms(updatedRooms);
    } catch (error) {
      setError("Error updating room");
    }
  };

  const handleDeleteRoom = async (room: RoomType) => {
    try {
      await deleteRoom(room._id);
      const updatedRooms = await fetchAllRooms();
      setRooms(updatedRooms);
    } catch (error) {
      setError("Error deleting room");
    }
  };

  const handleViewRoom = (room: RoomType) => {
    navigate(`/rooms/${room._id}`);
  };

  const sortedRooms = [...rooms].sort((a, b) => {
    const isAsc = order.direction === "asc";
    switch (order.column) {
      case "roomType":
        return (a.roomType < b.roomType ? -1 : 1) * (isAsc ? 1 : -1);
      case "pricePerNight":
        return (a.pricePerNight < b.pricePerNight ? -1 : 1) * (isAsc ? 1 : -1);
      case "availability":
        return (a.availability < b.availability ? -1 : 1) * (isAsc ? 1 : -1);
      default:
        return 0;
    }
  });

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = sortedRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(rooms.length / roomsPerPage);

  const handleSort = (column: keyof RoomType) => {
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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Room List</h1>
        <Tooltip title="Add New Room">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => console.log("Add New Room")} // Implement actual navigation
          >
            Add New
          </button>
        </Tooltip>
      </div>

      <TableContainer component={Paper} className="rounded-lg shadow-md">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                className="px-4 py-2 font-medium text-gray-700"
              >
                <TableSortLabel
                  active={order.column === "roomType"}
                  direction={order.direction}
                  onClick={() => handleSort("roomType")}
                >
                  Room Type
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                className="px-4 py-2 font-medium text-gray-700"
              >
                <TableSortLabel
                  active={order.column === "numberOfRooms"}
                  direction={order.direction}
                  onClick={() => handleSort("numberOfRooms")}
                >
                  Number of Rooms
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                className="px-4 py-2 font-medium text-gray-700"
              >
                <TableSortLabel
                  active={order.column === "pricePerNight"}
                  direction={order.direction}
                  onClick={() => handleSort("pricePerNight")}
                >
                  Price per Night
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                className="px-4 py-2 font-medium text-gray-700"
              >
                <TableSortLabel
                  active={order.column === "availability"}
                  direction={order.direction}
                  onClick={() => handleSort("availability")}
                >
                  Availability
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                className="px-4 py-2 font-medium text-gray-700"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRooms.map((room) => (
              <TableRow key={room._id}>
                <TableCell align="center" className="px-4 py-2">
                  {room.roomType}
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  {room.numberOfRooms}
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  ${room.pricePerNight}
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  {room.availability ? "Available" : "Not Available"}
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <Tooltip title="View Room">
                      <IconButton
                        aria-label="view"
                        onClick={() => handleViewRoom(room)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Room">
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleUpdateRoom(room)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Room">
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteRoom(room)}
                        className="text-red-500 hover:text-red-600"
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

export default RoomList;
