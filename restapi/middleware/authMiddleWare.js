const jwt = require('jsonwebtoken');
const UsersModel = require("../models/userModel");


const protect = async (req, res, next) => {
    let Token;


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header
            Token = req.headers.authorization.split(' ')[1];

            //verify token
            const decoded = jwt.verify(Token, process.env.JWT_SECRET);
            //get user from token
            req.user = await UsersModel.findById(decoded.id).select("-password");

            next();

        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Not Authorized' });

        }
    }
    if (!Token) {
        res.status(401).json({ message: 'Not Authorized, Token not found' })
    }
}


const adminUser = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).json({ message: "Not authorized as an Admin" })
    }
}


module.exports = { protect, adminUser }