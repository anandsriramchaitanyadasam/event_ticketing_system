const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true, // Ensure category names are unique
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    deleteFlag: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);