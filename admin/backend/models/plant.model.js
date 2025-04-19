const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const plants = new Schema({
    plant_name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    photos: {
        type: [String],
        required: [true, "please add photo"]
    },
    tag: {
        name: { type: String },
        color: { type: String }
    }
}, { timestamps: true });

module.exports = mongoose.model("Plants", plants);
