export const getMobileNavigation = async (req, res) => {
  try {
    const navigationItems = [
      { label: 'Home', path: 'hero' },
      { label: 'Popular Products', path: 'popular-products' },
      { label: 'Super Quality', path: 'super-quality' },
      { label: 'Services', path: 'services' },
      { label: 'Special Offer', path: 'special-offer' },
      { label: 'Reviews', path: 'reviews' },
      { label: 'Contact Us', path: 'contact-us' }
    ];

    res.status(200).json({ navigationItems });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}; 