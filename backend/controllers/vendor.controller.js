const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const Vendor = require('../models/vendor.model')
const Category = require('../models/category.model');
const Event = require('../models/event.model');
const Booking = require('../models/bookEvent.model');
const User = require('../models/user.model'); 
const Notification = require('../models/notification.model');


function generateToken(vendorid) {
    return jwt.sign({ id: vendorid }, config.secret, { expiresIn: 15552000 });
}


exports.vendorSignUp = async (req, res) => {
    let vendor_Email = req.body.vendor_Email ? req.body.vendor_Email : "";
    let vendor_Name = req.body.vendor_Name ? req.body.vendor_Name : "";
    let country_code = req.body.country_code ? req.body.country_code : "";
  
    let mobile_no = req.body.mobile_no ? req.body.mobile_no : "";
    let password = req.body.password ? req.body.password : "";
    let confirmPassword = req.body.confirmPassword
      ? req.body.confirmPassword
      : "";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;
  
    try {
      if (vendor_Email === null || vendor_Email === "") {
        return res
          .status(400)
          .send({ message: "email is required", status: 200 });
      } else {
        if (!vendor_Email.match(mailformat)) {
          return res
            .status(400)
            .send({ message: "email is not in correct form", status: 400 });
        } else {
          if (vendor_Name === "" || vendor_Name === null) {
            return res
              .status(400)
              .send({ message: "Full name is required", status: 200 });
          }else {
              if (country_code === "" || country_code === null) {
                return res
                  .status(400)
                  .send({ message: "Country code is required", status: 200 });
              } else {
                if (mobile_no === null || mobile_no === "") {
                  return res.status(400).send({
                    message: "Mobile Number is required",
                    status: 400,
                  });
                } else {
                  if (mobile_no.length < 7) {
                    return res.status(400).send({
                      message: "Mobile number cannot be less than 7 digits. ",
                      status: 400,
                    });
                  } else {
                    if (mobile_no.length > 15) {
                      return res.status(400).send({
                        message:
                          "Mobile numbers cannot be more than 15 digits long.",
                        status: 400,
                      });
                    } else {
                      if (isNaN(mobile_no)) {
                        return res.status(400).send({
                          message: "Mobile number must only contains digits",
                          status: 400,
                        });
                      } else {
                        if (password === null || password === "") {
                          return res.status(400).send({
                            message: "Password is required",
                            status: 400,
                          });
                        } else {
                          if (password.length < 8) {
                            return res.status(400).send({
                              message:
                                "Password must be a combination of 8 characters long ( including at least one uppercase and one lowercase letter,a number, and a symbol)",
                              status: 400,
                            });
                          } else {
                            if (!password.match(passformat)) {
                              return res.status(400).send({
                                message:
                                  "Password must be a combination of 8 characters long ( including at least one uppercase and one lowercase letter,a number, and a symbol)",
                                status: 400,
                              });
                            } else {
                              if (
                                confirmPassword === "" ||
                                confirmPassword === null
                              ) {
                                return res.status(400).send({
                                  message: "confirm password is required",
                                  status: 400,
                                });
                              } else {
                                if (confirmPassword !== password) {
                                  return res.status(400).send({
                                    message:
                                      "password and confirm password are not the same",
                                    status: 400,
                                  });
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      
  
      let checkEmail = await Vendor.find({ vendor_Email: vendor_Email }).lean();
      if (checkEmail.length > 0) {
        return res
          .status(409)
          .send({ message: "Email already exists", status: 409 });
      }
  
      let checkMobileNo = await Vendor.find({ mobile_no: mobile_no }).lean();
      if (checkMobileNo.length > 0) {
        return res
          .status(409)
          .send({ message: "Mobile number already exists", status: 409 });
      }
  
      let data = await Vendor.create({
        vendor_Email: vendor_Email,
        vendor_Name: vendor_Name,
        
        country_code: country_code,
        mobile_no: mobile_no,
        password: bcrypt.hashSync(password, 8),
        confirmPassword: confirmPassword,
      });
  
      return res
        .status(200)
        .send({ data: data, message: "Success", status: 200 });
    } catch (error) {
      return res
        .status(500)
        .send({  message: error.message, status: 500 });
    }
  };



exports.vendorLogin = async (req, res) => {
    try {
        const vendor_Email = (req.body.vendor_Email || '').toLowerCase();
        const password = req.body.password || '';

        // Validation
        if (!vendor_Email || !password) {
            return res.status(400).send({ message: 'Please provide both email and password.', status: 400 });
        }

        const vendorData = await Vendor.findOne({ "vendor_Email": vendor_Email, deleteFlag: false });

        if (!vendorData) {
            return res.status(404).send({ message: 'Your email is not registered with us.', status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(password, vendorData.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Please enter a valid password.', status: 401 });
        }

        const token = generateToken(vendorData._id);
        return res.status(200).send({ accessToken: token, data: vendorData, message: 'Login successful!', status: 200 });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error.', status: 500 });
    }
};



exports.changeUserPassword = async (req, res) => {
    try {
        const usersRegId = req.params.usersRegId;
        const oldPassword = req.body.oldPassword || '';
        const newPassword = req.body.newPassword || '';
        const confirmPassword = req.body.confirmPassword || '';
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;


        // Validate request data
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).send({ message: 'All password fields must be provided', status: 400 });
        } else {
            if (!newPassword.match(passwordRegex)) {
                return res.status(400).send({ message: "Password must be a combination of 8 characters long ( including at least one uppercase and one lowercase letter,a number, and a symbol)", status: 400 });
            }
        }

        if (newPassword !== confirmPassword) {
            return res.status(401).send({ message: 'New password and confirm password do not match', status: 401 });
        }

        const existingUser = await Vendor.findOne({ _id: usersRegId }).lean();
        if (!existingUser) {
            return res.status(404).send({ message: 'User not found', status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(oldPassword, existingUser.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Incorrect old password', status: 401 });
        }

        await Vendor.findOneAndUpdate({ _id: usersRegId }, { $set: { password: bcrypt.hashSync(newPassword, 8) } });

        return res.status(200).send({ message: 'Password changed successfully', status: 200 });
    } catch (err) {
        return res.status(500).send({ message: err.message || 'Error changing password', status: 500 });
    }
};


// Get all categories (Only Active Categories)
exports.getAllCategoriesByVendor = async (req, res) => {
  try {
      const categories = await Category.find({ deleteFlag: false }) // ✅ Filter out deleted categories
          .sort({ createdAt: 1 }); // Sorting by creation date

      res.status(200).json({
          data: categories,
          totalCount: categories.length,
          message: "Categories fetched successfully",
          status: 200
      });
  } catch (error) {
      res.status(500).json({
          data: [],
          totalCount: 0,
          message: "Server error",
          status: 500,
          error: error.message
      });
  }
};


exports.getVendorEvents = async (req, res) => {
  try {
      const { vendorId } = req.params; // ✅ Get vendorId from URL params

      if (!vendorId) {
          return res.status(400).json({ message: "Vendor ID is required" });
      }

      // ✅ Fetch events for the vendor
      const events = await Event.find({ vendor_Id: vendorId, deleteFlag: false })
          .populate("category_id", "category_name") // ✅ Fetch category details
          .sort({ event_date: 1 }); // ✅ Sort by event date (upcoming first)

      // ✅ Get total event count
      const totalCount = await Event.countDocuments({ vendor_Id: vendorId, deleteFlag: false });

      if (!events.length) {
          return res.status(404).json({ message: "No events found for this vendor" });
      }

      res.status(200).json({
          data: events,
          message: "Vendor events retrieved successfully",
          totalCount: totalCount,
          status: 200
      });
  } catch (error) {
      res.status(500).json({
          message: "Server error",
          error: error.message
      });
  }
};



exports.getBookedEventsByVendor = async (req, res) => {
  try {
      const { vendorId } = req.params;

      if (!vendorId) {
          return res.status(400).json({ message: "Vendor ID is required" });
      }

      // ✅ Fetch events created by the vendor
      const events = await Event.find({ vendor_Id: vendorId });

      if (!events.length) {
          return res.status(404).json({ message: "No events found for this vendor" });
      }

      // ✅ Extract event IDs
      const eventIds = events.map(event => event._id);

      // ✅ Fetch bookings for these events & populate user data
      const bookings = await Booking.find({ eventId: { $in: eventIds } })
          .populate('eventId', 'event_name standard_price vip_price')
          .populate('userId', 'user_Name'); // Assuming user model has a "name" field

      if (!bookings.length) {
          return res.status(404).json({ message: "No bookings found for this vendor's events" });
      }

      // ✅ Calculate total quantity of all booked tickets
      const totalTicketCount = bookings.reduce((sum, booking) => sum + booking.quantity, 0);

      // ✅ Format response data
      const result = bookings.map(booking => ({
          event_name: booking.eventId.event_name,
          standard_price: booking.eventId.standard_price,
          vip_price: booking.eventId.vip_price,
          user_name: booking.userId.user_Name,
          quantity: booking.quantity,
          total_price: booking.total_price,
          ticketType: booking.ticketType
      }));

      res.status(200).json({
          data: result,
          // totalCount: bookings.length // ✅ Total booked tickets count
          totalTicketCount: totalTicketCount,
          message: "Booked events retrieved successfully",
          status: 200
      });

  } catch (error) {
      res.status(500).json({ 
          message: "Server error",
          error: error.message 
      });
  }
};



exports.getVendorPaymentsDetails = async (req, res) => {
  try {
    const { vendorId } = req.params;

    if (!vendorId) {
      return res.status(400).json({ message: "Vendor ID is required" });
    }

    const bookings = await Booking.find()
      .populate("userId", "user_Name user_Email")
      .populate("eventId", "event_name event_date vendor_Id standard_price vip_price country state city category_name event_address event_start_time event_end_time");

    const vendorBookings = bookings.filter(booking => {
      return booking.eventId?.vendor_Id?.toString() === vendorId;
    });

    if (!vendorBookings.length) {
      return res.status(404).json({ message: "No payment records found for this vendor" });
    }

    const payments = vendorBookings.map(booking => ({
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
        cardNumber: booking.cardDetails?.cardNumber || null,
        expiryMonth: booking.cardDetails?.expiryMonth || null,
        expiryYear: booking.cardDetails?.expiryYear || null,
        cvv: booking.cardDetails?.cvv || null
      },
      createdAt: booking.createdAt
    }));

    return res.status(200).json({
      data: payments,
      totalPayments: payments.length,
      message: "Vendor payment details retrieved successfully",
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



// API: Vendor - Get notifications by vendorId
exports.getNotificationsForVendor = async (req, res) => {
  try {
      const { vendorId } = req.params;

      if (!vendorId) {
          return res.status(400).json({ message: "vendorId is required" });
      }

      const notifications = await Notification.find({ vendorId }).sort({ createdAt: -1 });

      if (!notifications.length) {
          return res.status(404).json({ message: "No notifications found for this vendor" });
      }

      res.status(200).json({
          data: notifications,
          message: "Vendor notifications retrieved successfully",
          status: 200
      });

  } catch (error) {
      res.status(500).json({
          message: "Server error",
          error: error.message
      });
  }
};