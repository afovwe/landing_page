import mongoose from "mongoose";

const HeroSectionSchema = new mongoose.Schema({
  subtitle: String,
  mainTitle: String,
  brandName: String,
  description: String,
  buttonText: String,
  mainImage: String,
  shoeImages: [String],
  statistics: [{
    value: String,
    label: String
  }],
  isActive: {
    type: Boolean,
    default: false
  }
});

const HeroSection = mongoose.model("HeroSection", HeroSectionSchema);
export default HeroSection; 