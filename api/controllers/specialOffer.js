import SpecialOffer from "../models/SpecialOffer.js";

export const getActiveSpecialOffer = async (req, res) => {
    try {
        const activeOffer = await SpecialOffer.findOne({ active: true });
        
        if (!activeOffer) {
            const defaultOffer = {
                title: "Special Offer",
                description: "Embark on a shopping journey that redefines your experience with unbeatable deals. From premier selections to incredible savings, we offer unparalleled value that sets us apart.",
                imgURL: "https://res.cloudinary.com/dc0oesxvf/image/upload/v1733000447/offer_iuuqm2.svg",
                buttonText: "Shop Now"
            };
            
            return res.status(200).json(defaultOffer);
        }

        res.status(200).json(activeOffer);
    } catch (error) {
        console.error("Error in getActiveSpecialOffer:", error);
        res.status(404).json({ message: error.message });
    }
};

export const createSpecialOffer = async (req, res) => {
    try {
        const { title, description, imgURL, buttonText } = req.body;

        if (!title || !description || !imgURL) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Set all existing offers to inactive
        await SpecialOffer.updateMany({}, { active: false });

        const newOffer = new SpecialOffer({
            title,
            description,
            imgURL,
            buttonText: buttonText || "Shop Now",
            active: true
        });

        await newOffer.save();
        res.status(201).json(newOffer);
    } catch (error) {
        console.error("Error in createSpecialOffer:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateSpecialOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedOffer = await SpecialOffer.findByIdAndUpdate(
            id,
            { ...updates },
            { new: true }
        );

        if (!updatedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        res.status(200).json(updatedOffer);
    } catch (error) {
        console.error("Error in updateSpecialOffer:", error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteSpecialOffer = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedOffer = await SpecialOffer.findByIdAndDelete(id);

        if (!deletedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        res.status(200).json({ message: "Offer deleted successfully" });
    } catch (error) {
        console.error("Error in deleteSpecialOffer:", error);
        res.status(500).json({ message: error.message });
    }
}; 