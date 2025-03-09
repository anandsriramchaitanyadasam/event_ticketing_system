module.exports = (app)=>{
    const user = require('../controllers/user.controller')

    app.post("/api/userSignUp", user.userSignUp);

    app.post('/api/userLogin',user.userLogin);

    app.put('/api/changeUserPassword/:usersRegId', user.changeUserPassword);




}
