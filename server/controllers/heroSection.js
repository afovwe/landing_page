import HeroSection from "../models/HeroSection.js";

export const getActiveHeroSection = async (req, res) => {
  try {
    const activeHeroSection = await HeroSection.findOne({ isActive: true });
    
    console.log("Database Query Result:", activeHeroSection);
    
    if (!activeHeroSection) {
      const defaultData = {
        subtitle: "Our Summer collections",
        mainTitle: "The New Arrival",
        brandName: "Nike",
        description: "Discover stylish Nike arrivals, quality comfort, and innovation for your active life.",
        buttonText: "Shop now",
        statistics: [
          { value: "1k+", label: "Brands" },
          { value: "500+", label: "Shops" },
          { value: "250k+", label: "Customers" },
        ]
      };
      
      console.log("Sending Default Data:", defaultData);
      return res.status(200).json(defaultData);
    }

    console.log("Sending Database Data:", activeHeroSection);
    res.status(200).json(activeHeroSection);
  } catch (error) {
    console.error("Error in getActiveHeroSection:", error);
    res.status(404).json({ message: error.message });
  }
}; 