const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user_name: {
        type: String,
        required: true,
      },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    vendor_Name: {
        type: String,
        required: true,
      },
    
    message: {
      type: String,
      required: true,
    },
  
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Notification", notificationSchema);
