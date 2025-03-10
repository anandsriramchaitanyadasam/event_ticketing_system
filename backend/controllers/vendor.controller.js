const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const Vendor = require('../models/vendor.model')


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


// Mechanic 


// exports.mechanicSignUp = async (req, res) => {
//   let user_Email = req.body.user_Email ? req.body.user_Email : "";
//   let user_Name = req.body.user_Name ? req.body.user_Name : "";
//   let country_code = req.body.country_code ? req.body.country_code : "";
//   let mobile_no = req.body.mobile_no ? req.body.mobile_no : "";
//   let password = req.body.password ? req.body.password : "";
//   let confirmPassword = req.body.confirmPassword ? req.body.confirmPassword : "";
//   let garage_name = req.body.garage_name ? req.body.garage_name : "";
//   let latitude = req.body.latitude ? req.body.latitude : "";
//   let longitude = req.body.longitude ? req.body.longitude : "";

//   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;

//   // Convert latitude & longitude to numbers
//   const lat = parseFloat(latitude);
//   const lon = parseFloat(longitude);

//   try {
//     if (!user_Email.match(mailformat)) {
//       return res.status(400).send({ message: "Email is not in correct form", status: 400 });
//     }
//     if (!user_Name) {
//       return res.status(400).send({ message: "Full name is required", status: 400 });
//     }
//     if (!country_code) {
//       return res.status(400).send({ message: "Country code is required", status: 400 });
//     }
//     if (!mobile_no || isNaN(mobile_no) || mobile_no.length < 7 || mobile_no.length > 15) {
//       return res.status(400).send({ message: "Invalid mobile number", status: 400 });
//     }
//     if (!password.match(passformat) || password.length < 8) {
//       return res.status(400).send({ message: "Invalid password format", status: 400 });
//     }
//     if (confirmPassword !== password) {
//       return res.status(400).send({ message: "Passwords do not match", status: 400 });
//     }
//     if (!garage_name) {
//       return res.status(400).send({ message: "Garage name is required", status: 400 });
//     }
//     // if (!latitude || isNaN(latitude)) {
//     //   return res.status(400).send({ message: "Valid latitude is required", status: 400 });
//     // }
//     // if (!longitude || isNaN(longitude)) {
//     //   return res.status(400).send({ message: "Valid longitude is required", status: 400 });
//     // }

//     if (isNaN(lat) || isNaN(lon)) {
//             return res.status(400).json({ message: "Invalid latitude or longitude format." });
//     }

//     let checkEmail = await mechanic.find({ user_Email }).lean();
//     if (checkEmail.length > 0) {
//       return res.status(409).send({ message: "Email already exists", status: 409 });
//     }

//     let checkMobileNo = await mechanic.find({ mobile_no }).lean();
//     if (checkMobileNo.length > 0) {
//       return res.status(409).send({ message: "Mobile number already exists", status: 409 });
//     }

//     let data = await mechanic.create({
//       user_Email,
//       user_Name,
//       country_code,
//       mobile_no,
//       password: bcrypt.hashSync(password, 8),
//       garage_name,
//       // latitude,
//       // longitude
//       location: {
//         type: "Point",
//         coordinates: [lon, lat] // Must be [longitude, latitude]
//     }
//     });

//     return res.status(200).send({ data, message: "Success", status: 200 });
//   } catch (error) {
//     return res.status(500).send({ message: error.message, status: 500 });
//   }
// };


// exports.mechanicLogin = async (req, res) => {
//   try {
//       const user_Email = (req.body.user_Email || '').toLowerCase();
//       const password = req.body.password || '';

//       // Validation
//       if (!user_Email || !password) {
//           return res.status(400).send({ message: 'Please provide both email and password.', status: 400 });
//       }

//       const userData = await mechanic.findOne({ "user_Email": user_Email, deleteFlag: false });

//       if (!userData) {
//           return res.status(404).send({ message: 'Your email is not registered with us.', status: 404 });
//       }

//       const passwordIsValid = bcrypt.compareSync(password, userData.password);
//       if (!passwordIsValid) {
//           return res.status(401).send({ message: 'Please enter a valid password.', status: 401 });
//       }

//       const token = generateToken(userData._id);
//       return res.status(200).send({ accessToken: token, data: userData, message: 'Login successful!', status: 200 });
//   } catch (error) {
//       return res.status(500).send({ message: 'Internal server error.', status: 500 });
//   }
// };

