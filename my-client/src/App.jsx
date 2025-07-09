import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RequestRide from './pages/RideRequest';
import RideStatus from './pages/RideStatus';
import Register from './pages/Register';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/request" element={<RequestRide />} />
      <Route path="/register" element={<Register />} />
      <Route path="/ride/:id" element={<RideStatus />} />
    </Routes>
  );
}

export default App;
