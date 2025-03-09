const multer = require('multer');
const Plants = require('../models/plant.model');
const mongoose = require('mongoose');
// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Set the folder where files will be uploaded
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Set the file name
    },
  });
  
  exports.upload = multer({ storage });


  exports.addPlant = async(req,res)=>{

    try {
        const {plant_name , description} = req.body;
        const photos = req.files['photos'] ? req.files['photos'].map(file => file.path) : [];

        const newPlant = new Plants({
            plant_name,
            description,
            dateAdded: new Date(),
            photos,    
        });
        // Save the plant to the database
        const savedPlant = await newPlant.save();
        res.status(201).json({ message: 'Add plant successfully', plant: savedPlant });
    } catch (error) {
        console.error('Error add plant', error);
        res.status(500).json({ error: 'Failed to add plant' });
    }
  }

  exports.getPlants = async (req, res) => {
    try {
  
      const Plantslist = await Plants.find({});
       console.log("");
       
      if (Plantslist.length === 0) {
        return res.status(404).json({ message: 'No data found' });
      }

      res.status(200).json({ data: Plantslist });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server error' });
    }
  };

  exports.updatePlants = async (req, res) => {
    try {
      const { plantId } = req.params; // Get plant ID from URL
      const { plant_name, description } = req.body;
      let photos = req.files?.["photos"] ? req.files["photos"].map(file => file.path) : [];

      // Construct update object dynamically
      let updateFields = {};
      if (plant_name) updateFields.plant_name = plant_name;
      if (description) updateFields.description = description;
      if (photos.length > 0) updateFields.photos = photos; // Update only if new photos are uploaded
  
      // Find and update the plant
      const updatedPlant = await Plants.findOneAndUpdate(
        { _id: plantId }, // Find by ID
        { $set: updateFields }, // Update only non-empty fields
        { new: true, runValidators: true } // Return updated document & apply validation
      );
  
      if (!updatedPlant) {
        return res.status(404).json({ error: "Plant not found" });
      }
  
      res.status(200).json({ message: "Plant updated successfully", plant: updatedPlant });
    } catch (error) {
      console.error("Error updating plant", error);
      res.status(500).json({ error: "Failed to update plant" });
    }
  };
  
  exports.deletePlant = async (req, res) => {
    try {
      const { plantId } = req.params; // Get plant ID from URL
  
      // Find the plant in the database
      const plant = await Plants.findById(plantId);
      if (!plant) {
        return res.status(404).json({ error: "Plant not found" });
      }
  
      // Delete plant from database
      await Plants.findByIdAndDelete(plantId);
  
      res.status(200).json({ message: "Plant deleted successfully" });
    } catch (error) {
      console.error("Error deleting plant", error);
      res.status(500).json({ error: "Failed to delete plant" });
    }
  };

  // add tag
  exports.addTag = async (req, res) =>{
    try {
      const { name, color } = req.body; // Extract name and color from request body
      const plantId = req.params.plantId;

      // Validate input
      if (!name || !color) {
          return res.status(400).json({ message: "Both tag name and color are required" });
      }

      // Find and update the plant
      const updatedPlant = await Plants.findByIdAndUpdate(
          plantId,
          { $set: { tag: { name, color } } },
          { new: true, runValidators: true }
      );

      if (!updatedPlant) {
          return res.status(404).json({ message: "Plant not found" });
      }

      res.status(200).json({ message: "Tag add successfully", plant: updatedPlant });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
  }

  