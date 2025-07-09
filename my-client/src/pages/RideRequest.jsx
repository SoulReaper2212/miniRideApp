import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRide } from '../features/ride/rideSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TopNav from '../components/topnav';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const reverseGeocode = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await response.json();
    return data.display_name; // human-readable address
  } catch (err) {
    console.error("Reverse geocoding failed", err);
    return `${lat.toFixed(4)}, ${lon.toFixed(4)}`; // fallback to coords
  }
};

function LocationMarker({ mode, setPickupCoords, setDestCoords }) {
  useMapEvents({
    click(e) {
      if (mode === 'pickup') {
        setPickupCoords([e.latlng.lat, e.latlng.lng]);
      } else if (mode === 'destination') {
        setDestCoords([e.latlng.lat, e.latlng.lng]);
      }
    },
  });
  return null;
}

function RequestRide() {
  const [pickup, setPickup] = useState('');
  const [dest, setDest] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [mode, setMode] = useState('pickup');

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRequest = async () => {
    if (!pickup || !dest || !pickupCoords || !destCoords) {
      toast.error("All fields and coordinates are required");
      return;
    }

    const result = await dispatch(
      createRide({
        pickup,
        dest,
        pickupCoords,
        destCoords,
        token,
      })
    );

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success("Ride requested successfully!");
      navigate(`/ride/${result.payload._id}`);
    } else {
      toast.error("Ride request failed");
    }
  };

 useEffect(() => {
  if (pickupCoords) {
    const [lat, lon] = pickupCoords;
    reverseGeocode(lat, lon).then((address) => {
      setPickup(address);
    });
  }
}, [pickupCoords]);

useEffect(() => {
  if (destCoords) {
    const [lat, lon] = destCoords;
    reverseGeocode(lat, lon).then((address) => {
      setDest(address);
    });
  }
}, [destCoords]);


  return (
    <>
          <TopNav />
           <div className="flex flex-col justify-center items-center max-w-90 md:max-w-2xl m-auto p-6 gap-y-4 text-center bg-white shadow-lg border border-zinc-100 mt-10 rounded-2xl">
      <h2 className="font-medium text-3xl mb-4">Request a Ride</h2>

      {/* Input fields */}
      <input
        type="text"
        placeholder="Pickup Location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        className="block w-full mb-2 p-2 bg-white text-black rounded-3xl border-2 border-lime-400 focus:border-lime-400"
      />
      <input
        type="text"
        placeholder="Destination"
        value={dest}
        onChange={(e) => setDest(e.target.value)}
        className="block w-full mb-4 p-2 bg-white text-black rounded-3xl border-2 border-lime-400 focus:border-lime-400"
      />

      {/* Mode toggle */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setMode('pickup')}
          className={`py-2 px-4 rounded-2xl ${
            mode === 'pickup' ? 'bg-lime-500 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          Set Pickup
        </button>
        <button
          onClick={() => setMode('destination')}
          className={`py-2 px-4 rounded-2xl ${
            mode === 'destination' ? 'bg-lime-500 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          Set Destination
        </button>
      </div>

      {/* Map */}
      <div className="w-full h-[300px] rounded-xl overflow-hidden border border-gray-300">
        <MapContainer center={[33.6844, 73.0479]} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            mode={mode}
            setPickupCoords={setPickupCoords}
            setDestCoords={setDestCoords}
          />
          {pickupCoords && <Marker position={pickupCoords} />}
          {destCoords && <Marker position={destCoords} />}
        </MapContainer>
      </div>

      {/* Coordinates display */}
     

      {/* Request Button */}
      <button
        onClick={handleRequest}
        className="w-1/2 mt-4 rounded-2xl bg-lime-400 hover:bg-lime-500 py-2 cursor-pointer text-black font-semibold"
      >
        Request Ride
      </button>
    </div>

    </>
   
  );
}

export default RequestRide;
