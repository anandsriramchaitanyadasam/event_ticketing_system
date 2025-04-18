const Review = require('../models/review.model');
const Booking = require('../models/bookEvent.model');  
const User = require('../models/user.model'); 
const Event = require('../models/event.model'); 
const Vendor = require('../models/vendor.model'); 

// Submit Review API
exports.submitReview = async (req, res) => {
    try {
        const { userId, eventId, rating, review } = req.body;

        // Validate request data
        if (!userId || !eventId || !rating || !review) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user has booked this event
        const booking = await Booking.findOne({ userId, eventId });
        if (!booking) {
            return res.status(403).json({ message: "You can only review events you have booked" });
        }

        // Check if a review already exists
        const existingReview = await Review.findOne({ userId, eventId });
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this event" });
        }

        // Save new review
        const newReview = new Review({
            userId,
            eventId,
            rating,
            review
        });

        await newReview.save();

        // Fetch user, event, and vendor details
        const user = await User.findById(userId).select('user_Name'); // Get user name
        const event = await Event.findById(eventId).select('event_name vendor_Id'); // Get event name and vendor_Id
        const vendor = await Vendor.findById(event.vendor_Id).select('vendor_Name'); // Get vendor name

        res.status(200).json({
            data: {
                _id: newReview._id,
                user_name: user.user_Name,
                event_name: event.event_name,
                vendor_name: vendor.vendor_Name,
                rating: newReview.rating,
                review: newReview.review,
                createdAt: newReview.createdAt
            },
            message: "Review submitted successfully",
            status: 200
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};



// Get reviews for vendor's events
exports.getVendorEventReviews = async (req, res) => {
    try {
        const { vendorId } = req.params;

        if (!vendorId) {
            return res.status(400).json({ message: "Vendor ID is required" });
        }

        // Find all events posted by this vendor
        const vendorEvents = await Event.find({ vendor_Id: vendorId }).select('_id event_name');

        if (!vendorEvents.length) {
            return res.status(404).json({ message: "No events found for this vendor" });
        }

        const eventIds = vendorEvents.map(event => event._id);

        // Find all reviews for those events
        const reviews = await Review.find({ eventId: { $in: eventIds } })
            .populate('userId', 'user_Name')        // Get user name
            .populate('eventId', 'event_name');     // Get event name

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for vendor's events" });
        }

        const formattedReviews = reviews.map(r => ({
            _id: r._id,
            user_name: r.userId?.user_Name || null,
            event_name: r.eventId?.event_name || null,
            rating: r.rating,
            review: r.review,
            createdAt: r.createdAt
        }));

        return res.status(200).json({
            data: formattedReviews,
            totalReviews: formattedReviews.length,
            message: "Vendor event reviews fetched successfully",
            status: 200
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};



// Get all reviews (admin)
exports.getAllReviews = async (req, res) => {
    try {
        // Fetch all reviews with populated user and event
        const reviews = await Review.find()
            .populate('userId', 'user_Name')       // Get user name
            .populate('eventId', 'event_name vendor_Id');  // Get event name and vendorId

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found" });
        }

        // Collect all vendor IDs from events
        const vendorIds = [...new Set(reviews.map(r => r.eventId?.vendor_Id).filter(Boolean))];

        // Fetch vendor names
        const vendors = await Vendor.find({ _id: { $in: vendorIds } }).select('vendor_Name');
        const vendorMap = {};
        vendors.forEach(v => {
            vendorMap[v._id] = v.vendor_Name;
        });

        // Format reviews
        const formattedReviews = reviews.map(r => ({
            _id: r._id,
            user_name: r.userId?.user_Name || null,
            event_name: r.eventId?.event_name || null,
            vendor_name: vendorMap[r.eventId?.vendor_Id] || null,
            rating: r.rating,
            review: r.review,
            createdAt: r.createdAt
        }));

        return res.status(200).json({
            data: formattedReviews,
            totalReviews: formattedReviews.length,
            message: "All reviews fetched successfully",
            status: 200
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};