// controllers/navigation.controller.js

import Navigation from '../models/ModelNavigation.js';

// Get all navigation items
export const getNavigationItems = async (req, res) => {
  try {
    const items = await Navigation.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get navigation items', error });
  }
};

// Get a navigation item by ID
export const getNavigationItemById = async (req, res) => {
  try {
    const item = await Navigation.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Navigation item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get navigation item', error });
  }
};

// Create a new navigation item
export const createNavigationItem = async (req, res) => {
  try {
    const newItem = new Navigation(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create navigation item', error });
  }
};

// Update a navigation item
export const updateNavigationItem = async (req, res) => {
  try {
    const updatedItem = await Navigation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Navigation item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update navigation item', error });
  }
};

// Delete a navigation item
export const deleteNavigationItem = async (req, res) => {
  try {
    const deletedItem = await Navigation.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Navigation item not found' });
    }
    res.status(200).json({ message: 'Navigation item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete navigation item', error });
  }
};
