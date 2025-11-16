// src/data/mockData/vaccinations.js
export const mockVaccinations = [
  {
    id: 1,
    childId: 1,
    childName: 'Maria Auma',
    vaccineId: 'bcg',
    vaccineName: 'BCG',
    dateGiven: '2023-05-15',
    batchNumber: 'BCG-2023-001',
    healthWorker: 'Nurse Grace Wambui',
    facility: 'Kibera Community Health Center',
    nextVisitDate: '2023-06-15',
    status: 'completed',
    notes: 'Given at birth'
  },
  {
    id: 2,
    childId: 1,
    childName: 'Maria Auma',
    vaccineId: 'opv0',
    vaccineName: 'OPV 0',
    dateGiven: '2023-05-15',
    batchNumber: 'OPV-2023-001',
    healthWorker: 'Nurse Grace Wambui',
    facility: 'Kibera Community Health Center',
    nextVisitDate: '2023-06-15',
    status: 'completed',
    notes: 'Given at birth'
  },
  {
    id: 3,
    childId: 1,
    childName: 'Maria Auma',
    vaccineId: 'pentavalent1',
    vaccineName: 'Pentavalent 1',
    dateGiven: '2023-06-15',
    batchNumber: 'PENT-2023-001',
    healthWorker: 'David Omondi',
    facility: 'Kibera Community Health Center',
    nextVisitDate: '2023-07-15',
    status: 'completed',
    notes: 'Child responded well'
  },
  {
    id: 4,
    childId: 2,
    childName: 'David Ochieng',
    vaccineId: 'measles1',
    vaccineName: 'Measles Rubella 1',
    dateGiven: '2023-02-15',
    batchNumber: 'MR-2023-001',
    healthWorker: 'Dr. James Mwangi',
    facility: 'Mbagathi County Hospital',
    nextVisitDate: '2023-08-15',
    status: 'completed',
    notes: 'Routine vaccination'
  },
  {
    id: 5,
    childId: 3,
    childName: 'John Kamau',
    vaccineId: 'pentavalent2',
    vaccineName: 'Pentavalent 2',
    dateGiven: '2023-09-28',
    batchNumber: 'PENT-2023-002',
    healthWorker: 'Grace Wanjiku',
    facility: 'Mathare Health Center',
    nextVisitDate: '2023-10-28',
    status: 'completed',
    notes: 'Slight fever observed'
  }
];

export const upcomingVaccinations = [
  {
    id: 6,
    childId: 1,
    childName: 'Maria Auma',
    vaccineId: 'measles1',
    vaccineName: 'Measles Rubella 1',
    dueDate: '2023-11-15',
    daysUntilDue: 12,
    status: 'upcoming',
    riskLevel: 'low'
  },
  {
    id: 7,
    childId: 3,
    childName: 'John Kamau',
    vaccineId: 'pentavalent3',
    vaccineName: 'Pentavalent 3',
    dueDate: '2023-10-28',
    daysUntilDue: -2,
    status: 'overdue',
    riskLevel: 'high'
  },
  {
    id: 8,
    childId: 2,
    childName: 'David Ochieng',
    vaccineId: 'yellowfever',
    vaccineName: 'Yellow Fever',
    dueDate: '2023-12-01',
    daysUntilDue: 45,
    status: 'upcoming',
    riskLevel: 'low'
  }
];

export const defaulters = [
  {
    id: 1,
    childId: 4,
    childName: 'Faith Mumbi',
    motherName: 'Mary Wambui',
    motherPhone: '+254734567890',
    vaccineName: 'Pentavalent 3',
    dueDate: '2023-09-15',
    daysOverdue: 40,
    riskLevel: 'high',
    chwAssigned: 'Paul Kamau',
    followupAttempts: 2,
    lastFollowup: '2023-10-10'
  },
  {
    id: 2,
    childId: 5,
    childName: 'Kevin Otieno',
    motherName: 'Grace Mwende',
    motherPhone: '+254723456789',
    vaccineName: 'Measles Rubella 1',
    dueDate: '2023-10-01',
    daysOverdue: 24,
    riskLevel: 'medium',
    chwAssigned: 'David Omondi',
    followupAttempts: 1,
    lastFollowup: '2023-10-20'
  }
];