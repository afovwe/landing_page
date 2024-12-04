import mongoose from "mongoose";

const SubscribeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    buttonText: {
        type: String,
        default: "Sign Up"
    },
    placeHolderText: {
        type: String,
        default: "subscribe@nike.com"
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Subscribe = mongoose.model("Subscribe", SubscribeSchema);
export default Subscribe; 