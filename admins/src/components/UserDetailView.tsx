import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  Grid,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../admin-Client"; // Adjust the import path if necessary
import { UserType } from "../../../backend/shared/types";

const UserDetailView: React.FC = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          const fetchedUser = await fetchUserById(userId);
          setUser(fetchedUser);
        }
      } catch (error) {
        setError("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Typography variant="h6" align="center" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <Typography variant="h6" align="center">
          User not found.
        </Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card sx={{ maxWidth: "600px", padding: "20px", boxShadow: 3 }}>
        <CardContent sx={{ padding: "16px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {user.profilePicture.length > 0 ? (
                  <Avatar
                    src={user.profilePicture[0]}
                    alt={`${user.firstName} ${user.lastName}`}
                    sx={{ width: 150, height: 150 }}
                  />
                ) : (
                  <Avatar
                    sx={{ bgcolor: "secondary.main", width: 150, height: 150 }}
                  >
                    {user.firstName.charAt(0)}
                  </Avatar>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <div className="space-y-4">
                <Typography variant="h6" gutterBottom>
                  {user.firstName} {user.lastName}
                </Typography>
                <Divider />
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                      <strong>Email:</strong> {user.email}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                      <strong>Phonenumebr:</strong> {user.phoneNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                      <strong>Gender:</strong> {user.gender}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                      <strong>Nationality:</strong> {user.nationality ?? "N/A"}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailView;
