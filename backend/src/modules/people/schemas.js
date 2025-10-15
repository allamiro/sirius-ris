//--------------------------------------------------------------------------------------------------------------------//
// PEOPLE SCHEMAS:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Documents Sub-Schema:
const subSchemaDocuments = new mongoose.Schema({
    doc_country_code:   { type: String, required: true }, // ¯¯¯|
    doc_type:           { type: Number, required: true }, //    |--> user_id
    document:           { type: String, required: true }, // ___|
},
{ _id : false });

//Define Schema:
const Schema = new mongoose.Schema({
    documents:          { type: [subSchemaDocuments] },
    name_01:            { type: String, required: true },
    name_02:            { type: String },
    surname_01:         { type: String, required: true },
    surname_02:         { type: String },
    birth_date:         { type: Date, required: true },
    gender:             { type: Number, required: true },
    phone_numbers:      { type: [String] },
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('people', Schema, 'people'); //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_person',
    Plural      : 'fk_people'
};

//Register allowed unset values:
const AllowedUnsetValues = ['name_02', 'surname_02', 'phone_numbers'];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    //Validate subSchema:
    body('documents').isArray(),

    body('documents.*.doc_country_code')
        .trim()
        .isLength({ min: 3, max: 3 })
        .withMessage('The document country code provided is too short or too long (min: 3, max: 3 [characters]).')
        .toLowerCase(),

    body('documents.*.doc_type')
        .trim()
        .isInt()
        .withMessage('The document type parameter is required and must be numeric.'),

    body('documents.*.document')
        .trim()
        .isLength({ min: 3, max: 25 })
        .withMessage('The document number provided is too short or too long (min: 3, max: 25 [characters]).')
        .toUpperCase(),

    //Validate Schema:
    body('name_01')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The first name provided is too short or too long (min: 3, max: 30 [characters]).')
        .toUpperCase(),

    body('name_02')
        .trim()
        .optional()
        .isLength({ min: 3, max: 30 })
        .withMessage('The middle name provided is too short or too long (min: 3, max: 30 [characters]).')
        .toUpperCase(),

    body('surname_01')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The first surname provided is too short or too long (min: 3, max: 30 [characters]).')
        .toUpperCase(),

    body('surname_02')
        .trim()
        .optional()
        .isLength({ min: 3, max: 30 })
        .withMessage('The second surname provided is too short or too long (min: 3, max: 30 [characters]).')
        .toUpperCase(),

    body('birth_date').trim(),

    body('gender')
        .trim()
        .isInt()
        .withMessage('The gender parameter is required and must be numeric.'),

    body('phone_numbers').optional().isArray(),

    body('phone_numbers.*')
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage('The phone number provided is too short or too long (min: 3, max: 20 [characters]).'),
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//