module.exports = (app) => {
  const admin = require("../controllers/admin.controller");
  const category = require("../controllers/category.controller");
  const upload = require("../middlewares/uploads"); // Import uploads middleware
  const review = require("../controllers/review.controller");

  app.post("/api/createAdmin", admin.createAdmin);

  app.post("/api/adminLogin", admin.adminLogin);

  app.get("/api/admin/getAllUsers", admin.getAllUsers);

  app.get("/api/admin/getAllVendors", admin.getAllVendors);

  // Edit user route
  app.put("/api/admin/editUser/:userId", admin.editUser);

  // Delete user route
  app.delete("/api/admin/deleteUser/:userId", admin.deleteUser);

  // Category routes
  app.post(
    "/api/admin/categories",
    upload.single("photo"),
    category.createCategory
  ); // Create a category
  app.get("/api/admin/getAllCategories", category.getAllCategories); // Get all categories
  app.put(
    "/api/admin/updateCategory/:categoryId",
    upload.single("photo"),
    category.updateCategory
  ); // Update a category
  app.delete("/api/admin/deleteCategory/:categoryId", category.deleteCategory); // Delete a category
  app.get("/api/getAllEvents", admin.getAllEvents);
  app.delete("/api/deleteEvent/:eventId", admin.deleteEvent);
  app.get("/api/totalCounts", admin.getTotalCounts);
  app.get("/api/events/:id", admin.getEventById); // Route to get event by ID

  app.get("/api/getAllBookedEvents", admin.getAllBookedEvents);

  app.get(
    "/api/getUsersBookingByBookingId/:bookedEventId",
    admin.getUsersBookingByBookingId
  );

  // Edit vendor route
  app.put("/api/editVendor/:vendorId", admin.editVendor);

  // Delete vendor route
  app.delete("/api/deleteVendor/:vendorId", admin.deleteVendor);

  app.get("/api/getAllPaymentsDetails", admin.getAllPaymentsDetails);

  app.get("/api/getAllReviews", review.getAllReviews);

  app.get("/api/getAllNotifications", admin.getAllNotifications);
};
