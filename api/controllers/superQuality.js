import SuperQuality from "../models/SuperQuality.js";

export const getActiveSuperQuality = async (req, res) => {
    try {
        const activeSection = await SuperQuality.findOne({ active: true });

        if (!activeSection) {
            const defaultSection = {
                title: "We Provide You Super Quality Shoes",
                description: "Ensuring premium comfort and style, our meticulously crafted footwear is designed to elevate your experience, providing you with unmatched quality, innovation, and a touch of elegance.",
                src: "https://asset.cloudinary.com/dc0oesxvf/eadc451e2ed296ac7c454f185a75d625"
            };
            return res.status(200).json(defaultSection);
        }

        res.status(200).json(activeSection);
    } catch (error) {
        console.error("Error in getActiveSuperQuality:", error);
        res.status(404).json({ message: error.message });
    }
};

export const createSuperQuality = async (req, res) => {
    try {
        const { title, description, src } = req.body;

        if (!title || !description || !src) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Set all existing sections to inactive
        await SuperQuality.updateMany({}, { active: false });

        const newSection = new SuperQuality({
            title,
            description,
            src,
            active: true
        });

        await newSection.save();
        res.status(201).json(newSection);
    } catch (error) {
        console.error("Error in createSuperQuality:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateSuperQuality = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedSection = await SuperQuality.findByIdAndUpdate(
            id,
            { ...updates },
            { new: true }
        );

        if (!updatedSection) {
            return res.status(404).json({ message: "Section not found" });
        }

        res.status(200).json(updatedSection);
    } catch (error) {
        console.error("Error in updateSuperQuality:", error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteSuperQuality = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSection = await SuperQuality.findByIdAndDelete(id);

        if (!deletedSection) {
            return res.status(404).json({ message: "Section not found" });
        }

        res.status(200).json({ message: "Section deleted successfully" });
    } catch (error) {
        console.error("Error in deleteSuperQuality:", error);
        res.status(500).json({ message: error.message });
    }
}; 