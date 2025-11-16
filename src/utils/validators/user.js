// src/utils/validators/user.js
import { 
  isValidEmail, 
  isValidPhone, 
  isValidIDNumber, 
  isRequired, 
  hasMinLength, 
  hasMaxLength,
  isStrongPassword,
  getValidationMessage 
} from '../helpers/validation';

export const validateUserRegistration = (userData) => {
  const errors = {};

  // First Name validation
  if (!isRequired(userData.firstName)) {
    errors.firstName = getValidationMessage('isRequired', 'First name');
  } else if (!hasMinLength(userData.firstName, 2)) {
    errors.firstName = getValidationMessage('hasMinLength', 'First name', 2);
  } else if (!hasMaxLength(userData.firstName, 50)) {
    errors.firstName = getValidationMessage('hasMaxLength', 'First name', 50);
  }

  // Last Name validation
  if (!isRequired(userData.lastName)) {
    errors.lastName = getValidationMessage('isRequired', 'Last name');
  } else if (!hasMinLength(userData.lastName, 2)) {
    errors.lastName = getValidationMessage('hasMinLength', 'Last name', 2);
  } else if (!hasMaxLength(userData.lastName, 50)) {
    errors.lastName = getValidationMessage('hasMaxLength', 'Last name', 50);
  }

  // Email validation
  if (userData.email && !isValidEmail(userData.email)) {
    errors.email = getValidationMessage('isValidEmail');
  }

  // Phone validation
  if (!isRequired(userData.phone)) {
    errors.phone = getValidationMessage('isRequired', 'Phone number');
  } else if (!isValidPhone(userData.phone)) {
    errors.phone = getValidationMessage('isValidPhone');
  }

  // Role validation
  if (!isRequired(userData.role)) {
    errors.role = getValidationMessage('isRequired', 'Role');
  }

  // County validation
  if (!isRequired(userData.county)) {
    errors.county = getValidationMessage('isRequired', 'County');
  }

  // ID Number validation (if provided)
  if (userData.idNumber && !isValidIDNumber(userData.idNumber)) {
    errors.idNumber = getValidationMessage('isValidIDNumber');
  }

  // Password validation (for new users)
  if (userData.password) {
    if (!hasMinLength(userData.password, 8)) {
      errors.password = getValidationMessage('hasMinLength', 'Password', 8);
    } else if (!isStrongPassword(userData.password)) {
      errors.password = getValidationMessage('isStrongPassword');
    }
  }

  // Facility validation for health workers and hospital staff
  if ((userData.role === 'health-worker' || userData.role === 'hospital') && !isRequired(userData.facility)) {
    errors.facility = getValidationMessage('isRequired', 'Health facility');
  }

  return errors;
};

export const validateUserLogin = (credentials, role) => {
  const errors = {};

  if (role === 'mother') {
    // Mother login with phone and PIN
    if (!isRequired(credentials.phone)) {
      errors.phone = getValidationMessage('isRequired', 'Phone number');
    } else if (!isValidPhone(credentials.phone)) {
      errors.phone = getValidationMessage('isValidPhone');
    }

    if (!isRequired(credentials.pin)) {
      errors.pin = getValidationMessage('isRequired', 'PIN');
    } else if (!hasMinLength(credentials.pin, 4) || !hasMaxLength(credentials.pin, 6)) {
      errors.pin = getValidationMessage('isValidPIN');
    }
  } else {
    // Other roles with username and password
    if (!isRequired(credentials.username)) {
      errors.username = getValidationMessage('isRequired', 'Username');
    }

    if (!isRequired(credentials.password)) {
      errors.password = getValidationMessage('isRequired', 'Password');
    }
  }

  return errors;
};

export const validateUserUpdate = (userData) => {
  const errors = {};

  // First Name validation
  if (userData.firstName !== undefined) {
    if (!isRequired(userData.firstName)) {
      errors.firstName = getValidationMessage('isRequired', 'First name');
    } else if (!hasMinLength(userData.firstName, 2)) {
      errors.firstName = getValidationMessage('hasMinLength', 'First name', 2);
    }
  }

  // Last Name validation
  if (userData.lastName !== undefined) {
    if (!isRequired(userData.lastName)) {
      errors.lastName = getValidationMessage('isRequired', 'Last name');
    } else if (!hasMinLength(userData.lastName, 2)) {
      errors.lastName = getValidationMessage('hasMinLength', 'Last name', 2);
    }
  }

  // Email validation
  if (userData.email !== undefined && userData.email !== '' && !isValidEmail(userData.email)) {
    errors.email = getValidationMessage('isValidEmail');
  }

  // Phone validation
  if (userData.phone !== undefined) {
    if (!isRequired(userData.phone)) {
      errors.phone = getValidationMessage('isRequired', 'Phone number');
    } else if (!isValidPhone(userData.phone)) {
      errors.phone = getValidationMessage('isValidPhone');
    }
  }

  // Password validation (only if changing password)
  if (userData.password) {
    if (!hasMinLength(userData.password, 8)) {
      errors.password = getValidationMessage('hasMinLength', 'Password', 8);
    } else if (!isStrongPassword(userData.password)) {
      errors.password = getValidationMessage('isStrongPassword');
    }
  }

  // Role-specific validations
  if (userData.role === 'health-worker' || userData.role === 'hospital') {
    if (userData.facility !== undefined && !isRequired(userData.facility)) {
      errors.facility = getValidationMessage('isRequired', 'Health facility');
    }
  }

  return errors;
};

export const validatePasswordChange = (passwordData) => {
  const errors = {};

  if (!isRequired(passwordData.currentPassword)) {
    errors.currentPassword = getValidationMessage('isRequired', 'Current password');
  }

  if (!isRequired(passwordData.newPassword)) {
    errors.newPassword = getValidationMessage('isRequired', 'New password');
  } else if (!hasMinLength(passwordData.newPassword, 8)) {
    errors.newPassword = getValidationMessage('hasMinLength', 'New password', 8);
  } else if (!isStrongPassword(passwordData.newPassword)) {
    errors.newPassword = getValidationMessage('isStrongPassword');
  }

  if (!isRequired(passwordData.confirmPassword)) {
    errors.confirmPassword = getValidationMessage('isRequired', 'Confirm password');
  } else if (passwordData.newPassword !== passwordData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export const validateUserPreferences = (preferences) => {
  const errors = {};

  // Language validation
  if (preferences.language && !['english', 'swahili', 'kikuyu', 'dholuo'].includes(preferences.language)) {
    errors.language = 'Please select a valid language';
  }

  // Notification preferences
  if (preferences.smsReminders !== undefined && typeof preferences.smsReminders !== 'boolean') {
    errors.smsReminders = 'SMS reminders must be true or false';
  }

  if (preferences.phoneReminders !== undefined && typeof preferences.phoneReminders !== 'boolean') {
    errors.phoneReminders = 'Phone reminders must be true or false';
  }

  // Reminder days validation
  if (preferences.reminderDays) {
    if (!Array.isArray(preferences.reminderDays)) {
      errors.reminderDays = 'Reminder days must be an array';
    } else {
      const validDays = [1, 3, 7, 14];
      const invalidDays = preferences.reminderDays.filter(day => !validDays.includes(day));
      if (invalidDays.length > 0) {
        errors.reminderDays = `Invalid reminder days: ${invalidDays.join(', ')}. Valid days are: ${validDays.join(', ')}`;
      }
    }
  }

  // Time of day validation
  if (preferences.timeOfDay) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(preferences.timeOfDay)) {
      errors.timeOfDay = 'Please enter a valid time in HH:MM format';
    }
  }

  return errors;
};

export const validateCHWAssignment = (assignmentData) => {
  const errors = {};

  if (!isRequired(assignmentData.chwId)) {
    errors.chwId = getValidationMessage('isRequired', 'Community Health Worker');
  }

  if (!isRequired(assignmentData.motherIds) || !Array.isArray(assignmentData.motherIds) || assignmentData.motherIds.length === 0) {
    errors.motherIds = 'Please select at least one mother to assign';
  }

  if (assignmentData.effectiveDate && !isRequired(assignmentData.effectiveDate)) {
    errors.effectiveDate = getValidationMessage('isRequired', 'Effective date');
  }

  return errors;
};

export const validateUserFilters = (filters) => {
  const errors = {};

  // Role validation
  if (filters.role && !['mother', 'health-worker', 'hospital', 'admin'].includes(filters.role)) {
    errors.role = 'Please select a valid role';
  }

  // Status validation
  if (filters.status && !['active', 'inactive', 'suspended'].includes(filters.status)) {
    errors.status = 'Please select a valid status';
  }

  // Date range validation
  if (filters.startDate && filters.endDate) {
    const startDate = new Date(filters.startDate);
    const endDate = new Date(filters.endDate);
    
    if (startDate > endDate) {
      errors.dateRange = 'Start date cannot be after end date';
    }
  }

  return errors;
};