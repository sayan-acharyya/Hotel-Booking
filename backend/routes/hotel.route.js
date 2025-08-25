import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { isOwner } from "../middlewares/isOwner.js"
import { deleteHotel, getAllHotels, getOwnerHotels, registerHotel } from "../controllers/hotel.controller.js";
import { upload } from "../config/multer.js";
const hotelRouter = express.Router();

hotelRouter.post("/register", isAuthenticated, isOwner, upload.array("images", 5), registerHotel);
hotelRouter.get("/get-all", getAllHotels);
hotelRouter.get("/get", isAuthenticated, isOwner, getOwnerHotels);
hotelRouter.delete("/delete/:hotelId",isAuthenticated, isOwner,deleteHotel );
export default hotelRouter;





