import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    feedback: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
});

const CustomerReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [ReviewSchema],
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const CustomerReview = mongoose.model("CustomerReview", CustomerReviewSchema);
export default CustomerReview; 