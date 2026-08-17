import mongoose from "mongoose";

export async function dbConnect() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("connection establish form lib")
        return conn;
    } catch (error) {
        console.log("error occur while connecting from lib")
    }
}