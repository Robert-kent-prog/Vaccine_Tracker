// src/utils/validators/vaccination.js
import { 
  isRequired, 
  isPastDate, 
  isFutureDate,
  isValidBatchNumber,
  getValidationMessage 
} from '../helpers/validation';

export const validateVaccinationRecord = (vaccinationData) => {
  const errors = {};

  // Child validation
  if (!isRequired(vaccinationData.childId)) {
    errors.childId = getValidationMessage('isRequired', 'Child');
  }

  // Vaccine validation
  if (!isRequired(vaccinationData.vaccineId)) {
    errors.vaccineId = getValidationMessage('isRequired', 'Vaccine');
  }

  // Date given validation
  if (!isRequired(vaccinationData.dateGiven)) {
    errors.dateGiven = getValidationMessage('isRequired', 'Date given');
  } else if (!isPastDate(vaccinationData.dateGiven)) {
    errors.dateGiven = getValidationMessage('isPastDate', 'Date given');
  }

  // Batch number validation
  if (!isRequired(vaccinationData.batchNumber)) {
    errors.batchNumber = getValidationMessage('isRequired', 'Batch number');
  } else if (!isValidBatchNumber(vaccinationData.batchNumber)) {
    errors.batchNumber = getValidationMessage('isValidBatchNumber');
  }

  // Health worker validation
  if (!isRequired(vaccinationData.healthWorker)) {
    errors.healthWorker = getValidationMessage('isRequired', 'Health worker name');
  }

  // Facility validation
  if (!isRequired(vaccinationData.facility)) {
    errors.facility = getValidationMessage('isRequired', 'Health facility');
  }

  // Next visit date validation (if provided)
  if (vaccinationData.nextVisitDate && !isFutureDate(vaccinationData.nextVisitDate)) {
    errors.nextVisitDate = getValidationMessage('isFutureDate', 'Next visit date');
  }

  return errors;
};

export const validateVaccinationUpdate = (updateData) => {
  const errors = {};

  // Date given validation
  if (updateData.dateGiven !== undefined) {
    if (!isRequired(updateData.dateGiven)) {
      errors.dateGiven = getValidationMessage('isRequired', 'Date given');
    } else if (!isPastDate(updateData.dateGiven)) {
      errors.dateGiven = getValidationMessage('isPastDate', 'Date given');
    }
  }

  // Batch number validation
  if (updateData.batchNumber !== undefined) {
    if (!isRequired(updateData.batchNumber)) {
      errors.batchNumber = getValidationMessage('isRequired', 'Batch number');
    } else if (!isValidBatchNumber(updateData.batchNumber)) {
      errors.batchNumber = getValidationMessage('isValidBatchNumber');
    }
  }

  // Health worker validation
  if (updateData.healthWorker !== undefined && !isRequired(updateData.healthWorker)) {
    errors.healthWorker = getValidationMessage('isRequired', 'Health worker name');
  }

  // Next visit date validation
  if (updateData.nextVisitDate !== undefined && updateData.nextVisitDate !== '' && !isFutureDate(updateData.nextVisitDate)) {
    errors.nextVisitDate = getValidationMessage('isFutureDate', 'Next visit date');
  }

  return errors;
};

export const validateVaccineSchedule = (scheduleData) => {
  const errors = {};

  if (!isRequired(scheduleData.childId)) {
    errors.childId = getValidationMessage('isRequired', 'Child');
  }

  if (!isRequired(scheduleData.vaccineId)) {
    errors.vaccineId = getValidationMessage('isRequired', 'Vaccine');
  }

  if (!isRequired(scheduleData.dueDate)) {
    errors.dueDate = getValidationMessage('isRequired', 'Due date');
  }

  if (scheduleData.notes && scheduleData.notes.length > 500) {
    errors.notes = 'Notes cannot exceed 500 characters';
  }

  return errors;
};

export const validateVaccinationFilters = (filters) => {
  const errors = {};

  // Date range validation
  if (filters.startDate && filters.endDate) {
    const startDate = new Date(filters.startDate);
    const endDate = new Date(filters.endDate);
    
    if (startDate > endDate) {
      errors.dateRange = 'Start date cannot be after end date';
    }

    // Check if date range is too large (more than 1 year)
    const oneYearMs = 365 * 24 * 60 * 60 * 1000;
    if (endDate - startDate > oneYearMs) {
      errors.dateRange = 'Date range cannot exceed 1 year';
    }
  }

  // Vaccine type validation
  if (filters.vaccineType) {
    const validVaccines = [
      'bcg', 'opv0', 'opv1', 'opv2', 'opv3', 
      'pentavalent1', 'pentavalent2', 'pentavalent3',
      'pcv1', 'pcv2', 'pcv3', 'rota1', 'rota2',
      'measles1', 'measles2', 'yellowfever'
    ];
    
    if (!validVaccines.includes(filters.vaccineType)) {
      errors.vaccineType = 'Please select a valid vaccine type';
    }
  }

  // Status validation
  if (filters.status && !['completed', 'pending', 'overdue', 'scheduled'].includes(filters.status)) {
    errors.status = 'Please select a valid status';
  }

  return errors;
};

export const validateStockUpdate = (stockData) => {
  const errors = {};

  if (!isRequired(stockData.vaccineId)) {
    errors.vaccineId = getValidationMessage('isRequired', 'Vaccine');
  }

  if (!isRequired(stockData.action)) {
    errors.action = getValidationMessage('isRequired', 'Action');
  } else if (!['add', 'remove'].includes(stockData.action)) {
    errors.action = 'Action must be either "add" or "remove"';
  }

  if (!isRequired(stockData.quantity)) {
    errors.quantity = getValidationMessage('isRequired', 'Quantity');
  } else if (isNaN(stockData.quantity) || stockData.quantity <= 0) {
    errors.quantity = 'Quantity must be a positive number';
  }

  if (!isRequired(stockData.batchNumber)) {
    errors.batchNumber = getValidationMessage('isRequired', 'Batch number');
  } else if (!isValidBatchNumber(stockData.batchNumber)) {
    errors.batchNumber = getValidationMessage('isValidBatchNumber');
  }

  if (!isRequired(stockData.expiryDate)) {
    errors.expiryDate = getValidationMessage('isRequired', 'Expiry date');
  } else if (!isFutureDate(stockData.expiryDate)) {
    errors.expiryDate = getValidationMessage('isFutureDate', 'Expiry date');
  }

  if (!isRequired(stockData.reason)) {
    errors.reason = getValidationMessage('isRequired', 'Reason');
  } else if (![
    'new-supply', 'transfer-in', 'donation', 'usage', 
    'wastage', 'transfer-out', 'expired'
  ].includes(stockData.reason)) {
    errors.reason = 'Please select a valid reason';
  }

  return errors;
};

export const validateVaccinationExport = (exportData) => {
  const errors = {};

  if (!isRequired(exportData.format)) {
    errors.format = getValidationMessage('isRequired', 'Export format');
  } else if (!['pdf', 'excel', 'csv'].includes(exportData.format)) {
    errors.format = 'Please select a valid export format';
  }

  if (exportData.startDate && exportData.endDate) {
    const startDate = new Date(exportData.startDate);
    const endDate = new Date(exportData.endDate);
    
    if (startDate > endDate) {
      errors.dateRange = 'Start date cannot be after end date';
    }
  }

  return errors;
};

export const validateDefaulterFollowup = (followupData) => {
  const errors = {};

  if (!isRequired(followupData.defaulterId)) {
    errors.defaulterId = getValidationMessage('isRequired', 'Defaulter');
  }

  if (!isRequired(followupData.followupType)) {
    errors.followupType = getValidationMessage('isRequired', 'Follow-up type');
  } else if (!['phone', 'visit', 'sms', 'other'].includes(followupData.followupType)) {
    errors.followupType = 'Please select a valid follow-up type';
  }

  if (!isRequired(followupData.outcome)) {
    errors.outcome = getValidationMessage('isRequired', 'Outcome');
  } else if (!['contacted', 'visited', 'unreachable', 'rescheduled'].includes(followupData.outcome)) {
    errors.outcome = 'Please select a valid outcome';
  }

  if (followupData.notes && followupData.notes.length > 1000) {
    errors.notes = 'Notes cannot exceed 1000 characters';
  }

  return errors;
};