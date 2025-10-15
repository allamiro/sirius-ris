//--------------------------------------------------------------------------------------------------------------------//
// LOGS SCHEMAS:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Privileges Sub-Schema:
const subSchemaElement = new mongoose.Schema({
    type:               { type: String, required: true },
    _id:                { type: mongoose.ObjectId, required: true },
    details:            { type: String }
},
{ _id : false });

//Define Schema:
const Schema = new mongoose.Schema({
    fk_organization:    { type: mongoose.ObjectId, required: true },
    event:              { type: Number, required: true },
    datetime:           { type: Date, required: true },
    fk_user:            { type: mongoose.ObjectId, required: true }, //Author
    element:            { type: subSchemaElement },
    ip_client:          { type: String, required: true }
},
{ timestamps: false },
{ versionKey: false });

//Define model:
const Model = mongoose.model('logs', Schema, 'logs');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_log',
    Plural      : 'fk_logs'
};

//Register allowed unset values:
const AllowedUnsetValues = [];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('fk_organization')
        .trim()
        .isMongoId()
        .withMessage('The fk_organization parameter is not a valid MongoDB ID.'),
        
    body('event')
        .trim()
        .isInt()
        .withMessage('The event parameter is required and must be numeric.'),

    body('datetime').trim(),

    body('fk_user')
        .trim()
        .isMongoId()
        .withMessage('The fk_user parameter is not a valid MongoDB ID.'),

    body('element').optional(),

    body('element.type')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The element.type parameter provided is too short or too long (min: 3, max: 30 [characters]).'),

    body('element._id')
        .trim()
        .isMongoId()
        .withMessage('The element._id parameter is not a valid MongoDB ID.'),

    body('element.details')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The element.details parameter provided is too short or too long (min: 3, max: 30 [characters]).'),

    body('ip_client')
        .trim()
        .isIP(4)
        .withMessage('The ip_client parameter must be a valid IP address.'),
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//