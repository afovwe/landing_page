import mongoose from 'mongoose';

// Define the schema for individual shoe entries
const shoeSchema = new mongoose.Schema({
  thumbnail: { type: String, required: true },
  bigShoe: { type: String, required: true },
  alt: { type: String, required: true },
  order: { type: Number, required: true }
});

// Define the schema for individual statistics
const statisticSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
});

// Define the main collection schema
const heroCollectionSchema = new mongoose.Schema({
  seasonalLabel: { type: String, required: true },
  title: { type: String, required: true },
  make: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  statistics: [statisticSchema],
  shoes: [shoeSchema],
  active: { type: Boolean, default: false },
}, { timestamps: true });

// Create and export the Collection model
const HeroSection = mongoose.model('HeroSection', heroCollectionSchema);
export default HeroSection;
