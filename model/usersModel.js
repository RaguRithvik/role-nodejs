const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please add the Email Address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add the Password"]
    },
    role: {
        type: String,
        required: [true, "Please add the Role"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("users", usersSchema);
