import mongoose from 'mongoose';

const navigationSchema = new mongoose.Schema({
  href: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const Navigation = mongoose.model('Navigation', navigationSchema);

export default Navigation;
