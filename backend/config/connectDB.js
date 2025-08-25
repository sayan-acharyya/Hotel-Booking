import mongoose from "mongoose";

export const connectDB = async() =>{
    try{

        mongoose.connect(process.env.MONGO_URI);
        console.log("Connected t0 MongoDB")
    } catch (error){
         console.log("error connecting to MongoDB",error);
    }
}