import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {
  Bath,
  Building,
  Calendar,
  Car,
  CheckCircle,
  Coffee,
  Eye,
  MapPin,
  Mountain,
  Phone,
  Star,
  TreePine,
  Tv,
  User,
  Utensils,
  Wifi,
  XCircle,
} from "lucide-react";
import toast from 'react-hot-toast';
const SingleRoom = () => {
  const { roomData, axios, navigate } = useContext(AppContext);
  const { id } = useParams();

  const room = roomData?.find((r) => r._id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    persons: 1,
  })
  const [isAvailable, setIsAvailable] = useState(false);

  const onChangeHandler = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  }

  // ✅ Amenity icon resolver
  const getAmenityIcon = (amenity) => {
    if (!amenity) return null;

    const iconMap = {
      "ocean view": Eye,
      "mountain view": Mountain,
      "city view": Building,
      "garden view": TreePine,
      balcony: Building,
      "mini bar": Coffee,
      "room service": Utensils,
      "free wifi": Wifi,
      "premium wifi": Wifi,
      "work desk": Building,
      "concierge service": User,
      "breakfast included": Coffee,
      parking: Car,
      "smart tv": Tv,
      "spa access": Bath,
      "pool access": Bath,
      kitchen: Utensils,
      "living area": Building,
      "private terrace": Building,
      "butler service": User,
      jacuzzi: Bath,
      "panoramic view": Eye,
    };

    return iconMap[amenity.trim().toLowerCase()] || null;
  };

  const checkRoomAvailability = async () => {
    try {
      if (bookingData.checkIn >= bookingData.checkOut) {
        toast.error("Check-in date should be before check-out date ");
        return
      }

      const { data } = await axios.post("/api/bookings/check-availability", {
        room: room._id,
        checkInDate: bookingData.checkIn,
        checkOutDate: bookingData.checkOut,
      })

      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true);
          toast.success("Room is available for booking ");

        } else {
          setIsAvailable(false);
          toast.error("Room is not available for booking ");
        }
      } else {
        toast.error(error.message)
      }



    } catch (error) {
      toast.error(error.message)
    }
  }



  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

      if (!isAvailable) {
        return checkRoomAvailability();

      } else {
        const { data } = await axios.post("/api/bookings/book", {
          room: room._id,
          checkInDate: bookingData.checkIn,
          checkOutDate: bookingData.checkOut,
          persons: bookingData.persons,
          paymentMethod: "Pay at Hotel"
        })
        if (data.success) {
          toast.success(data.message);
          navigate("/my-bookings");
          scrollTo(0, 0);
        } else {
          toast.error(error.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }

  }


  // ✅ If room not found
  if (!room) {
    return (
      <div className="py-24 min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">Room not found</h2>
      </div>
    );
  }







  return (
    <div className="py-24 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800">
                {room?.roomType}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5" />
                <span>{room?.hotel?.hotelAddress}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span>{room?.hotel?.rating}</span>
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${room?.isAvailable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-200 text-red-700"
                    }`}
                >
                  {room?.isAvailable ? (
                    <>
                      <CheckCircle className="w-4 h-4" /> Available
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" /> Not Available
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 mb-2">
                $ {room?.pricePerNight}{" "}
                <span className="text-xl text-gray-600">/night</span>
              </div>

              <div className="text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{room?.hotel?.owner.name}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4" />
                  <span>{room?.hotel?.contactNumber ? room.hotel.contactNumber : "+91 755-6522-895"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* image gallery */}
        {/* image gallery */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Room Gallery</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <img
                src={`http://localhost:4000/images/${room.images[selectedImage]}`}
                alt={`${room?.roomType} - Image ${selectedImage + 1}`}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {room?.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:4000/images/${image}`}
                  alt={`Thumbnail ${index + 1}`}
                  className={`h-24 lg:h-20 object-cover rounded-lg cursor-pointer 
            transition-all duration-200 ${selectedImage === index
                      ? "ring-4 ring-blue-500 opacity-100"
                      : "opacity-70 hover:opacity-100"
                    }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>


        {/* Room details */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About This Room
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {room?.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Room Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room?.amenities.map((amenity, index) => {
                  const IconComponent = getAmenityIcon(amenity);
                  return (
                    <div
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                      key={index}
                    >
                      {IconComponent ? (
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hotel Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Hotel Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {room?.hotel?.amenities?.map((amenity, index) => {
                  const IconComponent = getAmenityIcon(amenity);
                  return (
                    <div
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                      key={index}
                    >
                      {IconComponent ? (
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* booking form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 static top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Book This Room
              </h2>
              <form
                onSubmit={onSubmitHandler}
                className="space-y-4 ">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    min={new Date().toDateString().split("T")[0]}
                    value={bookingData.checkIn}
                    onChange={onChangeHandler}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
                  focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    min={bookingData.checkIn}
                    value={bookingData.checkOut}
                    onChange={onChangeHandler}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
                  focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    name="persons"
                    value={bookingData.persons}
                    placeholder="Enter number of persons..."
                    onChange={onChangeHandler}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
                  focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="border-t pt-4 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Price per night</span>
                    <span className="font-bold text-xl">
                      ${room?.pricePerNight}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!room?.isAvailable}
                  className={`py-2.5 px-4 w-full text-white rounded-lg font-semibold transition-all duration-200  
    ${!room?.isAvailable
                      ? "bg-gray-400 cursor-not-allowed"  // disabled style
                      : "bg-blue-600 hover:bg-blue-700"}  
  `}
                >
                  {isAvailable
                    ? "Book Now"
                    : "Check  Availability"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRoom;
