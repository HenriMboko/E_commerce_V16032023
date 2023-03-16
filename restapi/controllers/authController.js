const UsersModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    //verification du remplissage des champs

    if (!name || !email || !password)
        return res.status(400).json({ message: "information is not correct...." })

    // verfication si l'utlisateur exste deja dans la base de données
    const isExist = await UsersModel.findOne({ email })
    if (isExist)
        return res.status(404).json({ message: "user already exist...!" })

    // bcrypt password

    //const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, 10)

    //Create a user
    UsersModel.create({
        name,
        email,
        password: hashPassword

    })
        .then((user) => {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        }).catch((er) => console.log(er))


}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await UsersModel.findOne({ email });

    //compare user password and password if match
    if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

    } else {
        return res.status(404).json({
            message: "credential incorrect ... !"
        })
    }
}

// @desc ut user
// @route put /api/users
// access private


const updatUser = async (req, res, next) => {

    const { id, name, email, password, isAdmin } = req.body


    if (!name || !email || !password)
        return res.status(400).json({ message: "information is not correct...." })

    // verfication si l'utlisateur exste deja dans la base de données
    const isExist = await UsersModel.findOne({ email })
    if (isExist)
        return res.status(404).json({ message: "user already exist...!" })

    //verfication if user exist
    const user = UsersModel.findById(id)
    if (user)
        return res.status(400).json({ message: "User not Exist...." })

    user.name = name
    user.email = email
    user.isAdmin = isAdmin

    if (password) {
        // Hash password
        user.password = await bcrypt.hash(password, 10) // salt rounds
    }

    const creatUpdateUsrer = await user.save()

    res.json({ message: `${creatUpdateUsrer.name} update` })


}


//getUser an accesseur

const getUserProfil = async (req, res) => {
    const user = {
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        isAdmin: req.user.isAdmin,
    }
    res.status(200).json(user)
}

// @desc Get user
// @route Get /api/users
// @access Private

const getAllUser = async (req, res) => {
    const users = await UsersModel.find({})

    res.json(users)

}


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

module.exports = {
    registerUser,
    loginUser,
    getUserProfil,
    getAllUser,
    updatUser
}