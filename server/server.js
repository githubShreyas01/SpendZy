const express = require("express");
const app = express();

require('dotenv').config();
app.use(express.json());
const usersRoute = require("./routes/usersRoute");
const transactionsRoute = require("./routes/transactionsRoute");
const requestsRoute = require("./routes/requestsRoute");
const connectDb = require("./config/dbConfig");
connectDb();

app.use("/api/users", usersRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/requests", requestsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});