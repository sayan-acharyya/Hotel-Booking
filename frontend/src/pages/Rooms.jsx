 import React, { useContext } from "react";
import RoomCard from "../componentes/RoomCard";
import { AppContext } from "../context/AppContext";

const Rooms = () => {
  const { roomData } = useContext(AppContext);

  return (
    <div className="py-28 max-w-7xl mx-auto px-4">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800">
          Explore Our Rooms
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Discover comfort and luxury with our wide range of rooms. Whether you
          want budget-friendly stays or premium suites, we’ve got something for
          every traveler.
        </p>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {roomData.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
