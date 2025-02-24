const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3-v2');
const fs = require('fs');

//for aws
const AWS = require('aws-sdk');
// var multerS3 = require('multer-s3')

const s3 = new AWS.S3({

    accessKeyId: '',
    secretAccessKey: ''

    
});

//for testing the connection with s3 bucket
s3.listBuckets(function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Buckets);
    }
});

// //function for media uploading on aws s3 bucket
function mediaUploading(mediaPath) {
    // console.log("Path: "+mediaPath);
    return storage = multerS3({
        s3: s3,
        bucket: 'eventsmanagements3',
        acl: 'public-read',
        metadata: function(req, file, cb) {
            //console.log("metadata with stringify: ==== "+JSON.stringify(file));
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            //console.log("key with stringify: ==== "+JSON.stringify(file));
            let ext = path.extname(file.originalname);
            var media_path = mediaPath;
            cb(null, media_path + "/" + "media" + "-" + Date.now().toString() + ext);
        }
    });
}



let upload = multer({
    // storage: storage,
    storage: mediaUploading('Doctor'),
    fileFilter: function(req, file, callback) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            callback(null, true);
        } else {
            console.log("Only jpg and png file supported");
            callback(null, false)
        }
    }
});



let productImage = multer({
    //  storage: productStorage,
    storage: mediaUploading('productImages'),
    fileFilter: function(req, file, callback) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' ) {
            callback(null, true);
        } else {
            console.log("Only jpg , png  files supported");
            callback(null, false)
        }
    }
});

let uploadVideos = multer({
    storage: mediaUploading('propertyImages'),
    fileFilter: function(req, file, callback) {
       console.log("upload",file);
        if(file.fieldname==='productImage')
        {
            if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
                callback(null, true);
            }
           
            else {
                // console.log("Only jpg and png file supported");
                callback(null, false)
            }
        }
        else if(file.fieldname==='productVideo'){
            //console.log("video",file,req);
            if (file.mimetype == 'video/webm' || file.mimetype == 'video/mp4' || file.mimetype == 'video/*') {
                callback(null, true);
            }
           
            else {
                console.log("Only video file supported");
                callback(null, false)
            }
        }
        
    }
})

let categoryImage = multer({
    //  storage: productStorage,
    storage: mediaUploading('categoryImages'),
    fileFilter: function(req, file, callback) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' ) {
            callback(null, true);
        } else {
            console.log("Only jpg , png  files supported");
            callback(null, false)
        }
    }
});

let colorImage = multer({
    //  storage: productStorage,
    storage: mediaUploading('colorsImages'),
    fileFilter: function(req, file, callback) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' ) {
            callback(null, true);
        } else {
            console.log("Only jpg , png  files supported");
            callback(null, false)
        }
    }
});


let sliderImage = multer({
    //  storage: productStorage,
    storage: mediaUploading('sliderImages'),
    fileFilter: function(req, file, callback) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' ) {
            callback(null, true);
        } else {
            console.log("Only jpg , png  files supported");
            callback(null, false)
        }
    }
});

let reviewImage = multer({
    //  storage: productStorage,
    storage: mediaUploading('reviewImages'),
    fileFilter: function(req, file, callback) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' ) {
            callback(null, true);
        } else {
            console.log("Only jpg , png  files supported");
            callback(null, false)
        }
    }
});


let blogImages= multer({
    //  storage: productStorage,
    storage: mediaUploading('blogImages'),
    fileFilter: function(req, file, callback) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' ) {
            callback(null, true);
        } else {
            console.log("Only jpg , png  files supported");
            callback(null, false)
        }
    }
});

module.exports = {
    upload,
    productImage,
    uploadVideos,
    categoryImage,
    colorImage,
    sliderImage,
    reviewImage,
    blogImages
};