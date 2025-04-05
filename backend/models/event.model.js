const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    vendor_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    event_name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
   
    standard_price: {  
        type: Number,
        required: true
    },
    vip_price: {  
        type: Number,
        required: true
    },
    event_date: {  
        type: Date,
        required: true
    },
    event_address: {  
        type: String,
        required: true
    },
    event_start_time: {  
        type: String,
        required: true
    },
    event_end_time: {  
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Category Model
        ref: 'Category',
        required: true
    },
    category_name: {  // Store category_name for convenience
        type: String,  
        required: true
    },
   
    deleteFlag: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
   
});

module.exports = mongoose.model('Event', eventSchema);