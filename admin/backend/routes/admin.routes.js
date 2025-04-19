module.exports = (app)=>{
    const admin  = require('../controllers/admin.controller')
    const plants = require('../controllers/plant.controller')
    // const Plant = require('../models/plant.model');
    app.post('/api/createAdmin', admin.createAdmin);

    app.post('/api/adminLogin', admin.adminLogin);


    //  get all user 
    app.get('/api/getAllUsers', admin.getAllUsers);

    // Edit user route
    app.put('/api/editUser/:userId', admin.editUser);

    // Delete user route
    app.delete('/api/deleteUser/:userId', admin.deleteUser);


    // add plants
    app.post('/api/addPlant',plants.upload.fields([{ name: "photos", maxCount: 50 }]),plants.addPlant);

    // get plants
    app.get('/api/getPlant',plants.getPlants);

    // update plants
    app.put('/api/updatePlant/:plantId',plants.upload.fields([{ name: "photos", maxCount: 50 }]), plants.updatePlants);

    // delete plants
    app.delete('/api/deletePlant/:plantId',plants.deletePlant);

    // add tag 
    app.put('/api/addTag/:plantId',plants.addTag);

    app.get('/api/getCount',admin.getCounts)

}