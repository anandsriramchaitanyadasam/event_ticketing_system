const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const vendorSchema = new Schema({
    vendor_Name: {
        type: String,
        required: [true, "please enter vendor full name"],
    },
    vendor_Email: {
        type: String,
        required: [true, "please enter vendor email"],
    },
    country_code:{
        type: String,
  
    },
    mobile_no:{
        type: String,
        required: [true, "please enter vendor mobile_no"],
    },
    password: {
        type: String,
        required: [true, "please enter vendor password"]
    },


    isActive: {
        type: Boolean,
        default: true
    },

    deleteFlag: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Vendor", vendorSchema)

