// src/data/mockData/facilities.js
export const mockFacilities = [
  {
    id: 1,
    name: 'Kenyatta National Hospital',
    type: 'National Referral',
    county: 'Nairobi',
    subCounty: 'Nairobi West',
    ward: 'Mbagathi',
    facilityCode: 'KNH-001',
    contactPerson: 'Dr. Sarah Kimani',
    phone: '+254711223344',
    email: 'info@knh.or.ke',
    status: 'active',
    vaccines: [
      { name: 'BCG', stock: 450, minStock: 100, status: 'adequate' },
      { name: 'OPV', stock: 380, minStock: 150, status: 'adequate' },
      { name: 'Pentavalent', stock: 320, minStock: 120, status: 'adequate' },
      { name: 'PCV', stock: 280, minStock: 100, status: 'adequate' },
      { name: 'Measles', stock: 95, minStock: 100, status: 'low' }
    ],
    coverage: {
      BCG: 98,
      OPV: 92,
      Pentavalent: 88,
      PCV: 85,
      Measles: 78
    }
  },
  {
    id: 2,
    name: 'Mbagathi County Hospital',
    type: 'County Hospital',
    county: 'Nairobi',
    subCounty: 'Langata',
    ward: 'Mbagathi',
    facilityCode: 'MBG-002',
    contactPerson: 'Dr. James Mwangi',
    phone: '+254722334455',
    email: 'mbagathi@health.go.ke',
    status: 'active',
    vaccines: [
      { name: 'BCG', stock: 120, minStock: 50, status: 'adequate' },
      { name: 'OPV', stock: 85, minStock: 40, status: 'adequate' },
      { name: 'Pentavalent', stock: 45, minStock: 30, status: 'low' },
      { name: 'PCV', stock: 35, minStock: 25, status: 'low' },
      { name: 'Measles', stock: 20, minStock: 20, status: 'critical' }
    ],
    coverage: {
      BCG: 95,
      OPV: 88,
      Pentavalent: 82,
      PCV: 78,
      Measles: 72
    }
  },
  {
    id: 3,
    name: 'Kibera Community Health Center',
    type: 'Health Center',
    county: 'Nairobi',
    subCounty: 'Kibera',
    ward: 'Kibera',
    facilityCode: 'KIB-003',
    contactPerson: 'Nurse Grace Wambui',
    phone: '+254733445566',
    email: 'kibera.chc@health.go.ke',
    status: 'active',
    vaccines: [
      { name: 'BCG', stock: 65, minStock: 30, status: 'adequate' },
      { name: 'OPV', stock: 42, minStock: 25, status: 'adequate' },
      { name: 'Pentavalent', stock: 28, minStock: 20, status: 'low' },
      { name: 'PCV', stock: 22, minStock: 15, status: 'low' },
      { name: 'Measles', stock: 12, minStock: 15, status: 'critical' }
    ],
    coverage: {
      BCG: 92,
      OPV: 85,
      Pentavalent: 78,
      PCV: 75,
      Measles: 68
    }
  }
];

export const facilityTypes = [
  'National Referral',
  'County Hospital',
  'Sub-County Hospital',
  'Health Center',
  'Dispensary',
  'Clinic',
  'Mobile Clinic'
];