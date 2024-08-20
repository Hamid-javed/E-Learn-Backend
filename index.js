const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/userRouter");
const courseRouter = require("./routes/courseRouter");
const mentorRouter = require("./routes/mentorsRoute");
const adminRouter = require("./routes/adminRouter");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const port = process.env.port || 3000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, timeout: 30000 });
        console.log("Connected To MongoDB");
    } catch (err) {
        console.log(`unable to connet with dB : ${err.stack} `);
    }
}

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log("Server running on localhost:" + port);
    });
});