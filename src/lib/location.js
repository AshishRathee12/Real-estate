import mongoose from "mongoose";

export async function dbConnect() {
    try {
        const conn = await mongoose.connect(process.env.MONGODBState_URI);
        console.log("connection establish for state")
        return conn;
    } catch (error) {
        console.log("error occur while connecting for state")
    }
}