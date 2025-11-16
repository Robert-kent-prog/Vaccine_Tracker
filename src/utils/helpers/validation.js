// src/utils/helpers/validation.js
/**
 * Validate email address
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Kenyan phone number
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  
  const kenyanPhoneRegex = /^(?:\+254|0)?[17]\d{8}$/;
  return kenyanPhoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate ID number (Kenyan)
 */
export const isValidIDNumber = (idNumber) => {
  if (!idNumber) return false;
  
  // Basic validation for Kenyan ID format
  const idRegex = /^\d{1,8}$/;
  return idRegex.test(idNumber.replace(/\s/g, ''));
};

/**
 * Validate date is in the past
 */
export const isPastDate = (date) => {
  if (!date) return false;
  
  const inputDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return inputDate < today;
};

/**
 * Validate date is in the future
 */
export const isFutureDate = (date) => {
  if (!date) return false;
  
  const inputDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return inputDate > today;
};

/**
 * Validate child's birth date (not in future and reasonable past)
 */
export const isValidBirthDate = (date) => {
  if (!date) return false;
  
  const birthDate = new Date(date);
  const today = new Date();
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 18); // Maximum 18 years ago
  
  return birthDate <= today && birthDate >= minDate;
};

/**
 * Validate vaccine batch number
 */
export const isValidBatchNumber = (batchNumber) => {
  if (!batchNumber) return false;
  
  // Basic format: letters, numbers, hyphens, 3-20 characters
  const batchRegex = /^[A-Za-z0-9-]{3,20}$/;
  return batchRegex.test(batchNumber);
};

/**
 * Validate weight (in kg)
 */
export const isValidWeight = (weight) => {
  if (!weight) return false;
  
  const numWeight = parseFloat(weight);
  return !isNaN(numWeight) && numWeight > 0 && numWeight <= 50; // Reasonable weight range for children
};

/**
 * Validate height (in cm)
 */
export const isValidHeight = (height) => {
  if (!height) return false;
  
  const numHeight = parseFloat(height);
  return !isNaN(numHeight) && numHeight > 0 && numHeight <= 200; // Reasonable height range for children
};

/**
 * Validate required field
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * Validate minimum length
 */
export const hasMinLength = (value, minLength) => {
  if (!value) return false;
  return value.length >= minLength;
};

/**
 * Validate maximum length
 */
export const hasMaxLength = (value, maxLength) => {
  if (!value) return true; // Optional fields can be empty
  return value.length <= maxLength;
};

/**
 * Validate number range
 */
export const isInRange = (value, min, max) => {
  if (!value) return false;
  
  const numValue = parseFloat(value);
  return !isNaN(numValue) && numValue >= min && numValue <= max;
};

/**
 * Validate PIN (4-6 digits)
 */
export const isValidPIN = (pin) => {
  if (!pin) return false;
  
  const pinRegex = /^\d{4,6}$/;
  return pinRegex.test(pin);
};

/**
 * Validate vaccine expiry date
 */
export const isValidExpiryDate = (date) => {
  if (!date) return false;
  
  const expiryDate = new Date(date);
  const today = new Date();
  
  return expiryDate > today;
};

/**
 * Validate coordinates (latitude and longitude)
 */
export const isValidCoordinates = (lat, lng) => {
  if (!lat || !lng) return false;
  
  const numLat = parseFloat(lat);
  const numLng = parseFloat(lng);
  
  return !isNaN(numLat) && !isNaN(numLng) && 
         numLat >= -90 && numLat <= 90 && 
         numLng >= -180 && numLng <= 180;
};

/**
 * Validate file type
 */
export const isValidFileType = (file, allowedTypes) => {
  if (!file || !allowedTypes) return false;
  
  const fileType = file.type || file.name.split('.').pop().toLowerCase();
  return allowedTypes.includes(fileType);
};

/**
 * Validate file size
 */
export const isValidFileSize = (file, maxSizeInMB) => {
  if (!file || !maxSizeInMB) return false;
  
  const maxSize = maxSizeInMB * 1024 * 1024; // Convert to bytes
  return file.size <= maxSize;
};

/**
 * Validate URL
 */
export const isValidURL = (url) => {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate strong password
 */
export const isStrongPassword = (password) => {
  if (!password) return false;
  
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasMinLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};

/**
 * Validate age in months
 */
export const isValidAgeInMonths = (age) => {
  if (!age) return false;
  
  const numAge = parseInt(age);
  return !isNaN(numAge) && numAge >= 0 && numAge <= 216; // 0-18 years in months
};

/**
 * Validate vaccination dose number
 */
export const isValidDoseNumber = (dose) => {
  if (!dose) return false;
  
  const numDose = parseInt(dose);
  return !isNaN(numDose) && numDose > 0 && numDose <= 10; // Reasonable dose range
};

/**
 * Get validation error message
 */
export const getValidationMessage = (validator, fieldName, ...params) => {
  const messages = {
    isRequired: `${fieldName} is required`,
    isValidEmail: `Please enter a valid email address`,
    isValidPhone: `Please enter a valid Kenyan phone number`,
    isValidIDNumber: `Please enter a valid ID number`,
    isPastDate: `${fieldName} must be in the past`,
    isFutureDate: `${fieldName} must be in the future`,
    isValidBirthDate: `Please enter a valid birth date`,
    isValidBatchNumber: `Please enter a valid batch number`,
    isValidWeight: `Please enter a valid weight (0.1-50 kg)`,
    isValidHeight: `Please enter a valid height (1-200 cm)`,
    hasMinLength: `${fieldName} must be at least ${params[0]} characters`,
    hasMaxLength: `${fieldName} must be at most ${params[0]} characters`,
    isInRange: `${fieldName} must be between ${params[0]} and ${params[1]}`,
    isValidPIN: `PIN must be 4-6 digits`,
    isValidExpiryDate: `Expiry date must be in the future`,
    isValidCoordinates: `Please enter valid coordinates`,
    isValidFileType: `File type not allowed. Allowed types: ${params[0].join(', ')}`,
    isValidFileSize: `File size must be less than ${params[0]}MB`,
    isValidURL: `Please enter a valid URL`,
    isStrongPassword: `Password must be at least 8 characters with uppercase, lowercase, number and special character`,
    isValidAgeInMonths: `Please enter a valid age (0-216 months)`,
    isValidDoseNumber: `Please enter a valid dose number (1-10)`
  };
  
  return messages[validator] || `Invalid ${fieldName.toLowerCase()}`;
};