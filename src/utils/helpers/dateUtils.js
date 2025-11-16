// src/utils/helpers/dateUtils.js
import { format, parseISO, differenceInDays, addMonths, isAfter } from 'date-fns';

export const formatDate = (date, formatStr = 'dd/MM/yyyy') => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const calculateAge = (birthDate, fromDate = new Date()) => {
  if (!birthDate) return null;
  
  const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
  const from = typeof fromDate === 'string' ? parseISO(fromDate) : fromDate;
  
  const months = differenceInDays(from, birth) / 30.44;
  
  if (months < 1) {
    const days = differenceInDays(from, birth);
    return { months: 0, days, display: `${days} day${days !== 1 ? 's' : ''}` };
  } else if (months < 24) {
    return { months: Math.floor(months), days: 0, display: `${Math.floor(months)} month${Math.floor(months) !== 1 ? 's' : ''}` };
  } else {
    const years = Math.floor(months / 12);
    return { years, months: 0, display: `${years} year${years !== 1 ? 's' : ''}` };
  }
};

export const getVaccineDueDate = (birthDate, vaccine) => {
  if (!birthDate || !vaccine) return null;
  
  const birth = typeof birthDate === 'string' ? parseISO(birthDate) : birthDate;
  return addMonths(birth, vaccine.window.from);
};

export const isVaccineOverdue = (birthDate, vaccine, currentDate = new Date()) => {
  const dueDate = getVaccineDueDate(birthDate, vaccine);
  if (!dueDate) return false;
  
  const current = typeof currentDate === 'string' ? parseISO(currentDate) : currentDate;
  return isAfter(current, addMonths(birthDate, vaccine.window.to));
};

export const isVaccineDue = (birthDate, vaccine, currentDate = new Date()) => {
  const dueDate = getVaccineDueDate(birthDate, vaccine);
  if (!dueDate) return false;
  
  const current = typeof currentDate === 'string' ? parseISO(currentDate) : currentDate;
  return isAfter(current, dueDate) && !isVaccineOverdue(birthDate, vaccine, currentDate);
};

export const getDaysUntilDue = (birthDate, vaccine, currentDate = new Date()) => {
  const dueDate = getVaccineDueDate(birthDate, vaccine);
  if (!dueDate) return null;
  
  const current = typeof currentDate === 'string' ? parseISO(currentDate) : currentDate;
  return differenceInDays(dueDate, current);
};