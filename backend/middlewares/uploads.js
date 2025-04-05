const path = require('path');
const multer = require('multer');


// Configure storage for local file system
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder for uploaded files
        cb(null, 'uploads/'); // Files will be saved in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        // Set the filename for uploaded files
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Example: photo-1234567890.jpg
    }
});

// Create a Multer instance for handling file uploads
const upload = multer({
    storage: storage, // Use the local storage configuration
    fileFilter: function (req, file, cb) {
        // Allow only image files
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg, and .jpeg files are allowed!'), false);
        }
    }
});


module.exports = upload;

