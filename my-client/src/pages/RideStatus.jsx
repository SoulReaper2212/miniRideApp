import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRide } from "../features/ride/rideSlice";
import { useParams } from "react-router-dom";
import TopNav from "../components/topnav";

function RideStatus() {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const ride = useSelector((state) => state.ride.currentRide);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getRide({ id, token }));
    }
  }, [id, dispatch, token]);

  if (!ride) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <>
      <TopNav />
      <div className="flex flex-col justify-center items-center max-w-90 md:max-w-2xl m-auto p-6 gap-y-4 text-center bg-white shadow-lg border border-zinc-100 mt-10 rounded-2xl">
        <h2 className="font-medium text-3xl mb-4">Ride Status</h2>

        <div className="text-left w-full">
          <p className="mb-2 text-lg">
            <span className="font-semibold">Pickup:</span> {ride.pickup}
          </p>
          <p className="mb-2 text-lg">
            <span className="font-semibold">Destination:</span> {ride.dest}
          </p>
          <p className="mb-2 text-lg">
            <span className="font-semibold">Status:</span> {ride.status}
          </p>
        </div>
      </div>
    </>
  );
}

export default RideStatus;
