import Hotel from "../models/hotel.model.js";

// Register hotel
export const registerHotel = async (req, res) => {
    const { id } = req.user;
    try {
        const { hotelName, hotelAddress, rating, price, amenities } = req.body;

        // Ensure at least one image is uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: "At least one image is required" });
        }

        // Extract filenames into an array
        const images = req.files.map(file => file.filename);

        const amenitiesArray = Array.isArray(amenities) ? amenities : amenities.split(",");
        const ratingNum = Number(rating);
        const priceNum = Number(price);

        const newHotel = new Hotel({
            hotelName,
            hotelAddress,
            rating: ratingNum,
            price: priceNum,
            amenities: amenitiesArray,
            images, // Store array of image filenames
            owner: id,
        });

        await newHotel.save();
        return res.status(201).json({ success: true, message: "Hotel registered successfully" });

    } catch (error) {
        console.error("Register hotel error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


//get owner hotel
export const getOwnerHotels = async (req, res) => {
    const { id } = req.user;
    try {
        const hotels = await Hotel.find({ owner: id }).sort({ createdAt: -1 }).populate("owner", "name email");
        return res.status(200).json({ success: true, hotels });
    } catch (error) {
        console.error("Get owner hotels error:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

//get all hotels 
export const getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find()
            .sort({ createdAt: -1 })
            .populate("owner", "name email");
        return res.status(200).json({ success: true, hotels });
    } catch (error) {
        console.error("Get all hotels error:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

//delete hotel
// export const deleteHotel = async (req, res) => {
//     const { hotelId } = req.params;
//     try {
//         const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

//         if (!deletedHotel) {
//             return res.status(404).json({ success: false, message: "Hotel not found" });
//         }

//         return res.status(200).json({ success: true, message: "Hotel deleted successfully" });
//     } catch (error) {
//         console.error("Delete hotel error:", error);
//         return res.status(500).json({ success: false, message: "Internal server error" });
//     }
// }
export const deleteHotel = async (req, res) => {
    const { hotelId } = req.params;
    const userId = req.user.id; // logged-in user's ID

    try {
        const hotel = await Hotel.findById(hotelId);

        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }

        // Check if the logged-in user is the owner
        if (hotel.owner.toString() !== userId) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this hotel" });
        }

        await hotel.deleteOne(); // delete the hotel
        return res.status(200).json({ success: true, message: "Hotel deleted successfully" });
    } catch (error) {
        console.error("Delete hotel error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}





