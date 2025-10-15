//--------------------------------------------------------------------------------------------------------------------//
// SLOTS SCHEMA:
//--------------------------------------------------------------------------------------------------------------------//
//Import modules:
const mongoose      = require('mongoose');
const { body }      = require('express-validator');

//Define Domain Sub-Schema:
const subSchemaDomain = new mongoose.Schema({
    organization:   { type: mongoose.ObjectId, required: true },
    branch:         { type: mongoose.ObjectId, required: true },
    service:        { type: mongoose.ObjectId, required: true },
},
{ _id : false });

//Define Schema:
const Schema = new mongoose.Schema({
    domain:         { type: subSchemaDomain, required: true },
    fk_equipment:   { type: mongoose.ObjectId, required: true },
    fk_procedure:   { type: mongoose.ObjectId },
    start:          { type: Date, required: true },
    end:            { type: Date, required: true },
    urgency:        { type: Boolean, required: true, default: false },
},
{ timestamps: true },
{ versionKey: false });

//Define model:
const Model = mongoose.model('slots', Schema, 'slots');  //Specify collection name to prevent Mongoose pluralize.

//Add fk names (Sirius RIS logic):
const ForeignKeys = {
    Singular    : 'fk_slot',
    Plural      : 'fk_slots'
};

//Register allowed unset values:
const AllowedUnsetValues = ['fk_procedure'];
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

    body('domain.service')
        .trim()
        .isMongoId()
        .withMessage('The domain.service parameter is not a valid MongoDB ID.'),

    body('fk_equipment')
        .trim()
        .isMongoId()
        .withMessage('The fk_equipment parameter is not a valid MongoDB ID.'),

    body('fk_procedure')
        .optional()
        .trim()
        .isMongoId()
        .withMessage('The fk_procedure parameter is not a valid MongoDB ID.'),

    body('start').trim(),

    body('end').trim(),

    body('urgency')
        .trim()
        .isBoolean()
        .withMessage('The urgency parameter provided is not boolean (true or false).')
        .toBoolean()
];
//--------------------------------------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------------------------------------//
//Export Shcema, Model and Validation Rules:
module.exports = { Schema, Model, Validator, ForeignKeys, AllowedUnsetValues };
//--------------------------------------------------------------------------------------------------------------------//