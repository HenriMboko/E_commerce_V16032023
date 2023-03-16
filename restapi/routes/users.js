var express = require('express');
var userRouter = express.Router();
var { getUserProfil, updatUser, getAllUser, loginUser, registerUser } = require("../controllers/authController")
var { protect, adminUser } = require("../middleware/authMiddleWare")


/* GET users listing. */

userRouter.post("/", registerUser);

userRouter.get("/", protect, adminUser, getAllUser)

userRouter.post("/login", loginUser);


userRouter.get("/", protect, getUserProfil)


userRouter.put('/', protect, updatUser)


module.exports = userRouter;
