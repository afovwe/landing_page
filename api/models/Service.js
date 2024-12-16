import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    imgURL: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    subtext: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Service = mongoose.model("Service", ServiceSchema);
export default Service; 