//--------------------------------------------------------------------------------------------------------------------//
// MODALITIES SCHEMA:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Schema:
const Schema = new mongoose.Schema({
    code_meaning:   { type: String, required: true },
    code_value:     { type: String, required: true },
    status:         { type: Boolean, required: true, default: false },
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('modalities', Schema, 'modalities');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_modality',
    Plural      : 'fk_modalities'
};

//Register allowed unset values:
const AllowedUnsetValues = [];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('code_meaning')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('The code meaning provided is too short or too long (min: 3, max: 50 [characters]).'),

    body('code_value')
        .trim()
        .isLength({ min: 2, max: 10 })
        .withMessage('The code value provided is too short or too long (min: 2, max: 10 [characters]).')
        .toUpperCase(),

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