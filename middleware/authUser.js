const jwt = require('jsonwebtoken');
const { SECRET_TOKEN } = require("../config/crypto")


exports.verifyUserToken = async (req, res, next) => {

    try {
        const cookie = req.cookies.token;
        if (!cookie) {
            return res.status(401).json({
                msg: "Unauthorized user!"
            });
        }
        jwt.verify(cookie, SECRET_TOKEN, (err, decode) => {
            if (err) {
              return  res.status(403).json({
                Message: err
              })
            }
            req.id = decode.id;
            next();
        });

    } catch (error) {
        console.log(error)
        res.status(400).send("Invalid Token");
    }
}

