//--------------------------------------------------------------------------------------------------------------------//
// EQUIPMENTS SCHEMA:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Schema:
const Schema = new mongoose.Schema({
    fk_modalities:  { type: [mongoose.ObjectId], required: true },
    fk_branch:      { type: mongoose.ObjectId, required: true },
    name:           { type: String, required: true },
    serial_number:  { type: String },
    AET:            { type: String },
    status:         { type: Boolean, required: true, default: false },
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('equipments', Schema, 'equipments');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_equipment',
    Plural      : 'fk_equipments'
};

//Register allowed unset values:
const AllowedUnsetValues = ['serial_number', 'AET'];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('fk_modalities')
        .isArray()
        .withMessage('The fk_modalities parameter is required.'),

    body('fk_modalities.*')
        .trim()
        .isMongoId()
        .withMessage('The fk_modalities parameter is NOT a valid MongoDB ID.'),

    body('fk_branch')
        .trim()
        .isMongoId()
        .withMessage('The fk_branch parameter is NOT a valid MongoDB ID.'),

    body('name')
        .trim()
        .isLength({ min: 3, max: 64 })
        .withMessage('The name is too short or too long (min: 3, max: 64 characters).'),
    
    body('serial_number')
        .optional()
        .trim()
        .isLength({ min: 3, max: 64 })
        .withMessage('The serial_number is too short or too long (min: 3, max: 64 characters).'),

    body('AET')
        .optional()
        .trim()
        .isLength({ min: 3, max: 32 })
        .withMessage('The AET is too short or too long (min: 3, max: 32 characters).'),

    body('status')
        .trim()
        .isBoolean()
        .withMessage('The provided status is not boolean (true or false).')
        .toBoolean()
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//