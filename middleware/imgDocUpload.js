const multer = require('multer');

var storageDocuments = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "images") {
            cb(null, './public/images')
        }
        else if (file.fieldname === "documents") {
            cb(null, './public/documents');
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    },
});

const imgDocUpload = multer({
    storage: storageDocuments,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
}).fields(
    [
        {
            name: 'images',
            maxCount: 3
        },
        {
            name: 'documents',
            maxCount: 3
        }
    ]
);
module.exports = { imgDocUpload }