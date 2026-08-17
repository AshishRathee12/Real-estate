import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        index: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],

    }
}, { timestamps: true });

// userSchema.index({ email: 1 });

export const User = mongoose.models.User || mongoose.model("User", userSchema)