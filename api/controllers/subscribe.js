import Subscribe from "../models/Subscribe.js";
import Signup from "../models/Signup.js";
import { sendSubscriptionEmail } from "../utils/emailService.js";

export const getActiveSubscribe = async (req, res) => {
    try {
        const activeSection = await Subscribe.findOne({ active: true });
        
        if (!activeSection) {
            const defaultSection = {
                title: "Sign Up for Updates & Newsletter",
                buttonText: "Sign Up",
                placeHolderText: "subscribe@nike.com"
            };
            
            return res.status(200).json(defaultSection);
        }

        res.status(200).json(activeSection);
    } catch (error) {
        console.error("Error in getActiveSubscribe:", error);
        res.status(404).json({ message: error.message });
    }
};

export const createSubscribe = async (req, res) => {
    try {
        const { title, buttonText, placeHolderText } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        // Set all existing sections to inactive
        await Subscribe.updateMany({}, { active: false });

        const newSection = new Subscribe({
            title,
            buttonText: buttonText || "Sign Up",
            placeHolderText: placeHolderText || "subscribe@nike.com",
            active: true
        });

        await newSection.save();
        res.status(201).json(newSection);
    } catch (error) {
        console.error("Error in createSubscribe:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateSubscribe = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedSection = await Subscribe.findByIdAndUpdate(
            id,
            { ...updates },
            { new: true }
        );

        if (!updatedSection) {
            return res.status(404).json({ message: "Section not found" });
        }

        res.status(200).json(updatedSection);
    } catch (error) {
        console.error("Error in updateSubscribe:", error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteSubscribe = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSection = await Subscribe.findByIdAndDelete(id);

        if (!deletedSection) {
            return res.status(404).json({ message: "Section not found" });
        }

        res.status(200).json({ message: "Section deleted successfully" });
    } catch (error) {
        console.error("Error in deleteSubscribe:", error);
        res.status(500).json({ message: error.message });
    }
};

export const handleSubscription = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if email already exists
        const existingSignup = await Signup.findOne({ email });
        if (existingSignup) {
            return res.status(400).json({ 
                message: "This email is already subscribed to our newsletter" 
            });
        }

        // Create new signup
        const newSignup = new Signup({
            email,
            active: true
        });

        await newSignup.save();

        // Send welcome email
        await sendSubscriptionEmail(email);

        res.status(200).json({ 
            message: "Subscription successful! Please check your email." 
        });
    } catch (error) {
        console.error("Error in handleSubscription:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getSignups = async (req, res) => {
    try {
        const signups = await Signup.find({ active: true })
            .sort({ subscriptionDate: -1 });
        
        res.status(200).json(signups);
    } catch (error) {
        console.error("Error in getSignups:", error);
        res.status(500).json({ message: error.message });
    }
}; 