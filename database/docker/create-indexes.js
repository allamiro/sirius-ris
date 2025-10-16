db = db.getSiblingDB("sirius_db");

try { db.users.createIndex({ fk_person: 1 }); print("Index created: users.fk_person"); } catch (e) { print("Error in users.fk_person: " + e); }

try { db.logs.createIndex({ fk_organization: 1 }); print("Index created: logs.fk_organization"); } catch (e) { print("Error in logs.fk_organization: " + e); }
try { db.logs.createIndex({ fk_user: 1 }); print("Index created: logs.fk_user"); } catch (e) { print("Error in logs.fk_user: " + e); }

try { db.sessions.createIndex({ fk_user: 1 }); print("Index created: sessions.fk_user"); } catch (e) { print("Error in sessions.fk_user: " + e); }

try { db.branches.createIndex({ fk_organization: 1 }); print("Index created: branches.fk_organization"); } catch (e) { print("Error in branches.fk_organization: " + e); }

try { db.services.createIndex({ fk_branch: 1 }); print("Index created: services.fk_branch"); } catch (e) { print("Error in services.fk_branch: " + e); }
try { db.services.createIndex({ fk_modality: 1 }); print("Index created: services.fk_modality"); } catch (e) { print("Error in services.fk_modality: " + e); }
try { db.services.createIndex({ fk_equipments: 1 }); print("Index created: services.fk_equipments"); } catch (e) { print("Error in services.fk_equipments: " + e); }

try { db.equipments.createIndex({ fk_branch: 1 }); print("Index created: equipments.fk_branch"); } catch (e) { print("Error in equipments.fk_branch: " + e); }
try { db.equipments.createIndex({ fk_modalities: 1 }); print("Index created: equipments.fk_modalities"); } catch (e) { print("Error in equipments.fk_modalities: " + e); }

try { db.procedures.createIndex({ "domain.organization": 1 }); print("Index created: procedures.domain.organization"); } catch (e) { print("Error in procedures.domain.organization: " + e); }
try { db.procedures.createIndex({ "domain.branch": 1 }); print("Index created: procedures.domain.branch"); } catch (e) { print("Error in procedures.domain.branch: " + e); }
try { db.procedures.createIndex({ fk_modality: 1 }); print("Index created: procedures.fk_modality"); } catch (e) { print("Error in procedures.fk_modality: " + e); }

try { db.procedure_categories.createIndex({ "domain.organization": 1 }); print("Index created: procedure_categories.domain.organization"); } catch (e) { print("Error in procedure_categories.domain.organization: " + e); }
try { db.procedure_categories.createIndex({ "domain.branch": 1 }); print("Index created: procedure_categories.domain.branch"); } catch (e) { print("Error in procedure_categories.domain.branch: " + e); }
try { db.procedure_categories.createIndex({ fk_procedures: 1 }); print("Index created: procedure_categories.fk_procedures"); } catch (e) { print("Error in procedure_categories.fk_procedures: " + e); }

try { db.slots.createIndex({ "domain.organization": 1 }); print("Index created: slots.domain.organization"); } catch (e) { print("Error in slots.domain.organization: " + e); }
try { db.slots.createIndex({ "domain.branch": 1 }); print("Index created: slots.domain.branch"); } catch (e) { print("Error in slots.domain.branch: " + e); }
try { db.slots.createIndex({ "domain.service": 1 }); print("Index created: slots.domain.service"); } catch (e) { print("Error in slots.domain.service: " + e); }
try { db.slots.createIndex({ fk_equipment: 1 }); print("Index created: slots.fk_equipment"); } catch (e) { print("Error in slots.fk_equipment: " + e); }
try { db.slots.createIndex({ fk_procedure: 1 }); print("Index created: slots.fk_procedure"); } catch (e) { print("Error in slots.fk_procedure: " + e); }

try { db.files.createIndex({ "domain.organization": 1 }); print("Index created: files.domain.organization"); } catch (e) { print("Error in files.domain.organization: " + e); }
try { db.files.createIndex({ "domain.branch": 1 }); print("Index created: files.domain.branch"); } catch (e) { print("Error in files.domain.branch: " + e); }

try { db.appointment_requests.createIndex({ "imaging.organization": 1 }); print("Index created: appointment_requests.imaging.organization"); } catch (e) { print("Error in appointment_requests.imaging.organization: " + e); }
try { db.appointment_requests.createIndex({ "imaging.branch": 1 }); print("Index created: appointment_requests.imaging.branch"); } catch (e) { print("Error in appointment_requests.imaging.branch: " + e); }
try { db.appointment_requests.createIndex({ "referring.organization": 1 }); print("Index created: appointment_requests.referring.organization"); } catch (e) { print("Error in appointment_requests.referring.organization: " + e); }
try { db.appointment_requests.createIndex({ "referring.branch": 1 }); print("Index created: appointment_requests.referring.branch"); } catch (e) { print("Error in appointment_requests.referring.branch: " + e); }
try { db.appointment_requests.createIndex({ "study.fk_procedure": 1 }); print("Index created: appointment_requests.study.fk_procedure"); } catch (e) { print("Error in appointment_requests.study.fk_procedure: " + e); }
try { db.appointment_requests.createIndex({ "study.fk_modality": 1 }); print("Index created: appointment_requests.study.fk_modality"); } catch (e) { print("Error in appointment_requests.study.fk_modality: " + e); }

try { db.appointments_drafts.createIndex({ "imaging.organization": 1 }); print("Index created: appointments_drafts.imaging.organization"); } catch (e) { print("Error in appointments_drafts.imaging.organization: " + e); }
try { db.appointments_drafts.createIndex({ "imaging.branch": 1 }); print("Index created: appointments_drafts.imaging.branch"); } catch (e) { print("Error in appointments_drafts.imaging.branch: " + e); }
try { db.appointments_drafts.createIndex({ "imaging.service": 1 }); print("Index created: appointments_drafts.imaging.service"); } catch (e) { print("Error in appointments_drafts.imaging.service: " + e); }
try { db.appointments_drafts.createIndex({ fk_patient: 1 }); print("Index created: appointments_drafts.fk_patient"); } catch (e) { print("Error in appointments_drafts.fk_patient: " + e); }
try { db.appointments_drafts.createIndex({ fk_coordinator: 1 }); print("Index created: appointments_drafts.fk_coordinator"); } catch (e) { print("Error in appointments_drafts.fk_coordinator: " + e); }
try { db.appointments_drafts.createIndex({ fk_slot: 1 }); print("Index created: appointments_drafts.fk_slot"); } catch (e) { print("Error in appointments_drafts.fk_slot: " + e); }
try { db.appointments_drafts.createIndex({ fk_procedure: 1 }); print("Index created: appointments_drafts.fk_procedure"); } catch (e) { print("Error in appointments_drafts.fk_procedure: " + e); }
try { db.appointments_drafts.createIndex({ fk_appointments_request: 1 }); print("Index created: appointments_drafts.fk_appointments_request"); } catch (e) { print("Error in appointments_drafts.fk_appointments_request: " + e); }

try { db.appointments.createIndex({ "imaging.organization": 1 }); print("Index created: appointments.imaging.organization"); } catch (e) { print("Error in appointments.imaging.organization: " + e); }
try { db.appointments.createIndex({ "imaging.branch": 1 }); print("Index created: appointments.imaging.branch"); } catch (e) { print("Error in appointments.imaging.branch: " + e); }
try { db.appointments.createIndex({ "imaging.service": 1 }); print("Index created: appointments.imaging.service"); } catch (e) { print("Error in appointments.imaging.service: " + e); }
try { db.appointments.createIndex({ "referring.organization": 1 }); print("Index created: appointments.referring.organization"); } catch (e) { print("Error in appointments.referring.organization: " + e); }
try { db.appointments.createIndex({ "referring.branch": 1 }); print("Index created: appointments.referring.branch"); } catch (e) { print("Error in appointments.referring.branch: " + e); }
try { db.appointments.createIndex({ "referring.service": 1 }); print("Index created: appointments.referring.service"); } catch (e) { print("Error in appointments.referring.service: " + e); }
try { db.appointments.createIndex({ "reporting.organization": 1 }); print("Index created: appointments.reporting.organization"); } catch (e) { print("Error in appointments.reporting.organization: " + e); }
try { db.appointments.createIndex({ "reporting.branch": 1 }); print("Index created: appointments.reporting.branch"); } catch (e) { print("Error in appointments.reporting.branch: " + e); }
try { db.appointments.createIndex({ "reporting.service": 1 }); print("Index created: appointments.reporting.service"); } catch (e) { print("Error in appointments.reporting.service: " + e); }
try { db.appointments.createIndex({ "reporting.fk_reporting": 1 }); print("Index created: appointments.reporting.fk_reporting"); } catch (e) { print("Error in appointments.reporting.fk_reporting: " + e); }
try { db.appointments.createIndex({ fk_patient: 1 }); print("Index created: appointments.fk_patient"); } catch (e) { print("Error in appointments.fk_patient: " + e); }
try { db.appointments.createIndex({ fk_slot: 1 }); print("Index created: appointments.fk_slot"); } catch (e) { print("Error in appointments.fk_slot: " + e); }
try { db.appointments.createIndex({ fk_procedure: 1 }); print("Index created: appointments.fk_procedure"); } catch (e) { print("Error in appointments.fk_procedure: " + e); }
try { db.appointments.createIndex({ fk_appointment_request: 1 }); print("Index created: appointments.fk_appointment_request"); } catch (e) { print("Error in appointments.fk_appointment_request: " + e); }

try { db.performing.createIndex({ fk_appointment: 1 }); print("Index created: performing.fk_appointment"); } catch (e) { print("Error in performing.fk_appointment: " + e); }
try { db.performing.createIndex({ fk_equipment: 1 }); print("Index created: performing.fk_equipment"); } catch (e) { print("Error in performing.fk_equipment: " + e); }
try { db.performing.createIndex({ fk_procedure: 1 }); print("Index created: performing.fk_procedure"); } catch (e) { print("Error in performing.fk_procedure: " + e); }

try { db.reports.createIndex({ fk_performing: 1 }); print("Index created: reports.fk_performing"); } catch (e) { print("Error in reports.fk_performing: " + e); }
try { db.reports.createIndex({ "authenticated.fk_user": 1 }); print("Index created: reports.authenticated.fk_user"); } catch (e) { print("Error in reports.authenticated.fk_user: " + e); }
try { db.reports.createIndex({ medical_signatures: 1 }); print("Index created: reports.medical_signatures"); } catch (e) { print("Error in reports.medical_signatures: " + e); }
try { db.reports.createIndex({ fk_pathologies: 1 }); print("Index created: reports.fk_pathologies"); } catch (e) { print("Error in reports.fk_pathologies: " + e); }

try { db.pathologies.createIndex({ fk_organization: 1 }); print("Index created: pathologies.fk_organization"); } catch (e) { print("Error in pathologies.fk_organization: " + e); }

try { db.signatures.createIndex({ fk_organization: 1 }); print("Index created: signatures.fk_organization"); } catch (e) { print("Error in signatures.fk_organization: " + e); }
try { db.signatures.createIndex({ fk_user: 1 }); print("Index created: signatures.fk_user"); } catch (e) { print("Error in signatures.fk_user: " + e); }

