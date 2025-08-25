import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { motion } from "motion/react";
import { MapIcon, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const AllHotels = () => {
  const { navigate, axios } = useContext(AppContext);
  const [hotelData, setHotelData] = useState([]);

  // Fetch all hotels from backend
  const fetchHotels = async () => {
    try {
      const { data } = await axios.get("/api/hotel/get");
      if (data.success) {
        setHotelData(data.hotels);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch hotels");
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Delete hotel (owner only)
  const handleDelete = async (hotelId) => {
    if (!window.confirm("Are you sure you want to delete this hotel?")) return;

    try {
      const { data } = await axios.delete(`/api/hotel/delete/${hotelId}`);
      if (data.success) {
        toast.success(data.message);
        // Refresh list
        setHotelData((prev) => prev.filter((hotel) => hotel._id !== hotelId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete hotel");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="w-full px-6 md:px-12 py-12 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Premium Hotels Collections
            </h1>
            <p className="text-gray-600 mt-2 text-base md:text-lg">
              Discover exceptional stays around the world
            </p>
          </div>

          <motion.button
            onClick={() => navigate("/owner/register-hotel")}
            whileHover={{ scale: 1.05 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 font-medium"
          >
            Register Hotel
          </motion.button>
        </div>
      </div>

      {/* Hotels Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Hotel</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Owner</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Amenities</th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {hotelData.map((hotel, index) => (
                <tr
                  key={hotel._id}
                  className={`hover:bg-blue-50 transition-all duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  {/* Hotel Image + Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {hotel.images?.[0] && (
                        <img
                         src={`http://localhost:4000/images/${hotel.images[0]}`} alt={hotel.hotelName}
                          
                          className="w-14 h-14 object-cover rounded-xl shadow"
                        />
                      )}
                      <span className="font-semibold text-gray-800">{hotel.hotelName}</span>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4 text-gray-600">
                    <MapIcon className="w-5 h-5 inline mr-1" /> {hotel.hotelAddress}
                  </td>

                  {/* Owner */}
                  <td className="px-6 py-4 text-gray-600">{hotel.owner?.name}</td>

                  {/* Rating */}
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-lg">
                      ⭐ {hotel.rating}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-green-600 font-medium">₹{hotel.price}</td>

                  {/* Amenities */}
                  <td className="px-6 py-4 text-gray-600">
                    {hotel.amenities?.slice(0, 3).join(", ")}
                    {hotel.amenities?.length > 3 && " ..."}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDelete(hotel._id)}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 shadow flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllHotels;
