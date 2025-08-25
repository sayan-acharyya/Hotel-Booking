import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const RegisterHotel = () => {
  const { axios, navigate } = useContext(AppContext);

  const [data, setData] = useState({
    hotelName: "",
    hotelAddress: "",
    description: "",
    rating: "",
    price: "",
    amenities: "",
    images: [null, null, null, null], // 4 slots for images
  });

  const [previews, setPreviews] = useState([null, null, null, null]);

  // Handle input changes
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle file input for multiple slots
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...data.images];
      newImages[index] = file;
      setData({ ...data, images: newImages });

      const newPreviews = [...previews];
      newPreviews[index] = URL.createObjectURL(file);
      setPreviews(newPreviews);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("hotelName", data.hotelName);
      formData.append("hotelAddress", data.hotelAddress);
      formData.append("description", data.description);
      formData.append("rating", data.rating);
      formData.append("price", data.price);
      formData.append("amenities", data.amenities);

      // Append images
      data.images.forEach((img) => {
        if (img) formData.append("images", img);
      });

      const response = await axios.post("/api/hotel/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Hotel registered successfully!");
        // Reset form
        setData({
          hotelName: "",
          hotelAddress: "",
          description: "",
          rating: "",
          price: "",
          amenities: "",
          images: [null, null, null, null],
        });
        setPreviews([null, null, null, null]);
        navigate("/owner"); // optional redirect after success
      }
    } catch (error) {
      console.error("Register hotel error:", error);
      toast.error(error.response?.data?.message || "Failed to register hotel");
    }
  };

  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      {/* Header */}
      <div className="w-full px-6 md:px-12 py-8 bg-gradient-to-r from-indigo-50 via-white to-indigo-50 rounded-2xl shadow-sm mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Register a New Hotel
        </h1>
        <p className="text-gray-600 mt-2 text-base md:text-lg">
          Fill in the details below to add your hotel to the collection
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="md:p-10 p-4 space-y-6 max-w-2xl bg-gray-50 rounded-2xl shadow-lg"
      >
        {/* Upload Images */}
        <div>
          <p className="text-base font-medium">Hotel Images</p>
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
                  {previews[index] ? (
                    <img
                      src={previews[index]}
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

        {/* Hotel Name */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Hotel Name</label>
          <input
            name="hotelName"
            value={data.hotelName}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Grand Palace Hotel"
            className="outline-none py-2.5 px-3 rounded border border-gray-300"
            required
          />
        </div>

        {/* Hotel Address */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Hotel Address</label>
          <textarea
            name="hotelAddress"
            value={data.hotelAddress}
            onChange={handleChange}
            rows={3}
            className="outline-none py-2.5 px-3 rounded border border-gray-300 resize-none"
            placeholder="e.g. 123 Beach Road, Colombo"
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
            placeholder="Describe your hotel and what makes it special..."
          />
        </div>

        {/* Rating & Price */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-base font-medium">Rating</label>
            <input
              name="rating"
              value={data.rating}
              onChange={handleChange}
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="e.g. 4.5"
              className="outline-none py-2.5 px-3 rounded border border-gray-300"
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <label className="text-base font-medium">Price per Night</label>
            <input
              name="price"
              value={data.price}
              onChange={handleChange}
              type="number"
              placeholder="₹ 2000"
              className="outline-none py-2.5 px-3 rounded border border-gray-300"
              required
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium">Amenities</label>
          <input
            name="amenities"
            value={data.amenities}
            onChange={handleChange}
            type="text"
            placeholder="WiFi, Pool, Parking, AC..."
            className="outline-none py-2.5 px-3 rounded border border-gray-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-8 py-2.5 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition shadow"
        >
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default RegisterHotel;
