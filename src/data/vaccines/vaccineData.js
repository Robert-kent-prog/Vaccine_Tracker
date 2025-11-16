// src/data/vaccines/vaccineData.js
export const VACCINE_DATA = {
  bcg: {
    id: 'bcg',
    name: 'BCG',
    fullName: 'Bacillus Calmette-Guérin',
    manufacturer: 'Various',
    storageTemp: '2-8°C',
    shelfLife: '24 months',
    dosage: '0.05ml',
    contraindications: [
      'Symptomatic HIV infection',
      'Generalized malignant disease',
      'Immunosuppressive therapy'
    ],
    precautions: [
      'Premature infants',
      'Low birth weight (<2000g)',
      'Local skin infections'
    ]
  },
  opv: {
    id: 'opv',
    name: 'OPV',
    fullName: 'Oral Polio Vaccine',
    manufacturer: 'Various',
    storageTemp: '-20°C (long-term), 2-8°C (short-term)',
    shelfLife: '24 months',
    dosage: '2 drops',
    contraindications: [
      'Immunodeficiency diseases',
      'Immunosuppressive therapy',
      'Household contacts with immunodeficiency'
    ],
    precautions: [
      'Acute diarrhea',
      'Vomiting immediately after administration'
    ]
  },
  pentavalent: {
    id: 'pentavalent',
    name: 'Pentavalent',
    fullName: 'Diphtheria-Tetanus-Pertussis-Hepatitis B-Hib',
    manufacturer: 'Various',
    storageTemp: '2-8°C',
    shelfLife: '24 months',
    dosage: '0.5ml',
    contraindications: [
      'Severe allergic reaction to previous dose',
      'Encephalopathy within 7 days of previous dose'
    ],
    precautions: [
      'Progressive neurological disorder',
      'Fever >40.5°C within 48 hours of previous dose',
      'Collapse or shock-like state within 48 hours of previous dose'
    ]
  },
  pcv: {
    id: 'pcv',
    name: 'PCV',
    fullName: 'Pneumococcal Conjugate Vaccine',
    manufacturer: 'Pfizer',
    storageTemp: '2-8°C',
    shelfLife: '24 months',
    dosage: '0.5ml',
    contraindications: [
      'Severe allergic reaction to previous dose'
    ],
    precautions: [
      'Moderate or severe acute illness',
      'Coagulation disorders'
    ]
  },
  measles: {
    id: 'measles',
    name: 'Measles Rubella',
    fullName: 'Measles-Rubella Vaccine',
    manufacturer: 'Serum Institute of India',
    storageTemp: '2-8°C',
    shelfLife: '24 months',
    dosage: '0.5ml',
    contraindications: [
      'Severe immunodeficiency',
      'Pregnancy',
      'Severe allergic reaction to previous dose'
    ],
    precautions: [
      'Recent blood transfusion',
      'Tuberculosis treatment',
      'High-dose corticosteroid therapy'
    ]
  }
};

export const VACCINE_STOCK_STATUS = {
  ADEQUATE: { label: 'Adequate', color: 'green', threshold: 1.5 },
  LOW: { label: 'Low', color: 'yellow', threshold: 1.0 },
  CRITICAL: { label: 'Critical', color: 'red', threshold: 0.5 }
};

export const calculateStockStatus = (currentStock, minStock) => {
  const ratio = currentStock / minStock;
  
  if (ratio >= VACCINE_STOCK_STATUS.ADEQUATE.threshold) {
    return VACCINE_STOCK_STATUS.ADEQUATE;
  } else if (ratio >= VACCINE_STOCK_STATUS.LOW.threshold) {
    return VACCINE_STOCK_STATUS.LOW;
  } else {
    return VACCINE_STOCK_STATUS.CRITICAL;
  }
};