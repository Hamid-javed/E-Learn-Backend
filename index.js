const express = require("express")
const app = express()
const mongoose = require("mongoose");
require("dotenv").config()
const userRouter = require("./routes/userRouter")
const courseRouter = require("./routes/courseRouter")
const dataRouter = require("./routes/dataRouter")
const mentorRouter = require("./routes/mertorsRoute")
const adminRouter = require("./routes/adminRouter")
const cookieParser = require('cookie-parser');
const cors = require('cors');

const port = process.env.port

app.use(cookieParser());
app.use(cors());
app.use(express.json())


app.use("/auth", userRouter)
app.use("/courses", courseRouter)
app.use("/data", dataRouter)
app.use("/mentors", mentorRouter)
app.use("/admin", adminRouter)


mongoose.connect(
  "mongodb://localhost:27017/E-learning"
)
  .then(() => {
    console.log("Connected To MongoDB"),
      app.listen(port, () => {
        console.log("Server running on localhost:" + port);
      });
  })
  .catch((err) => console.log(`unable to connet with dB : ${err.stack} `));