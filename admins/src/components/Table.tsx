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
  Divider,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchAllUsers, updateUser, deleteUser } from "../admin-Client"; // Adjust the import path if necessary
//import "./UserList.css"; // Import the CSS file

interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string[];
  nationality?: string; // Allow nationality to be undefined
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  // Function to handle user update (placeholder - needs implementation)
  const handleUpdateUser = async (user: UserType) => {
    try {
      await updateUser; // Implement actual update logic
      // Refresh the user list after update
      const updatedUsers = await fetchAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      setError("Error updating user");
    }
  };

  // Function to handle user deletion (placeholder - needs implementation)
  const handleDeleteUser = async (email: string) => {
    try {
      await deleteUser(email); // Implement actual deletion logic
      // Refresh the user list after deletion
      const updatedUsers = await fetchAllUsers();
      setUsers(updatedUsers);
    } catch (error) {
      setError("Error deleting user");
    }
  };

  if (loading)
    return (
      <Typography variant="h6" align="center" sx={{ padding: "20px" }}>
        Loading...
      </Typography>
    );
  if (error)
    return (
      <Typography
        variant="h6"
        align="center"
        color="error"
        sx={{ padding: "20px" }}
      >
        {error}
      </Typography>
    );

  return (
    <Box
      sx={{
        width: "100%",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f5f5f5", // Light background for contrast
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: 1200,
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden", // Ensures the border radius is applied properly
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <Typography variant="h6" component="div" gutterBottom>
                  User List
                </Typography>
                <Divider />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" className="headerCell">
                Profile Picture
              </TableCell>
              <TableCell align="center" className="headerCell">
                First Name
              </TableCell>
              <TableCell align="center" className="headerCell">
                Last Name
              </TableCell>
              <TableCell align="center" className="headerCell">
                Email
              </TableCell>
              <TableCell align="center" className="headerCell">
                Nationality
              </TableCell>
              <TableCell align="center" className="headerCell">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell align="center" className="cellWrapper">
                  {user.profilePicture.length > 0 ? (
                    <img
                      src={user.profilePicture[0]}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="image"
                    />
                  ) : (
                    <div className="avatarPlaceholder">
                      {user.firstName.charAt(0)}
                    </div>
                  )}
                </TableCell>
                <TableCell align="center">{user.firstName}</TableCell>
                <TableCell align="center">{user.lastName}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                  {user.nationality ?? "N/A"}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit User">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleUpdateUser(user)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete User">
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteUser(user.email)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
