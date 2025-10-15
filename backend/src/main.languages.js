//--------------------------------------------------------------------------------------------------------------------//
// LANGUAGE MODULE:
// This module establishing the response messages for each language.
//--------------------------------------------------------------------------------------------------------------------//
module.exports = function(language){
    
    //Initialize translate object (English - Default):
    const lang = {
        'server': {
            'db_cnx_error'          : 'Failed to establish connection with MongoDB to: ',
            'db_cnx_success'        : 'Established connection with MongoDB to: ',
            'db_cnx_check_error'    : 'Failed to establish connection with MongoDB.',
            'start'                 : 'Sirius RIS Backend has started',
            'non_server'            : 'The server type was not specified in the settings file (http_enabled, https_enabled). ',
            'undefined_settings'    : 'An error occurred while trying to read the settings.yaml file.'
        },
        'auth': {
            'password_match'        : 'Passwords match.',
            'password_dont_match'   : 'Passwords dont match.',
            'password_empty'        : 'Password field cannot be empty.',
            'password_error'        : 'Error during password verification, it may be that the content of the hash saved in the database does not correspond to the encryption algorithm used.',
            'signin_success'        : 'Successful authentication.',
            'user_disabled'         : 'The user account entered is disabled.',
            'wrong_user'            : 'The entered user is NOT found in the database.',
            'wrong_role_domain'     : 'The indicated domain and/or role are not assigned to the user.'
        },
        'jwt': {
            'sign_error'            : 'An error occurred during the JWT generation.',
            'check_empty_token'     : 'The authentication token is required.',
            'check_invalid_token'   : 'Invalid token.'
        },
        'db': {
            'invalid_id'                : 'The specified ID is NOT valid for MongoDB.',
            'query_error'               : 'Error during query to MongoDB.',
            'query_no_data'             : 'No records was found.',
            'validate_error'            : 'Validation error.',
            'insert_success'            : 'Insert operation successful.',
            'insert_error'              : 'An error occurred while inserting the element.',
            'insert_error_log'          : 'Error trying to insert element log entry.',
            'insert_duplicate'          : 'The element you are trying to insert already exists in the database with the _id: ',
            'id_no_results'             : 'The specified ID does not exist.',
            'id_referenced_empty'       : 'The ID of the referenced element cannot be empty.',
            'update_error'              : 'An error occurred while updating the element.',
            'update_duplicate'          : 'The element you are trying to update already exists in the database with the _id: ',
            'delete_error'              : 'An error occurred while deleting the element.',
            'delete_success'            : 'Successfully deleted.',
            'delete_id_no_results'      : 'No record was found to delete with the specified ID.',
            'delete_rejected_dep'       : 'Deletion rejected, there are dependencies of the element to be deleted.',
            'delete_empty_id'           : 'You must specify at least one _id for delete.',
            'not_valid_fk'              : 'Any of the elements referenced as foreign is NOT valid',
            'not_valid_objectid'        : 'Some of the referenced elements have an ObjectId that is NOT valid.',
            'not_allowed_save'          : 'Save operation NOT allowed.',
            'delete_temp_file_uploads'  : 'Successful temporary file deletion (upload files).'
        },
        http: {
            'sancioned'             : 'SANCIONED CLIENTS!',
            'sancioned_msj'         : 'You have made too many signin attempts within the allowed time.',
            'bad_request'           : 'Bad request.',
            'pager_disabled'        : 'Pager is disabled'
        },
        rabc: {
            'operation_deny_domain'         : 'The operation you are trying to perform is not allowed for the domain that owns your authentication.',
            'not_have_method_permissions'   : 'The user does not have the necessary permissions on the method: ',
            'not_have_schema_permissions'   : 'The user does not have the necessary permissions on the schema: ',
            'exclude_code'                  : 'Domain condition was avoided from RABC by exclusion policy (rabc_exclude_code was applied)'
        },
        ris: {
            'operation_not_allowed'         : 'Operation NOT allowed, the domain indicated from the JWT does NOT allow the desired operation.',
            'empty_domain_JWT'              : 'To check for a domain reference, the filter parameter can NOT be empty.',
            'duplicated_person'             : 'The person you are trying to insert already exists in the database.',
            'same_document'                 : 'Unable to update entered information. There is already another person with the same document in the database.',
            'unavailable_slot'              : 'The indicated start and/or end is not available in the slot. Used by the appointment _id: ',
            'wrong_date_format_slot'        : 'The format of the start and/or end datetime is wrong.',
            'batch_processed'               : 'Batch processed successfully.',
            'only_urgency_slot'             : 'The appointment cannot be coordinated on an urgency slot unless it is an urgencies.',
            'study_iuid_error'              : 'There was some problem trying to generate the Study IUID: ',
            'mwl_success'                   : 'Submitted to MWL successfully.',
            'mwl_error'                     : 'An error occurred while sending an element to the MWL (MLLP).',
            'wrong_performing_flow_state'   : 'The performing of the study is not in a flow state to be informed.',
            'wrong_report_flow_state'       : 'The performing of the study is not in a flow state to be signed.',
            'wrong_report_id'               : 'No report found with the specified _id.',
            'report_auth_error'             : 'The performing of the study is not in a flow state to be authenticate.',
            'report_auth_success'           : 'Report authenticated successfully.',
            'report_without_signatures'     : 'The report you want to authenticate is not signed.',
            'report_signed'                 : 'The report you are trying to sign is already signed by the indicated user.',
            'report_create_error'           : 'An error occurred during the creation of the PDF report.',
            'report_authenticated'          : 'Report successfully authenticated.',
            'mail_send_success'             : 'Mail sent successfully.',
            'mail_send_error'               : 'Error trying to send mail.',
            'mail_wrong_address'            : 'The email address indicated is incorrect.',
            'mail_empty_subject'            : 'The subject parameter cannot be empty.',
            'mail_empty_message'            : 'The message cannot be empty.',
            'mail_wrong_file'               : 'The specified filename or base64 is wrong.',
            'missing_information_log'       : 'Missing information for log record.',
            'procedure_not_found'           : 'Procedure not found with the specified _id.',
            'modalitiy_not_found'           : 'Modalitiy not found with the specified code value.',
            'flow_state_error'              : 'Error updating request flow state.',
            'validate' : {
                'delete_code_required'      : 'To remove an item you must specify the valid delete code.',
                'same_dates'                : 'The start date and the end date must be the same.',
                'start_date_lte_end_date'   : 'The start date must be less than the end date.',
                'start_time_lte_end_time'   : 'The start time must be less than the end time.',
                'weekday_boolean'           : 'The day of the week must be boolean [true, false].',
                'weekday_required'          : 'At least one day of the week must be true to apply the date range.',
                'time_format'               : 'The start or end time format is incorrect [Supported format: HH:MM (24h)].',
                'urgency_boolean'           : 'The urgency parameter must be boolean [true, false].',
                'valid_permission'          : 'You must enter at least one valid permission to the user.',
                'fk_slot_required'          : 'The fk_slot parameter must be specified (it is required for the operation).',
                'pet_coef_required'         : 'PET-CT procedures require coefficient for the calculation of the dose.',
                'pet_coef_NaN'              : 'The coefficient entered must be numeric.',
                'service_invalid_ObjectId'  : 'The service parameter is not a valid ObjectId.',
                'role_NaN'                  : 'The role parameter is NOT a numeric value or is NOT within the valid role numbers.',
                'invalid_role_in_report'    : 'The role_in_report parameter only allows the following values: [ sign | authenticator ].'
            }
        }

    };

    //Set translations according to the requested language: 
    switch (language) {
        case 'ES':
            //Server:
            lang.server.db_cnx_error            = 'Error while trying to connect to MongoDB at: ';
            lang.server.db_cnx_success          = 'Successful connection to MongoDB at: ';
            lang.server.db_cnx_check_error      = 'Error while trying to establish the MongoDB connection.';
            lang.server.start                   = 'Sirius RIS Backend has started';
            lang.server.non_server              = 'No server type was configured in the settings file (http_enabled, https_enabled).';
            lang.server.undefined_settings      = 'An error occurred while trying to read the settings.yaml file.'

            //Auth:
            lang.auth.password_match            = 'Password is correct.';
            lang.auth.password_dont_match       = 'The password does NOT match.';
            lang.auth.password_empty            = 'The password cannot be empty.';
            lang.auth.password_error            = 'Error during password verification; the stored hash may not match the encryption algorithm used.';
            lang.auth.signin_success            = 'Successful authentication.';
            lang.auth.user_disabled             = 'The entered user account is disabled.';
            lang.auth.wrong_user                = 'The entered user does NOT exist in the database.';
            lang.auth.wrong_role_domain         = 'The specified domain and/or role are not assigned to the user.';

            //JWT:
            lang.jwt.sign_error                 = 'An error occurred while generating the JWT.';
            lang.jwt.check_empty_token          = 'An authentication token is required.';
            lang.jwt.check_invalid_token        = 'The token is not valid.';

            //Database:
            lang.db.invalid_id                  = 'The specified ID is NOT valid for MongoDB.';
            lang.db.query_error                 = 'Error while querying the MongoDB server.';
            lang.db.query_no_data               = 'No records were found.';
            lang.db.validate_error              = 'Validation error.';
            lang.db.insert_success              = 'Saved successfully.';
            lang.db.insert_error                = 'Error while trying to insert the element.';
            lang.db.insert_error_log            = 'Error while trying to insert the element log entry.';
            lang.db.insert_duplicate            = 'The element you are trying to insert already exists in the database with the _id: ';
            lang.db.id_no_results               = 'No element exists with the specified ID';
            lang.db.id_referenced_empty         = 'The referenced element ID cannot be empty.';
            lang.db.update_error                = 'Error while trying to update the element.';
            lang.db.update_duplicate            = 'The element you are trying to update already exists in the database with the _id: ';
            lang.db.delete_error                = 'Error while trying to delete the element.';
            lang.db.delete_success              = 'Deletion successful.';
            lang.db.delete_id_no_results        = 'No record was found to delete with the specified ID.';
            lang.db.delete_rejected_dep         = 'Deletion rejected; there are dependencies on the element to be deleted.';
            lang.db.delete_empty_id             = 'You must specify at least one _id to delete.';
            lang.db.not_valid_fk                = 'One of the referenced foreign elements is NOT valid.';
            lang.db.not_valid_objectid          = 'One of the referenced elements has an ObjectId that is NOT valid.';
            lang.db.not_allowed_save            = 'Save operation NOT allowed.';
            lang.db.delete_temp_file_uploads    = 'Temporary file deleted successfully (upload files).';

            //HTTP:
            lang.http.sancioned                 = 'SANCTIONED CLIENTS!';
            lang.http.sancioned_msj             = 'Too many sign-in attempts were made within the allowed time.';
            lang.http.bad_request               = 'The submitted request is incorrect.';
            lang.http.pager_disabled            = 'Paging disabled.';

            //RABC:
            lang.rabc.operation_deny_domain         = 'The operation you are trying to perform is not allowed for the domain associated with your authentication.';
            lang.rabc.not_have_method_permissions   = 'The user does not have the necessary permissions for the method: ';
            lang.rabc.not_have_schema_permissions   = 'The user does not have the necessary permissions for the schema: ';
            lang.rabc.exclude_code                  = 'The domain condition was skipped in RABC due to an exclusion policy (rabc_exclude_code was applied).';

            //RIS:
            lang.ris.operation_not_allowed          = 'Operation NOT allowed; the domain indicated in the JWT does NOT allow the desired action.';
            lang.ris.empty_domain_JWT               = 'To verify a domain reference, the filter parameter cannot be empty.';
            lang.ris.duplicated_person              = 'The person you are trying to add already exists in the database.';
            lang.ris.same_document                  = 'The entered information cannot be updated. Another person with the same document already exists in the database.';
            lang.ris.unavailable_slot               = 'The specified start and/or end are not available in the slot. Used by appointment _id: ';
            lang.ris.wrong_date_format_slot         = 'The start and/or end date format is NOT correct.';
            lang.ris.batch_processed                = 'Batch processed successfully.';
            lang.ris.only_urgency_slot              = 'The appointment cannot be scheduled on an emergency slot unless it is an emergency.';
            lang.ris.study_iuid_error               = 'There was a problem while trying to generate the Study IUID: ';
            lang.ris.mwl_success                    = 'Successfully sent to the MWL.';
            lang.ris.mwl_error                      = 'An error occurred while sending an element to the MWL (MLLP).';
            lang.ris.wrong_performing_flow_state    = 'The study is not in a performing state that allows it to be informed.';
            lang.ris.wrong_report_flow_state        = 'The study is not in a performing state that allows it to be signed.';
            lang.ris.wrong_report_id                = 'No report was found with the specified _id.';
            lang.ris.report_auth_error              = 'The study is not in a performing state that allows it to be authenticated.';
            lang.ris.report_auth_success            = 'Report authenticated successfully.';
            lang.ris.report_without_signatures      = 'The report you want to authenticate is not signed.';
            lang.ris.report_signed                  = 'The report you are trying to sign is already signed by the specified user.';
            lang.ris.report_create_error            = 'An error occurred while creating the PDF report.';
            lang.ris.report_authenticated           = 'Report authenticated successfully.';
            lang.ris.mail_send_success              = 'Email sent successfully.';
            lang.ris.mail_send_error                = 'Error while trying to send the email.';
            lang.ris.mail_wrong_address             = 'The provided email address is incorrect.';
            lang.ris.mail_empty_subject             = 'The subject parameter cannot be empty.';
            lang.ris.mail_empty_message             = 'The message cannot be empty.';
            lang.ris.mail_wrong_file                = 'The specified file name or base64 value is incorrect.';
            lang.ris.missing_information_log        = 'Information is missing to log the record.';
            lang.ris.procedure_not_found            = 'No procedure was found with the specified _id.';
            lang.ris.modalitiy_not_found            = 'No modality was found with the specified code value.';
            lang.ris.flow_state_error               = 'Error while updating the request flow state.';

            //RIS - Validate:
            lang.ris.validate.delete_code_required      = 'To delete an element you must specify the valid deletion code.';
            lang.ris.validate.same_dates                = 'The start date and the end date must be the same.';
            lang.ris.validate.start_date_lte_end_date   = 'The start date must be earlier than the end date.';
            lang.ris.validate.start_time_lte_end_time   = 'The start time must be earlier than the end time.';
            lang.ris.validate.weekday_boolean           = 'The day of the week must be boolean [true, false].';
            lang.ris.validate.weekday_required          = 'At least one weekday must be true to apply the date range.';
            lang.ris.validate.time_format               = 'The start or end time format is incorrect [Allowed format: HH:MM (24h)].';
            lang.ris.validate.urgency_boolean           = 'The urgency parameter must be boolean [true, false].';
            lang.ris.validate.valid_permission          = 'You must assign at least one valid permission to the user.';
            lang.ris.validate.fk_slot_required          = 'The fk_slot parameter must be specified (it is required for the operation).';
            lang.ris.validate.pet_coef_required         = 'PET-CT procedures require a coefficient to calculate the dose.';
            lang.ris.validate.pet_coef_NaN              = 'The entered coefficient must be numeric.';
            lang.ris.validate.service_invalid_ObjectId  = 'The service parameter is not a valid ObjectId.';
            lang.ris.validate.role_NaN                  = 'The role parameter is NOT a numeric value or is NOT within the valid role numbers.';
            lang.ris.validate.invalid_role_in_report    = 'The role_in_report parameter only accepts the following values: [ signer | authenticator ].';

            break;
    }

    //Return translate object:
    return lang;
}
//--------------------------------------------------------------------------------------------------------------------//