const Mentor = require("../models/mentorSchema")


exports.getMentor = async (req, res) => {
    try {
        const mentorId = req.body.mentor;
        if (!mentorId) {
            return res.status(404).json("Mentor not found!")
        }
        const mentor = await Mentor.findOne({ _id: mentorId }).populate([{ path: "courses", select: "data.details" }, { path: "reviews.user", select: "email name" }]).exec()
        res.status(200).json(mentor)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


