// src/data/mockData/chw.js
export const mockCHWs = [
  {
    id: 1,
    firstName: 'David',
    lastName: 'Omondi',
    phone: '+254712345678',
    email: 'david.omondi@example.com',
    county: 'Nairobi',
    subCounty: 'Kibera',
    facility: 'Kibera Community Health Unit',
    chwId: 'CHW-001',
    status: 'active',
    dateJoined: '2022-01-15',
    assignedMothers: 24,
    coverageRate: 85,
    lastActive: '2023-10-25'
  },
  {
    id: 2,
    firstName: 'Grace',
    lastName: 'Wanjiku',
    phone: '+254723456789',
    email: 'grace.wanjiku@example.com',
    county: 'Nairobi',
    subCounty: 'Mathare',
    facility: 'Mathare Health Center',
    chwId: 'CHW-002',
    status: 'active',
    dateJoined: '2022-03-20',
    assignedMothers: 18,
    coverageRate: 78,
    lastActive: '2023-10-24'
  },
  {
    id: 3,
    firstName: 'Paul',
    lastName: 'Kamau',
    phone: '+254734567890',
    email: 'paul.kamau@example.com',
    county: 'Kiambu',
    subCounty: 'Thika',
    facility: 'Thika Level 5 Hospital',
    chwId: 'CHW-003',
    status: 'inactive',
    dateJoined: '2022-02-10',
    assignedMothers: 0,
    coverageRate: 0,
    lastActive: '2023-09-15'
  },
  {
    id: 4,
    firstName: 'Sarah',
    lastName: 'Achieng',
    phone: '+254745678901',
    email: 'sarah.achieng@example.com',
    county: 'Kisumu',
    subCounty: 'Kisumu Central',
    facility: 'Jaramogi Oginga Hospital',
    chwId: 'CHW-004',
    status: 'active',
    dateJoined: '2022-04-05',
    assignedMothers: 22,
    coverageRate: 82,
    lastActive: '2023-10-25'
  }
];

export const mockCHWPerformance = [
  {
    chwId: 1,
    month: '2023-10',
    vaccinationsRecorded: 45,
    followupsCompleted: 38,
    defaultersIdentified: 7,
    newRegistrations: 12,
    performanceScore: 92
  },
  {
    chwId: 2,
    month: '2023-10',
    vaccinationsRecorded: 32,
    followupsCompleted: 28,
    defaultersIdentified: 4,
    newRegistrations: 8,
    performanceScore: 85
  }
];