import mongoose from "mongoose";

const SignupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,  // Ensures no duplicate emails
        trim: true,
        lowercase: true
    },
    subscriptionDate: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Signup = mongoose.model("Signup", SignupSchema);
export default Signup; 