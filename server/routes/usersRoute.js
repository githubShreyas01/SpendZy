const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

//register user account

router.post("/register", async (req, res) => {
    try {
        //check if user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.send({
                success: false,
                message: "User already exists",
            });
        }

        // hash password
        const salt = await bcrypt.genSaltSync(10);
        const hPassword = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hPassword;

        const newUser = new User(req.body);
        await newUser.save();
        res.send({
            message: "User created successfully",
            data: null,
            success: true,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

//login user account

router.post("/login", async (req, res) => {
    try {
        //checking if user exists
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "User does not exist",
            });
        }

        //check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.send({
                success: false,
                message: "Invalid password",
            });
        }

        //generate token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: "1d" });
        res.send({
            message: "User logged in succcessfully",
            data: { token },
            success: true,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

//get user info

router.post("/get-user-info", authMiddleware,  async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        user.password = '';
        res.send({
            message: "User info fetched successfully",
            data: user,
            success: true,
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

module.exports = router;