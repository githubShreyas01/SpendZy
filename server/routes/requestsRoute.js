const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Request = require("../models/requestsModel");

//get all requests for user

router.post("/get-all-requests-by-user", authMiddleware, async (req, res) => {
    try {
        const requests = await Request.find({
            $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
        })
            .populate("sender")
            .populate("receiver");

        res.send({
            data: requests,
            message: "Requests fetched successfully",
            success: true,
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//send a request to another user
router.post("/send-request", authMiddleware, async (req, res) => {
    try {
        const { receiver, amount, description } = req.body;

        const request = new Request({
            sender: req.body.userId,
            receiver,
            amount,
            description,
        });

        await request.save();

        res.send({
            data: request,
            message: "Requests sent successfully",
            success: true,
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;