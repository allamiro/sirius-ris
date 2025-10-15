//--------------------------------------------------------------------------------------------------------------------//
// PROCEDURES CATEGORIES SCHEMA:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Domain Sub-Schema:
const subSchemaDomain = new mongoose.Schema({
    organization:   { type: mongoose.ObjectId, required: true },
    branch:         { type: mongoose.ObjectId, required: true },
},
{ _id : false });

//Define Schema:
const Schema = new mongoose.Schema({
    domain:             { type: subSchemaDomain, required: true },    
    name:               { type: String, required: true },
    fk_procedures:      { type: [mongoose.ObjectId], required: true }
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('procedure_categories', Schema, 'procedure_categories');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_procedure_categories',
    Plural      : 'fk_procedure_categories'
};

//Register allowed unset values:
const AllowedUnsetValues = [];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('domain.organization')
        .trim()
        .isMongoId()
        .withMessage('The domain.organization parameter is NOT a valid MongoDB ID.'),
    
    body('domain.branch')
        .trim()
        .isMongoId()
        .withMessage('The domain.branch parameter is NOT a valid MongoDB ID.'),

    body('name')
        .trim()
        .isLength({ min: 3, max: 64 })
        .withMessage('The name is too short or too long (min: 3, max: 64 characters).'),

    body('fk_procedures')
        .isArray()
        .withMessage('The fk_procedures parameter is required.'),

    body('fk_procedures.*')
        .trim()
        .isMongoId()
        .withMessage('The fk_procedures parameter is NOT a valid MongoDB ID.'),
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//