const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const bookEventSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    ticketType: {  // ✅ Store ticket type (standard/vip)
        type: String,
        enum: ['standard', 'vip'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total_price: {  // Calculated based on quantity
        type: Number,
        required: true
    },
    paymentStatus: {  
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
    },
    cardDetails: {  
        cardHolderName: { 
            type: String, 
            trim: true 
        },
        cardNumber: { 
            type: String, 
            trim: true 
        },
        expiryMonth: { 
            type: String, 
            trim: true 
        },
        expiryYear: { 
            type: String, 
            trim: true 
        },
        cvv: {
            type: String,
            trim: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BookEvent', bookEventSchema);
