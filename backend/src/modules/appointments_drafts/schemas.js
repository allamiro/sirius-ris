//--------------------------------------------------------------------------------------------------------------------//
// APPOINTMENTS DRAFTS SCHEMA:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Imaging Sub-Schema:
const subSchemaImaging = new mongoose.Schema({
    organization:   { type: mongoose.ObjectId, required: true },
    branch:         { type: mongoose.ObjectId, required: true },
    service:        { type: mongoose.ObjectId, required: true }
},
{ _id : false });

//Define Schema:
const Schema = new mongoose.Schema({
    fk_appointment_request: { type: mongoose.ObjectId },
    imaging:                { type: subSchemaImaging, required: true },
    fk_patient:             { type: mongoose.ObjectId, required: true },
    fk_coordinator:         { type: mongoose.ObjectId, required: true },
    start:                  { type: Date, required: true },
    end:                    { type: Date, required: true },
    fk_slot:                { type: mongoose.ObjectId, required: true },
    fk_procedure:           { type: mongoose.ObjectId, required: true },
    extra_procedures:       { type: [mongoose.ObjectId] },
    urgency:                { type: Boolean, required: true },
    friendly_pass:          { type: String },
    overbooking:            { type: Boolean }
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('appointments_drafts', Schema, 'appointments_drafts');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_appointment_draft',
    Plural      : 'fk_appointments_drafts'
};

//Register allowed unset values:
const AllowedUnsetValues = ['fk_appointment_request', 'extra_procedures'];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('fk_appointment_request')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('The fk_appointment_request parameter is not a valid MongoDB ID.'),

    //----------------------------------------------------------------------------------------------------------------//
    // IMAGING:
    //----------------------------------------------------------------------------------------------------------------//
    body('imaging.organization')
        .trim()
        .isMongoId()
        .withMessage('The imaging.organization parameter is not a valid MongoDB ID.'),
    
    body('imaging.branch')
        .trim()
        .isMongoId()
        .withMessage('The imaging.branch parameter is not a valid MongoDB ID.'),

    body('imaging.service')
        .trim()
        .isMongoId()
        .withMessage('The imaging.service parameter is not a valid MongoDB ID.'),
    //----------------------------------------------------------------------------------------------------------------//
    
    body('fk_patient')
        .trim()
        .isMongoId()
        .withMessage('The fk_patient parameter is not a valid MongoDB ID.'),

    body('fk_coordinator')
        .trim()
        .isMongoId()
        .withMessage('The fk_coordinator parameter is not a valid MongoDB ID.'),

    body('start').trim(),

    body('end').trim(),

    body('fk_slot')
        .trim()
        .isMongoId()
        .withMessage('The fk_slot parameter is not a valid MongoDB ID.'),

    body('fk_procedure')
        .trim()
        .isMongoId()
        .withMessage('The fk_procedure parameter is not a valid MongoDB ID.'),

    body('extra_procedures')
        .optional()
        .isArray()
        .withMessage('The extra_procedures parameter must be an array.'),

    body('extra_procedures.*')
        .trim()
        .isMongoId()
        .withMessage('The extra_procedures.* parameter is not a valid MongoDB ID.'),

    body('urgency')
        .trim()
        .isBoolean()
        .withMessage('The urgency parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('friendly_pass')
        .optional(),

    body('overbooking')
        .optional()
        .trim()
        .isBoolean()
        .withMessage('The overbooking parameter provided is not boolean (true or false).')
        .toBoolean()
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//