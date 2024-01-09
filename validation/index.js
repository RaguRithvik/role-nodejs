const joi = require('joi');

const employeeUpdate = joi.object({
    id: joi.number().integer().required(),
    // document_id: joi.number().integer().required(),
    // application_documents: joi.allow(null),
});
module.exports = {employeeUpdate}