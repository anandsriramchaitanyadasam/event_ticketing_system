const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const fs = require("fs");

const http = require("http");
const https = require("https");

// const multer = require('multer')
const mongoose = require("mongoose");
const db = require("./models/db.connection.on");
const { appendFileSync } = require("fs");
app.use(express.json());
app.use(bodyParser.json());

// app.use(cors());

//cors option
let corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

// app.use(express.urlencoded({ extended: true }))
// app.use('/uploads', express.static('uploads'));

// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
// }

db.mongoose
  .connect(db.url, {
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
  })
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => {
    console.log("Failed to Connect", err);
    process.exit();
  });

require("./routes/admin.routes")(app);
require("./routes/user.routes")(app);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "website")));
app.use(express.static(path.join(__dirname, "website/out")));
// app.use((req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "website/out", "/index.html"));
  //__dirname : It will resolve to your project folder.
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "website")));
app.use(express.static(path.join(__dirname, "website/admin-panel")));

// Serve static files from the 'uploads' folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/admin-panel", (req, res) => {
  res.sendFile(path.join(__dirname, "website/admin-panel", "index.html"));
});

app.listen(80, () => {
  console.log("Server Started on port 80");
});

// app.listen(8091, () => {
//     console.log("Server Started on port 8091")
// });
