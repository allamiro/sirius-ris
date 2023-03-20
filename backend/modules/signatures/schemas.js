//--------------------------------------------------------------------------------------------------------------------//
// SIGNATURES SCHEMA:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Schema:
const Schema = new mongoose.Schema({
    fk_user:    { type: mongoose.ObjectId, required: true },    // Set from the JWT, not requested.
    sha2:       { type: String }                                // Generated in the backend, not requested.
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('signatures', Schema, 'signatures');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_signature',
    Plural      : 'fk_signatures',
    MSignatures : 'medical_signatures'
};

//Register allowed unset values:
const AllowedUnsetValues = [];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    //Not save this field only requested to generate sha2.
    body('fk_report')
        .trim()
        .isMongoId()
        .withMessage('El parametro fk_report NO es un ID MongoDB válido.')
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//