const Mentor = require("../models/mentorSchema");

exports.getMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;

    if (!mentorId) {
      return res.status(404).json("Mentor not found!");
    }
    const mentor = await Mentor.findOne({ _id: mentorId })
      .populate([
        { path: "courses", select: "data.details" },
        { path: "reviews.user", select: "email name" },
      ])
      .exec();
    res.status(200).json(mentor);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getMentorAbout = async (req, res) => {
  const { mentorId } = req.params;
  const mentor = await Mentor.findOne({ _id: mentorId });
  if (!mentor) return res.status(404).json({ msg: "mentor not found" });
  res.status(200).json({ about: mentor.about });
};

exports.getMentorCours = async (req, res) => {
  const { mentorId } = req.params;
  const mentor = await Mentor.findOne({ _id: mentorId }).populate({
    path: "courses",
    select: "data.details",
  });
  if (!mentor) return res.status(404).json({ msg: "mentor not found" });
  res.status(200).json(mentor.courses);
};

exports.getMentorReviews = async (req, res) => {
  const { mentorId } = req.params;
  const mentor = await Mentor.findOne({ _id: mentorId }).populate({
    path: "reviews.user",
    select: "name email",
  });
  if (!mentor) return res.status(404).json({ msg: "mentor not found" });
  res.status(200).json(mentor.reviews);
};

exports.addMentorReviews = async (req, res) => {
  const { mentorId } = req.params;
  const userId = req.id;
  const { rating, review } = req.body;
  if (!rating) {
    return res.status(400).json({ msg: "please privied all details" });
  }
  const mentor = await Mentor.findOne({ _id: mentorId });
  if (!mentor) return res.status(404).json({ msg: "mentor not found" });
  mentor.reviews = mentor.reviews.filter(review => !review.user.equals(userId));
  const newReview = { rating: rating, review: review, user: userId };
  mentor.reviews.push(newReview);
  await mentor.save()
  res.status(201).json({msg: "review added"});
};

exports.delMentorReviews = async (req, res) => {
    try {
      const userId = req.id
    const {mentorId} = req.params
    if(!mentorId) return res.status(400).json({msg: "please send course Id"})
    const mentor = await Mentor.findOne({ _id: mentorId });
    mentor.reviews = mentor.reviews.filter(review => !review.user.equals(userId));
    const x = await mentor.save()
    res.status(201).json({msg: "review deleted"})
    } catch (error) {
      res.status(500).json({msg: error.message})
  
    }
  }
