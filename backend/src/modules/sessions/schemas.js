//--------------------------------------------------------------------------------------------------------------------//
// SESSIONS SCHEMAS:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Current Access Sub-Schema:
const subSchemaCurrentAccess = new mongoose.Schema({
    domain:         { type: mongoose.ObjectId, required: true },
    role:           { type: Number, required: true },
    concession:     { type: [Number] }
},
{ _id : false });

//Define Schema:
const Schema = new mongoose.Schema({
    start:              { type: Date, required: true },
    fk_user:            { type: mongoose.ObjectId, required: true },
    current_access:     { type: subSchemaCurrentAccess, required: true }
},
{ timestamps: false },
{ versionKey: false });

//Define model:
const Model = mongoose.model('sessions', Schema, 'sessions');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_session',
    Plural      : 'fk_sessions'
};

//Register allowed unset values:
const AllowedUnsetValues = [];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('start').trim(),

    body('fk_user')
        .trim()
        .isMongoId()
        .withMessage('The fk_user parameter is NOT a valid MongoDB ID.'),

    body('current_access.domain')
        .trim()
        .isMongoId()
        .withMessage('The domain parameter is NOT a valid MongoDB ID.'),

    body('current_access.role')
        .trim()
        .isInt()
        .withMessage('The role parameter is required and must be numeric.'),

    body('current_access.concession').optional().isArray(),
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//