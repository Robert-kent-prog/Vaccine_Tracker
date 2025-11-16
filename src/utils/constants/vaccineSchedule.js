// src/utils/constants/vaccineSchedule.js
export const KENYA_VACCINE_SCHEDULE = {
  birth: [
    {
      id: 'bcg',
      name: 'BCG',
      disease: 'Tuberculosis',
      description: 'Bacillus Calmette-Guérin vaccine',
      dueAge: 'At birth',
      window: { from: 0, to: 1 }, // in months
      doses: 1,
      route: 'Intradermal',
      site: 'Right upper arm'
    },
    {
      id: 'opv0',
      name: 'OPV 0',
      disease: 'Polio',
      description: 'Oral Polio Vaccine dose 0',
      dueAge: 'At birth',
      window: { from: 0, to: 1 },
      doses: 1,
      route: 'Oral'
    }
  ],
  6Weeks: [
    {
      id: 'opv1',
      name: 'OPV 1',
      disease: 'Polio',
      description: 'Oral Polio Vaccine dose 1',
      dueAge: '6 weeks',
      window: { from: 1.5, to: 2.5 },
      doses: 1,
      route: 'Oral'
    },
    {
      id: 'pentavalent1',
      name: 'Pentavalent 1',
      disease: 'Diphtheria, Tetanus, Pertussis, Hepatitis B, Hib',
      description: 'Combined vaccine',
      dueAge: '6 weeks',
      window: { from: 1.5, to: 2.5 },
      doses: 1,
      route: 'Intramuscular',
      site: 'Left thigh'
    },
    {
      id: 'pcv1',
      name: 'PCV 1',
      disease: 'Pneumococcal disease',
      description: 'Pneumococcal Conjugate Vaccine',
      dueAge: '6 weeks',
      window: { from: 1.5, to: 2.5 },
      doses: 1,
      route: 'Intramuscular',
      site: 'Right thigh'
    },
    {
      id: 'rota1',
      name: 'Rota 1',
      disease: 'Rotavirus diarrhea',
      description: 'Rotavirus Vaccine',
      dueAge: '6 weeks',
      window: { from: 1.5, to: 2.5 },
      doses: 1,
      route: 'Oral'
    }
  ],
  10Weeks: [
    {
      id: 'opv2',
      name: 'OPV 2',
      disease: 'Polio',
      description: 'Oral Polio Vaccine dose 2',
      dueAge: '10 weeks',
      window: { from: 2.5, to: 3.5 },
      doses: 1,
      route: 'Oral'
    },
    {
      id: 'pentavalent2',
      name: 'Pentavalent 2',
      disease: 'Diphtheria, Tetanus, Pertussis, Hepatitis B, Hib',
      description: 'Combined vaccine',
      dueAge: '10 weeks',
      window: { from: 2.5, to: 3.5 },
      doses: 1,
      route: 'Intramuscular',
      site: 'Left thigh'
    },
    {
      id: 'pcv2',
      name: 'PCV 2',
      disease: 'Pneumococcal disease',
      description: 'Pneumococcal Conjugate Vaccine',
      dueAge: '10 weeks',
      window: { from: 2.5, to: 3.5 },
      doses: 1,
      route: 'Intramuscular',
      site: 'Right thigh'
    }
  ],
  14Weeks: [
    {
      id: 'opv3',
      name: 'OPV 3',
      disease: 'Polio',
      description: 'Oral Polio Vaccine dose 3',
      dueAge: '14 weeks',
      window: { from: 3.5, to: 4.5 },
      doses: 1,
      route: 'Oral'
    },
    {
      id: 'pentavalent3',
      name: 'Pentavalent 3',
      disease: 'Diphtheria, Tetanus, Pertussis, Hepatitis B, Hib',
      description: 'Combined vaccine',
      dueAge: '14 weeks',
      window: { from: 3.5, to: 4.5 },
      doses: 1,
      route: 'Intramuscular',
      site: 'Left thigh'
    },
    {
      id: 'pcv3',
      name: 'PCV 3',
      disease: 'Pneumococcal disease',
      description: 'Pneumococcal Conjugate Vaccine',
      dueAge: '14 weeks',
      window: { from: 3.5, to: 4.5 },
      doses: 1,
      route: 'Intramuscular',
      site: 'Right thigh'
    },
    {
      id: 'rota2',
      name: 'Rota 2',
      disease: 'Rotavirus diarrhea',
      description: 'Rotavirus Vaccine',
      dueAge: '14 weeks',
      window: { from: 3.5, to: 4.5 },
      doses: 1,
      route: 'Oral'
    }
  ],
  9Months: [
    {
      id: 'measles1',
      name: 'Measles Rubella 1',
      disease: 'Measles and Rubella',
      description: 'Measles-Rubella Vaccine',
      dueAge: '9 months',
      window: { from: 9, to: 12 },
      doses: 1,
      route: 'Subcutaneous',
      site: 'Left upper arm'
    },
    {
      id: 'yellowfever',
      name: 'Yellow Fever',
      disease: 'Yellow Fever',
      description: 'Yellow Fever Vaccine',
      dueAge: '9 months',
      window: { from: 9, to: 12 },
      doses: 1,
      route: 'Subcutaneous',
      site: 'Left upper arm'
    }
  ],
  18Months: [
    {
      id: 'measles2',
      name: 'Measles Rubella 2',
      disease: 'Measles and Rubella',
      description: 'Measles-Rubella Vaccine',
      dueAge: '18 months',
      window: { from: 18, to: 24 },
      doses: 1,
      route: 'Subcutaneous',
      site: 'Left upper arm'
    }
  ]
};

export const VACCINE_STATUS = {
  PENDING: 'pending',
  GIVEN: 'given',
  MISSED: 'missed',
  OVERDUE: 'overdue',
  SCHEDULED: 'scheduled'
};

export const VACCINE_COLORS = {
  pending: '#f59e0b',
  given: '#10b981',
  missed: '#ef4444',
  overdue: '#dc2626',
  scheduled: '#3b82f6'
};