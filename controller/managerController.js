const managerschema = require("../model/managerModel");
const fs = require('fs');
const { employeeUpdate } = require("../validation");
// get
const getManager = async (req, res, next) => {
    try {
        const getData = await managerschema.find();
        res.status(200).json({ success: true, records: getData });
    } catch (err) {
        next(err);
    }
};
// Create
const CreateManager = async (req, res, next) => {
    const { user } = req.user;
    const { email, name } = req.body;
    try {
        if (user?.role !== 'admin' && user?.role !== 'manager') {
            return res.status(403).json({ message: `Permission denied.` });
        }
        if (!email || !name) {
            return res.status(400).json({ error: "All Fields are mandatory fields" });
        }
        const emailTaken = await managerschema.findOne({ email });
        if (emailTaken) {
            res.status(400);
            throw new Error("Email Already Taken");
        }
        let images;
        if (req.file) {
            images = req.file.filename;
        }
        const create = await managerschema.create({ email, name, images });
        res.status(201).json({ success: true, data: create });
    } catch (err) {
        next(err);
    }
};
// get
const updateManager = async (req, res, next) => {
    const { id, email } = req.body;
    try {
        // await employeeUpdate.validateAsync(id);
        if (!id) {
            res.status(400)
            throw new Error("ID not found")
        }
        const dataID = await managerschema.findById({ _id: id });
        if (!dataID) {
            res.status(404)
            throw new Error("ID not found")
        }
        // const emailTaken = await managerschema.findOne({ email });
        // if (emailTaken) {
        //     res.status(400);
        //     throw new Error("Email Already Taken");
        // }
        let images;
        if (req.file) {
            images = req.file.filename;
        }
        const updateData = await managerschema.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (updateData) {
            res.status(200).json({ success: true, message: 'Data update successfully' })
        }
        else {
            res.status(404).json({ success: false, message: 'Data not updated' });
        }
    }
    catch (err) {
        next(err);
    }
}
const deleteManager = async (req, res, next) => {
    const { id } = req.body;
    try {
        const manager = await managerschema.findOne({ _id: id });
        if (!manager) {
            return res.status(404).json({ success: false, message: 'ID not found' });
        }
        const fileName = manager.images;
        const filePath = "./public/images/" + fileName;
        const deletedData = await managerschema.deleteOne({ _id: id });
        if (deletedData.deletedCount === 1) {
            if (filePath) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err.message);
                        next(err)
                    } else {
                        console.log('File deleted successfully:', filePath);
                    }
                });
            }
            res.status(200).json({ success: true, message: 'Data deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Data not deleted' });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { CreateManager, getManager, deleteManager, updateManager };
