 
import React, { useContext, useState, useEffect } from 'react';
import { MapPin, Calendar, Users, CheckCircle, Clock, XCircle, Eye, Trash2 } from "lucide-react";
// import { AppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext.jsx';

const Bookings = () => {
  const { axios } = useContext(AppContext);
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/hotel");
      if (data.success) {
        setBookingData(data.bookings || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "confirmed":
      case "cancelled": return "text-white";
      case "pending": return "text-black";
      default: return "text-white";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed": return CheckCircle;
      case "pending": return Clock;
      case "cancelled": return XCircle;
      default: return Clock;
    }
  }

  if (loading) {
    return (
      <div className='py-24 min-h-screen flex items-center justify-center'>
        <h2 className='text-2xl font-bold text-gray-600'>Loading your bookings...</h2>
      </div>
    );
  }

  if (!bookingData || bookingData.length === 0) {
    return (
      <div className='py-24 min-h-screen flex items-center justify-center'>
        <h2 className='text-2xl font-bold text-gray-600'>No bookings found</h2>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-32'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-800 mb-4">All Bookings</h1>
          <p className="text-gray-600 text-lg">
            Review all your reservations in one place. View details, track status, and manage your bookings with ease.
          </p>
        </div>

        {/* Booking List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden md:grid md:grid-cols-4 bg-gray-50 px-6 py-4 border-b border-gray-200 font-semibold text-gray-700 text-left">
            <div className="px-2">Hotel & Room</div>
            <div className="px-2">Dates</div>
            <div className="px-2">Payment</div>
            <div className="px-2">Actions</div>
          </div>

          {/* Booking Rows */}
          <div className='divide-y divide-gray-200'>
            {bookingData.map((booking) => {
              const StatusIcon = getStatusIcon(booking.status);
              const roomImage = booking?.room?.images?.length
                ? `http://localhost:4000/images/${booking.room.images[0]}`
                : "/default-room.jpg";

              return (
                <div key={booking._id} className='p-6 hover:bg-gray-50 transition-colors'>
                  <div className='grid grid-cols-1 md:grid-cols-4 gap-6 items-start md:items-center'>
                    {/* Hotel and Room Info */}
                    <div className='flex gap-4'>
                      <img
                        src={roomImage}
                        alt={booking?.room?.roomType || "Room"}
                        className='w-20 h-16 md:w-24 md:h-20 rounded-lg object-cover flex-shrink-0'
                      />
                      <div>
                        <h3 className='font-semibold text-gray-800 text-lg mb-1'>
                          {booking?.hotel?.hotelName || "Unknown Hotel"}
                        </h3>
                        <p className='text-blue-600 font-medium mb-1'>
                          {booking?.room?.roomType || "Room"}
                        </p>
                        <div className='flex items-center gap-1 text-gray-500 text-sm mb-1'>
                          <MapPin className='w-3 h-3' />
                          <span>{booking?.hotel?.hotelAddress || "Address N/A"}</span>
                        </div>
                        <div className='flex items-center gap-1 text-gray-500 text-sm'>
                          <Users className='w-3 h-3' />
                          <span>{booking?.persons || 1} Guest{booking?.guests > 1 ? "s" : ""}</span>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div>
                      <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                          <Calendar className='h-4 w-4 text-gray-400' />
                          <div>
                            <p className='text-sm text-gray-500'>Check-in</p>
                            <p className='font-medium text-gray-800'>
                              {booking?.checkIn
                                ? new Date(booking.checkIn).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Calendar className='h-4 w-4 text-gray-400' />
                          <div>
                            <p className='text-sm text-gray-500'>Check-out</p>
                            <p className='font-medium text-gray-800'>
                              {booking?.checkOut
                                ? new Date(booking.checkOut).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment */}
                    
                    <div className="space-y-1">
                      {/* Payment Method */}
                      <span className="text-sm text-gray-600 block">
                        {booking?.paymentMethod || "N/A"}
                      </span>

                      {/* Total Price */}
                      <p className="font-semibold text-gray-800 text-lg">
                        ${booking?.totalPrice || 0}
                      </p>

                      {/* Booking Status */}
                      <span className={`inline-flex items-center cursor-pointer gap-2 px-3 py-1 rounded-full text-md font-medium ${getStatusColor(booking.status)} ${getStatusTextColor(booking.status)}`}>
                        <StatusIcon className="w-4 h-4 " />
                        {booking.status || "Unknown"}
                      </span>

                      {/* Payment Status */}
                       
                    </div>
    

                    {/* Actions */}
                    <div className='flex gap-3 text-gray-500'>
                      <Link
                        to={`/room/${booking?.room?._id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 shadow transition-all duration-200"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Room</span>
                      </Link>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
