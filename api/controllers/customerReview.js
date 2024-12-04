import CustomerReview from "../models/CustomerReview.js";

export const getActiveReviews = async (req, res) => {
    try {
        const activeSection = await CustomerReview.findOne({ active: true });
        
        if (!activeSection) {
            const defaultSection = {
                title: "What Our Customers Say",
                description: "Hear genuine stories from our satisfied customers about their exceptional experiences with us.",
                reviews: []
            };
            
            return res.status(200).json(defaultSection);
        }

        res.status(200).json(activeSection);
    } catch (error) {
        console.error("Error in getActiveReviews:", error);
        res.status(404).json({ message: error.message });
    }
};

// Create initial section with title and description
export const createReviewSection = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

        // Set all existing sections to inactive
        await CustomerReview.updateMany({}, { active: false });

        const newSection = new CustomerReview({
            title,
            description,
            reviews: [],
            active: true
        });

        await newSection.save();
        res.status(201).json(newSection);
    } catch (error) {
        console.error("Error in createReviewSection:", error);
        res.status(500).json({ message: error.message });
    }
};

// Add a new review to the active section
export const addReview = async (req, res) => {
    try {
        const { customerName, rating, feedback, imgURL, designation, order } = req.body;

        if (!customerName || !rating || !feedback || !imgURL || !designation) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const activeSection = await CustomerReview.findOne({ active: true });
        if (!activeSection) {
            return res.status(404).json({ message: "No active review section found" });
        }

        activeSection.reviews.push({
            customerName,
            rating,
            feedback,
            imgURL,
            designation,
            order: order || activeSection.reviews.length + 1
        });

        await activeSection.save();
        res.status(201).json(activeSection);
    } catch (error) {
        console.error("Error in addReview:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update section title and description
export const updateSection = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedSection = await CustomerReview.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );

        if (!updatedSection) {
            return res.status(404).json({ message: "Section not found" });
        }

        res.status(200).json(updatedSection);
    } catch (error) {
        console.error("Error in updateSection:", error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a specific review from the section
export const deleteReview = async (req, res) => {
    try {
        const { sectionId, reviewId } = req.params;

        const section = await CustomerReview.findById(sectionId);
        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        section.reviews = section.reviews.filter(
            review => review._id.toString() !== reviewId
        );

        await section.save();
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error in deleteReview:", error);
        res.status(500).json({ message: error.message });
    }
}; 