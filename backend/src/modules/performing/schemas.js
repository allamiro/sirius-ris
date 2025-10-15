//--------------------------------------------------------------------------------------------------------------------//
// PERFORMING SCHEMAS:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Anesthesia Sub-Schema:
const subSchemaAnesthesia = new mongoose.Schema({
    procedure:          { type: String, required: true },
    professional_id:    { type: String, required: true },
    document:           { type: String, required: true },
    name:               { type: String, required: true },
    surname:            { type: String, required: true }
},
{ _id : false });

//Define PET-CT Sub-Schema:
const subSchemaPETCT = new mongoose.Schema({
    batch:                  { type: String },
    syringe_activity_full:  { type: Number, required: true },
    syringe_activity_empty: { type: Number, required: true },
    administred_activity:   { type: Number, required: true },
    syringe_full_time:      { type: String, required: true },
    syringe_empty_time:     { type: String, required: true },
    laboratory_user:        { type: mongoose.ObjectId, required: true },
},
{ _id : false });

//Define Injection Sub-Schema:
const subSchemaInjection = new mongoose.Schema({
    administered_volume:    { type: Number, required: true },
    administration_time:    { type: String, required: true },
    injection_user:         { type: mongoose.ObjectId, required: true },
    pet_ct:                 { type: subSchemaPETCT }
},
{ _id : false });

//Define Acquisition Sub-Schema:
const subSchemaAcquisition = new mongoose.Schema({
    time:                   { type: String, required: true },
    console_technician:     { type: mongoose.ObjectId, required: true },
    observations:           { type: String }
},
{ _id : false });

//Define Schema:
const Schema = new mongoose.Schema({
    fk_appointment:         { type: mongoose.ObjectId, required: true },
    flow_state:             { type: String, required: true },
    date:                   { type: Date, required: true },
    fk_equipment:           { type: mongoose.ObjectId, required: true },
    fk_procedure:           { type: mongoose.ObjectId, required: true },
    extra_procedures:       { type: [mongoose.ObjectId] },
    cancellation_reasons:   { type: Number },
    urgency:                { type: Boolean, required: true },
    status:                 { type: Boolean, required: true, default: false },
    anesthesia:             { type: subSchemaAnesthesia },
    injection:              { type: subSchemaInjection },
    acquisition:            { type: subSchemaAcquisition },
    observations:           { type: String }
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('performing', Schema, 'performing');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_performing',
    Plural      : 'fk_performing'
};

//Register allowed unset values:
const AllowedUnsetValues = [
    'extra_procedures',
    'cancellation_reasons',
    'observations',
    'anesthesia',
    'injection',
    'injection.pet_ct',
    'acquisition',
    'acquisition.observations'
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('fk_appointment')
        .trim()
        .isMongoId()
        .withMessage('The fk_appointment parameter is not a valid MongoDB ID.'),

    body('flow_state')
        .trim()
        .isLength({ min: 3, max: 3 })
        .withMessage('The flow_state parameter provided is too short or too long (min: 3, max: 3 [characters]).'),

    //Validate checkin_time and build performing date preserving the appointment date:
    body('checkin_time')
        .trim()
        .matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)
        .withMessage('The checkin_time parameter cannot be empty [Format: HH:MM | 24 hrs].'),

    body('fk_equipment')
        .trim()
        .isMongoId()
        .withMessage('The fk_equipment parameter is not a valid MongoDB ID.'),

    body('fk_procedure')
        .trim()
        .isMongoId()
        .withMessage('The fk_procedure parameter is not a valid MongoDB ID.'),

    body('extra_procedures')
        .optional()
        .isArray()
        .withMessage('The extra_procedures parameter must be an array.'),

    body('extra_procedures.*')
        .if(body('extra_procedures').exists())   // Check if parent exists.
        .trim()
        .isMongoId()
        .withMessage('The extra_procedures.* parameter is not a valid MongoDB ID.'),

    body('cancellation_reasons')
        .optional()
        .trim()
        .isInt()
        .withMessage('The cancellation_reasons parameter must be numeric.'),

    body('urgency')
        .trim()
        .isBoolean()
        .withMessage('The urgency parameter provided is not boolean (true or false).')
        .toBoolean(),
    
    body('status')
        .trim()
        .isBoolean()
        .withMessage('The status provided is not boolean (true or false).')
        .toBoolean(),

    body('observations')
        .optional()
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('The observations parameter provided is too short or too long (min: 10, max: 1000 [characters]).'),
        
    //----------------------------------------------------------------------------------------------------------------//
    // ANESTHESIA:
    //----------------------------------------------------------------------------------------------------------------//
    body('anesthesia').optional(),

    body('anesthesia.procedure')
        .if(body('anesthesia').exists())   // Check if parent exists.
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('The anesthesia.procedure parameter provided is too short or too long (min: 10, max: 1000 [characters]).'),

    body('anesthesia.professional_id')
        .if(body('anesthesia').exists())   // Check if parent exists.
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The anesthesia.professional_id parameter provided is too short or too long (min: 3, max: 30 [characters]).'),

    body('anesthesia.document')
        .if(body('anesthesia').exists())   // Check if parent exists.
        .trim()
        .isLength({ min: 3, max: 25 })
        .withMessage('The anesthesia.document parameter provided is too short or too long (min: 3, max: 25 [characters]).'),

    body('anesthesia.name')
        .if(body('anesthesia').exists())   // Check if parent exists.
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The anesthesia.name parameter provided is too short or too long (min: 3, max: 30 [characters]).'),
    
    body('anesthesia.surname')
        .if(body('anesthesia').exists())   // Check if parent exists.
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The anesthesia.surname parameter provided is too short or too long (min: 3, max: 30 [characters]).'),
    //----------------------------------------------------------------------------------------------------------------//


    //----------------------------------------------------------------------------------------------------------------//
    // INJECTION:
    //----------------------------------------------------------------------------------------------------------------//
    body('injection').optional(),

    body('injection.administered_volume')
        .if(body('injection').exists())   // Check if parent exists.
        .trim()
        .isInt()
        .withMessage('The injection.administered_volume parameter must be numeric.'),

    body('injection.administration_time')
        .if(body('injection').exists())   // Check if parent exists.
        .trim()
        .matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)
        .withMessage('The injection.administration_time parameter cannot be empty [Format: HH:MM | 24 hrs].'),

    body('injection.injection_user')
        .if(body('injection').exists())   // Check if parent exists.
        .trim()
        .isMongoId()
        .withMessage('The injection.injection_user parameter is not a valid MongoDB ID.'),

    // PET-CT:
    body('injection.pet_ct').optional(),

    body('injection.pet_ct.laboratory_user')
        .if(body('injection.pet_ct').exists())   // Check if parent exists.
        .trim()
        .isMongoId()
        .withMessage('The injection.pet_ct.laboratory_user parameter is not a valid MongoDB ID.'),

    body('injection.pet_ct.batch')
        .if(body('injection.pet_ct').exists())   // Check if parent exists.
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The injection.pet_ct.batch parameter provided is too short or too long (min: 3, max: 30 [characters]).'),

    body('injection.pet_ct.syringe_activity_full')
        .if(body('injection.pet_ct').exists())   // Check if parent exists.
        .trim()
        .isDecimal()
        .withMessage('The injection.pet_ct.syringe_activity_full parameter must be numeric (decimal).'),

    body('injection.pet_ct.syringe_activity_empty')
        .if(body('injection.pet_ct').exists())   // Check if parent exists.
        .trim()
        .isDecimal()
        .withMessage('The injection.pet_ct.syringe_activity_empty parameter must be numeric (decimal).'),

    body('injection.pet_ct.administred_activity')
        .if(body('injection.pet_ct').exists())   // Check if parent exists.
        .trim()
        .isDecimal()
        .withMessage('The injection.pet_ct.administred_activity parameter must be numeric (decimal).'),

    body('injection.pet_ct.syringe_full_time')
        .if(body('injection.pet_ct').exists())   // Check if parent exists.
        .trim()
        .matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)
        .withMessage('The injection.pet_ct.syringe_full_time parameter cannot be empty [Format: HH:MM | 24 hrs].'),

    body('injection.pet_ct.syringe_empty_time')
        .if(body('injection.pet_ct').exists())   // Check if parent exists.
        .trim()
        .matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)
        .withMessage('The injection.pet_ct.syringe_empty_time parameter cannot be empty [Format: HH:MM | 24 hrs].'),
    //----------------------------------------------------------------------------------------------------------------//


    //----------------------------------------------------------------------------------------------------------------//
    // ACQUISITION:
    //----------------------------------------------------------------------------------------------------------------//
    body('acquisition').optional(),

    body('acquisition.time')
        .if(body('acquisition').exists())   // Check if parent exists.
        .trim()
        .matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/)
        .withMessage('The acquisition.time parameter cannot be empty [Format: HH:MM | 24 hrs].'),

    body('acquisition.console_technician')
        .if(body('acquisition').exists())   // Check if parent exists.
        .trim()
        .isMongoId()
        .withMessage('The acquisition.console_technician parameter is not a valid MongoDB ID.'),

    body('acquisition.observations')
        .optional()
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('The acquisition.observations parameter provided is too short or too long (min: 10, max: 1000 [characters]).'),
    //----------------------------------------------------------------------------------------------------------------//

];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//