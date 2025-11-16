// src/utils/constants/counties.js
export const COUNTIES = [
  'Baringo',
  'Bomet',
  'Bungoma',
  'Busia',
  'Elgeyo-Marakwet',
  'Embu',
  'Garissa',
  'Homa Bay',
  'Isiolo',
  'Kajiado',
  'Kakamega',
  'Kericho',
  'Kiambu',
  'Kilifi',
  'Kirinyaga',
  'Kisii',
  'Kisumu',
  'Kitui',
  'Kwale',
  'Laikipia',
  'Lamu',
  'Machakos',
  'Makueni',
  'Mandera',
  'Marsabit',
  'Meru',
  'Migori',
  'Mombasa',
  'Murang\'a',
  'Nairobi',
  'Nakuru',
  'Nandi',
  'Narok',
  'Nyamira',
  'Nyandarua',
  'Nyeri',
  'Samburu',
  'Siaya',
  'Taita-Taveta',
  'Tana River',
  'Tharaka-Nithi',
  'Trans Nzoia',
  'Turkana',
  'Uasin Gishu',
  'Vihiga',
  'Wajir',
  'West Pokot'
];

export const COUNTIES_BY_REGION = {
  'Nairobi': ['Nairobi'],
  'Central': ['Kiambu', 'Murang\'a', 'Nyandarua', 'Nyeri', 'Kirinyaga'],
  'Coast': ['Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita-Taveta'],
  'Eastern': ['Embu', 'Tharaka-Nithi', 'Meru', 'Isiolo', 'Marsabit', 'Machakos', 'Makueni', 'Kitui'],
  'North Eastern': ['Garissa', 'Wajir', 'Mandera'],
  'Nyanza': ['Kisumu', 'Kisii', 'Nyamira', 'Siaya', 'Homa Bay', 'Migori'],
  'Rift Valley': [
    'Nakuru', 'Uasin Gishu', 'Trans Nzoia', 'Elgeyo-Marakwet', 
    'Nandi', 'Baringo', 'Laikipia', 'Samburu', 'Turkana', 
    'West Pokot', 'Kericho', 'Bomet', 'Narok', 'Kajiado'
  ],
  'Western': ['Kakamega', 'Vihiga', 'Bungoma', 'Busia']
};

export const MAJOR_TOWNS = {
  'Nairobi': ['Nairobi Central', 'Westlands', 'Langata', 'Dagoretti', 'Kasarani'],
  'Mombasa': ['Mombasa Island', 'Likoni', 'Kisauni', 'Changamwe'],
  'Kisumu': ['Kisumu Central', 'Kisumu East', 'Kisumu West'],
  'Nakuru': ['Nakuru Town', 'Naivasha', 'Molo'],
  'Eldoret': ['Eldoret Town', 'Kapsabet'],
  'Thika': ['Thika Town', 'Ruiru'],
  'Malindi': ['Malindi Town', 'Watamu'],
  'Kitale': ['Kitale Town'],
  'Garissa': ['Garissa Town'],
  'Kakamega': ['Kakamega Town'],
  'Embu': ['Embu Town'],
  'Nyeri': ['Nyeri Town'],
  'Meru': ['Meru Town'],
  'Machakos': ['Machakos Town'],
  'Kitui': ['Kitui Town']
};

export const COUNTY_CODES = {
  'Nairobi': '001',
  'Mombasa': '002',
  'Kisumu': '003',
  'Nakuru': '004',
  'Eldoret': '005',
  'Thika': '006',
  'Malindi': '007',
  'Kitale': '008',
  'Garissa': '009',
  'Kakamega': '010'
};

export const getCountyByCode = (code) => {
  return Object.entries(COUNTY_CODES).find(([county, countyCode]) => countyCode === code)?.[0] || null;
};

export const getCountiesByRegion = (region) => {
  return COUNTIES_BY_REGION[region] || [];
};

export const isValidCounty = (county) => {
  return COUNTIES.includes(county);
};

export const getNearestCounties = (county, limit = 5) => {
  // Simple implementation - in real app, use geographic coordinates
  const regions = Object.entries(COUNTIES_BY_REGION);
  const currentRegion = regions.find(([region, counties]) => counties.includes(county));
  
  if (!currentRegion) return [];
  
  return currentRegion[1].filter(c => c !== county).slice(0, limit);
};