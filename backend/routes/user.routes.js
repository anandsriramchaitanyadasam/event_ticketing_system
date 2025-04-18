module.exports = (app)=>{
    // user
    const user = require('../controllers/user.controller');

    const vendor = require('../controllers/vendor.controller');

    const event =  require('../controllers/event.controller');

    const upload = require('../middlewares/uploads'); // ✅ Import uploads middleware

    const review = require('../controllers/review.controller');

   

    //**************************** USER ***************************/

    app.post("/api/userSignUp", user.userSignUp);

    app.post('/api/userLogin',user.userLogin)

    app.put('/api/changeUserPassword/:usersRegId', user.changeUserPassword);

    app.post('/api/bookEvent',event.bookEvent);

    app.post('/api/processPayment', event.processPayment);

    app.get("/api/getUserBookings/:userId", event.getUserBookings);

    app.post('/api/submitReview', review.submitReview);

    app.get("/api/searchEvents", event.searchEvents);

   app.get('/api/getUserPaymentsDetails/:userId', user.getUserPaymentsDetails);



    //**************************** VENDOR ***************************/

    app.post("/api/vendorSignUp", vendor.vendorSignUp);

    app.post('/api/vendorLogin',vendor.vendorLogin);

    app.get('/api/vendor/getAllCategoriesByVendor', vendor.getAllCategoriesByVendor); // Get all categories in vendor

    app.post("/api/addEvent", upload.single("photo"), event.addEvent);

    app.put("/api/editEventByVendor/:eventId", upload.single("photo"), event.editEventByVendor);

    app.delete('/api/deleteEvent/:eventId', event.deleteEvent);

    // get all events by vendorId
    app.get("/api/getVendorEvents/:vendorId", vendor.getVendorEvents);

    app.get('/api/getBookedEventsByVendor/:vendorId', vendor.getBookedEventsByVendor);

    app.get('/api/getVendorPaymentsDetails/:vendorId', vendor.getVendorPaymentsDetails);

    app.get('/api/getVendorEventReviews/:vendorId', review.getVendorEventReviews);


    // Vendor
    app.get('/api/getNotificationsForVendor/:vendorId', vendor.getNotificationsForVendor);

    // User
    // app.get('/api/getNotificationsForUser/:userId', user.getNotificationsForUser);



}
