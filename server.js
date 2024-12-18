const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { type } = require("os");
const { randomBytes } = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017",)
.then(() => console.log("MongoDb connected"))
.catch(() => console.error(err));

//User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    upi_id: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
    }
});

//User Model
const User = mongoose.model('User', userSchema);

//Transaction Schema
const transactionSchema = new mongoose.Schema({
    sender_upi_id: {
        type: String,
        required: true
    },
    receiver_upi_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

//Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

const generateUPI = () => {
    const randomId = randomBytes(4).toString('hex');
    return `${randomId}@spendzy`;
};

//signup page
app.get("/spendzy/signup", async(req, res) =>{
    res.render("sample.ejs");
});

app.post("/spendzy/signup", async(req, res) =>{
    try{
        const{name, email, password } = req.body;

        //check if user already exists
        let user = await User.findOne({email});
        if(user){
            return res.status(400).send({message: "User already exists"});
        }

        //generate upi id
        const upi_id = generateUPI();
        const balance = 1000;

        //create new user
        user = new User({name, email, password, upi_id, balance});
        await user.save();
        res.status(201).send({ message: "User registered successfully!", upi_id });
    } catch(error){
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
});

app.get("/spendzy/login", async(req, res) =>{
    res.send("Hi login");
});

app.listen(5000, ()=>{
    console.log("Server listening to port 5000");
});