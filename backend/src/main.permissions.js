//--------------------------------------------------------------------------------------------------------------------//
// MAIN PERMISSIONS - RABC RULES:
// This module establishes the rules that will be applied in the RABC middleware.
//--------------------------------------------------------------------------------------------------------------------//
//Set user role permissions:
const rolePermissions = {
    // Superuser:
    1: {
        people                  : ['find', 'findOne', 'insert', 'update', 'delete'],
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport', 'insert', 'update', 'delete', 'updateSettings'],            
        logs                    : ['find', 'findOne'],
        sessions                : ['find', 'findOne', 'delete'],
        modalities              : ['find', 'findOne', 'insert', 'update', 'delete'],
        organizations           : ['find', 'findOne', 'insert', 'update', 'delete'],
        branches                : ['find', 'findOne', 'insert', 'update', 'delete'],
        services                : ['find', 'findOne', 'insert', 'update', 'delete'],
        equipments              : ['find', 'findOne', 'insert', 'update', 'delete'],
        slots                   : ['find', 'findOne', 'insert', 'update', 'delete', 'batch/insert', 'batch/delete'],
        procedures              : ['find', 'findOne', 'insert', 'update', 'delete'],
        procedure_categories    : ['find', 'findOne', 'insert', 'update', 'delete', 'batch/delete'],
        files                   : ['find', 'findOne', 'insert', 'delete', 'batch/delete'],
        appointments            : ['find', 'findOne', 'insert', 'update', 'delete'],
        appointments_drafts     : ['find', 'findOne', 'insert', 'delete'],
        appointment_requests    : ['find', 'findOne', 'insert', 'update', 'delete'],
        mwl                     : ['insert'],
        pathologies             : ['find', 'findOne', 'insert', 'update', 'delete'],
        performing              : ['find', 'findOne', 'insert', 'update', 'delete'],
        reports                 : ['find', 'findOne', 'insert', 'update', 'delete', 'authenticate', 'setPathologies'],
        signatures              : ['find', 'findOne', 'insert', 'delete'],
        mail                    : ['send'],
        exporter                : ['reports'],
        wezen                   : ['studyToken'],
        stats                   : ['appointment_requests', 'appointments', 'performing', 'reports', 'organizations']
    },

    // Administrator:
    2: {
        people                  : ['find', 'findOne', 'insert', 'update'],
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport', 'insert', 'update', 'updateSettings'],
        logs                    : ['find', 'findOne'],
        sessions                : ['find', 'findOne'],
        modalities              : ['find', 'findOne'],
        organizations           : ['find', 'findOne'],
        branches                : ['find', 'findOne'],
        services                : ['find', 'findOne', 'insert', 'update'],
        equipments              : ['find', 'findOne'],
        slots                   : ['find', 'findOne', 'insert', 'update', 'delete', 'batch/insert', 'batch/delete'],
        procedures              : ['find', 'findOne', 'insert', 'update', 'delete'],
        procedure_categories    : ['find', 'findOne', 'insert', 'update', 'delete', 'batch/delete'],
        files                   : ['find', 'findOne', 'insert', 'delete', 'batch/delete'],
        appointments            : ['find', 'findOne', 'insert', 'update'],
        appointments_drafts     : ['find', 'findOne', 'insert', 'delete'],
        appointment_requests    : ['find', 'findOne', 'update', 'delete'],
        mwl                     : ['insert'],
        pathologies             : ['find', 'findOne', 'insert', 'update'],
        performing              : ['find', 'findOne', 'insert', 'update'],
        reports                 : ['find', 'findOne', 'insert', 'update', 'setPathologies'],
        signatures              : ['find', 'findOne'],
        mail                    : ['send'],
        exporter                : [],
        wezen                   : ['studyToken'],
        stats                   : ['appointment_requests', 'appointments', 'performing', 'reports', 'organizations']
    },

    // Supervisor:
    3: {
        people                  : ['find', 'findOne'],
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport', 'updateSettings'],
        logs                    : [],
        sessions                : [],
        modalities              : ['find', 'findOne'],
        organizations           : ['find', 'findOne'],
        branches                : ['find', 'findOne'],
        services                : ['find', 'findOne'],
        equipments              : ['find', 'findOne'],
        slots                   : ['find', 'findOne'],
        procedures              : ['find', 'findOne'],
        procedure_categories    : ['find', 'findOne'],
        files                   : ['find', 'findOne', 'insert', 'delete', 'batch/delete'],
        appointments            : ['find', 'findOne'],
        appointments_drafts     : [],
        appointment_requests    : ['find', 'findOne'],
        mwl                     : [],
        pathologies             : ['find', 'findOne'],
        performing              : ['find', 'findOne'],
        reports                 : ['find', 'findOne', 'insert', 'update', 'authenticate', 'setPathologies'],
        signatures              : ['find', 'findOne', 'insert'],
        mail                    : [],
        exporter                : [],
        wezen                   : ['studyToken'],
        stats                   : []
    },

    // Physician:
    4: {
        people                  : ['find', 'findOne'],
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport', 'updateSettings'],
        logs                    : [],
        sessions                : [],
        modalities              : ['find', 'findOne'],
        organizations           : ['find', 'findOne'],
        branches                : ['find', 'findOne'],
        services                : ['find', 'findOne'],
        equipments              : ['find', 'findOne'],
        slots                   : ['find', 'findOne'],
        procedures              : ['find', 'findOne'],
        procedure_categories    : ['find', 'findOne'],
        files                   : ['find', 'findOne', 'insert', 'delete', 'batch/delete'],
        appointments            : ['find', 'findOne'],
        appointments_drafts     : [],
        appointment_requests    : [],
        mwl                     : [],
        pathologies             : ['find', 'findOne'],
        performing              : ['find', 'findOne'],
        reports                 : ['find', 'findOne', 'insert', 'update', 'setPathologies'],
        signatures              : ['find', 'findOne'],
        mail                    : [],
        exporter                : [],
        wezen                   : ['studyToken'],
        stats                   : []
    },

    // Technician:
    5: {
        people                  : ['find', 'findOne'],
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport', 'updateSettings'],
        logs                    : [],
        sessions                : [],
        modalities              : ['find', 'findOne'],
        organizations           : ['find', 'findOne'],
        branches                : ['find', 'findOne'],
        services                : ['find', 'findOne'],
        equipments              : ['find', 'findOne'],
        slots                   : ['find', 'findOne'],
        procedures              : ['find', 'findOne'],
        procedure_categories    : ['find', 'findOne'],
        files                   : ['find', 'findOne', 'insert', 'delete', 'batch/delete'],
        appointments            : ['find', 'findOne', 'update'],
        appointments_drafts     : [],
        appointment_requests    : [],
        mwl                     : ['insert'],
        pathologies             : ['find', 'findOne'],
        performing              : ['find', 'findOne', 'update'],
        reports                 : [],
        signatures              : [],
        mail                    : [],
        exporter                : [],
        wezen                   : ['studyToken'],
        stats                   : []
    },

    // Nurse:
    6: {
        people                  : ['find', 'findOne'],
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport', 'updateSettings'],
        logs                    : [],
        sessions                : [],
        modalities              : ['find', 'findOne'],
        organizations           : ['find', 'findOne'],
        branches                : ['find', 'findOne'],
        services                : ['find', 'findOne'],
        equipments              : ['find', 'findOne'],
        slots                   : ['find', 'findOne'],
        procedures              : ['find', 'findOne'],
        procedure_categories    : ['find', 'findOne'],
        files                   : ['find', 'findOne', 'insert', 'delete', 'batch/delete'],
        appointments            : ['find', 'findOne', 'update'],
        appointments_drafts     : [],
        appointment_requests    : [],
        mwl                     : [],
        pathologies             : ['find', 'findOne'],
        performing              : ['find', 'findOne', 'update'],
        reports                 : [],
        signatures              : [],
        mail                    : [],
        exporter                : [],
        wezen                   : ['studyToken'],
        stats                   : []
    },

    // Coordinator:
    7: {
        people                  : ['find', 'findOne', 'insert', 'update'],
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport', 'insert', 'update', 'updateSettings'],
        logs                    : [],
        sessions                : [],
        modalities              : ['find', 'findOne'],
        organizations           : ['find', 'findOne'],
        branches                : ['find', 'findOne'],
        services                : ['find', 'findOne'],
        equipments              : ['find', 'findOne'],
        slots                   : ['find', 'findOne', 'insert', 'update', 'delete', 'batch/insert', 'batch/delete'],
        procedures              : ['find', 'findOne'],
        procedure_categories    : ['find', 'findOne'],
        files                   : ['find', 'findOne', 'insert', 'delete', 'batch/delete'],
        appointments            : ['find', 'findOne', 'insert', 'update'],
        appointments_drafts     : ['find', 'findOne', 'insert', 'delete'],
        appointment_requests    : ['find', 'findOne', 'update'],
        mwl                     : [],
        pathologies             : ['find', 'findOne'],
        performing              : ['find', 'findOne'],
        reports                 : [],
        signatures              : [],
        mail                    : ['send'],
        exporter                : [],
        wezen                   : [],
        stats                   : []
    },

    // Receptionist:
    8: {
        people                  : ['find', 'findOne'],
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport', 'updateSettings'],
        logs                    : [],
        sessions                : [],
        modalities              : ['find', 'findOne'],
        organizations           : ['find', 'findOne'],
        branches                : ['find', 'findOne'],
        services                : ['find', 'findOne'],
        equipments              : ['find', 'findOne'],
        slots                   : ['find', 'findOne'],
        procedures              : ['find', 'findOne'],
        procedure_categories    : ['find', 'findOne'],
        files                   : ['find', 'findOne', 'insert', 'delete', 'batch/delete'],
        appointments            : ['find', 'findOne', 'update'],
        appointments_drafts     : [],
        appointment_requests    : [],
        mwl                     : ['insert'],
        pathologies             : ['find', 'findOne'],
        performing              : ['find', 'findOne', 'insert', 'update'],
        reports                 : [],
        signatures              : [],
        mail                    : [],
        exporter                : [],
        wezen                   : [],
        stats                   : []
    },

    // Patient:
    9: {
        people                  : [],
        users                   : [],
        logs                    : [],
        modalities              : ['find', 'findOne'],
        organizations           : ['find', 'findOne'],
        branches                : ['find', 'findOne'],
        services                : ['find', 'findOne'],
        equipments              : ['find', 'findOne'],
        slots                   : ['find', 'findOne'],
        procedures              : ['find', 'findOne'],
        procedure_categories    : ['find', 'findOne'],
        files                   : [],
        appointments            : ['find', 'findOne'],
        appointments_drafts     : [],
        appointment_requests    : [],
        mwl                     : [],
        pathologies             : ['find', 'findOne'],
        performing              : ['find', 'findOne'],
        reports                 : ['find', 'findOne'],
        signatures              : ['find', 'findOne'],
        mail                    : [],
        exporter                : [],
        wezen                   : ['studyToken'],
        stats                   : []
    },

    // Functional [Empty role for concessions (Generic user)]:
    10: {
        people                  : [],
        users                   : [],            
        logs                    : [],
        sessions                : [],
        modalities              : [],
        organizations           : [],
        branches                : [],
        services                : [],
        equipments              : [],
        slots                   : [],
        procedures              : [],
        procedure_categories    : [],
        files                   : [],
        appointments            : [],
        appointments_drafts     : [],
        appointment_requests    : [],
        mwl                     : [],
        pathologies             : [],
        performing              : [],
        reports                 : [],
        signatures              : [],
        mail                    : [],
        exporter                : [],
        wezen                   : [],
        stats                   : []
    }
}

//Set user concessions:
const concessionPermissions = {
    // 1 : Schedule management:
    1: {
        slots                   : ['find', 'findOne', 'insert', 'update', 'delete', 'batch/insert', 'batch/delete'],
    },

    // 2 : Appointment management:
    2: {
        people                  : ['find', 'findOne', 'insert', 'update'],
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport', 'insert', 'update'],
        slots                   : ['find', 'findOne'],
        appointments            : ['find', 'findOne', 'insert', 'update'],
        appointments_drafts     : ['find', 'findOne', 'insert', 'delete'],
        appointment_requests    : ['find', 'findOne', 'update'],
        performing              : ['find', 'findOne'],
        mail                    : ['send']
    },

    // 3 : Appointment calendar:
    3: {
        slots                   : ['find', 'findOne'],
        appointments            : ['find', 'findOne'],
        appointments_drafts     : ['find', 'findOne']
    },

    // 4 : Reception management:
    4: {
        appointments            : ['find', 'findOne'],
        mwl                     : ['insert'],
        performing              : ['find', 'findOne', 'insert', 'update']
    },

    // 5 : Study management:
    5: {
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport'],
        files                   : ['find', 'findOne', 'insert', 'delete', 'batch/delete'],
        appointments            : ['find', 'findOne', 'update'],
        pathologies             : ['find', 'findOne'],
        performing              : ['find', 'findOne', 'insert', 'update'],
        reports                 : ['find', 'findOne'],
        signatures              : ['find', 'findOne']
    },

    // 6 : Report management:
    6: {
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport'],
        files                   : ['find', 'findOne', 'insert', 'delete', 'batch/delete'],
        appointments            : ['find', 'findOne'],
        pathologies             : ['find', 'findOne'],
        performing              : ['find', 'findOne'],
        reports                 : ['find', 'findOne', 'insert', 'update', 'setPathologies'],
        signatures              : ['find', 'findOne']
    },

    // 7 : Sign reports:
    7: {
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport'],
        appointments            : ['find', 'findOne'],
        pathologies             : ['find', 'findOne'],
        performing              : ['find', 'findOne'],
        reports                 : ['find', 'findOne'],
        signatures              : ['find', 'findOne', 'insert']
    },

    // 8 : Authenticate reports:
    8: {
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport'],
        appointments            : ['find', 'findOne'],
        pathologies             : ['find', 'findOne'],
        performing              : ['find', 'findOne'],
        reports                 : ['find', 'findOne', 'authenticate'],
        signatures              : ['find', 'findOne']
    },

    // 9 : Amend reports:
    // This concession depends on being a Supervisor, Physician or higher user or having the '6' concession [Report management].
    9: {
        reports                 : ['insert']
    },

    // 10 : Access to user logs (Frontend concession):
    10: {
        logs                    : ['find', 'findOne']
    },

    // 11 : Access to element logs (Frontend concession):
    11: {
        logs                    : ['find', 'findOne']
    },

    // 12 : Mail forwarding:
    12: {
        mail                    : ['send']
    },

    // 13 : Request management:
    13: {
        appointment_requests    : ['find', 'findOne', 'insert', 'update']
    },

    // 14 : Advanced searches:
    14: {
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport'],
        reports                 : ['find', 'findOne']
    },
    
    // 15 : Request statistics:
    15: {
        stats                   : ['appointment_requests']
    },

    // 16 : Appointment statistics:
    16: {
        stats                   : ['appointments']
    },

    // 17 : Study statistics:
    17: {
        stats                   : ['performing']
    },

    // 18 : Report statistics:
    18: {
        stats                   : ['reports']
    },

    // 19 : Organization statistics:
    19: {
        stats                   : ['organizations']
    },

    // 20 : Access to the export module (Backend access only):
    20: {
        exporter                : ['reports']
    },

    // 21 : Access to the PACS imaging service.
    21: {
        wezen                   : ['studyToken']
    },

    // 22 : Patient identification editing:
    22: {
        people                  : ['find', 'findOne', 'update'],
        users                   : ['find', 'findOne', 'update'],
    },

    // 23 : Overbooking:
    23: {
        appointments            : ['find', 'findOne', 'insert', 'update'],
        appointments_drafts     : ['find', 'findOne', 'insert', 'delete'],
    },
    
    // 24 : Billing reports (Performing -> 5 : Study management):
    24: {
        users                   : ['find', 'findOne', 'findByService', 'findByRoleInReport'],
        files                   : ['find', 'findOne', 'insert', 'delete', 'batch/delete'],
        appointments            : ['find', 'findOne', 'update'],
        pathologies             : ['find', 'findOne'],
        performing              : ['find', 'findOne', 'insert', 'update'],
        reports                 : ['find', 'findOne'],
        signatures              : ['find', 'findOne']
    }
}
//--------------------------------------------------------------------------------------------------------------------//


//--------------------------------------------------------------------------------------------------------------------//
//Export permissions:
module.exports = {
    rolePermissions,
    concessionPermissions
};
//--------------------------------------------------------------------------------------------------------------------//