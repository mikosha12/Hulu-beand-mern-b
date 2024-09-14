import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { fetchHotelById, updateHotel } from "../admin-Client";
//import "./HotelEdit.css";
import { HotelType } from "../../../backend/shared/types";

const HotelEdit: React.FC = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState<HotelType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleUpdateHotel = async () => {
    if (hotel) {
      try {
        await updateHotel(hotel._id, hotel);
        navigate(`/hotels/${hotel._id}`); // Navigate to detail view after update
      } catch (error) {
        setError("Error ,khotel");
      }
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    if (name === "facilities") {
      setHotel(
        (prevHotel) =>
          ({
            ...prevHotel,
            facilities: value.split(",").map((item) => item.trim()),
          } as HotelType)
      ); // Type assertion
    } else {
      setHotel(
        (prevHotel) =>
          ({
            ...prevHotel,
            [name]: value,
          } as HotelType)
      ); // Type assertion
    }
  };

  //

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
      <Typography
        variant="h4"
        component="h1"
        align="center"
        sx={{ color: "#2196F3", marginBottom: "20px" }}
      >
        Edit Hotel
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "80vh" }} // Set a minimum height to ensure the content is centered even if it's short
      >
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, boxShadow: 3, borderRadius: 5 }}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ fontWeight: "bold", marginBottom: "16px" }}
              >
                Edit Hotel Details
              </Typography>
              <Divider sx={{ marginBottom: "16px" }} />
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Name"
                      name="name"
                      value={hotel?.name || ""}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ borderRadius: 5 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Country"
                      name="country"
                      value={hotel?.country || ""}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ borderRadius: 5 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="City"
                      name="city"
                      value={hotel?.city || ""}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ borderRadius: 5 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Star Rating"
                      name="starRating"
                      value={hotel?.starRating || ""}
                      onChange={handleChange}
                      type="number"
                      variant="outlined"
                      sx={{ borderRadius: 5 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Description"
                      name="description"
                      value={hotel?.description || ""}
                      onChange={handleChange}
                      variant="outlined"
                      multiline
                      rows={4}
                      sx={{ borderRadius: 5 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Facilities"
                      name="facilities"
                      value={hotel?.facilities?.join(", ") || ""} // Join array into string for display
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ borderRadius: 5 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Type"
                      name="type"
                      value={hotel?.type || ""}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ borderRadius: 5 }}
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleUpdateHotel}
                  sx={{ marginTop: "20px", borderRadius: 5 }}
                >
                  Update Hotel
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default HotelEdit;
