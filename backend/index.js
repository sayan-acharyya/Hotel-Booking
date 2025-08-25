 import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
 
import { connectDB } from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";
import hotelRouter from "./routes/hotel.route.js";
import roomRouter from "./routes/room.route.js";
import bookingRouter from "./routes/booking.route.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
 

// Routes
app.use("/api/user", userRouter);  
app.use("/api/hotel",hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/bookings", bookingRouter);


app.use("/images", express.static("uploads"));

app.get("/", (req, res) => res.json({ status: "Server is running 🚀" }));

// Server + DB
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err);
    process.exit(1); 
  });
