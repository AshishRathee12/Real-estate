import mongoose from "mongoose"

const locationSchema = new mongoose.Schema({
    state: String,
    country: String,
    capital: String,
    total_districts: Number,
    districts: [{
        district: String,
        headquarters: String,
        towns: [{
            name: String,
            localities: [String],
            pincode: String
        }]
    }],

}, { collection: 'state', timestamps: true });

export const State = mongoose.models.State || mongoose.model("State", locationSchema)