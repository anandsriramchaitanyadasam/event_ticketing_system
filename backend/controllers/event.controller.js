const Event = require('../models/event.model');
const Category = require('../models/category.model');


exports.addEvent = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Photo is required" });
        }

        const { vendor_Id, event_name, country, state, city, standard_price, vip_price, event_date, event_address, event_start_time, event_end_time, category_id } = req.body;
        // ✅ Fetch Category Name

        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(404).json({ message: "Invalid category ID" });
        }

        const newEvent = new Event({
            vendor_Id,
            event_name,
            country,
            state,
            city,
            standard_price,   // ✅ Changed from event_ticket_price
            vip_price,        // ✅ Added VIP Price
            event_date,
            event_address,
            event_start_time,
            event_end_time,
            photoUrl: req.file.filename,  // ✅ Fix: Store file name correctly
            category_id,                  // ✅ Store category ID
            category_name: category.category_name // ✅ Store category name
        });

        await newEvent.save();

        res.status(200).json({
            message: "Event added successfully",
            data: newEvent,
            status: 200
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Server error",
            error: error.message 
        });
    }
};

// Edit Event by Vendor
exports.editEventByVendor = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const vendorId = req.body.vendor_Id; // Vendor ID from request body
        const { event_name, country, state, city, standard_price, vip_price, event_date, event_address, event_start_time, event_end_time, category_id } = req.body;



        // ✅ Ensure required fields are provided
            if (!event_name || !country || !state || !city || !standard_price || !vip_price || !event_date || !event_address || !event_start_time || !event_end_time || !category_id) {
            return res.status(400).json({ message: "All fields are required", status: 400 });
        }

        // ✅ Check if event exists and belongs to the vendor
        const existingEvent = await Event.findOne({ _id: eventId, vendor_Id: vendorId });
        if (!existingEvent) {
            return res.status(404).json({ message: "Event not found or unauthorized", status: 404 });
        }

        // ✅ Validate Category
        const category = await Category.findById(category_id);
        if (!category) {
            return res.status(400).json({ message: "Invalid category ID", status: 400 });
        }

        // ✅ Update event data
        const updatedData = {
            event_name,
            country,
            state,
            city,
            standard_price,  // ✅ Updated field name
            vip_price, 
            event_date,
            event_address,
            event_start_time,
            event_end_time,     
            category_id,
            category_name: category.category_name, // ✅ Store category name
        };

        // ✅ Handle optional photo update
        if (req.file) {
            updatedData.photoUrl = req.file.filename; // ✅ Save new file name
        }

        // ✅ Update the event in DB
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId, vendor_Id: vendorId }, // Ensure vendor owns the event
            { $set: updatedData },
            { new: true }
        );

        return res.status(200).json({
            data: updatedEvent,
            message: "Event updated successfully",
            status: 200
        });

    } catch (error) {
        return res.status(500).json({ message: error.message || "Error updating event", status: 500 });
    }
};

// Delete Event by Vendor
exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        const existingEvent = await Event.findOne({ _id: eventId }).lean();
        if (!existingEvent) {
            return res.status(404).send({ message: 'Event not found', status: 404 });
        }

        await Event.findOneAndUpdate(
            { _id: eventId },
            { $set: { deleteFlag: true } }
        );

        return res.status(200).send({ message: 'Event deleted successfully', status: 200 });
    } catch (error) {
        return res.status(500).send({ message: error.message || 'Error deleting Event', status: 500 });
    }
};

exports.searchEvents = async (req, res) => {
    try {
        const { category_name, event_date, city } = req.query; // Get filters

        let filter = { deleteFlag: false }; // Only fetch non-deleted events

        if (category_name) {
            filter.category_name = { $regex: new RegExp(category_name, "i") }; // Case-insensitive search
        }

        if (event_date) {
            // Convert event_date to a proper Date range
            const startDate = new Date(event_date);
            const endDate = new Date(event_date);
            endDate.setHours(23, 59, 59, 999); // Include full day range

            filter.event_date = { $gte: startDate, $lte: endDate };
        }

        if (city) {
            filter.city = { $regex: new RegExp(city, "i") }; // Case-insensitive city search
        }

        // Fetch matching events
        const events = await Event.find(filter).sort({ event_date: 1 });

        return res.status(200).json({
            message: "Events fetched successfully",
            data: events,
            totalCount: events.length,
            status: 200
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
            status: 500
        });
    }
};








