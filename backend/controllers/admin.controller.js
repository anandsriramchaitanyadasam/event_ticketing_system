const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const { Mongoose } = require("mongoose");
const admin = require("../models/admin.model");
const user = require("../models/user.model");
const vendor = require("../models/vendor.model");
const event = require("../models/event.model");
const Booking = require('../models/bookEvent.model');
const Notification = require('../models/notification.model');

function generateToken(userid) {
  return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}

exports.createAdmin = async (req, res) => {
  try {
    const { admin_Name, admin_Email, password } = req.body;

    // Validating email, full name, mobile number, password, and confirm password
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;

    if (!admin_Email) {
      return res
        .status(400)
        .send({ message: "Email is required", status: 400 });
    } else if (!admin_Email.match(emailRegex)) {
      return res
        .status(400)
        .send({ message: "Please provide a valid Email address", status: 400 });
    }

    if (!admin_Name) {
      return res
        .status(400)
        .send({ message: "admin  name is required", status: 400 });
    }

    if (!password) {
      return res
        .status(400)
        .send({ message: "Password is required", status: 400 });
    }

    const checkEmail = await admin.findOne({ admin_Email }).lean();
    if (checkEmail) {
      return res
        .status(409)
        .send({ message: "Email already exists", status: 409 });
    }

    const data = await admin.create({
      admin_Name: admin_Name,
      admin_Email: admin_Email.toLowerCase(),
      password: bcrypt.hashSync(password),
    });

    return res.status(200).send({
      data,
      message: "Congratulations! Your account has been created successfully!",
      status: 200,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating an account",
      status: 500,
    });
  }
};

//admin login
exports.adminLogin = (req, res) => {
  // Request validation
  if (!req.body || !req.body.admin_Email || !req.body.password) {
    return res.status(400).send({
      message: "Please provide both admin email and password.",
      status: 400,
    });
  }

  const admin_Email = req.body.admin_Email.toLowerCase();

  // Check, get, and verify login data from the database
  admin
    .findOne({ admin_Email: admin_Email, deleteFlag: false })
    .then((foundAdmin) => {
      if (!foundAdmin) {
        return res
          .status(404)
          .send({ message: "Email does not exist.", status: 404 });
      }

      console.log(foundAdmin);

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        foundAdmin.password
      );
      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ message: "Invalid password!.", status: 401 });
      }

      const token = generateToken(foundAdmin._id);
      return res
        .status(200)
        .send({ accessToken: token, data: foundAdmin, status: 200 });
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal server error.", status: 500 });
    });
};

exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users except those marked as deleted
    const users = await user.find({ deleteFlag: false }).select("-password"); // Exclude the password field
    const totalCount = await user.countDocuments({ deleteFlag: false }); // Count the total users

    return res.status(200).send({
      data: users,
      totalCount, // Include the total count
      message: "Users fetched successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "An error occurred while fetching users",
      status: 500,
    });
  }
};

// to get vendors list
exports.getAllVendors = async (req, res) => {
  try {
    // Fetch all vendors except those marked as deleted
    const vendors = await vendor
      .find({ deleteFlag: false })
      .select("-password"); // Exclude the password field
    const totalCount = await vendor.countDocuments({ deleteFlag: false }); // Count the total vendors

    return res.status(200).send({
      data: vendors,
      totalCount, // Include the total count
      message: "Vendors fetched successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "An error occurred while fetching vendors",
      status: 500,
    });
  }
};

// Edit user data by admin
exports.editUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    // const { user_Name, user_Email, country_code, mobile_no } = req.body;
    const { user_Name, country_code, mobile_no } = req.body;

    // Validate request data
    if (!user_Name || !country_code || !mobile_no) {
      return res
        .status(400)
        .send({ message: "All fields are required", status: 400 });
    }

    // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (!user_Email.match(emailRegex)) {
    //     return res.status(400).send({ message: 'Please provide a valid email address', status: 400 });
    // }

    const existingUser = await user.findOne({ _id: userId }).lean();
    if (!existingUser) {
      return res.status(404).send({ message: "User not found", status: 404 });
    }

    const updatedUser = await user.findOneAndUpdate(
      { _id: userId },
      { $set: { user_Name, country_code, mobile_no } },
      { new: true }
    );

    return res.status(200).send({
      data: updatedUser,
      message: "User updated successfully",
      status: 200,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Error updating user", status: 500 });
  }
};

// Delete user by admin
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const existingUser = await user.findOne({ _id: userId }).lean();
    if (!existingUser) {
      return res.status(404).send({ message: "User not found", status: 404 });
    }

    await user.findOneAndUpdate(
      { _id: userId },
      { $set: { deleteFlag: true } }
    );

    return res
      .status(200)
      .send({ message: "User deleted successfully", status: 200 });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Error deleting user", status: 500 });
  }
};

// to get events list
exports.getAllEvents = async (req, res) => {
  try {
    // Fetch all events except those marked as deleted
    const events = await event.find({ deleteFlag: false }).select("-password"); // Exclude the password field
    const totalCount = await event.countDocuments({ deleteFlag: false }); // Count the total events

    return res.status(200).send({
      data: events,
      totalCount, // Include the total count
      message: "Events fetched successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "An error occurred while fetching events",
      status: 500,
    });
  }
};

// Delete events by admin
exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const existingEvent = await event.findOne({ _id: eventId }).lean();
    if (!existingEvent) {
      return res.status(404).send({ message: "Event not found", status: 404 });
    }

    await event.findOneAndUpdate(
      { _id: eventId },
      { $set: { deleteFlag: true } }
    );

    return res
      .status(200)
      .send({ message: "Event deleted successfully", status: 200 });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Error deleting event", status: 500 });
  }
};

// Get total count of users, vendors, and events
exports.getTotalCounts = async (req, res) => {
  try {
    const totalUsers = await user.countDocuments(); //  Count total users
    const totalVendors = await vendor.countDocuments(); //  Count total vendors
    const totalEvents = await event.countDocuments({ deleteFlag: false }); //  Count only active events

    res.status(200).json({
      totalUsers,
      totalVendors,
      totalEvents,
      message: "Counts fetched successfully",
      status: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      status: 500,
      error: error.message,
    });
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const eventId = req.params.id; // Get ID from request parameters
    const eventData = await event
      .findOne({ _id: eventId, deleteFlag: false })
      .select("-password"); // Fetch event excluding password

    if (!eventData) {
      return res.status(404).send({ message: "Event not found", status: 404 });
    }

    return res.status(200).send({
      data: eventData,
      message: "Event fetched successfully",
      status: 200,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "An error occurred while fetching the event",
      status: 500,
    });
  }
};


exports.getAllBookedEvents = async (req, res) => {
  try {
      //  Fetch all bookings and populate event & user details
      const bookings = await Booking.find()
          .populate('eventId', 'event_name standard_price vip_price vendor_Id') // Fetch event details
          .populate('userId', 'user_Name email'); // Fetch user details

      if (!bookings.length) {
          return res.status(404).json({ message: "No bookings found" });
      }

      //  Format response data
      const result = bookings.map(booking => ({
          event_name: booking.eventId.event_name,
          standard_price: booking.eventId.standard_price,
          vip_price: booking.eventId.vip_price,
          vendor_Id: booking.eventId.vendor_Id,
          user_name: booking.userId.user_Name,
          user_email: booking.userId.email,
          quantity: booking.quantity,
          total_price: booking.total_price,
          ticketType: booking.ticketType,
          paymentStatus: booking.paymentStatus, 
          createdAt: booking.createdAt 
      }));

      //  Get total ticket count across all bookings
      const totalTicketCount = bookings.reduce((sum, booking) => sum + booking.quantity, 0);

      res.status(200).json({
          data: result,
          totalTicketCount: totalTicketCount, //  Total booked tickets across all events
          message: "All booked events retrieved successfully",
          status: 200,
      });

  } catch (error) {
      res.status(500).json({ 
          message: "Server error",
          error: error.message ,
          status: 500,
      });
  }
};


// get booked event details via bookingId
exports.getUsersBookingByBookingId = async (req, res) => {
  try {
    const { bookedEventId } = req.params;

    if (!bookedEventId) {
      return res.status(400).json({ message: "Booking Event ID is required" });
    }

    //  Find booking by ID and populate event & user details
    const booking = await Booking.findById(bookedEventId)
      .populate("eventId", "event_name country state city standard_price vip_price category_name event_address event_date event_start_time event_end_time vendor_Id")
      .populate("userId", "user_Name");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    //  Format response
    const result = {
      event: booking.eventId || {},
      user: {
        name: booking.userId?.user_Name || null
      },
      ticketType: booking.ticketType,
      quantity: booking.quantity,
      total_price: booking.total_price,
      paymentStatus: booking.paymentStatus,
      cardDetails: {
        cardHolderName: booking.cardDetails?.cardHolderName || null,
        cardNumber: booking.cardDetails?.cardNumber || null,
        expiryMonth: booking.cardDetails?.expiryMonth || null,
        expiryYear: booking.cardDetails?.expiryYear || null,
        cvv: booking.cardDetails?.cvv || null
      },
      createdAt: booking.createdAt
    };

    res.status(200).json({
      data: result,
      message: "Booking details retrieved successfully",
      status: 200
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
      status: 500
    });
  }
};



// Edit Vendor data by admin
exports.editVendor = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;
    const { vendor_Name, country_code, mobile_no } = req.body;

    // Validate request data
    if (!vendor_Name || !country_code || !mobile_no) {
      return res
        .status(400)
        .send({ message: "All fields are required", status: 400 });
    }


    const existingVendor = await vendor.findOne({ _id: vendorId }).lean();
    if (!existingVendor) {
      return res.status(404).send({ message: "Vendor not found", status: 404 });
    }

    const updatedVendor = await vendor.findOneAndUpdate(
      { _id: vendorId },
      { $set: { vendor_Name, country_code, mobile_no } },
      { new: true }
    );

    return res.status(200).send({
      data: updatedVendor,
      message: "Vendor updated successfully",
      status: 200,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Error updating vendor", status: 500 });
  }
};

// Delete Vendor by admin
exports.deleteVendor = async (req, res) => {
  try {
    const vendorId = req.params.vendorId;

    const existingVendor = await vendor.findOne({ _id: vendorId }).lean();
    if (!existingVendor) {
      return res.status(404).send({ message: "Vendor not found", status: 404 });
    }

    await vendor.findOneAndUpdate(
      { _id: vendorId },
      { $set: { deleteFlag: true } }
    );

    return res
      .status(200)
      .send({ message: "Vendor deleted successfully", status: 200 });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Error deleting vendor", status: 500 });
  }
};



// to get all the payment details of booked event

exports.getAllPaymentsDetails = async (req, res) => {
  try {
    // Fetch all bookings with populated user and event info
    const bookings = await Booking.find()
      .populate('userId', 'user_Name user_Email') // Get user name and email
      // .populate('eventId', 'event_name event_date standard_price vip_price vendor_Id'); // Get event info
      .populate("eventId", "event_name country state city standard_price vip_price category_name event_address event_date event_end_time event_start_time vendor_Id"); // Fetch event details


    if (!bookings.length) {
      return res.status(404).json({ message: "No payment records found" });
    }

    // Format the response
    const payments = bookings.map(booking => ({
      bookingId: booking._id,
      user: {
        name: booking.userId?.user_Name || null,
        email: booking.userId?.user_Email || null
      },
      event: {
        Event_name: booking.eventId?.event_name || null,
        date: booking.eventId?.event_date || null,
        vendor_Id: booking.eventId?.vendor_Id || null,
        Ticket_standard_price: booking.eventId?.standard_price || null,
        Ticket_vip_price: booking.eventId?.vip_price || null
      },
      ticketType: booking.ticketType,
      quantity: booking.quantity,
      totalPrice: booking.total_price,
      paymentStatus: booking.paymentStatus,
      cardDetails: {
        cardHolderName: booking.cardDetails?.cardHolderName || null,
        cardNumber: booking.cardDetails?.cardNumber || null, // You might want to mask this
        expiryMonth: booking.cardDetails?.expiryMonth || null,
        expiryYear: booking.cardDetails?.expiryYear || null,
        cvv: booking.cardDetails?.cvv || null // You might want to exclude/mask this
      },
      createdAt: booking.createdAt
    }));

    return res.status(200).json({
      data: payments,
      totalPayments: payments.length,
      message: "All booked payment details retrieved successfully",
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



// API: Admin - Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
      const notifications = await Notification.find().sort({ createdAt: -1 });

      if (!notifications.length) {
          return res.status(404).json({ message: "No notifications found" });
      }

      res.status(200).json({
          data: notifications,
          message: "All notifications retrieved successfully",
          status: 200
      });

  } catch (error) {
      res.status(500).json({
          message: "Server error",
          error: error.message
      });
  }
};

