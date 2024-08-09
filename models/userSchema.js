const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    user_type_id: {
        type: Number,
        default: 0,  
    },
    coursesBought: [],
    otp: { otp: { type: Number }, expireDate: { type: Number } },
});

module.exports = mongoose.model('AuthUser', userSchema);
