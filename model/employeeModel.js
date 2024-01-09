const mongoose = require("mongoose");

const skillSchema = mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Please add the Skill Name"],
    },
    // Add more properties as needed for each skill
});

const employeeSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please add the Email Address"],
        unique: [true, "Email ID already taken"],
    },
    name: {
        type: String,
        required: [true, "Please add the Name"],
    },
    skills: {
        type: [skillSchema], // Assuming each skill is an object with a specific structure
        required: [true, "Please add the Skills"],
    },
    images: {
        type: String,
        default: "default-image-url.jpg", // Provide a default value or mechanism if applicable
    },
    documents: {
        type: String,
        default: "default-documents-url.pdf", // Provide a default value or mechanism if applicable
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("employee", employeeSchema);
