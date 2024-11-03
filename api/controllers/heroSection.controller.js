import HeroSection from '../models/ModelLandingPageProductHeroSection.js';
export const createHeroSection = async (req, res) => {
  try {
    const { seasonalLabel, title, make, type, description, statistics, shoes } = req.body;

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
      shoes
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
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch hero sections' });
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