//--------------------------------------------------------------------------------------------------------------------//
// BRANCHES SCHEMAS:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Schema:
const Schema = new mongoose.Schema({
    fk_organization:        { type: mongoose.ObjectId, required: true },
    name:                   { type: String, required: true },
    short_name:             { type: String, required: true },
    OID:                    { type: String },
    country_code:           { type: String, required: true },
    structure_id:           { type: String },
    suffix:                 { type: String },
    status:                 { type: Boolean, required: true, default: false },
    base64_logo:            { type: String }, //This parameter is created in backend server (not validate).
    appointment_footer:     { type: String }
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('branches', Schema, 'branches');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_branch',
    Plural      : 'fk_branches',
    Domain      : 'domain.branch',
    Imaging     : 'imaging.branch',
    Referring   : 'referring.branch',
    Reporting   : 'reporting.branch'
};

//Register allowed unset values:
const AllowedUnsetValues = ['OID', 'structure_id', 'suffix', 'base64_logo', 'appointment_footer'];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('fk_organization')
        .trim()
        .isMongoId()
        .withMessage('The fk_organization parameter is NOT a valid MongoDB ID.'),

    body('name')
        .trim()
        .isLength({ min: 3, max: 64 })
        .withMessage('The name is too short or too long (min: 3, max: 64 characters).'),

    body('short_name')
        .trim()
        .isLength({ min: 3, max: 32 })
        .withMessage('The short name is too short or too long (min: 3, max: 32 characters).'),

    body('OID')
        .optional()
        .trim()
        .isLength({ min: 1, max: 64 })
        .withMessage('The OID is too short or too long (min: 3, max: 64 characters).'),

    body('country_code')
        .trim()
        .isLength({ min: 3, max: 3 })
        .withMessage('The entered country code is too short or too long (min: 3, max: 3 characters).')
        .toLowerCase(),

    body('structure_id')
        .optional()
        .trim()
        .isLength({ min: 1, max: 64 })
        .withMessage('The structure ID is too short or too long (min: 3, max: 64 characters).'),

    body('suffix')
        .optional()
        .trim()
        .isLength({ min: 1, max: 64 })
        .withMessage('The suffix is too short or too long (min: 3, max: 64 characters).'),

    body('status')
        .trim()
        .isBoolean()
        .withMessage('The provided status is not boolean (true or false).')
        .toBoolean(),

    body('base64_logo')
        .optional(),

    body('appointment_footer')
        .optional()
        .trim()
        .isLength({ min: 10, max: 3000 })
        .withMessage('The appointment_footer parameter is too short or too long (min: 10, max: 3000 characters).'),
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//