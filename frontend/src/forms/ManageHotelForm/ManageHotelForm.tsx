import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/shared/types";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import cursorIcon from 'leaflet/dist/images/marker-icon.png'; // Use your custom cursor icon
import axios from 'axios'; // Import axios for reverse geocoding

// Default icon for leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
  location: {
    latitude: number;
    longitude: number;
  };
};

// MapSection Component
type MapSectionProps = {
  initialLocation: { latitude: number; longitude: number };
  onLocationSelect: (location: { latitude: number; longitude: number }) => void;
};

const MapSection: React.FC<MapSectionProps> = ({ onLocationSelect, initialLocation }) => {
  const [markerPosition, setMarkerPosition] = useState(initialLocation);
  const [cursorPosition, setCursorPosition] = useState(initialLocation);
  const [pinnedLocation, setPinnedLocation] = useState(initialLocation);
  const [locationInfo, setLocationInfo] = useState({ city: '', country: '' }); // State for city and country

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const newPosition = {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        };
        setMarkerPosition(newPosition);
        setPinnedLocation(newPosition); // Set the pinned location

        onLocationSelect(newPosition);

        // Reverse geocode to get city and country
        axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${newPosition.latitude}&lon=${newPosition.longitude}`)
          .then(response => {
            setLocationInfo({
              city: response.data.address.city || 
        response.data.address.town || 
        response.data.address.village || 
        response.data.address.hamlet ||
        response.data.address.suburb || 
        response.data.address.neighbourhood || 
        response.data.address.road || // In case it's a very small place
        '', // Default to empty string if nothing is found
              country: response.data.address.country || ''
            });
          })
          .catch(error => {
            console.error('Error fetching location info:', error);
          });
      },
      mousemove(e) {
        const newCursorPosition = {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        };
        setCursorPosition(newCursorPosition);
      }
    });
    return null;
  };

  return (
    <MapContainer
      center={[markerPosition.latitude, markerPosition.longitude]}
      zoom={3}
      style={{ height: "400px", width: "100%" }}
      className="cursor-none" // Hide the default cursor
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pinnedLocation && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          {locationInfo.city ? <p>City: {locationInfo.city}</p> : null}
          {locationInfo.country ? <p>Country: {locationInfo.country}</p> : null}

          <Marker
          position={[pinnedLocation.latitude, pinnedLocation.longitude]}
          icon={L.icon({ iconUrl: cursorIcon, iconSize: [25, 41], iconAnchor: [12, 41] })}
        />
        </div>
      )}
      <Marker position={[markerPosition.latitude, markerPosition.longitude]} />
      {/* Custom cursor marker */}
      <Marker
        position={[cursorPosition.latitude, cursorPosition.longitude]}
        icon={L.icon({ iconUrl: cursorIcon, iconSize: [25, 41], iconAnchor: [12, 41] })}
      />
      {/* {pinnedLocation && (
         
        
      )} */}
      <MapEvents />
    </MapContainer>
  );
};

type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset, setValue } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    // Append location data
    if (formDataJson.location) {
      formData.append("location[latitude]", formDataJson.location.latitude.toString());
      formData.append("location[longitude]", formDataJson.location.longitude.toString());
    }

    onSave(formData);
  });

  const handleLocationSelect = (location: { latitude: number; longitude: number }) => {
    setValue("location", location);
  };

  const initialLocation = hotel?.location || { latitude: 9.0245, longitude: 38.7426 }; // Default to London if no location provided

  return (
    <FormProvider {...formMethods}>
      <form className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto mt-10 space-y-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />

        {/* Map Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Pin Your Location</h3>
          <MapSection onLocationSelect={handleLocationSelect} initialLocation={initialLocation} />
        </div>

        <div className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white text-xl font-bold py-2 px-4 rounded hover:bg-blue-500 disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;