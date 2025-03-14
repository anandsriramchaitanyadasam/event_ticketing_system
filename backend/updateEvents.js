const Event = require('./models/event.model');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vermadiksha3196:WXDo4nVoD8PpCICz@cluster0.it8ad.mongodb.net/OnlineTicketingSystem', { useNewUrlParser: true, useUnifiedTopology: true });

async function updateExistingEvents() {
    try {
        await Event.updateMany({}, { 
            $set: { 
                event_date: new Date(), // Default current date
                event_address: "TBD",  // Default address
                event_start_time: "00:00 AM", // Default start time
                event_end_time: "00:00 PM"  // Default end time
            }
        });
        console.log('New fields added to existing events');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error updating events:', error);
        mongoose.disconnect();
    }
}

updateExistingEvents();
