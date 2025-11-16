// src/utils/helpers/format.js
/**
 * Format date to localized string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };

  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  return dateObj.toLocaleDateString('en-KE', defaultOptions);
};

/**
 * Format date and time
 */
export const formatDateTime = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };

  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return 'Invalid Date';
  
  return dateObj.toLocaleDateString('en-KE', defaultOptions);
};

/**
 * Format time only
 */
export const formatTime = (date, options = {}) => {
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };

  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return 'Invalid Time';
  
  return dateObj.toLocaleTimeString('en-KE', defaultOptions);
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format Kenyan phone numbers
  if (cleaned.startsWith('254')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return `+254${cleaned.substring(1)}`;
  } else if (cleaned.startsWith('7')) {
    return `+254${cleaned}`;
  }
  
  return phone;
};

/**
 * Format phone number for SMS (E.164)
 */
export const formatPhoneForSMS = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('254') && cleaned.length === 12) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0') && cleaned.length === 10) {
    return `+254${cleaned.substring(1)}`;
  } else if (cleaned.startsWith('7') && cleaned.length === 9) {
    return `+254${cleaned}`;
  }
  
  return phone; // Return as is if format is unknown
};

/**
 * Format number with commas
 */
export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined) return '0';
  
  return new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number);
};

/**
 * Format percentage
 */
export const formatPercentage = (number, decimals = 1) => {
  if (number === null || number === undefined) return '0%';
  
  return new Intl.NumberFormat('en-KE', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(number / 100);
};

/**
 * Format currency (Kenyan Shillings)
 */
export const formatCurrency = (amount, decimals = 0) => {
  if (amount === null || amount === undefined) return 'KSh 0';
  
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(amount);
};

/**
 * Format file size
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes';
  
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Format duration in minutes to readable format
 */
export const formatDuration = (minutes) => {
  if (!minutes) return '0 min';
  
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
};

/**
 * Format name (capitalize first letters)
 */
export const formatName = (name) => {
  if (!name) return '';
  
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Format vaccine name for display
 */
export const formatVaccineName = (vaccineId) => {
  const vaccineNames = {
    'bcg': 'BCG',
    'opv0': 'OPV 0',
    'opv1': 'OPV 1',
    'opv2': 'OPV 2',
    'opv3': 'OPV 3',
    'pentavalent1': 'Pentavalent 1',
    'pentavalent2': 'Pentavalent 2',
    'pentavalent3': 'Pentavalent 3',
    'pcv1': 'PCV 1',
    'pcv2': 'PCV 2',
    'pcv3': 'PCV 3',
    'rota1': 'Rota 1',
    'rota2': 'Rota 2',
    'measles1': 'Measles Rubella 1',
    'measles2': 'Measles Rubella 2',
    'yellowfever': 'Yellow Fever'
  };
  
  return vaccineNames[vaccineId] || vaccineId;
};

/**
 * Format status for display
 */
export const formatStatus = (status) => {
  const statusMap = {
    'active': 'Active',
    'inactive': 'Inactive',
    'pending': 'Pending',
    'completed': 'Completed',
    'overdue': 'Overdue',
    'due': 'Due',
    'upcoming': 'Upcoming',
    'adequate': 'Adequate',
    'low': 'Low',
    'critical': 'Critical'
  };
  
  return statusMap[status] || status;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

/**
 * Format ID number with masking
 */
export const formatIDNumber = (idNumber, showFull = false) => {
  if (!idNumber) return '';
  
  if (showFull) {
    return idNumber;
  }
  
  // Show first 3 and last 3 characters, mask the rest
  if (idNumber.length > 6) {
    const firstThree = idNumber.substring(0, 3);
    const lastThree = idNumber.substring(idNumber.length - 3);
    const masked = '*'.repeat(idNumber.length - 6);
    return `${firstThree}${masked}${lastThree}`;
  }
  
  return idNumber;
};

/**
 * Format array to comma-separated string
 */
export const formatArray = (array, maxItems = 3) => {
  if (!array || !array.length) return '';
  
  if (array.length <= maxItems) {
    return array.join(', ');
  }
  
  return array.slice(0, maxItems).join(', ') + ` and ${array.length - maxItems} more`;
};

/**
 * Format distance in kilometers
 */
export const formatDistance = (distanceInKm) => {
  if (!distanceInKm) return '0 km';
  
  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)} m`;
  }
  
  return `${Math.round(distanceInKm * 10) / 10} km`;
};