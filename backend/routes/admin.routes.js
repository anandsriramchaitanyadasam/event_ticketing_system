module.exports = (app)=>{
    const admin  = require('../controllers/admin.controller')
    

    app.post('/api/createAdmin', admin.createAdmin);

    app.post('/api/adminLogin', admin.adminLogin);


    app.get('/api/admin/getAllUsers', admin.getAllUsers);

    app.get('/api/admin/getAllVendors', admin.getAllVendors);

    // Edit user route
    app.put('/api/editUser/:userId', admin.editUser);

    // Delete user route
    app.delete('/api/deleteUser/:userId', admin.deleteUser);

    // app.get('/api/admin/getUserIssues/:userId', issue.getUserIssues);

    // app.get('/api/admin/getAllIssues', issue.getAllIssues);


}