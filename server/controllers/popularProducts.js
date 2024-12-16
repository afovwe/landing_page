import PopularProduct from "../models/PopularProduct.js";

export const getPopularProducts = async (req, res) => {
  try {
    const activeSection = await PopularProduct.findOne({ active: true });
    
    console.log("Fetched Popular Products Section:", activeSection);
    
    if (!activeSection) {
      const defaultSection = {
        title: "Our Popular Products",
        description: "Experience top-notch quality and style with our sought-after selections. Discover a world of comfort, design, and value.",
        products: []
      };
      
      console.log("Sending Default Section:", defaultSection);
      return res.status(200).json(defaultSection);
    }

    res.status(200).json(activeSection);
  } catch (error) {
    console.error("Error in getPopularProducts:", error);
    res.status(404).json({ message: error.message });
  }
};

export const createPopularProductSection = async (req, res) => {
  try {
    const { title, description, products } = req.body;

    // Validate required fields
    if (!title || !description || !products || !Array.isArray(products)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Sort products by order
    const sortedProducts = products.map((product, index) => ({
      ...product,
      order: product.order || index + 1,
      active: true
    }));

    const newSection = new PopularProduct({
      title,
      description,
      products: sortedProducts,
      active: true
    });

    await newSection.save();
    console.log("Created New Popular Products Section:", newSection);

    res.status(201).json(newSection);
  } catch (error) {
    console.error("Error in createPopularProductSection:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updatePopularProductSection = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedSection = await PopularProduct.findByIdAndUpdate(
      id,
      { ...updates },
      { new: true }
    );

    if (!updatedSection) {
      return res.status(404).json({ message: "Section not found" });
    }

    console.log("Updated Popular Products Section:", updatedSection);
    res.status(200).json(updatedSection);
  } catch (error) {
    console.error("Error in updatePopularProductSection:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePopularProductSection = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSection = await PopularProduct.findByIdAndDelete(id);

    if (!deletedSection) {
      return res.status(404).json({ message: "Section not found" });
    }

    console.log("Deleted Popular Products Section:", deletedSection);
    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    console.error("Error in deletePopularProductSection:", error);
    res.status(500).json({ message: error.message });
  }
}; 