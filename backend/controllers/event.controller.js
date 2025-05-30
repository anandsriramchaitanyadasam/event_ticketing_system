const Event = require('../models/event.model');
const Category = require('../models/category.model');
const Booking = require('../models/bookEvent.model');
const Vendor = require('../models/vendor.model');
const Notification = require('../models/notification.model');
const User = require('../models/user.model'); 


exports.addEvent = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Photo is required" });
        }

        const { vendor_Id, event_name, country, state, city, standard_price, vip_price, event_date, event_address, event_start_time, event_end_time, category_id } = req.body;
        //  Fetch Category Name

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
            standard_price,   
            vip_price,        
            event_date,
            event_address,
            event_start_time,
            event_end_time,
            photoUrl: req.file.filename,  
            category_id,                  //  Store category ID
            category_name: category.category_name //  Store category name
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
// edit event vendor
exports.editEventByVendor = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const vendorId = req.body.vendor_Id;

        const existingEvent = await Event.findOne({ _id: eventId, vendor_Id: vendorId });
        if (!existingEvent) {
            return res.status(404).json({ message: "Event not found or unauthorized", status: 404 });
        }

        const updateFields = { ...req.body };

        if (req.file) {
            updateFields.photoUrl = req.file.filename;
        }

        if (updateFields.category_id) {
            const category = await Category.findById(updateFields.category_id);
            if (!category) {
                return res.status(400).json({ message: "Invalid category ID", status: 400 });
            }
            updateFields.category_name = category.category_name;
        }

        const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId, vendor_Id: vendorId },
            { $set: updateFields },
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

// Book Event by User
// exports.bookEvent = async (req, res) => {
//     try {
//         const { userId, eventId, quantity, ticketType } = req.body;

//         if (!userId || !eventId || !quantity || !ticketType) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         if (quantity <= 0) {
//             return res.status(400).json({ message: "Invalid ticket quantity" });
//         }

//         //  Fetch event details
//         const event = await Event.findById(eventId);
//         if (!event) {
//             return res.status(404).json({ message: "Event not found" });
//         }

//         //  Determine ticket price based on ticketType
//         let ticketPrice;
//         if (ticketType === 'standard') {
//             ticketPrice = event.standard_price;
//         } else if (ticketType === 'vip') {
//             ticketPrice = event.vip_price;
//         } else {
//             return res.status(400).json({ message: "Invalid ticket type" });
//         }

//         // ✅ Calculate total price
//         const totalPrice = quantity * ticketPrice;

//         // ✅ Create booking entry
//         const newBooking = new Booking({
//             userId,
//             eventId,
//             quantity,
//             ticketType,
//             total_price: totalPrice
//         });

//         await newBooking.save();

//         res.status(200).json({
//             data: newBooking,
//             message: "Event booked successfully",
//             status: 200
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Server error",
//             error: error.message
//         });
//     }
// };

// Book Event by User
exports.bookEvent = async (req, res) => {
    try {
        const { userId, eventId, quantity, ticketType } = req.body;

        if (!userId || !eventId || !quantity || !ticketType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (quantity <= 0) {
            return res.status(400).json({ message: "Invalid ticket quantity" });
        }

        // Fetch event details
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Fetch user and vendor details
        const user = await User.findById(userId).select('user_Name');
        const vendor = await Vendor.findById(event.vendor_Id).select('vendor_Name');

        if (!user || !vendor) {
            return res.status(404).json({ message: "User or vendor not found" });
        }

        // Determine ticket price
        let ticketPrice;
        if (ticketType === 'standard') {
            ticketPrice = event.standard_price;
        } else if (ticketType === 'vip') {
            ticketPrice = event.vip_price;
        } else {
            return res.status(400).json({ message: "Invalid ticket type" });
        }

        const totalPrice = quantity * ticketPrice;

        // Save booking
        const newBooking = new Booking({
            userId,
            eventId,
            quantity,
            ticketType,
            total_price: totalPrice
        });

        await newBooking.save();

        // // ✅ Create notification for user
        // const userNotification = new Notification({
        //     userId: userId,
        //     user_name: user.user_Name,
        //     vendorId: vendor._id,
        //     vendor_Name: vendor.vendor_Name,
        //     message: `You have successfully booked the event "${event.event_name}".`
        // });

        // // ✅ Create notification for vendor
        // const vendorNotification = new Notification({
        //     userId: userId,
        //     user_name: user.user_Name,
        //     vendorId: vendor._id,
        //     vendor_Name: vendor.vendor_Name,
        //     message: `${user.user_Name} has booked your event "${event.event_name}".`
        // });

        // await userNotification.save();
        // await vendorNotification.save();

        // ✅ Create notification ONLY for vendor
        const vendorNotification = new Notification({
            userId: userId, // who triggered the action
            user_name: user.user_Name,
            vendorId: vendor._id,
            vendor_Name: vendor.vendor_Name,
            message: `${user.user_Name} has booked your event "${event.event_name}".`
        });

        await vendorNotification.save();

        res.status(200).json({
            data: newBooking,
            message: "Event booked successfully and notifications sent",
            status: 200
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


//Proceed Payment
exports.processPayment = async (req, res) => {
    try {
        const { bookingId, cardDetails } = req.body;

        if (!bookingId || !cardDetails) {
            return res.status(400).json({ message: "Booking ID and card details are required" });
        }

        // Fetch booking details
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        if (booking.paymentStatus === 'Paid') {
            return res.status(400).json({ message: "This booking is already paid" });
        }

        // Simulate payment processing (Replace with real payment gateway logic)
        const paymentSuccessful = Math.random() < 0.9; // 90% success rate simulation

        if (!paymentSuccessful) {
            return res.status(400).json({ message: "Payment failed. Try again!" });
        }

        // Update booking with payment status and card details
        booking.paymentStatus = 'Paid';
        booking.cardDetails = cardDetails;
        await booking.save();

        res.status(200).json({
            data: booking,
            message: "Payment successful",
            status: 200
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// fetched booked event by userId
// exports.getUserBookings = async (req, res) => {
//     try {
//         const { userId } = req.params;  // Get userId from URL params

//         if (!userId) {
//             return res.status(400).json({ message: "User ID is required" });
//         }

//         // Fetch bookings for the user & populate event details
//         const bookings = await Booking.find({ userId })
//             .populate("eventId", "event_name country state city standard_price vip_price category_name event_address event_date event_end_time event_start_time") // Fetch event details
//             .sort({ createdAt: -1 }); // Sort by latest bookings

//         if (!bookings.length) {
//             return res.status(404).json({ message: "No bookings found for this user" });
//         }

//         res.status(200).json({
//             data: bookings,
//             message: "User bookings retrieved successfully",
//             status: 200
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };



exports.getUserBookings = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const bookings = await Booking.find({ userId })
            .populate("eventId", "event_name country state city standard_price vip_price category_name event_address event_date event_end_time event_start_time vendor_Id") // Fetch event details
            .sort({ createdAt: -1 });

        if (!bookings.length) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }

        // Format response
        const formattedBookings = bookings.map(booking => ({
            _id: booking._id,
            userId: booking.userId,
            event: booking.eventId, // already populated with name, date, location
            ticketType: booking.ticketType,
            quantity: booking.quantity,
            total_price: booking.total_price,
            paymentStatus: booking.paymentStatus,
            createdAt: booking.createdAt,
            cardDetails: {
                cardHolderName: booking.cardDetails.cardHolderName,
                cardNumber: booking.cardDetails.cardNumber,
                expiry: `${booking.cardDetails.expiryMonth}/${booking.cardDetails.expiryYear}`,
                cvv: booking.cardDetails.cvv
            }
        }));

        res.status(200).json({
            data: formattedBookings,
            message: "User bookings retrieved successfully",
            status: 200
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



