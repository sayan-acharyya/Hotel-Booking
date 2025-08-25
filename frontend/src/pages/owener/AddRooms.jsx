import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const AddRoom = () => {
  const { hotelData, axios, navigate } = useContext(AppContext);

  const [data, setData] = useState({
    hotel: "",
    roomType: "",
    pricePerNight: "",
    description: "",
    amenities: "", // comma-separated string in UI
    images: [null, null, null, null], // up to 4 images
    isAvailable: true,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, index) => {
    const files = e.target.files;
    if (files && files[0]) {
      const newImages = [...data.images];
      newImages[index] = files[0];
      setData({ ...data, images: newImages });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append normal fields
    formData.append("hotel", data.hotel);
    formData.append("roomType", data.roomType);
    formData.append("pricePerNight", data.pricePerNight);
    formData.append("description", data.description);
    formData.append("isAvailable", data.isAvailable);

    // Append amenities (array of strings)
    data.amenities
      .split(",")
      .map((a) => a.trim())
      .forEach((amenity) => formData.append("amenities", amenity));

    // Append images
    data.images.forEach((img) => {
      if (img) {
        formData.append("images", img);
      }
    });

    try {
      const res = await axios.post("/api/room/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/owner/rooms");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      {/* Header */}
      <div className="w-full px-6 md:px-12 py-8 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl shadow-sm mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Create a New Room
        </h1>
        <p className="text-gray-600 mt-2 text-base md:text-lg">
          Add room details to your hotel collection
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-6 max-w-2xl bg-gray-50 rounded-2xl shadow-lg "
      >
        {/* Hotel Select */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Select Hotel</label>
          <select
            name="hotel"
            value={data.hotel}
            onChange={handleChange}
            className="outline-none py-2.5 px-3 rounded border border-gray-300"
            required
          >
            <option value="">-- Choose a Hotel --</option>
            {hotelData?.map((hotel) => (
              <option key={hotel._id} value={hotel._id}>
                {hotel.hotelName}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Images */}
        <div>
          <p className="text-base font-medium">Room Images</p>
          <div className="flex flex-wrap items-center gap-4 mt-3">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                  <input
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                    onChange={(e) => handleFileChange(e, index)}
                  />
                  {data.images[index] ? (
                    <img
                      src={URL.createObjectURL(data.images[index])}
                      alt={`Preview ${index}`}
                      className="w-28 h-28 object-cover rounded-lg border shadow"
                    />
                  ) : (
                    <img
                      className="w-28 h-28 object-cover rounded-lg border border-dashed border-gray-400"
                      src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                      alt="Upload"
                    />
                  )}
                </label>
              ))}
          </div>
        </div>

        {/* Room Type */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Room Type</label>
          <input
            name="roomType"
            value={data.roomType}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Deluxe Suite"
            className="outline-none py-2.5 px-3 rounded border border-gray-300"
            required
          />
        </div>

        {/* Price Per Night */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Price per Night</label>
          <input
            name="pricePerNight"
            value={data.pricePerNight}
            onChange={handleChange}
            type="number"
            placeholder="₹ 4500"
            className="outline-none py-2.5 px-3 rounded border border-gray-300"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            rows={3}
            className="outline-none py-2.5 px-3 rounded border border-gray-300 resize-none"
            placeholder="Describe the room features, size, view, etc."
          />
        </div>

        {/* Amenities */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Amenities</label>
          <input
            name="amenities"
            value={data.amenities}
            onChange={handleChange}
            type="text"
            placeholder="Balcony, Ocean View, AC, Room Service..."
            className="outline-none py-2.5 px-3 rounded border border-gray-300"
          />
          <p className="text-xs text-gray-500">
            (Separate by commas, e.g. Wi-Fi, AC, Pool)
          </p>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={data.isAvailable}
            onChange={(e) =>
              setData({ ...data, isAvailable: e.target.checked })
            }
            className="w-5 h-5"
          />
          <label className="text-base font-medium">Available</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-8 py-2.5 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition shadow"
        >
          Add Room
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
