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
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchAllUsers, updateUser, deleteUser } from "../admin-Client";

interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string[];
  nationality?: string;
}

interface Order {
  column: keyof UserType;
  direction: "asc" | "desc";
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [order, setOrder] = useState<Order>({
    column: "firstName",
    direction: "asc",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  // Function to fetch users
  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  // Function to handle user update
  const handleUpdateUser = async (user: UserType) => {
    //   try {
    //     await updateUser(); // Implement actual update logic
    //     const updatedUsers = await fetchAllUsers();
    //     setUsers(updatedUsers);
    //   } catch (error) {
    //     setError("Error updating user");
    //   }
  };

  // Function to handle user deletion
  const handleDeleteUser = async (user: UserType) => {
    try {
      await deleteUser(user._id);
      const updatedUsers = await fetchAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      setError("Error deleting user");
    }
  };

  // Function to handle user view
  const handleViewUser = (user: UserType) => {
    navigate(`/users/${user._id}`); // Navigate to the user detail view
  };

  // Sort the users based on the current order
  const sortedUsers = [...users].sort((a, b) => {
    const isAsc = order.direction === "asc";
    switch (order.column) {
      case "firstName":
        return (a.firstName < b.firstName ? -1 : 1) * (isAsc ? 1 : -1);
      case "lastName":
        return (a.lastName < b.lastName ? -1 : 1) * (isAsc ? 1 : -1);
      case "email":
        return (a.email < b.email ? -1 : 1) * (isAsc ? 1 : -1);
      default:
        return 0;
    }
  });

  // Get current users to display
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Function to handle column sorting
  const handleSort = (column: keyof UserType) => {
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
        <h1 className="text-2xl font-bold text-gray-800">User List</h1>
        <Tooltip title="Add New User">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => console.log("Add New User")} // Implement actual navigation
          >
           <Link to="/add-user" className="flex items-center">
              Add New
            </Link>
          
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
                  active={order.column === "firstName"}
                  direction={order.direction}
                  onClick={() => handleSort("firstName")}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                className="px-4 py-2 font-medium text-gray-700"
              >
                <TableSortLabel
                  active={order.column === "lastName"}
                  direction={order.direction}
                  onClick={() => handleSort("lastName")}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                className="px-4 py-2 font-medium text-gray-700"
              >
                <TableSortLabel
                  active={order.column === "email"}
                  direction={order.direction}
                  onClick={() => handleSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="center"
                className="px-4 py-2 font-medium text-gray-700"
              >
                <TableSortLabel
                  active={order.column === "nationality"}
                  direction={order.direction}
                  onClick={() => handleSort("nationality")}
                >
                  Nationality
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
            {currentUsers.map((user) => (
              <TableRow key={user.email}>
                <TableCell align="center" className="px-4 py-2">
                  {user.firstName}
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  {user.lastName}
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  {user.email}
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  {user.nationality ?? "N/A"}
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <Tooltip title="View User">
                      <IconButton
                        aria-label="view"
                        onClick={() => handleViewUser(user)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit User">
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleUpdateUser(user)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteUser(user)}
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

export default UserList;
