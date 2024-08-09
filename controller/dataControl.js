const User = require("../models/userSchema");

exports.userData = async (req, res) => {
    try {
        const userId = req.id;
        if (!userId) {
            res.status(406).json({
                Message: "No data Found for user!",
            });
        }
        const userData = await User.findOne({ _id: userId });
        // console.log("User data is", userData)
        res.status(200).json({
            name: userData.name,
            email: userData.email
        })
    } catch (error) {
        console.log("The error is", error)
    }
};
