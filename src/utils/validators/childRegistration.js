// src/utils/validators/childRegistration.js
export const validateChildRegistration = (data) => {
  const errors = {};

  // Required fields
  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else {
    const dob = new Date(data.dateOfBirth);
    const today = new Date();
    if (dob >= today) {
      errors.dateOfBirth = 'Date of birth must be in the past';
    }
  }

  if (!data.gender) {
    errors.gender = 'Gender is required';
  }

  if (!data.motherName?.trim()) {
    errors.motherName = "Mother's name is required";
  }

  if (!data.motherPhone?.trim()) {
    errors.motherPhone = "Mother's phone number is required";
  } else if (!isValidPhoneNumber(data.motherPhone)) {
    errors.motherPhone = 'Please enter a valid Kenyan phone number';
  }

  if (!data.county) {
    errors.county = 'County is required';
  }

  return errors;
};

const isValidPhoneNumber = (phone) => {
  const kenyanPhoneRegex = /^(?:\+254|0)[17]\d{8}$/;
  return kenyanPhoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateVaccinationRecord = (data) => {
  const errors = {};

  if (!data.vaccineId) {
    errors.vaccineId = 'Vaccine selection is required';
  }

  if (!data.dateGiven) {
    errors.dateGiven = 'Date given is required';
  } else {
    const givenDate = new Date(data.dateGiven);
    const today = new Date();
    if (givenDate > today) {
      errors.dateGiven = 'Date given cannot be in the future';
    }
  }

  if (!data.batchNumber?.trim()) {
    errors.batchNumber = 'Batch number is required';
  }

  if (!data.healthWorker?.trim()) {
    errors.healthWorker = 'Health worker name is required';
  }

  return errors;
};