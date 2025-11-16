// src/utils/helpers/calculations.js
import { KENYA_VACCINE_SCHEDULE } from '../../data/vaccines/kenyaSchedule';

/**
 * Calculate age in months from birth date
 */
export const calculateAgeInMonths = (birthDate, referenceDate = new Date()) => {
  const birth = new Date(birthDate);
  const reference = new Date(referenceDate);
  
  const years = reference.getFullYear() - birth.getFullYear();
  const months = reference.getMonth() - birth.getMonth();
  
  return (years * 12) + months;
};

/**
 * Calculate age in human-readable format
 */
export const calculateAge = (birthDate, referenceDate = new Date()) => {
  const months = calculateAgeInMonths(birthDate, referenceDate);
  
  if (months < 1) {
    const days = Math.floor((new Date(referenceDate) - new Date(birthDate)) / (1000 * 60 * 60 * 24));
    return { months: 0, days, display: `${days} day${days !== 1 ? 's' : ''}` };
  } else if (months < 24) {
    return { months, days: 0, display: `${months} month${months !== 1 ? 's' : ''}` };
  } else {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    const display = remainingMonths > 0 
      ? `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`
      : `${years} year${years !== 1 ? 's' : ''}`;
    
    return { years, months: remainingMonths, display };
  }
};

/**
 * Calculate vaccination coverage percentage
 */
export const calculateCoverage = (vaccinatedCount, eligiblePopulation) => {
  if (!eligiblePopulation || eligiblePopulation === 0) return 0;
  return Math.round((vaccinatedCount / eligiblePopulation) * 100);
};

/**
 * Calculate default rate percentage
 */
export const calculateDefaultRate = (defaultersCount, totalChildren) => {
  if (!totalChildren || totalChildren === 0) return 0;
  return Math.round((defaultersCount / totalChildren) * 100);
};

/**
 * Calculate stock-out risk score
 */
export const calculateStockRisk = (currentStock, minStock, dailyConsumption) => {
  if (!dailyConsumption || dailyConsumption === 0) return 0;
  
  const daysOfSupply = currentStock / dailyConsumption;
  const riskRatio = minStock / dailyConsumption;
  
  if (daysOfSupply <= riskRatio * 0.5) return 100; // Critical
  if (daysOfSupply <= riskRatio) return 75; // High
  if (daysOfSupply <= riskRatio * 1.5) return 50; // Medium
  if (daysOfSupply <= riskRatio * 2) return 25; // Low
  
  return 0; // Adequate
};

/**
 * Calculate CHW performance score
 */
export const calculateCHWPerformance = (metrics) => {
  const {
    vaccinationsRecorded = 0,
    followupsCompleted = 0,
    defaultersIdentified = 0,
    newRegistrations = 0,
    targetVaccinations = 1,
    targetFollowups = 1
  } = metrics;

  const vaccinationScore = (vaccinationsRecorded / targetVaccinations) * 40;
  const followupScore = (followupsCompleted / targetFollowups) * 30;
  const defaulterScore = Math.min(defaultersIdentified * 5, 20);
  const registrationScore = Math.min(newRegistrations * 2, 10);

  return Math.min(100, vaccinationScore + followupScore + defaulterScore + registrationScore);
};

/**
 * Calculate growth percentile
 */
export const calculateGrowthPercentile = (weight, height, ageInMonths, gender) => {
  // Simplified growth chart calculation
  // In real app, use WHO growth standards
  const baseWeight = gender === 'male' ? 3.5 : 3.3;
  const baseHeight = 50;
  
  const expectedWeight = baseWeight + (ageInMonths * 0.7);
  const expectedHeight = baseHeight + (ageInMonths * 2.5);
  
  const weightRatio = weight / expectedWeight;
  const heightRatio = height / expectedHeight;
  
  const averageRatio = (weightRatio + heightRatio) / 2;
  
  if (averageRatio >= 1.2) return 95; // Above 95th percentile
  if (averageRatio >= 1.1) return 85; // 85th-94th percentile
  if (averageRatio >= 0.9) return 50; // 25th-84th percentile
  if (averageRatio >= 0.8) return 15; // 5th-24th percentile
  return 5; // Below 5th percentile
};

/**
 * Calculate due vaccines for a child
 */
export const calculateDueVaccines = (childBirthDate, completedVaccines = []) => {
  const ageInMonths = calculateAgeInMonths(childBirthDate);
  const dueVaccines = [];

  Object.entries(KENYA_VACCINE_SCHEDULE).forEach(([category, vaccines]) => {
    vaccines.forEach(vaccine => {
      const isCompleted = completedVaccines.some(v => v.vaccineId === vaccine.id);
      
      if (!isCompleted) {
        const isDue = ageInMonths >= vaccine.window.from && ageInMonths <= vaccine.window.to;
        const isOverdue = ageInMonths > vaccine.window.to;
        
        if (isDue || isOverdue) {
          dueVaccines.push({
            ...vaccine,
            category,
            status: isOverdue ? 'overdue' : 'due',
            dueDate: calculateDueDate(childBirthDate, vaccine.window.from)
          });
        }
      }
    });
  });

  return dueVaccines.sort((a, b) => a.window.from - b.window.from);
};

/**
 * Calculate due date for a vaccine
 */
export const calculateDueDate = (birthDate, monthsAfterBirth) => {
  const dueDate = new Date(birthDate);
  dueDate.setMonth(dueDate.getMonth() + monthsAfterBirth);
  return dueDate;
};

/**
 * Calculate days until due
 */
export const calculateDaysUntilDue = (dueDate, referenceDate = new Date()) => {
  const due = new Date(dueDate);
  const reference = new Date(referenceDate);
  const diffTime = due - reference;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Calculate SMS campaign success rate
 */
export const calculateSMSSuccessRate = (delivered, sent) => {
  if (!sent || sent === 0) return 0;
  return Math.round((delivered / sent) * 100);
};

/**
 * Calculate facility efficiency score
 */
export const calculateFacilityEfficiency = (metrics) => {
  const {
    coverageRate = 0,
    defaultRate = 0,
    stockAvailability = 0,
    dataQuality = 0
  } = metrics;

  const coverageScore = coverageRate * 0.4;
  const defaultScore = (100 - defaultRate) * 0.3;
  const stockScore = stockAvailability * 0.2;
  const dataScore = dataQuality * 0.1;

  return Math.min(100, coverageScore + defaultScore + stockScore + dataScore);
};

/**
 * Round number to specified decimals
 */
export const roundTo = (number, decimals = 2) => {
  return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Calculate average of numbers
 */
export const calculateAverage = (numbers) => {
  if (!numbers.length) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

/**
 * Calculate median of numbers
 */
export const calculateMedian = (numbers) => {
  if (!numbers.length) return 0;
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
};