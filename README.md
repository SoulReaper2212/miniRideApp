# 🚗 RideApp

A **mini ride request app** where users can request a ride using an interactive map.

This is a full-stack application built with **React**, **Redux Toolkit**, **Tailwind CSS**, **Leaflet.js**, and **React-Toastify**. Users can request rides by selecting pickup and destination points either manually or directly from the map.

---

## 🛠 Tech Stack

- **Frontend**: React, Redux Toolkit, React Router, Tailwind CSS, React-Leaflet, React-Toastify  
- **Map**: Leaflet.js with OpenStreetMap tiles and Nominatim Reverse Geocoding  
- **State Management**: Redux Toolkit  
- **Notifications**: react-toastify  

---

## 🚀 How to Run the App Locally

### 1. Clone the Repository

```bash
git clone https://github.com/SoulReaper2212/miniRideApp.git
cd miniRideApp


cd my-client
npm install
npm run dev

cd my-server
npm install
npm start

ENV

PORT=5000
MONGO_URI=mongodb+srv://admin:admin1234@cluster0.dhemqwo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster
JWT_SECRET=your_jwt_secret

