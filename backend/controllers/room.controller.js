import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";

export const addRoom = async (req, res) => {
    try {
        const {
            roomType,
            hotel,
            pricePerNight,
            description,
            amenities,
            isAvailable = true,
        } = req.body;

        // Validate required fields
        if (!roomType || !hotel || !pricePerNight || !description || !amenities) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        const images = req.files?.map((file) => file.filename) || [];

        const newRoom = await Room.create({
            roomType,
            hotel,
            pricePerNight,
            description,
            amenities,
            isAvailable,
            images,
        });

        return res
            .status(201)
            .json({ message: "Room added successfully", success: true, room: newRoom });
    } catch (error) {
        console.error("Add room error:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};

export const getOwnerRooms = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // Step 1: Find hotels owned by this owner
    const hotels = await Hotel.find({ owner: ownerId }).select("_id");

    if (!hotels.length) {
      return res.status(200).json({ success: true, ownerRooms: [] });
    }

    // Step 2: Get rooms for those hotels
    const rooms = await Room.find({ hotel: { $in: hotels } })
      .populate("hotel", "hotelName hotelAddress rating amenities owner")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, ownerRooms: rooms });
  } catch (error) {
    console.error("Error in getOwnerRooms:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find()
            .populate({
                path: "hotel",
                select: "hotelName hotelAddress rating amenities owner",
                populate: {
                    path: "owner",
                    select: "name email"
                }
            })
            .exec();

        res.json({ success: true, rooms });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error " })
    }
}

export const deleteRoom = async (req, res) => {
    try {
        const { roomId } = req.params;

        const deleteRoom = await Room.findByIdAndDelete(roomId);
        if (!deleteRoom) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }
        res.json({ success: true, message: "Room deleted successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error " })
    }
}



