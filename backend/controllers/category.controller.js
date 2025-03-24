const Category = require('../models/category.model');


exports.createCategory = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Photo is required" });
        }
        const { category_name } = req.body;

        const newCategory = new Category({
            category_name:category_name,
            photoUrl:req.file.filename,
        });

        await newCategory.save();

        res.status(200).json({
            message: "Category added successfully",
            data: newCategory,
            status: 200
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Server error",
            error: error.message 
        });
    }
};


// Get all categories
// exports.getAllCategories = async (req, res) => {
//     try {
//         const categories = await Category.find().sort({ createdAt: 1 }); // Sorting by latest created category

//         res.status(200).json({
//             data: categories,
//             totalCount: categories.length,
//             message: "Categories fetched successfully",
//             status: 200
//         });
//     } catch (error) {
//         res.status(500).json({
//             data: [],
//             totalCount: 0,
//             message: "Server error",
//             status: 500,
//             error: error.message
//         });
//     }
// };

// Get all categories (Only Active Categories)
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({ deleteFlag: false }) // ✅ Filter out deleted categories
            .sort({ createdAt: 1 }); // Sorting by creation date

        res.status(200).json({
            data: categories,
            totalCount: categories.length,
            message: "Categories fetched successfully",
            status: 200
        });
    } catch (error) {
        res.status(500).json({
            data: [],
            totalCount: 0,
            message: "Server error",
            status: 500,
            error: error.message
        });
    }
};

// update category
exports.updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { category_name } = req.body;

        // Check if the category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found", status: 404 });
        }

        // Prepare update data
        const updateData = { category_name };
        if (req.file) {
            updateData.photoUrl = req.file.filename; // Update image only if provided
        }

        // Update the category
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });

        return res.status(200).json({ message: "Category updated successfully", data: updatedCategory, status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: 500 });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Rename `category` to `deletedCategory`
        const deletedCategory = await Category.findByIdAndUpdate(
            categoryId, 
            { deleteFlag: true }, 
            { new: true }
        );

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found", status: 404 });
        }

        return res.status(200).json({ message: "Category deleted successfully", status: 200 });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: 500 });
    }
};

