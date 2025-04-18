const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const user = require('../models/user.model')
const Event = require('../models/event.model');
const Booking = require('../models/bookEvent.model');
const Notification = require('../models/notification.model');


function generateToken(userid) {
    return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}


exports.userSignUp = async (req, res) => {
    let user_Email = req.body.user_Email ? req.body.user_Email : "";
    let user_Name = req.body.user_Name ? req.body.user_Name : "";
    let country_code = req.body.country_code ? req.body.country_code : "";
  
    let mobile_no = req.body.mobile_no ? req.body.mobile_no : "";
    let password = req.body.password ? req.body.password : "";
    let confirmPassword = req.body.confirmPassword
      ? req.body.confirmPassword
      : "";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;
  
    try {
      if (user_Email === null || user_Email === "") {
        return res
          .status(400)
          .send({ message: "email is required", status: 200 });
      } else {
        if (!user_Email.match(mailformat)) {
          return res
            .status(400)
            .send({ message: "email is not in correct form", status: 400 });
        } else {
          if (user_Name === "" || user_Name === null) {
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
      
  
      let checkEmail = await user.find({ user_Email: user_Email }).lean();
      if (checkEmail.length > 0) {
        return res
          .status(409)
          .send({ message: "Email already exists", status: 409 });
      }
  
      let checkMobileNo = await user.find({ mobile_no: mobile_no }).lean();
      if (checkMobileNo.length > 0) {
        return res
          .status(409)
          .send({ message: "Mobile number already exists", status: 409 });
      }
  
      let data = await user.create({
        user_Email: user_Email,
        user_Name: user_Name,
        
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



exports.userLogin = async (req, res) => {
    try {
        const user_Email = (req.body.user_Email || '').toLowerCase();
        const password = req.body.password || '';

        // Validation
        if (!user_Email || !password) {
            return res.status(400).send({ message: 'Please provide both email and password.', status: 400 });
        }

        const userData = await user.findOne({ "user_Email": user_Email, deleteFlag: false });

        if (!userData) {
            return res.status(404).send({ message: 'Your email is not registered with us.', status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(password, userData.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Please enter a valid password.', status: 401 });
        }

        const token = generateToken(userData._id);
        return res.status(200).send({ accessToken: token, data: userData, message: 'Login successful!', status: 200 });
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

        const existingUser = await user.findOne({ _id: usersRegId }).lean();
        if (!existingUser) {
            return res.status(404).send({ message: 'User not found', status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(oldPassword, existingUser.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Incorrect old password', status: 401 });
        }

        await user.findOneAndUpdate({ _id: usersRegId }, { $set: { password: bcrypt.hashSync(newPassword, 8) } });

        return res.status(200).send({ message: 'Password changed successfully', status: 200 });
    } catch (err) {
        return res.status(500).send({ message: err.message || 'Error changing password', status: 500 });
    }
};





exports.getUserPaymentsDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const bookings = await Booking.find({ userId })
      .populate("userId", "user_Name user_Email")
      .populate("eventId", "event_name event_date vendor_Id standard_price vip_price country state city category_name event_address event_start_time event_end_time");

    if (!bookings.length) {
      return res.status(404).json({ message: "No payment records found for this user" });
    }

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
      message: "User payment details retrieved successfully",
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



// API: User - Get notifications by userId
// exports.getNotificationsForUser = async (req, res) => {
//   try {
//       const { userId } = req.params;

//       if (!userId) {
//           return res.status(400).json({ message: "userId is required" });
//       }

//       const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

//       if (!notifications.length) {
//           return res.status(404).json({ message: "No notifications found for this user" });
//       }

//       res.status(200).json({
//           data: notifications,
//           message: "User notifications retrieved successfully",
//           status: 200
//       });

//   } catch (error) {
//       res.status(500).json({
//           message: "Server error",
//           error: error.message
//       });
//   }
// };

