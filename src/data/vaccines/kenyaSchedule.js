// src/data/vaccines/kenyaSchedule.js
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
      site: 'Right upper arm',
      protection: 'Severe forms of tuberculosis',
      efficacy: '70-80%',
      commonReactions: 'Small sore, swelling at injection site'
    },
    {
      id: 'opv0',
      name: 'OPV 0',
      disease: 'Polio',
      description: 'Oral Polio Vaccine dose 0',
      dueAge: 'At birth',
      window: { from: 0, to: 1 },
      doses: 1,
      route: 'Oral',
      protection: 'Poliomyelitis',
      efficacy: '>95%',
      commonReactions: 'None'
    }
  ],
  '6Weeks': [
    {
      id: 'opv1',
      name: 'OPV 1',
      disease: 'Polio',
      description: 'Oral Polio Vaccine dose 1',
      dueAge: '6 weeks',
      window: { from: 1.5, to: 2.5 },
      doses: 1,
      route: 'Oral',
      protection: 'Poliomyelitis',
      efficacy: '>95%',
      commonReactions: 'None'
    },
    {
      id: 'pentavalent1',
      name: 'Pentavalent 1',
      disease: 'Diphtheria, Tetanus, Pertussis, Hepatitis B, Hib',
      description: 'Combined vaccine protecting against 5 diseases',
      dueAge: '6 weeks',
      window: { from: 1.5, to: 2.5 },
      doses: 1,
      route: 'Intramuscular',
      site: 'Left thigh',
      protection: 'Multiple childhood diseases',
      efficacy: '85-95%',
      commonReactions: 'Fever, swelling, pain at injection site'
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
      site: 'Right thigh',
      protection: 'Pneumonia, meningitis, sepsis',
      efficacy: '>80%',
      commonReactions: 'Fever, redness at injection site'
    },
    {
      id: 'rota1',
      name: 'Rota 1',
      disease: 'Rotavirus diarrhea',
      description: 'Rotavirus Vaccine',
      dueAge: '6 weeks',
      window: { from: 1.5, to: 2.5 },
      doses: 1,
      route: 'Oral',
      protection: 'Severe rotavirus diarrhea',
      efficacy: '85-98%',
      commonReactions: 'Mild diarrhea, irritability'
    }
  ],
  '10Weeks': [
    {
      id: 'opv2',
      name: 'OPV 2',
      disease: 'Polio',
      description: 'Oral Polio Vaccine dose 2',
      dueAge: '10 weeks',
      window: { from: 2.5, to: 3.5 },
      doses: 1,
      route: 'Oral',
      protection: 'Poliomyelitis',
      efficacy: '>95%',
      commonReactions: 'None'
    },
    {
      id: 'pentavalent2',
      name: 'Pentavalent 2',
      disease: 'Diphtheria, Tetanus, Pertussis, Hepatitis B, Hib',
      description: 'Combined vaccine protecting against 5 diseases',
      dueAge: '10 weeks',
      window: { from: 2.5, to: 3.5 },
      doses: 1,
      route: 'Intramuscular',
      site: 'Left thigh',
      protection: 'Multiple childhood diseases',
      efficacy: '85-95%',
      commonReactions: 'Fever, swelling, pain at injection site'
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
      site: 'Right thigh',
      protection: 'Pneumonia, meningitis, sepsis',
      efficacy: '>80%',
      commonReactions: 'Fever, redness at injection site'
    }
  ],
  '14Weeks': [
    {
      id: 'opv3',
      name: 'OPV 3',
      disease: 'Polio',
      description: 'Oral Polio Vaccine dose 3',
      dueAge: '14 weeks',
      window: { from: 3.5, to: 4.5 },
      doses: 1,
      route: 'Oral',
      protection: 'Poliomyelitis',
      efficacy: '>95%',
      commonReactions: 'None'
    },
    {
      id: 'pentavalent3',
      name: 'Pentavalent 3',
      disease: 'Diphtheria, Tetanus, Pertussis, Hepatitis B, Hib',
      description: 'Combined vaccine protecting against 5 diseases',
      dueAge: '14 weeks',
      window: { from: 3.5, to: 4.5 },
      doses: 1,
      route: 'Intramuscular',
      site: 'Left thigh',
      protection: 'Multiple childhood diseases',
      efficacy: '85-95%',
      commonReactions: 'Fever, swelling, pain at injection site'
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
      site: 'Right thigh',
      protection: 'Pneumonia, meningitis, sepsis',
      efficacy: '>80%',
      commonReactions: 'Fever, redness at injection site'
    },
    {
      id: 'rota2',
      name: 'Rota 2',
      disease: 'Rotavirus diarrhea',
      description: 'Rotavirus Vaccine',
      dueAge: '14 weeks',
      window: { from: 3.5, to: 4.5 },
      doses: 1,
      route: 'Oral',
      protection: 'Severe rotavirus diarrhea',
      efficacy: '85-98%',
      commonReactions: 'Mild diarrhea, irritability'
    }
  ],
  '9Months': [
    {
      id: 'measles1',
      name: 'Measles Rubella 1',
      disease: 'Measles and Rubella',
      description: 'Measles-Rubella Vaccine',
      dueAge: '9 months',
      window: { from: 9, to: 12 },
      doses: 1,
      route: 'Subcutaneous',
      site: 'Left upper arm',
      protection: 'Measles and rubella',
      efficacy: '93% after first dose',
      commonReactions: 'Fever, rash 7-12 days after vaccination'
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
      site: 'Left upper arm',
      protection: 'Yellow fever',
      efficacy: '>99%',
      commonReactions: 'Headache, muscle aches, mild fever'
    }
  ],
  '18Months': [
    {
      id: 'measles2',
      name: 'Measles Rubella 2',
      disease: 'Measles and Rubella',
      description: 'Measles-Rubella Vaccine',
      dueAge: '18 months',
      window: { from: 18, to: 24 },
      doses: 1,
      route: 'Subcutaneous',
      site: 'Left upper arm',
      protection: 'Measles and rubella',
      efficacy: '97% after second dose',
      commonReactions: 'Fever, rash 7-12 days after vaccination'
    }
  ]
};

export const VACCINE_CATEGORIES = {
  BIRTH: 'birth',
  SIX_WEEKS: '6Weeks',
  TEN_WEEKS: '10Weeks',
  FOURTEEN_WEEKS: '14Weeks',
  NINE_MONTHS: '9Months',
  EIGHTEEN_MONTHS: '18Months'
};

export const getVaccineByAge = (ageInMonths) => {
  const categories = Object.entries(KENYA_VACCINE_SCHEDULE);
  const dueVaccines = [];

  for (const [category, vaccines] of categories) {
    for (const vaccine of vaccines) {
      if (ageInMonths >= vaccine.window.from && ageInMonths <= vaccine.window.to) {
        dueVaccines.push({ ...vaccine, category });
      }
    }
  }

  return dueVaccines;
};