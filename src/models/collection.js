import mongoose from "mongoose";


const collectionSchema = new mongoose.Schema({
    AboutSeller: String,
    sellingPeriod: String,
    basic: {
        purpose: String,
        category: String,
        propertyType: String,
    },
    location: {},
    area: String,
    pricing: String,
    images: [],
    propertySpecific: {},
})

export const UserCollection = mongoose.models.UserCollection || mongoose.model("UserCollection", collectionSchema)