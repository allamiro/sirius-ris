//--------------------------------------------------------------------------------------------------------------------//
// REPORTS SCHEMAS:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Findings Sub-Schema:
const subSchemaFindings = new mongoose.Schema({
    fk_procedure:           { type: mongoose.ObjectId, required: true },
    title:                  { type: String, required: true },
    procedure_findings:     { type: String, required: true }
},
{ _id : false });

//Define Authenticated Sub-Schema:
const subSchemaAuthenticated = new mongoose.Schema({
    datetime:               { type: Date },                 //Not required in the main request, set on authenticate handler.
    fk_user:                { type: mongoose.ObjectId },    //Not required in the main request, set on authenticate handler.
    base64_report:          { type: String }                //Not required in the main request, set on authenticate handler.
},
{ _id : false });

//Define Schema:
const Schema = new mongoose.Schema({
    fk_performing:          { type: mongoose.ObjectId, required: true },
    clinical_info:          { type: String, required: true },
    procedure_description:  { type: String, required: true },
    findings:               { type: [subSchemaFindings] },
    summary:                { type: String },
    medical_signatures:     { type: [mongoose.ObjectId] },      //Not required in the main request, managed from reports and signatures handlers.
    fk_pathologies:         { type: [mongoose.ObjectId] },      //Not required in the main request, set on set pathologies handler.
    authenticated:          { type: subSchemaAuthenticated }    //Not required in the main request, set on authenticate handler.
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('reports', Schema, 'reports');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_report',
    Plural      : 'fk_reports'
};

//Register allowed unset values:
const AllowedUnsetValues = ['findings', 'summary', 'medical_signatures', 'fk_pathologies'];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('fk_performing')
        .trim()
        .isMongoId()
        .withMessage('The fk_performing parameter is not a valid MongoDB ID.'),

    body('clinical_info')
        .trim()
        .isLength({ min: 10, max: 10000 })
        .withMessage('The clinical_info parameter provided is too short or too long (min: 10, max: 10000 [characters]).'),

    body('procedure_description')
        .trim()
        .isLength({ min: 10, max: 10000 })
        .withMessage('The procedure_description parameter provided is too short or too long (min: 10, max: 10000 [characters]).'),

    body('findings').optional().isArray(),

    body('findings.*.fk_procedure')
        .if(body('findings').exists())   // Check if parent exists.
        .trim()
        .isMongoId()
        .withMessage('The findings.*.fk_procedure parameter is not a valid MongoDB ID.'),

    body('findings.*.procedure_findings')
        .if(body('findings').exists())   // Check if parent exists.
        .trim()
        .isLength({ min: 10, max: 10000 })
        .withMessage('The findings.*.procedure_findings parameter provided is too short or too long (min: 10, max: 10000 [characters]).'),

    body('findings.*.title')
        .if(body('findings').exists())   // Check if parent exists.
        .trim()
        .isLength({ min: 3, max: 80 })
        .withMessage('The findings.*.title parameter provided is too short or too long (min: 3, max: 80 [characters]).'),

    body('summary')
        .optional()
        .trim()
        .isLength({ min: 10, max: 10000 })
        .withMessage('The summary parameter provided is too short or too long (min: 10, max: 10000 [characters]).'),

    body('fk_pathologies')
        .optional()
        .isArray(),
    
    body('fk_pathologies.*')
        .trim()
        .isMongoId()
        .withMessage('The fk_pathologies parameter is not a valid MongoDB ID.')
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//