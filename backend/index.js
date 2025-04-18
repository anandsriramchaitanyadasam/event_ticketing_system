const express = require('express')
 const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
const path = require('path');

const fs = require('fs');

const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');

dotenv.config();  // Load environment variables
require("./config/passport"); // Import Passport Conf


const http = require('http');
const https = require('https');


// const multer = require('multer')
const mongoose = require('mongoose')
const db = require('./models/db.connection.on');
const { appendFileSync } = require('fs');
app.use(express.json());
app.use(bodyParser.json());

//cors option
let corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

app.use('/uploads', express.static('uploads'));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}


db.mongoose.connect(db.url, {
   
}).then(() => {
    console.log("Mongodb Connected");
})
    .catch((err) => {
        console.log("Failed to Connect", err)
        process.exit();
    })


// Session middleware (needed for Passport.js)
app.use(session({
    secret: "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",
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());






require('./routes/admin.routes')(app);
require('./routes/user.routes')(app);




// Google Authentication Routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", 
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/dashboard"); // Redirect to Dashboard after successful login
    }
);

// Logout
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// Protected Route Example
app.get("/dashboard", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/auth/google");
    }
    res.json({ user: req.user });
});







app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'website')));
app.use(express.static(path.join(__dirname, 'website/out')))


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'website/out','/index.html'));
   
});



  
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'website')));
app.use(express.static(path.join(__dirname, 'website/admin-panel')))

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/admin-panel', (req, res) => {
    res.sendFile(path.join(__dirname,'website/admin-panel', 'index.html'));
});

app.listen(80, () => {
    console.log("Server Started on port 80")
});




