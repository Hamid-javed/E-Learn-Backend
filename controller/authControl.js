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
  const { name, email, number, password } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Name is required!" })
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required!" })
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required!" })
    }

    const user = await User.findOne({ email: email })
    if (user) {
      return res.status(400).json({ message: "Email is Taken!" })
    }
    const hasdedPAss = await bcrypt.hash(password, 10);
    await User.create({ name, email, number, password: hasdedPAss });
    res.status(200).json({ message: " user cretaed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for user Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({
      message: "Invalid email",
      user
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password is wrong" });
    let payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_TOKEN);
    res.cookie("token", token, {
      httpOnly: true,
      path: '/',
      sameSite: 'None',
      // maxAge: 60 * 60 * 1000,
      secure: true
    });
    res.status(200).json({
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
    const { name, email, number, password } = req.body;
    const user = await User.findOne({ _id: userId })
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Password does not match!" });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.number = number || user.number;
    const changedUser = await user.save();
    res.status(200).json({ message: "User details changed successfully!" })
  } catch (error) {
    res.status(500).json({
      error: error.message
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
      res.status(200).json({ message: "Opt send Successfully!" })
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ error: error.message });
    }
  }

  user.otp.otp = otp;
  user.otp.expireDate = otpExpires;
  await user.save();
  await sendOtpEmail(email, otp);
  // res.status(200).json({ message: "OTP sent to your email" });
};

// request change otp
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }
  if (!otp) {
    return res.status(400).json({ message: "OTP is required!" });
  }
  if (!newPassword) {
    return res.status(400).json({ message: "Password is required!" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp.otp !== Number(otp) || user.otp.expireDate < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ error: error.message });
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
      res.clearCookie("token", {
        httpOnly: true,
        path: '/',
        sameSite: 'None',
        secure: true
      });
      return res.status(200).json({ message: "User Sign out successfully" });
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error.message });
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
    res.status(401).json({ error: error.message });
  }
};

// send user details
exports.userData = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      res.status(406).json({
        message: "No data Found for user!",
      });
    }
    const userData = await User.findOne({ _id: userId });
    // console.log("User data is", userData)
    res.status(200).json({
      name: userData.name,
      email: userData.email
    })
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};



exports.check = async (req, res) => {
  res.status(200).json({ message: "Authorized" })
}
