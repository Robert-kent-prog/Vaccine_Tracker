// src/utils/constants/routes.js
export const ROUTES = {
  // Public routes
  PUBLIC: {
    LOGIN: '/',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password'
  },

  // Mother routes
  MOTHER: {
    DASHBOARD: '/mother',
    CHILD_PROFILE: '/mother/child/:childId',
    VACCINATION_SCHEDULE: '/mother/vaccination-schedule',
    REMINDERS: '/mother/reminders',
    PROFILE: '/mother/profile'
  },

  // Health Worker routes
  HEALTH_WORKER: {
    DASHBOARD: '/health-worker',
    ASSIGNED_MOTHERS: '/health-worker/assigned-mothers',
    RECORD_VACCINATION: '/health-worker/record-vaccination',
    DEFAULTED_CHILDREN: '/health-worker/defaulted-children',
    FIELD_REPORTS: '/health-worker/field-reports',
    PROFILE: '/health-worker/profile'
  },

  // Hospital routes
  HOSPITAL: {
    DASHBOARD: '/hospital',
    VACCINE_STOCK: '/hospital/vaccine-stock',
    COVERAGE_REPORTS: '/hospital/coverage-reports',
    FACILITY_MANAGEMENT: '/hospital/facility-management',
    PROFILE: '/hospital/profile'
  },

  // Admin routes
  ADMIN: {
    DASHBOARD: '/admin',
    SYSTEM_ANALYTICS: '/admin/system-analytics',
    USER_MANAGEMENT: '/admin/user-management',
    SETTINGS: '/admin/settings',
    PROFILE: '/admin/profile'
  },

  // Shared routes
  SHARED: {
    NOTIFICATIONS: '/notifications',
    PROFILE: '/profile',
    SETTINGS: '/settings'
  }
};

export const ROLE_ROUTES = {
  mother: [
    { path: ROUTES.MOTHER.DASHBOARD, label: 'Dashboard', icon: 'Home' },
    { path: ROUTES.MOTHER.VACCINATION_SCHEDULE, label: 'Vaccination Schedule', icon: 'Calendar' },
    { path: ROUTES.MOTHER.REMINDERS, label: 'Reminders', icon: 'Bell' }
  ],
  'health-worker': [
    { path: ROUTES.HEALTH_WORKER.DASHBOARD, label: 'Dashboard', icon: 'Home' },
    { path: ROUTES.HEALTH_WORKER.ASSIGNED_MOTHERS, label: 'Assigned Mothers', icon: 'Users' },
    { path: ROUTES.HEALTH_WORKER.RECORD_VACCINATION, label: 'Record Vaccination', icon: 'Shield' },
    { path: ROUTES.HEALTH_WORKER.DEFAULTED_CHILDREN, label: 'Defaulted Children', icon: 'AlertTriangle' },
    { path: ROUTES.HEALTH_WORKER.FIELD_REPORTS, label: 'Field Reports', icon: 'FileText' }
  ],
  hospital: [
    { path: ROUTES.HOSPITAL.DASHBOARD, label: 'Dashboard', icon: 'Home' },
    { path: ROUTES.HOSPITAL.VACCINE_STOCK, label: 'Vaccine Stock', icon: 'Package' },
    { path: ROUTES.HOSPITAL.COVERAGE_REPORTS, label: 'Coverage Reports', icon: 'BarChart3' },
    { path: ROUTES.HOSPITAL.FACILITY_MANAGEMENT, label: 'Facility Management', icon: 'Building' }
  ],
  admin: [
    { path: ROUTES.ADMIN.DASHBOARD, label: 'Dashboard', icon: 'Home' },
    { path: ROUTES.ADMIN.SYSTEM_ANALYTICS, label: 'System Analytics', icon: 'BarChart3' },
    { path: ROUTES.ADMIN.USER_MANAGEMENT, label: 'User Management', icon: 'Users' },
    { path: ROUTES.ADMIN.SETTINGS, label: 'Settings', icon: 'Settings' }
  ]
};

export const getRoutesForRole = (role) => {
  return ROLE_ROUTES[role] || [];
};

export const isRouteAllowed = (route, userRole) => {
  const publicRoutes = Object.values(ROUTES.PUBLIC);
  if (publicRoutes.includes(route)) return true;

  const roleRoutes = getRoutesForRole(userRole).map(r => r.path);
  const sharedRoutes = Object.values(ROUTES.SHARED);

  return roleRoutes.includes(route) || sharedRoutes.includes(route);
};

export const getDefaultRouteForRole = (role) => {
  const routes = getRoutesForRole(role);
  return routes[0]?.path || ROUTES.PUBLIC.LOGIN;
};

export const ROUTE_PERMISSIONS = {
  [ROUTES.MOTHER.DASHBOARD]: ['mother'],
  [ROUTES.MOTHER.VACCINATION_SCHEDULE]: ['mother'],
  [ROUTES.MOTHER.REMINDERS]: ['mother'],
  [ROUTES.HEALTH_WORKER.DASHBOARD]: ['health-worker'],
  [ROUTES.HEALTH_WORKER.ASSIGNED_MOTHERS]: ['health-worker'],
  [ROUTES.HEALTH_WORKER.RECORD_VACCINATION]: ['health-worker'],
  [ROUTES.HEALTH_WORKER.DEFAULTED_CHILDREN]: ['health-worker'],
  [ROUTES.HEALTH_WORKER.FIELD_REPORTS]: ['health-worker'],
  [ROUTES.HOSPITAL.DASHBOARD]: ['hospital'],
  [ROUTES.HOSPITAL.VACCINE_STOCK]: ['hospital'],
  [ROUTES.HOSPITAL.COVERAGE_REPORTS]: ['hospital'],
  [ROUTES.HOSPITAL.FACILITY_MANAGEMENT]: ['hospital'],
  [ROUTES.ADMIN.DASHBOARD]: ['admin'],
  [ROUTES.ADMIN.SYSTEM_ANALYTICS]: ['admin'],
  [ROUTES.ADMIN.USER_MANAGEMENT]: ['admin'],
  [ROUTES.ADMIN.SETTINGS]: ['admin'],
  [ROUTES.SHARED.NOTIFICATIONS]: ['mother', 'health-worker', 'hospital', 'admin'],
  [ROUTES.SHARED.PROFILE]: ['mother', 'health-worker', 'hospital', 'admin'],
  [ROUTES.SHARED.SETTINGS]: ['mother', 'health-worker', 'hospital', 'admin']
};