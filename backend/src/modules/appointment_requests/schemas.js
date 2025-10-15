//--------------------------------------------------------------------------------------------------------------------//
// APPOINTMENT REQUESTS SCHEMA:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Imaging Sub-Schema:
const subSchemaImaging = new mongoose.Schema({
    organization:   { type: mongoose.ObjectId, required: true },
    branch:         { type: mongoose.ObjectId }
},
{ _id : false });

//Define Referring Sub-Schema:
const subSchemaReferring = new mongoose.Schema({
    organization:   { type: mongoose.ObjectId, required: true },
    branch:         { type: mongoose.ObjectId }
},
{ _id : false });

//Define Patient Sub-Schema:
const subSchemaPatient = new mongoose.Schema({
    doc_country_code:   { type: String },
    doc_type:           { type: Number, required: true },
    document:           { type: String, required: true },
    name_01:            { type: String, required: true },
    name_02:            { type: String },
    surname_01:         { type: String, required: true },
    surname_02:         { type: String },
    birth_date:         { type: Date, required: true },
    gender:             { type: Number, required: true },
    phone_numbers:      { type: [String] },
    email:              { type: String, match: /.+\@.+\..+/ },  // Required only in sirius web module.
},
{ _id : false });

//Define Study Sub-Schema:
const subSchemaStudy = new mongoose.Schema({
    fk_procedure:       { type: mongoose.ObjectId },  // ¯¯¯|
    snomed:             { type: String },             //    |----> Not required by default, at least one of the three must be set.
    fk_modality:        { type: mongoose.ObjectId }   // ___|
},
{ _id : false });

//Define Extra Data Sub-Schema:
//Extra Data is setted to be able to preserve external data, thus helping to interoperate.
const subSchemaExtraData = new mongoose.Schema({
    patient_id:         { type: String },
    study_id:           { type: String },
    physician_id:       { type: String },
    physician_name:     { type: String },
    physician_prof_id:  { type: String },
    physician_contact:  { type: String },
    requesting_id:      { type: String },
    custom_fields:      { type: [String] }
},
{ _id : false });

//Define Schema:
const Schema = new mongoose.Schema({
    imaging:        { type: subSchemaImaging, required: true },
    referring:      { type: subSchemaReferring, required: true },
    flow_state:     { type: String },   // Not required, setted in the save handler.
    urgency:        { type: Boolean, default: false },
    annotations:    { type: String },
    patient:        { type: subSchemaPatient, required: true },
    study:          { type: subSchemaStudy, required: true },
    anamnesis:      { type: String },
    indications:    { type: String },
    extra:          { type: subSchemaExtraData }
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('appointment_requests', Schema, 'appointment_requests');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_appointment_request',
    Plural      : 'fk_appointment_requests'
};

//Register allowed unset values:
const AllowedUnsetValues = ['annotations'];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('urgency')
        .optional()
        .trim()
        .isBoolean()
        .withMessage('The urgency parameter provided is not boolean (true or false).')
        .toBoolean(),

    //----------------------------------------------------------------------------------------------------------------//
    // IMAGING:
    //----------------------------------------------------------------------------------------------------------------//
    body('imaging.organization')
        .trim()
        .isMongoId()
        .withMessage('The imaging.organization parameter is not a valid MongoDB ID.'),
    
    body('imaging.branch')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('The imaging.branch parameter is not a valid MongoDB ID.'),
    //----------------------------------------------------------------------------------------------------------------//

    //----------------------------------------------------------------------------------------------------------------//
    // REFERRING:
    //----------------------------------------------------------------------------------------------------------------//
    body('referring.organization')
        .trim()
        .isMongoId()
        .withMessage('The referring.organization parameter is not a valid MongoDB ID.'),
    
    body('referring.branch')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('The referring.branch parameter is not a valid MongoDB ID.'),
    //----------------------------------------------------------------------------------------------------------------//

    //----------------------------------------------------------------------------------------------------------------//
    // PATIENT:
    //----------------------------------------------------------------------------------------------------------------//
    body('patient.doc_country_code')
        .optional()
        .trim()
        .isLength({ min: 3, max: 3 })
        .withMessage("The patient's document country code provided is too short or too long (min: 3, max: 3 [characters]).")
        .toLowerCase(),

    body('patient.doc_type')
        .trim()
        .isInt()
        .withMessage("The patient's document type parameter is required and must be numeric."),

    body('patient.document')
        .trim()
        .isLength({ min: 3, max: 25 })
        .withMessage("The patient's document number provided is too short or too long (min: 3, max: 25 [characters]).")
        .toUpperCase(),

    body('patient.name_01')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage("The patient's first name provided is too short or too long (min: 3, max: 30 [characters]).")
        .toUpperCase(),

    body('patient.name_02')
        .trim()
        .optional()
        .isLength({ min: 3, max: 30 })
        .withMessage("The patient's middle name provided is too short or too long (min: 3, max: 30 [characters]).")
        .toUpperCase(),

    body('patient.surname_01')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage("The patient's first surname provided is too short or too long (min: 3, max: 30 [characters]).")
        .toUpperCase(),

    body('patient.surname_02')
        .trim()
        .optional()
        .isLength({ min: 3, max: 30 })
        .withMessage("The patient's second surname provided is too short or too long (min: 3, max: 30 [characters]).")
        .toUpperCase(),

    body('patient.birth_date').trim().toDate(),

    body('patient.gender')
        .trim()
        .isInt()
        .withMessage("The patient's gender parameter is required and must be numeric."),

    body('patient.phone_numbers').optional().isArray(),

    body('patient.phone_numbers.*')
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage("The patient's phone number provided is too short or too long (min: 3, max: 20 [characters])."),

    body('patient.email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('The value provided is NOT a valid email address.')
        .normalizeEmail({ gmail_remove_dots: false })
        .toLowerCase(),
    //----------------------------------------------------------------------------------------------------------------//

    //----------------------------------------------------------------------------------------------------------------//
    // STUDY:
    //----------------------------------------------------------------------------------------------------------------//
    body('study.fk_procedure')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('The fk_procedure parameter is not a valid MongoDB ID.'),

    body('study.snomed')
        .optional()
        .trim()
        .isLength({ min: 3, max: 40 })
        .withMessage('The SNOMED code provided is too short or too long (min: 3, max: 40 [characters]).'),

    //Modality (code_value)
    body('study.modality')
        .optional()
        .trim()
        .isLength({ min: 2, max: 10 })
        .withMessage('The modality code value provided is too short or too long (min: 2, max: 10 [characters]).'),
    //----------------------------------------------------------------------------------------------------------------//

    body('annotations')
        .optional()
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('The annotations parameter provided is too short or too long (min: 10, max: 2000 [characters]).'),

    body('anamnesis')
        .optional()
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('The anamnesis parameter provided is too short or too long (min: 10, max: 1000 [characters]).'),

    body('indications')
        .optional()
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('The indications parameter provided is too short or too long (min: 10, max: 1000 [characters]).'),

    //----------------------------------------------------------------------------------------------------------------//
    // EXTRA:
    //----------------------------------------------------------------------------------------------------------------//
    body('extra.patient_id')
        .optional()
        .trim()
        .isLength({ min: 1, max: 60 })
        .withMessage('The extra.patient_id parameter provided is too short or too long (min: 1, max: 60 [characters]).'),
    
    body('extra.study_id')
        .optional()
        .trim()
        .isLength({ min: 1, max: 60 })
        .withMessage('The extra.study_id parameter provided is too short or too long (min: 1, max: 60 [characters]).'),

    body('extra.physician_id')
        .optional()
        .trim()
        .isLength({ min: 1, max: 60 })
        .withMessage('The extra.physician_id parameter provided is too short or too long (min: 1, max: 60 [characters]).'),

    body('extra.physician_name')
        .optional()
        .trim()
        .isLength({ min: 1, max: 60 })
        .withMessage('The extra.physician_name parameter provided is too short or too long (min: 1, max: 60 [characters]).')
        .toUpperCase(),

    body('extra.physician_prof_id')
        .optional()
        .trim()
        .isLength({ min: 1, max: 60 })
        .withMessage('The extra.physician_prof_id parameter provided is too short or too long (min: 1, max: 60 [characters]).'),

    body('extra.physician_contact')
        .optional()
        .trim()
        .isLength({ min: 1, max: 60 })
        .withMessage('The extra.physician_contact parameter provided is too short or too long (min: 1, max: 60 [characters]).'),

    body('extra.requesting_id')
        .optional()
        .trim()
        .isLength({ min: 1, max: 60 })
        .withMessage('The extra.requesting_id parameter provided is too short or too long (min: 1, max: 60 [characters]).'),

    body('extra.custom_fields').optional().isArray(),

    body('extra.custom_fields.*')
        .trim()
        .isLength({ min: 1, max: 60 })
        .withMessage('The extra.custom_fields parameter provided is too short or too long (min: 1, max: 60 [characters]).')
    //----------------------------------------------------------------------------------------------------------------//
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//
