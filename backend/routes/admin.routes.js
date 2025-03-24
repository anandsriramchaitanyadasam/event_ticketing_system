module.exports = (app)=>{
    const admin  = require('../controllers/admin.controller');
    const category = require('../controllers/category.controller');
    

    app.post('/api/createAdmin', admin.createAdmin);

    app.post('/api/adminLogin', admin.adminLogin);


    app.get('/api/admin/getAllUsers', admin.getAllUsers);

    app.get('/api/admin/getAllVendors', admin.getAllVendors);

    // Edit user route
    app.put('/api/admin/editUser/:userId', admin.editUser);

    // Delete user route
    app.delete('/api/admin/deleteUser/:userId', admin.deleteUser);

  


    // Category routes
    app.post('/api/admin/categories', category.createCategory); // Create a category
    app.get('/api/admin/getAllCategories', category.getAllCategories); // Get all categories
    // app.get('/api/admin/getCategoryById/:id', category.getCategoryById); // Get a single category
    app.put('/api/admin/updateCategory/:categoryId', category.updateCategory); // Update a category
    app.delete('/api/admin/deleteCategory/:categoryId', category.deleteCategory); // Delete a category

    app.get('/api/getAllEvents', admin.getAllEvents);

    app.delete('/api/deleteEvent/:eventId', admin.deleteEvent);

    app.get("/api/totalCounts", admin.getTotalCounts);
    


    


}