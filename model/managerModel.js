const mongoose = require("mongoose")

const managerSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please add the Email Address"],
        unique: [true, "Email ID already taken"],
    },
    name: {
        type: String,
        required: [true, "Please add the Name"]
    },
    images: {
        type: String,
        required: [true, "Please add the images"]
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("manager", managerSchema)