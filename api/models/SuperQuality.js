import mongoose from "mongoose";

const SuperQualitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const SuperQuality = mongoose.model("SuperQuality", SuperQualitySchema);
export default SuperQuality; 