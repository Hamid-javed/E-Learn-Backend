const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    user_type_id: {
        type: Number,
        default: 0,
    },
    savedCourses: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    ],
    boughtCourses: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    ],
    noOfSavedCourses: { type: Number },
    noOfBoughtCourses: { type: Number },

    otp: { otp: { type: Number }, expireDate: { type: Number } },
});

userSchema.pre("save", function (next) {
    const savedCourses = this.savedCourses.length;
    const numOfBoughtCourses = this.boughtCourses.length;

    this.noOfSavedCourses = savedCourses;
    this.noOfBoughtCourses = numOfBoughtCourses;


    next();
});

module.exports = mongoose.model("AuthUser", userSchema);
