const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const utils = require("../utils/utils");
const nodemailer = require("nodemailer");
const { SECRET_TOKEN } = require("../config/crypto");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.clientId);

// Controller for user registeration
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hasdedPAss = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hasdedPAss });
    res.status(201).json({ msg: " user cretaed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for user Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Invalid email");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json("Password is wrong");

    let payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_TOKEN);
    res.cookie("token", token, {
      httpOnly: true,
      // maxAge: 60 * 60 * 1000
    });
    res.status(200).send({
      message: "User successfully logged in",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      Error: err,
    });
  }
};

// TO change user details
exports.changeDetails = async (req, res) => {
  try {
    const userId = req.id;
    const {name, email, password} = req.body;
    const user = await User.findOne({_id: userId})
    if (!user) {
      return res.status(404).json("User not found!");
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json("Password does not match!");
    }
    user.name = name;
    user.email = email;
    const changedUser = await user.save();
    res.status(200).json("User details changed successfully!")
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}


// To frequestOpt
exports.requestOtp = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ message: "User Not Found" });

  const otp = utils.generateRandomFourDigitNumber();
  const otpExpires = Date.now() + 180 * 1000;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "otpsendericr@gmail.com",
      pass: "opbz tfty xbrw cigw",
    },
  });
  async function sendOtpEmail(email, otp) {
    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting the password is ${otp}`,
      html: `<b>Your OTP for resetting the password is <strong>${otp}</strong></b>`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: error.message });
    }
  }

  user.otp.otp = otp;
  user.otp.expireDate = otpExpires;
  await user.save();
  await sendOtpEmail(email, otp);
  res.status(200).json({ message: "OTP sent to your email" });
};

// request change otp
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ error: "Email, OTP, and new password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.otp.otp !== otp || user.expireDate < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    const hasdNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hasdNewPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error resetting password" });
  }
};

// Controller for user signout
exports.SignOut = async (req, res) => {
  try {
    const cookie = req.cookies.token;
    if (!cookie) {
      return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(cookie, SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      // Clear the token cookie
      res.clearCookie("token");
      return res.status(200).json({ message: "User Sign out successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to delete user account
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.id;

    const delUser = await User.deleteOne({ _id: userId });
    if (!delUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.log(error.stack);
  }
};

// Too change the user password!
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const userID = req.id;

    // To find the user
    const fetchUser = await User.findOne({ _id: userID });

    // Comparing passwords
    const isMatch = await bcrypt.compare(oldPassword, fetchUser.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Wrong Password!",
      });
    }

    // Check new passwords match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "New passwords do not match!",
      });
    }
    // Saving new password after hashing
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    fetchUser.password = hashedPassword;
    await fetchUser.save();

    res.status(200).json({
      message: "Password changed successfully!",
    });
  } catch (error) {
    console.log("The error is", error);
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};


// google auth
exports.googleAuth = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.clientId,
    });

    const payload = ticket.getPayload();
    const userid = payload["sub"];
    const email = payload["email"];
    const name = payload["name"];

    let user = await User.findOne({ email: email });

    if (!user) {
      user = new User({
        email: email,
        name: name,
        password: userid,
      });
      await user.save();

      const userToFind = await User.findOne({ email: email });
      let payload1 = { id: userToFind._id };
      const token = jwt.sign(payload1, SECRET_TOKEN);
      res.cookie("token", token, {
        httpOnly: true,
        // maxAge: 60 * 60 * 1000
      });
      res.status(200).send({
        message: "User successfully logged in",
      });
      return;
    }
    let payload1 = { id: user._id };
    const token = jwt.sign(payload1, SECRET_TOKEN);
    res.cookie("token", token, {
      httpOnly: true,
      // maxAge: 60 * 60 * 1000
    });
    res.status(200).send({
      message: "User successfully logged in",
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

