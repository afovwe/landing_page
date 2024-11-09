import HeroSection from '../models/ModelLandingPageProductHeroSection.js';

export const createHeroSection = async (req, res) => {
  try {
    const { seasonalLabel, title, make, type, description, statistics, shoes, active } = req.body;

    // Validate that statistics and shoes are arrays
    if (!Array.isArray(statistics) || !Array.isArray(shoes)) {
      return res.status(400).json({ message: 'Statistics and shoes must be arrays' });
    }

    // Validate each object within statistics and shoes arrays
    for (const stat of statistics) {
      if (!stat.label || !stat.value) {
        return res.status(400).json({ message: 'Each statistic must contain a label and value' });
      }
    }

    for (const shoe of shoes) {
      if (!shoe.thumbnail || !shoe.bigShoe || !shoe.alt || shoe.order === undefined) {
        return res.status(400).json({ message: 'Each shoe must contain a thumbnail, bigShoe, alt, and order' });
      }
    }

    // Create a new HeroSection document
    const newHeroSection = new HeroSection({
      seasonalLabel,
      title,
      make,
      type,
      description,
      statistics,
      shoes,
      active: active !== undefined ? active : false // Set active to false if not provided
    });

    // Save to database
    const savedHeroSection = await newHeroSection.save();
    res.status(201).json(savedHeroSection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create hero section' });
  }
};

// Get all HeroSections 
export const getAllHeroSections = async (req, res) => {
  try {
    const heroSections = await HeroSection.find();
    res.status(200).json(heroSections);
  } catch (error) {
    console.error("Error in getAllHeroSections:", error);
    res.status(500).json({ message: 'Failed to fetch hero sections', error: error.message });
  }
};



// Get an active HeroSection by ID (where active status is true)
export const getActiveHeroSectionById = async (req, res) => {
  try {
    const activeHeroSection = await HeroSection.findOne({ _id: req.params.id, active: true });
    if (!activeHeroSection) {
      return res.status(404).json({ message: 'Active hero section not found' });
    }
    res.status(200).json(activeHeroSection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch active hero section' });
  }
};
// Get a single HeroSection by ID
export const getHeroSectionById = async (req, res) => {
  try {
    const heroSection = await HeroSection.findById(req.params.id);
    if (!heroSection) {
      return res.status(404).json({ message: 'Hero section not found' });
    }
    res.status(200).json(heroSection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch hero section' });
  }
};

// Update a HeroSection by ID
export const updateHeroSection = async (req, res) => {
  try {
    const updatedHeroSection = await HeroSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedHeroSection) {
      return res.status(404).json({ message: 'Hero section not found' });
    }
    res.status(200).json(updatedHeroSection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update hero section' });
  }
};

// Delete a HeroSection by ID
export const deleteHeroSection = async (req, res) => {
  try {
    const deletedHeroSection = await HeroSection.findByIdAndDelete(req.params.id);
    if (!deletedHeroSection) {
      return res.status(404).json({ message: 'Hero section not found' });
    }
    res.status(200).json({ message: 'Hero section deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete hero section' });
  }
};

// Get all HeroSections with active status set to false
export const getInactiveHeroSections = async (req, res) => {
  try {
    const inactiveHeroSections = await HeroSection.find({ active: false });
    res.status(200).json(inactiveHeroSections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch inactive hero sections' });
  }
};
