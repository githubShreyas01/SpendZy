const router = require("express").Router();
const Transaction = require("../models/transactionModel");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/usersModel");
const stripe = require("stripe")(process.env.stripe_key);
const { v4: uuidv4 } = require('uuid');


//transfer money from one account to another
router.post("/transfer-funds", authMiddleware, async (req, res) => {
    try {
        //save the transaction
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();

        //decrease the sender's balance
        await User.findByIdAndUpdate(req.body.sender, {
            $inc: { balance: -req.body.amount },
        });

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
});

//get all transactions by user
router.post("/get-all-transactions-by-user", authMiddleware, async (req, res) => {
    try {
        const transactions = await Transaction.find({
            $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
        }).sort({ createdAt: -1 }).populate("sender").populate("receiver");
        res.send({
            message: "Transactions fetched",
            data: transactions,
            success: true,
        });
    } catch (error) {
        res.send({
            message: "Transactions not fetched",
            data: error.message,
            success: true,
        });
    }
});

//deposit funds using stripe
router.post("/deposit-funds", authMiddleware, async (req, res) => {


    try {
        const { token, amount } = req.body;
        //create a customer
        const customer = await stripe.customer.create({
            email: token.email,
            source: token.id,
        });

        //create a charge
        const charge = await stripe.charge.create({
            amount: amount,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            description: "Deposited to spendzy"
        },
            {
                idempotencyKey: uuidv4(),
            }
        );

        //save the transaction
        if (charge.status === "succeeded") {
            const newTransaction = new Transaction({
                sender: req.body.userId,
                receiver: req.body.userId,
                amount: amount,
                type: "Deposit",
                reference: "stripe deposit",
                status: "success",
            });
            await newTransaction.save();

            //increase user balance
            await User.findByIdAndUpdate(req.body.userId, {
                $inc: { balance: amount },
            });

            res.send({
                message: "Transactions successful",
                data: newTransaction,
                success: true,
            });
        } else {
            res.send({
                message: "Transactions failed",
                data: charge,
                success: false,
            });
        }
    } catch (error) {
        res.send({
            message: "Transactions failed",
            data: error.message,
            success: false,
        });
    }
});

module.exports = router;