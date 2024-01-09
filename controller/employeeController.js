const employeeSchema = require("../model/employeeModel");
const fs = require('fs');
// get
const getEmployee = async (req, res, next) => {
    try {
        const getData = await employeeSchema.find();
        res.status(200).json({ success: true, records: getData });
    } catch (err) {
        next(err);
    }
};
// Create
const createEmployee = async (req, res, next) => {
    const { email, name, skills } = req.body;
    try {
        if (!email || !name) {
            return res.status(400).json({ message: "All Fields are mandatory fields" });
        }
        const emailTaken = await employeeSchema.findOne({ email });
        if (emailTaken) {
            return res.status(400).json({ message: "Email Already Taken" });
        }
        const images = req.files['images'][0]?.filename;
        const documents = req.files['documents'][0]?.filename;
        const parsedSkills = JSON.parse(skills);
        const create = await employeeSchema.create({ email, name, images, documents, skills: parsedSkills });
        return res.status(201).json({ success: true, data: create });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error creating employee", details: err.message });
    }
};
//updateEmployee
const updateEmployee = async (req, res, next) => {
    const { email, name, skills, id } = req.body;
    try {
        if (!email || !name) {
            return res.status(400).json({ message: "All Fields are mandatory fields" });
        }
        const dataID = await employeeSchema.findById({ _id: id });
        if (!dataID) {
            return res.status(400).json({ message: "ID not found" });
        }
        let images, documents
        if (Object.keys(req?.files).length > 1 && req?.files['images'] && req?.files['documents']) {
            images = req?.files['images'][0]?.filename;
            documents = req?.files['documents'][0]?.filename
        }
        else if (Object.keys(req?.files).length > 1 && req?.files['images']) {
            images = req?.files['images'][0]?.filename;
            documents = req?.body?.documents
        }
        else if (Object.keys(req?.files).length > 1 && req?.files['documents']) {
            images = req?.body?.images;
            documents = req?.files['documents'][0]?.filename
        }
        else {
            images = req?.body?.images;
            documents = req?.body?.documents
        }
        const parsedSkills = JSON.parse(skills);
        const create = await employeeSchema.findByIdAndUpdate({ _id: id },{ email, name, skills: parsedSkills, images, documents }, { new: true });
        return res.status(201).json({ success: true, data: create });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error creating employee", details: err.message });
    }
};
const deleteFile = (filePath) => {
    return new Promise((resolve, reject) => {
        if (filePath) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err.message);
                    reject(err);
                } else {
                    console.log('File deleted successfully:', filePath);
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
};

const deleteEmployee = async (req, res, next) => {
    const { id } = req.body;
    try {
        const employee = await employeeSchema.findOne({ _id: id });
        if (!employee) {
            return res.status(404).json({ success: false, message: 'ID not found' });
        }

        const fileName = employee.images;
        const filePath = "./public/images/" + fileName;

        const fileName1 = employee.documents;
        const filePath1 = "./public/documents/" + fileName1;

        // Use Promise.all to wait for both file deletions to complete
        await Promise.all([deleteFile(filePath), deleteFile(filePath1)]);

        // After both file deletions are completed, proceed with deleting the data from the database
        const deletedData = await employeeSchema.deleteOne({ _id: id });
        if (deletedData.deletedCount === 1) {
            res.status(200).json({ success: true, message: 'Data deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'ID not found' });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};



module.exports = { getEmployee, createEmployee, deleteEmployee, updateEmployee };