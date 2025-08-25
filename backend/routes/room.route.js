import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { isOwner } from "../middlewares/isOwner.js"
import { addRoom, deleteRoom, getAllRooms, getOwnerRooms } from "../controllers/room.controller.js";
import { upload } from "../config/multer.js";

const roomRouter = express.Router();

roomRouter.post("/add",
    isAuthenticated,
    isOwner,
    upload.array("images", 5), 
    addRoom
);

roomRouter.get("/get",isAuthenticated,isOwner,getOwnerRooms);
roomRouter.get("/get-all",getAllRooms)
roomRouter.delete("/delete/:roomId",isAuthenticated, isOwner,deleteRoom );

export default roomRouter;


