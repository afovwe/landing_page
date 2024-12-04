import mongoose from "mongoose";

const SpecialOfferSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    },
    buttonText: {
        type: String,
        default: "Shop Now"
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const SpecialOffer = mongoose.model("SpecialOffer", SpecialOfferSchema);
export default SpecialOffer; 