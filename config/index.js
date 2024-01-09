// config/index.js
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        const connect = await mongoose.connect(process.env.API_KEY, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
        // console.log("Connection details:", connect.connection);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};


module.exports = connectDB;
