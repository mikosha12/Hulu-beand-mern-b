import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Grid,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchHotelById } from "../admin-Client";
import { HotelType } from "../../../backend/shared/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
//import "./HotelDetailView.css"; // Import the CSS file

const HotelDetailView: React.FC = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        if (hotelId) {
          const fetchedHotel = await fetchHotelById(hotelId);
          setHotel(fetchedHotel);
        }
      } catch (error) {
        setError("Error fetching hotel details");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

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

  if (!hotel) {
    return (
      <div className="container mx-auto p-4">
        <Typography variant="h6" align="center">
          Hotel not found.
        </Typography>
      </div>
    );
  }

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % hotel.imageUrls.length;
    setCurrentImageIndex(nextIndex);
  };

  const handlePreviousImage = () => {
    const previousIndex =
      (currentImageIndex - 1 + hotel.imageUrls.length) % hotel.imageUrls.length;
    setCurrentImageIndex(previousIndex);
  };

  return (
    <div className="container mx-auto p-4">
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{ color: "#2196F3", marginBottom: "20px" }}
      >
        Hotel Detail View
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: "20px", boxShadow: 3 }}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", marginBottom: "16px" }}
              >
                {hotel.name}
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Country:</strong> {hotel.country}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    <strong>City:</strong> {hotel.city}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Description:</strong> {hotel.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Star Rating:</strong> {hotel.starRating}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Facilities:</strong> {hotel.facilities}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    <strong>Type:</strong> {hotel.type}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "relative" }}>
            {hotel.imageUrls.length > 0 && (
              <img
                src={hotel.imageUrls[currentImageIndex]}
                alt={`Hotel Image ${currentImageIndex + 1}`}
                className="hotel-detail-image"
              />
            )}
            <IconButton
              onClick={handlePreviousImage}
              sx={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "8px 12px",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                padding: "8px 12px",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default HotelDetailView;