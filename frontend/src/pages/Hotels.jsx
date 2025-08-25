 import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hotels = () => {
  const { hotelData } = useContext(AppContext);
 
  return (
    <div className="py-28 max-w-7xl mx-auto">
       <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800">
          Explore Our Hotels
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          From budget-friendly stays to luxury resorts, browse through our
          curated collection of hotels designed for every kind of traveler.
        </p>
      </div>
      
      <div className="grid grid-cols-1 pt-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {hotelData.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative group rounded-2xl overflow-hidden shadow-lg"
          >
            {/* Hotel Image */}
            <img
              src={`http://localhost:4000/images/${item.images[0]}`} alt={item.hotelName}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h2 className="text-xl font-semibold text-white">{item.hotelName}</h2>
              <p className="text-sm text-gray-200">{item.hotelAddress}</p>
              <p className="mt-1 text-lg font-bold text-yellow-400">
                ${item.price}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
