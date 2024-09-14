// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import { useState } from 'react';

// // Default icon for leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
//   iconUrl: require('leaflet/dist/images/marker-icon.png').default,
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
// });

// const MapSection = ({ onLocationSelect, initialLocation }) => {
//   const [markerPosition, setMarkerPosition] = useState(initialLocation);

//   const MapEvents = () => {
//     useMapEvents({
//       click(e) {
//         const newPosition = {
//           latitude: e.latlng.lat,
//           longitude: e.latlng.lng,
//         };
//         setMarkerPosition(newPosition);
//         onLocationSelect(newPosition);
//       },
//     });
//     return null;
//   };

//   return (
//     <MapContainer
//       center={[markerPosition.latitude, markerPosition.longitude]}
//       zoom={13}
//       style={{ height: "400px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={[markerPosition.latitude, markerPosition.longitude]} />
//       <MapEvents />
//     </MapContainer>
//   );
// };
