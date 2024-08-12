const Admin = require("../models/adminSchema")
const Catagory = require("../models/catagoriesSchema");
const Course = require("../models/courseSchema");
const Mentor = require("../models/mentorSchema")
const User = require("../models/userSchema");
const Video = require("../models/videoSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../config/crypto");

// To login admin
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email })
        if (!admin) return res.status(404).json({ message: "Admin not found!" })
        const IsMatch = await bcrypt.compare(password, admin.password)
        if (!IsMatch) return res.status(401).json({ message: "Wrong password!" })
        let payload = { id: admin._id };
        const token = jwt.sign(payload, SECRET_TOKEN);
        res.cookie("token", token, {
            httpOnly: true,
            // maxAge: 60 * 60 * 1000
        });
        res.status(200).send({
            message: "Admin successfully logged in",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// to Add new mentor
exports.addMentor = async (req, res) => {
    try {
        const { name, image, about, title } = req.body;
        const newMentor = new Mentor({
            name: name,
            image: image,
            about: about,
            title: title,
        })
        await newMentor.save();
        res.status(200).json({
            message: "Mentor added siccessfully!"
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// To update mentor details
exports.updataMentor = async (req, res) => {
    try {
        const { name, image, about, title } = req.body;
        const { mentorId } = req.params;
        const findMentor = await Mentor.findOne({ _id: mentorId })
        if (!findMentor) {
            return res.status(404).json({ message: "Mentor not fund!" })
        }
        findMentor.name = name || findMentor.name;
        findMentor.image = image || findMentor.image;
        findMentor.about = about || findMentor.about;
        findMentor.title = title || findMentor.title
        await findMentor.save();
        res.status(200).json({
            message: "Mentor updated siccessfully!"
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

// to delete mentor
exports.deleteMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;
        const findMentor = await Mentor.findOne({ _id: mentorId })
        if (!findMentor) {
            return res.status(404).json({ message: "Mentor not found!" })
        }
        await Mentor.deleteOne({ _id: mentorId })
        // await newMentorsList.save();
        res.status(200).json({
            message: "Mentor deleted siccessfully!"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

// to add course in mentor courses
exports.addMentorCourses = async (req, res) => {
    try {
        const { courseId, mentorId } = req.params;
        const getMentor = await Mentor.findOne({ _id: mentorId })
        if (!getMentor) {
            return res.status(404).json({ message: "Mentor not found!" })
        }
        getMentor.courses.push(courseId)
        await getMentor.save();
        res.status(200).json({
            message: "Course addded successfully!",
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// To delete coursee from mentor courses
exports.deleteMentorCourses = async (req, res) => {
    try {
        const { courseId, mentorId } = req.params;
        const getMentor = await Mentor.findOne({ _id: mentorId })
        if (!getMentor) {
            return res.status(404).json({ message: "Mentor not found!" })
        }
        getMentor.courses.pull(courseId)
        await getMentor.save();
        res.status(200).json({
            message: "Course deleted successfully!",
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}












