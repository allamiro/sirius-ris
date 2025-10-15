//--------------------------------------------------------------------------------------------------------------------//
// SERVICES SCHEMAS:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Schema:
const Schema = new mongoose.Schema({
    fk_branch:      { type: mongoose.ObjectId, required: true },
    fk_modality:    { type: mongoose.ObjectId, required: true },
    fk_equipments:  { type: [mongoose.ObjectId], required: true },
    name:           { type: String, required: true },
    status:         { type: Boolean, required: true, default: false },
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('services', Schema, 'services');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_service',
    Plural      : 'fk_services',
    Domain      : 'domain.service',
    Imaging     : 'imaging.service',
    Referring   : 'referring.service',
    Reporting   : 'reporting.service'
};

//Register allowed unset values:
const AllowedUnsetValues = [];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('fk_branch')
        .trim()
        .isMongoId()
        .withMessage('The fk_branch parameter is not a valid MongoDB ID.'),

    body('fk_modality')
        .trim()
        .isMongoId()
        .withMessage('The fk_modality parameter is not a valid MongoDB ID.'),

    body('fk_equipments')
        .isArray()
        .withMessage('The fk_equipments parameter is required.'),

    body('fk_equipments.*')
        .trim()
        .isMongoId()
        .withMessage('The fk_equipments parameter is not a valid MongoDB ID.'),

    body('name')
        .trim()
        .isLength({ min: 3, max: 64 })
        .withMessage('The name provided is too short or too long (min: 3, max: 64 [characters]).'),

    body('status')
        .trim()
        .isBoolean()
        .withMessage('The status provided is not boolean (true or false).')
        .toBoolean()
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//