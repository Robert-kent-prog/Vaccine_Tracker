// src/utils/constants/userRoles.js
export const USER_ROLES = {
  'mother': 'Mother/Parent',
  'health-worker': 'Community Health Worker',
  'hospital': 'Hospital Staff',
  'admin': 'System Administrator'
};

export const ROLE_PERMISSIONS = {
  mother: {
    canViewChildren: true,
    canRegisterChildren: true,
    canViewVaccinationSchedule: true,
    canManageReminders: true,
    canViewReports: false,
    canManageUsers: false,
    canManageSystem: false,
    canRecordVaccinations: false,
    canViewAnalytics: false
  },
  'health-worker': {
    canViewChildren: true,
    canRegisterChildren: true,
    canViewVaccinationSchedule: true,
    canManageReminders: true,
    canViewReports: true,
    canManageUsers: false,
    canManageSystem: false,
    canRecordVaccinations: true,
    canViewAnalytics: true
  },
  hospital: {
    canViewChildren: true,
    canRegisterChildren: true,
    canViewVaccinationSchedule: true,
    canManageReminders: true,
    canViewReports: true,
    canManageUsers: false,
    canManageSystem: false,
    canRecordVaccinations: true,
    canViewAnalytics: true
  },
  admin: {
    canViewChildren: true,
    canRegisterChildren: true,
    canViewVaccinationSchedule: true,
    canManageReminders: true,
    canViewReports: true,
    canManageUsers: true,
    canManageSystem: true,
    canRecordVaccinations: true,
    canViewAnalytics: true
  }
};

export const ROLE_HIERARCHY = {
  mother: 1,
  'health-worker': 2,
  hospital: 3,
  admin: 4
};

export const getUserRoleLabel = (role) => {
  return USER_ROLES[role] || 'Unknown Role';
};

export const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.mother;
};

export const canAccessFeature = (role, feature) => {
  const permissions = getRolePermissions(role);
  return permissions[feature] || false;
};

export const isRoleHigherOrEqual = (userRole, requiredRole) => {
  const userLevel = ROLE_HIERARCHY[userRole] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole] || 0;
  return userLevel >= requiredLevel;
};

export const ROLE_COLORS = {
  mother: 'blue',
  'health-worker': 'green',
  hospital: 'red',
  admin: 'purple'
};

export const getRoleColor = (role) => {
  return ROLE_COLORS[role] || 'gray';
};

export const VALID_ROLES = Object.keys(USER_ROLES);

export const isvalidRole = (role) => {
  return VALID_ROLES.includes(role);
};

export const ROLE_DESCRIPTIONS = {
  mother: 'Parents can register their children and track vaccination schedules',
  'health-worker': 'Community Health Workers can record vaccinations and follow up with families',
  hospital: 'Hospital staff can manage vaccine stock and view coverage reports',
  admin: 'Administrators have full system access and can manage all users'
};