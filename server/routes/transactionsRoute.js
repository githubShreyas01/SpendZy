const router = require("express").Router();
const Transaction = require("../models/transactionModel");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/usersModel");

//transfer money from one account to another
router.post("/transfer-funds", authMiddleware, async (req, res) => {
    try {
        //save the transaction
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();

        //decrease the sender's balance
        const senderupdate = await User.findByIdAndUpdate(req.body.sender, {
            $inc: { balance: -req.body.amount },
        });

        console.log("sender update:", senderupdate);
        console.log(req.body.amount);

        //increase the receiver's balance
        await User.findByIdAndUpdate(req.body.receiver, {
            $inc: { balance: req.body.amount },
        });

        res.send({
            message: "Transaction successfull",
            data: newTransaction,
            success: true,
        });
    } catch (error) {
        res.send({
            message: "Transaction failed",
            data: error.message,
            success: false,
        });
    }
});

//verify receiver's account number
router.post("/verify-account", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.receiver });
        if (user) {
            res.send({
                message: "Account verified",
                data: user,
                success: true,
            });
        } else {
            res.send({
                message: "Account not found",
                data: null,
                success: false,
            });
        }
    } catch (error) {
        res.send({
            message: "Account not found",
            data: error.message,
            success: false,
        });
    }
})

module.exports = router;