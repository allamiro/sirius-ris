//--------------------------------------------------------------------------------------------------------------------//
// PROCEDURES SCHEMA:
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

//Define Allowed Equipments Sub-Schema:
const subSchemaAllowedEquipments = new mongoose.Schema({
    fk_equipment:   { type: mongoose.ObjectId, required: true },
    duration:       { type: Number, required: true },
},
{ _id : false });

//Define Schema:
const Schema = new mongoose.Schema({
    domain:             { type: subSchemaDomain, required: true },
    fk_modality:        { type: mongoose.ObjectId, required: true },
    name:               { type: String, required: true },
    code:               { type: String },
    snomed:             { type: String },
    equipments:         { type: [subSchemaAllowedEquipments], required: true },
    preparation:        { type: String },
    procedure_template: { type: String },
    report_template:    { type: String },
    has_interview:      { type: Boolean, required: true },
    informed_consent:   { type: Boolean, required: true },
    status:             { type: Boolean, required: true, default: false },
    coefficient:        { type: Number },
    reporting_delay:    { type: Number },
    wait_time:          { type: Number }
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('procedures', Schema, 'procedures');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_procedure',
    Plural      : 'fk_procedures',
    Extra       : 'extra_procedures'
};

//Register allowed unset values:
const AllowedUnsetValues = [
    'code',
    'snomed',
    'preparation',
    'procedure_template',
    'report_template',
    'coefficient',
    'reporting_delay',
    'wait_time'
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('domain.organization')
        .trim()
        .isMongoId()
        .withMessage('The domain.organization parameter is not a valid MongoDB ID.'),
    
    body('domain.branch')
        .trim()
        .isMongoId()
        .withMessage('The domain.branch parameter is not a valid MongoDB ID.'),

    body('fk_modality')
        .trim()
        .isMongoId()
        .withMessage('The fk_modality parameter is not a valid MongoDB ID.'),

    body('name')
        .trim()
        .isLength({ min: 3, max: 70 })
        .withMessage('The name provided is too short or too long (min: 3, max: 70 [characters]).'),

    body('code')
        .optional()
        .trim()
        .isLength({ min: 3, max: 40 })
        .withMessage('The code provided is too short or too long (min: 3, max: 40 [characters]).'),

    body('snomed')
        .optional()
        .trim()
        .isLength({ min: 3, max: 40 })
        .withMessage('The SNOMED code provided is too short or too long (min: 3, max: 40 [characters]).'),

    body('equipments')
        .isArray()
        .withMessage('The equipments parameter is required.'),

    body('equipments.*.fk_equipment')
        .trim()
        .isMongoId()
        .withMessage('The fk_equipment parameter is not a valid MongoDB ID.'),

    body('equipments.*.duration')
        .trim()
        .isInt()
        .withMessage('The duration parameter is required and must be numeric [minutes].'),

    body('preparation')
        .optional()
        .trim()
        .isLength({ min: 10, max: 3000 })
        .withMessage('The preparation parameter provided is too short or too long (min: 10, max: 3000 [characters]).'),

    body('procedure_template')
        .optional()
        .trim()
        .isLength({ min: 10, max: 3000 })
        .withMessage('The procedure_template parameter provided is too short or too long (min: 10, max: 3000 [characters]).'),

    body('report_template')
        .optional()
        .trim()
        .isLength({ min: 10, max: 3000 })
        .withMessage('The report_template parameter provided is too short or too long (min: 10, max: 3000 [characters]).'),

    body('informed_consent')
        .trim()
        .isBoolean()
        .withMessage('The informed_consent parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('has_interview')
        .trim()
        .isBoolean()
        .withMessage('The has_interview parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('status')
        .trim()
        .isBoolean()
        .withMessage('The status provided is not boolean (true or false).')
        .toBoolean(),
    
    body('coefficient')
        .optional()
        .trim()
        .isDecimal()
        .withMessage('The coefficient parameter must be numeric (decimal).'),

    body('reporting_delay')
        .optional()
        .trim()
        .isInt()
        .withMessage('The reporting_delay parameter must be numeric (number of days).'),

    body('wait_time')
        .optional()
        .trim()
        .isInt()
        .withMessage('The wait_time parameter must be numeric (minutes).')
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//