const mongoose = require("mongoose");

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.mongo_url);
        console.log("connected to Mongo db");
    } catch (error) {
        console.error("connection error", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;