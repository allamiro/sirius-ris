//--------------------------------------------------------------------------------------------------------------------//
// APPOINTMENTS SCHEMA:
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

//Define Referring Sub-Schema:
const subSchemaReferring = new mongoose.Schema({
    organization:   { type: mongoose.ObjectId, required: true },
    branch:         { type: mongoose.ObjectId },
    service:        { type: mongoose.ObjectId },
    fk_referring:   { type: mongoose.ObjectId }
},
{ _id : false });

//Define Reporting Sub-Schema:
const subSchemaReporting = new mongoose.Schema({
    organization:   { type: mongoose.ObjectId, required: true },
    branch:         { type: mongoose.ObjectId, required: true },
    service:        { type: mongoose.ObjectId, required: true },
    fk_reporting:   { type: [mongoose.ObjectId] } //Not required | all doctors with domain reporting.
},
{ _id : false });

//Define Media Sub-Schema:
const subSchemaMedia = new mongoose.Schema({
    CD:             { type: Boolean },
    DVD:            { type: Boolean },
    acetate_sheets: { type: Boolean },
},
{ _id : false });

//Define Contrast Sub-Schema:
const subSchemaContrast = new mongoose.Schema({
    use_contrast:   { type: Boolean, required: true },
    description:    { type: String }
},
{ _id : false });

//Define Address Sub-Schema:
const subSchemaAddress = new mongoose.Schema({
    country:        { type: String },
    state:          { type: String },
    city:           { type: String },
    neighborhood:   { type: String },
    address:        { type: String }
},
{ _id : false });

//Define Implants Sub-Schema:
const subSchemaImplants = new mongoose.Schema({
    cochlear_implant:   { type: Boolean, required: true, default: false },
    cardiac_stent:      { type: Boolean, required: true, default: false },
    metal_prostheses:   { type: Boolean, required: true, default: false },
    metal_shards:       { type: Boolean, required: true, default: false },
    pacemaker:          { type: Boolean, required: true, default: false },
    other:              { type: String, default: 'No' },
},
{ _id : false });

//Define COVID-19 Sub-Schema:
const subSchemaCOVID19 = new mongoose.Schema({
    had_covid:          { type: Boolean, required: true, default: false },
    vaccinated:         { type: Boolean, required: true, default: false },
    details:            { type: String },
},
{ _id : false });

//Define PrivateHealth Sub-Schema:
const subSchemaPrivateHealth = new mongoose.Schema({
    height:                 { type: Number, required: true },
    weight:                 { type: Number, required: true },
    diabetes:               { type: Boolean, required: true, default: false },
    hypertension:           { type: Boolean, required: true, default: false },
    epoc:                   { type: Boolean, required: true, default: false },
    smoking:                { type: Boolean, required: true, default: false },
    malnutrition:           { type: Boolean, required: true, default: false },
    obesity:                { type: Boolean, required: true, default: false },
    hiv:                    { type: Boolean, required: true, default: false },
    renal_insufficiency:    { type: Boolean, required: true, default: false },
    heart_failure:          { type: Boolean, required: true, default: false },
    ischemic_heart_disease: { type: Boolean, required: true, default: false },
    valvulopathy:           { type: Boolean, required: true, default: false },
    arrhythmia:             { type: Boolean, required: true, default: false },
    cancer:                 { type: Boolean, required: true, default: false },
    dementia:               { type: Boolean, required: true, default: false },
    claustrophobia:         { type: Boolean, required: true, default: false },
    asthma:                 { type: Boolean, required: true, default: false },
    hyperthyroidism:        { type: Boolean, required: true, default: false },
    hypothyroidism:         { type: Boolean, required: true, default: false },
    pregnancy:              { type: Boolean, required: true, default: false },
    medication:             { type: String, default: 'No' },
    allergies:              { type: String, default: 'No' },
    other:                  { type: String, default: 'No' },
    implants:               { type: subSchemaImplants, required: true },
    covid19:                { type: subSchemaCOVID19, required: true }
},
{ _id : false });

//Define Consents Sub-Schema:
const subSchemaConsents = new mongoose.Schema({
    informed_consent:   { type: mongoose.ObjectId },
    clinical_trial:     { type: mongoose.ObjectId }
},
{ _id : false });

//Define Inpatient Sub-Schema:
const subSchemaInpatient = new mongoose.Schema({
    type:           { type: Number },
    where:          { type: String },
    room:           { type: String },
    contact:        { type: String }
},
{ _id : false });

//Define Schema:
const Schema = new mongoose.Schema({
    fk_appointment_request: { type: mongoose.ObjectId },
    imaging:                { type: subSchemaImaging, required: true },
    referring:              { type: subSchemaReferring, required: true },
    reporting:              { type: subSchemaReporting, required: true },
    fk_patient:             { type: mongoose.ObjectId, required: true },
    contact:                { type: String, required: true },
    start:                  { type: Date, required: true },
    end:                    { type: Date, required: true },
    flow_state:             { type: String, required: true },
    fk_slot:                { type: mongoose.ObjectId, required: true },
    fk_procedure:           { type: mongoose.ObjectId, required: true },
    extra_procedures:       { type: [mongoose.ObjectId] },
    urgency:                { type: Boolean, required: true },
    study_iuid:             { type: String, match: /^([0-9].([0-9]){2}.([0-9]){3}.[0-9].([0-9]){8}.([0-9]){5}.([0-9]){14})/gm },
    accession_number:       { type: String, unique: true },     // Moment of creation of the study_iuid.
    accession_date:         { type: String },                   // Last shipment date to MWL.
    anamnesis:              { type: String },   
    indications:            { type: String },
    report_before:          { type: Date, required: true },
    media:                  { type: subSchemaMedia },
    contrast:               { type: subSchemaContrast, required: true },
    current_address:        { type: subSchemaAddress },
    private_health:         { type: subSchemaPrivateHealth, required: true },
    consents:               { type: subSchemaConsents },
    outpatient:             { type: Boolean, required: true },
    inpatient:              { type: subSchemaInpatient },
    attached_files:         { type: [mongoose.ObjectId] },
    cancellation_reasons:   { type: Number },
    status:                 { type: Boolean, required: true, default: false },
    overbooking:            { type: Boolean }
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('appointments', Schema, 'appointments');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_appointment',
    Plural      : 'fk_appointments'
};

//Register allowed unset values:
const AllowedUnsetValues = ['fk_appointment_request', 'extra_procedures', 'media', 'consents', 'attached_files', 'inpatient', 'cancellation_reasons'];
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

    body('referring.service')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('The referring.service parameter is not a valid MongoDB ID.'),

    body('referring.fk_referring')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('The fk_referring parameter is not a valid MongoDB ID.'),
    //----------------------------------------------------------------------------------------------------------------//

    //----------------------------------------------------------------------------------------------------------------//
    // REPORTING:
    //----------------------------------------------------------------------------------------------------------------//
    body('reporting.organization')
        .trim()
        .isMongoId()
        .withMessage('The reporting.organization parameter is not a valid MongoDB ID.'),
    
    body('reporting.branch')
        .trim()
        .isMongoId()
        .withMessage('The reporting.branch parameter is not a valid MongoDB ID.'),

    body('reporting.service')
        .trim()
        .isMongoId()
        .withMessage('The reporting.service parameter is not a valid MongoDB ID.'),

    body('reporting.fk_reporting')
        .optional()
        .isArray(),

    body('reporting.fk_reporting.*')
        .trim()
        .isMongoId()
        .withMessage('The fk_reporting parameter is not a valid MongoDB ID.'),
    //----------------------------------------------------------------------------------------------------------------//
    
    body('fk_patient')
        .trim()
        .isMongoId()
        .withMessage('The fk_patient parameter is not a valid MongoDB ID.'),

    body('start').trim(),

    body('end').trim(),

    body('flow_state')
        .trim()
        .isLength({ min: 3, max: 3 })
        .withMessage('The flow_state parameter provided is too short or too long (min: 3, max: 3 [characters]).'),

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

    body('study_iuid')
        .optional()
        .trim()
        .isLength({ min: 3, max: 64 })
        .withMessage('The generated study_iuid parameter is too short or too long (min: 3, max: 64 [characters]).'),

    body('accession_number')
        .optional(),

    body('accession_date')
        .optional(),

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

    body('report_before').trim(),

    //----------------------------------------------------------------------------------------------------------------//
    // MEDIA:
    //----------------------------------------------------------------------------------------------------------------//
    body('media').optional(),

    body('media.CD')
        .optional()
        .trim()
        .isBoolean()
        .withMessage('The media.CD value provided is not boolean (true or false).')
        .toBoolean(),

    body('media.DVD')
        .optional()
        .trim()
        .isBoolean()
        .withMessage('The media.DVD value provided is not boolean (true or false).')
        .toBoolean(),

    body('media.acetate_sheets')
        .optional()
        .trim()
        .isBoolean()
        .withMessage('The media.acetate_sheets value provided is not boolean (true or false).')
        .toBoolean(),
    //----------------------------------------------------------------------------------------------------------------//

    body('contrast.use_contrast')
        .trim()
        .isBoolean()
        .withMessage('The contrast.use_contrast parameter provided is not boolean (true or false).')
        .toBoolean(),

    //----------------------------------------------------------------------------------------------------------------//
    // CURRENT ADDRESS:
    //----------------------------------------------------------------------------------------------------------------//
    body('current_address.country')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The current_address.country parameter provided is too short or too long (min: 3, max: 30 [characters]).')
        .toUpperCase(),

    body('current_address.state')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The current_address.state parameter provided is too short or too long (min: 3, max: 30 [characters]).')
        .toUpperCase(),

    body('current_address.city')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The current_address.city parameter provided is too short or too long (min: 3, max: 30 [characters]).')
        .toUpperCase(),

    body('current_address.neighborhood')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The current_address.neighborhood parameter provided is too short or too long (min: 3, max: 30 [characters]).')
        .toUpperCase(),

    body('current_address.address')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The current_address.address parameter provided is too short or too long (min: 3, max: 30 [characters]).')
        .toUpperCase(),
    //----------------------------------------------------------------------------------------------------------------//

    //----------------------------------------------------------------------------------------------------------------//
    // PRIVATE HEALTH:
    //----------------------------------------------------------------------------------------------------------------//
    body('private_health.height')
        .trim()
        .isDecimal()
        .withMessage('The height parameter is required and must be numeric (decimal).'),

    body('private_health.weight')
        .trim()
        .isDecimal()
        .withMessage('The weight parameter is required and must be numeric (decimal).'),

    body('private_health.diabetes')
        .trim()
        .isBoolean()
        .withMessage('The private_health.diabetes parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.hypertension')
        .trim()
        .isBoolean()
        .withMessage('The private_health.hypertension parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.epoc')
        .trim()
        .isBoolean()
        .withMessage('The private_health.epoc parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.smoking')
        .trim()
        .isBoolean()
        .withMessage('The private_health.smoking parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.malnutrition')
        .trim()
        .isBoolean()
        .withMessage('The private_health.malnutrition parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.obesity')
        .trim()
        .isBoolean()
        .withMessage('The private_health.obesity parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.hiv')
        .trim()
        .isBoolean()
        .withMessage('The private_health.hiv parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.renal_insufficiency')
        .trim()
        .isBoolean()
        .withMessage('The private_health.renal_insufficiency parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.heart_failure')
        .trim()
        .isBoolean()
        .withMessage('The private_health.heart_failure parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.ischemic_heart_disease')
        .trim()
        .isBoolean()
        .withMessage('The private_health.ischemic_heart_disease parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.valvulopathy')
        .trim()
        .isBoolean()
        .withMessage('The private_health.valvulopathy parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.arrhythmia')
        .trim()
        .isBoolean()
        .withMessage('The private_health.arrhythmia parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.cancer')
        .trim()
        .isBoolean()
        .withMessage('The private_health.cancer parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.dementia')
        .trim()
        .isBoolean()
        .withMessage('The private_health.dementia parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.claustrophobia')
        .trim()
        .isBoolean()
        .withMessage('The private_health.claustrophobia parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.asthma')
        .trim()
        .isBoolean()
        .withMessage('The private_health.asthma parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.hyperthyroidism')
        .trim()
        .isBoolean()
        .withMessage('The private_health.hyperthyroidism parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.hypothyroidism')
        .trim()
        .isBoolean()
        .withMessage('The private_health.hypothyroidism parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.pregnancy')
        .trim()
        .isBoolean()
        .withMessage('The private_health.pregnancy parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.medication')
        .optional()
        .trim()
        .isLength({ min: 2, max: 1000 })
        .withMessage('The private_health.medication parameter provided is too short or too long (min: 2, max: 1000 [characters]).'),

    body('private_health.allergies')
        .optional()
        .trim()
        .isLength({ min: 3, max: 60 })
        .withMessage('The private_health.allergies parameter provided is too short or too long (min: 3, max: 60 [characters]).'),
    
    body('private_health.other')
        .optional()
        .trim()
        .isLength({ min: 3, max: 60 })
        .withMessage('The private_health.other parameter provided is too short or too long (min: 3, max: 60 [characters]).'),

    body('private_health.implants.cochlear_implant')
        .trim()
        .isBoolean()
        .withMessage('The private_health.implants.cochlear_implant parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.implants.cardiac_stent')
        .trim()
        .isBoolean()
        .withMessage('The private_health.implants.cardiac_stent parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.implants.metal_prostheses')
        .trim()
        .isBoolean()
        .withMessage('The private_health.implants.metal_prostheses parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.implants.metal_shards')
        .trim()
        .isBoolean()
        .withMessage('The private_health.implants.metal_shards parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.implants.pacemaker')
        .trim()
        .isBoolean()
        .withMessage('The private_health.implants.pacemaker parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.implants.other')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The private_health.implants.other parameter provided is too short or too long (min: 3, max: 30 [characters]).'),

    body('private_health.covid19.had_covid')
        .trim()
        .isBoolean()
        .withMessage('The private_health.covid19.had_covid parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.covid19.vaccinated')
        .trim()
        .isBoolean()
        .withMessage('The private_health.covid19.vaccinated parameter provided is not boolean (true or false).')
        .toBoolean(),

    body('private_health.covid19.details')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('The private_health.covid19.details parameter provided is too short or too long (min: 3, max: 100 [characters]).'),
    //----------------------------------------------------------------------------------------------------------------//

    //----------------------------------------------------------------------------------------------------------------//
    // CONSENTS:
    //----------------------------------------------------------------------------------------------------------------//
    body('consents')
        .optional(),

    body('consents.informed_consent')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('The consents.informed_consent parameter is not a valid MongoDB ID.'),

    body('consents.clinical_trial')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('The consents.clinical_trial parameter is not a valid MongoDB ID.'),
    //----------------------------------------------------------------------------------------------------------------//

    body('outpatient')
        .trim()
        .isBoolean()
        .withMessage('The outpatient parameter provided is not boolean (true or false).')
        .toBoolean(),

    //----------------------------------------------------------------------------------------------------------------//
    // INPATIENT:
    //----------------------------------------------------------------------------------------------------------------//
    body('inpatient.where')
        .optional()
        .trim()
        .isLength({ min: 3, max: 40 })
        .withMessage('The inpatient.where parameter provided is too short or too long (min: 3, max: 40 [characters]).'),

    body('inpatient.room')
        .optional()
        .trim()
        .isLength({ min: 3, max: 40 })
        .withMessage('The inpatient.room parameter provided is too short or too long (min: 3, max: 40 [characters]).'),

    body('inpatient.contact')
        .optional()
        .trim()
        .isLength({ min: 3, max: 40 })
        .withMessage('The inpatient.contact parameter provided is too short or too long (min: 3, max: 40 [characters]).'),
    //----------------------------------------------------------------------------------------------------------------//

    body('attached_files')
        .optional()
        .isArray()
        .withMessage('The attached_files parameter must be an array.'),

    body('attached_files.*')
        .trim()
        .isMongoId()
        .withMessage('The attached_files.* parameter is not a valid MongoDB ID.'),

    body('cancellation_reasons')
        .optional()
        .trim()
        .isInt()
        .withMessage('The cancellation_reasons parameter must be numeric.'),
    
    body('status')
        .trim()
        .isBoolean()
        .withMessage('The status provided is not boolean (true or false).')
        .toBoolean(),

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