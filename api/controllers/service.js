import Service from "../models/Service.js";

export const getActiveServices = async (req, res) => {
    try {
        const activeServices = await Service.find({ active: true }).sort({ order: 1 });
        
        if (!activeServices.length) {
            const defaultServices = [
                {
                    imgURL: "truckFast",
                    label: "Free shipping",
                    subtext: "Enjoy seamless shopping with our complimentary shipping service.",
                    order: 1
                },
                {
                    imgURL: "shieldTick",
                    label: "Secure Payment",
                    subtext: "Experience worry-free transactions with our secure payment options.",
                    order: 2
                },
                {
                    imgURL: "support",
                    label: "Love to help you",
                    subtext: "Our dedicated team is here to assist you every step of the way.",
                    order: 3
                }
            ];
            
            return res.status(200).json({ services: defaultServices });
        }

        res.status(200).json({ services: activeServices });
    } catch (error) {
        console.error("Error in getActiveServices:", error);
        res.status(404).json({ message: error.message });
    }
};

export const createService = async (req, res) => {
    try {
        const { imgURL, label, subtext, order } = req.body;

        if (!imgURL || !label || !subtext) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newService = new Service({
            imgURL,
            label,
            subtext,
            order: order || 0,
            active: true
        });

        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        console.error("Error in createService:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedService = await Service.findByIdAndUpdate(
            id,
            { ...updates },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json(updatedService);
    } catch (error) {
        console.error("Error in updateService:", error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error in deleteService:", error);
        res.status(500).json({ message: error.message });
    }
}; 