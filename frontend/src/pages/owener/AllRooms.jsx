
import { AppContext } from "../../context/AppContext";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";

const AllRooms = () => {
  const { navigate, axios } = useContext(AppContext);
  const [roomData, setRoomData] = useState([]);

  // Fetch owner rooms
  const fetchOwnerRooms = async () => {
    try {
      const { data } = await axios.get("/api/room/get-all");
      if (data.success) {
        setRoomData(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    fetchOwnerRooms()
  },[])
 

  // Inside AllRooms
const handleDelete = async (roomId) => {
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete this room?");
    if (!confirmDelete) return;

    const { data } = await axios.delete(`/api/room/delete/${roomId}`);

    if (data.success) {
      toast.success("Room deleted successfully");
      // Remove deleted room from state
      setRoomData((prev) => prev.filter((room) => room._id !== roomId));
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Error deleting room");
  }
};

 
  return (
    <div>
      {/* Header Section */}
      <div className="w-full px-6 md:px-12 py-12 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Premium Rooms Collections
            </h1>
            <p className="text-gray-600 mt-2 text-base md:text-lg">
              Choose from luxury rooms designed for comfort and style
            </p>
          </div>

          {/* Right Section - Button */}
          <motion.button
            onClick={() => navigate("/owner/add-room")}
            whileHover={{ scale: 1.05 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-indigo-700 font-medium"
          >
            Register Room
          </motion.button>
        </div>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Hotel
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Price/Night
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Amenities
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {roomData.map((room, index) => (
                <tr
                  key={room._id}
                  className={`hover:bg-indigo-50 transition-all duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {/* Room Image + Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`http://localhost:4000/images/${room.images[0]}`}
                        alt={room?.roomType}
                        className="w-14 h-14 object-cover rounded-xl shadow"
                      />
                      <span className="font-semibold text-gray-800">
                        {room?.roomType}
                      </span>
                    </div>
                  </td>

                  {/* Hotel */}
                  <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-500" />
                    {room?.hotel?.hotelName || "N/A"}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-green-600 font-medium text-lg">
                    ₹{room?.pricePerNight}
                  </td>

                  {/* Description */}
                  <td className="px-6 py-4 text-gray-600 max-w-[250px] truncate">
                    {room?.description}
                  </td>

                  {/* Amenities */}
                  <td className="px-6 py-4 text-gray-600">
                    {room?.amenities?.slice(0, 3).join(", ")}{" "}
                    {room?.amenities?.length > 3 && "..."}
                  </td>

                  {/* Availability */}
                  <td className="px-6 py-4">
                    {room?.isAvailable ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-lg">
                        Available
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-lg">
                        Booked
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/room/${room._id}`)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 shadow"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 shadow"
                      >
                        Delete
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

export default AllRooms;
