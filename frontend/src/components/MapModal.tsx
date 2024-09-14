import React from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import cursorIcon from "leaflet/dist/images/marker-icon.png";
import { FaMapMarkerAlt } from "react-icons/fa";
import SearchResultsCardForMap from "./SearchResultsCardForMap"; // Import the new card component

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotels: any[]; // Replace 'any' with your hotel type
}

const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, hotels }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="relative w-[90%] h-[95%] max-w-{100%} max-h-[90%] bg-white rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white z-50 bg-gray-800 p-2 rounded-full"
        >
          Close
        </button>
        <div className="flex">
          <div className="w-1/3 p-4 overflow-y-auto">
            {hotels.map((hotel) => (
              <SearchResultsCardForMap key={hotel._id} hotel={hotel} />
            ))}
          </div>
          <div className="w-2/3">
            <MapContainer center={[9.0245, 38.7426]} zoom={9} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {hotels.map((hotel) => (
                <Marker
                  key={hotel._id}
                  position={[hotel.location.latitude, hotel.location.longitude]}
                  icon={L.icon({ iconUrl: cursorIcon, iconSize: [25, 41], iconAnchor: [12, 41] })}
                >
                  <Tooltip>
                    <div className="w-64">
                      <img
                        src={hotel.imageUrls[0]}
                        alt={hotel.name}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                      <span className="font-bold">{hotel.name}</span>
                      <br />
                      <span className="text-sm text-gray-500 flex items-center">
                        <FaMapMarkerAlt className="mr-1" />
                        {hotel.city}, {hotel.country}
                      </span>
                      <br />
                      <span className="font-bold text-blue-600">{hotel.pricePerNight} Birr/night</span>
                    </div>
                  </Tooltip>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
