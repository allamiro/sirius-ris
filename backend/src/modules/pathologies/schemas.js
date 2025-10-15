//--------------------------------------------------------------------------------------------------------------------//
// PATHOLOGIES SCHEMA:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Schema:
const Schema = new mongoose.Schema({
    fk_organization:    { type: mongoose.ObjectId, required: true },
    name:               { type: String, required: true },
    description:        { type: String },
    status:             { type: Boolean, required: true, default: false },
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('pathologies', Schema, 'pathologies');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_pathology',
    Plural      : 'fk_pathologies'
};

//Register allowed unset values:
const AllowedUnsetValues = ['description'];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('fk_organization')
        .trim()
        .isMongoId()
        .withMessage('The fk_organization parameter is not a valid MongoDB ID.'),
        
    body('name')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('The name parameter provided is too short or too long (min: 3, max: 50 [characters]).')
        .toUpperCase(),

    body('description')
        .optional()
        .trim()
        .isLength({ min: 2, max: 1000 })
        .withMessage('The description parameter provided is too short or too long (min: 2, max: 1000 [characters]).'),
        
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