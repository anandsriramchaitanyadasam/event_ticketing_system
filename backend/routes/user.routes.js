module.exports = (app)=>{
    // user
    const user = require('../controllers/user.controller')

    const vendor = require('../controllers/vendor.controller')

    // const issue = require('../controllers/issue.controller');
    // const upload = require('../middlewares/uploads');

    // const feedback = require('../controllers/feedback.controller');

    // const payment = require('../controllers/payment.controller');

    // const serviceRoutes = require('./service.routes');

    // app.use('/api/mechanic', serviceRoutes);

//     const serviceRoutes = require("./service.routes");
// app.use("/api/mechanic", serviceRoutes);


   
    app.post("/api/userSignUp", user.userSignUp);

    app.post('/api/userLogin',user.userLogin)

    app.put('/api/changeUserPassword/:usersRegId', user.changeUserPassword);


    // mechanic 
    // app.post("/api/mechanicSignUp", user.mechanicSignUp);

    // app.post('/api/mechanicLogin',user.mechanicLogin)


    //**************************** VENDOR ***************************/

    app.post("/api/vendorSignUp", vendor.vendorSignUp);

    app.post('/api/vendorLogin',vendor.vendorLogin)


    
    

   


}
