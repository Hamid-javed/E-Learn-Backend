const express = require("express")
const app = express()
const mongoose = require("mongoose");
require("dotenv").config()
const userRouter = require("./routes/userRouter")
const courseRouter = require("./routes/courseRouter")
const mentorRouter = require("./routes/mentorsRoute")
const adminRouter = require("./routes/adminRouter")
const cookieParser = require('cookie-parser');
const cors = require('cors');

const port = process.env.PORT


const corsOptions = {
  origin: true, // Replace with your frontend's origin
  methods: 'GET,POST,DELETE,PUT',
  credentials: true, // Allow credentials (cookies) to be sent
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));




app.options('*', cors(corsOptions));
app.use(cookieParser());
app.use(express.json())


app.use("/auth", userRouter);
app.use("/courses", courseRouter)
app.use("/mentors", mentorRouter)
app.use("/admin", adminRouter)
app.get("/", (req, res) => res.send("hello"))


mongoose.connect(
  process.env.DB_URL
)
  .then(() => {
    console.log("Connected To MongoDB")
  })
  .catch((err) => {
    console.log(err.stack)

  })
app.listen(port, () => {
  console.log("Server running on localhost:" + port);
});