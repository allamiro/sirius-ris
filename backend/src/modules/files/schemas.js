//--------------------------------------------------------------------------------------------------------------------//
// FILES SCHEMA:
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
    domain:         { type: subSchemaDomain, required: true },
    name:           { type: String },
    base64:         { type: String } //This parameter is created in backend server (not validate).
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('files', Schema, 'files');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular            : 'fk_file',
    Plural              : 'fk_files',
    Informed_Consent    : 'consents.informed_consent',
    Clinical_Trial      : 'consents.clinical_trial',
    Attached            : 'attached_files'
};

//Register allowed unset values:
const AllowedUnsetValues = ['description'];
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
        .isLength({ min: 3, max: 50 })
        .withMessage('The name is too short or too long (min: 3, max: 50 characters).'),

    body('base64')
        .optional(),
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//