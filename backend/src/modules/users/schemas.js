//--------------------------------------------------------------------------------------------------------------------//
// USERS SCHEMAS:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');
const middlewares   = require('../../main.middlewares');

//Define Privileges Sub-Schema:
const subSchemaPermissions = new mongoose.Schema({
    organization:   { type: mongoose.ObjectId },
    branch:         { type: mongoose.ObjectId },
    service:        { type: mongoose.ObjectId },
    role:           { type: Number, required: true },
    concession:     { type: [Number] }
},
{ _id : false });

//Define Professional Sub-Schema:
const subSchemaProfessional = new mongoose.Schema({
    id:             { type: String },
    description:    { type: String },
    workload:       { type: Number }, //In weekly hours.
    vacation:       { type: Boolean }
},
{ _id : false });

//Define Settings Sub-Schema:
const subSchemaSettings = new mongoose.Schema({
    max_row:        { type: Number },
    viewer:         { type: String },
    language:       { type: String },
    theme:          { type: String }
},
{ _id : false });

//Define Pre-Schema:
const preSchema = new mongoose.Schema({
    fk_person:          { type: mongoose.ObjectId },    // Human user
    username:           { type: String },               // Machine user
    password:           { type: String, required: true },
    email:              { type: String, match: /.+\@.+\..+/ },  // Required only in frontend (Human user).
    permissions:        { type: [subSchemaPermissions], required: true },
    professional:       { type: subSchemaProfessional },
    settings:           { type: subSchemaSettings },
    status:             { type: Boolean, required: true, default: false },
},
{ timestamps: true },
{ versionKey: false });

//Indicate that the schema has a password (to be encrypted):
Schema = middlewares.isPassword(preSchema, 'password');

//Define model:
const Model = mongoose.model('users', Schema, 'users');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_user',
    Plural      : 'fk_users',
    Patient     : 'fk_patient',
    Referring   : 'fk_referring',
    Reporting   : 'fk_reporting',
    Injection   : 'injection_user',
    Laboratory  : 'laboratory_user',
    Console     : 'console_technician'
};

//Register allowed unset values:
const AllowedUnsetValues = ['email', 'professional.id', 'professional.description', 'professional.workload', 'professional.vacation'];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
// VALIDATION RULES (EXPRESS-VALIDATOR):
//--------------------------------------------------------------------------------------------------------------------//
const Validator = [
    body('fk_person')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('The fk_person parameter is NOT a valid MongoDB ID.'),

    body('username')
        .optional()
        .trim(),
    
    body('password')
        .trim()
        .isLength(8)
        .withMessage('The password is too short (minimum length: 8 characters).'),

    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('The provided value is NOT a valid email address.')
        .normalizeEmail({ gmail_remove_dots: false })
        .toLowerCase(),
        
    body('permissions')
        .isArray()
        .withMessage('The permissions parameter is required.'),

    body('permissions.*.organization')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('The organization parameter is NOT a valid MongoDB ID.'),

    body('permissions.*.service')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('The service parameter is NOT a valid MongoDB ID.'),

    body('permissions.*.branch')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('The branch parameter is NOT a valid MongoDB ID.'),

    body('permissions.*.role')
        .trim()
        .isInt()
        .withMessage('The role parameter is required and must be numeric.'),

    body('permissions.*.concession').optional().isArray(),

    body('professional').optional(),

    body('professional.id')
        .optional()
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('The ID parameter is too short or too long (min: 3, max: 30 characters).'),

    body('professional.description')
        .optional()
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('The description parameter is too short or too long (min: 3, max: 50 characters).'),

    body('professional.workload')
        .optional()
        .trim()
        .isInt()
        .withMessage('The workload parameter must be numeric.'),

    body('professional.vacation')
        .optional()
        .trim()
        .isBoolean()
        .withMessage('The vacation parameter is not boolean (true or false).')
        .toBoolean(),

    body('settings').optional().isArray(),

    body('settings.max_row')
        .optional()
        .trim()
        .isInt()
        .withMessage('The max_row parameter is required and must be numeric.'),

    body('settings.viewer')
        .optional()
        .trim()
        .isLength({ min: 3, max: 10 })
        .withMessage('The viewer parameter is too short or too long (min: 3, max: 10 characters).'),

    body('settings.language')
        .optional()
        .trim()
        .isLength({ min: 3, max: 5 })
        .withMessage('The language parameter is too short or too long (min: 3, max: 5 characters).'),

    body('settings.theme')
        .optional()
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage('The theme parameter is too short or too long (min: 3, max: 20 characters).'),

    body('status')
        .trim()
        .isBoolean()
        .withMessage('The status parameter is not boolean (true or false).')
        .toBoolean()
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//