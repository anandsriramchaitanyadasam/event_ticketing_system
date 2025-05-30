const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables

const mongoose = require('mongoose');
const db = require('./models/db.connection.on');

app.use(express.json());
app.use(bodyParser.json());

// ✅ CORS settings
let corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

// ✅ Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// ✅ Serve uploads statically with absolute path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Connect to MongoDB
db.mongoose.connect(db.url, {}).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log("Failed to Connect", err);
    process.exit();
});

// ✅ Routes (no passport)
require('./routes/admin.routes')(app);
require('./routes/user.routes')(app);

// ✅ Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
