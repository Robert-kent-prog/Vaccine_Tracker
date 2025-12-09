// src/utils/roleUtils.js
export const normalizeRole = (role) => {
  if (!role) return "";

  const normalized = role.toLowerCase().trim();

  // Map all possible role variations to standard frontend roles
  if (normalized === "hospital_staff" || normalized === "hospital") {
    return "hospital";
  }
  if (normalized === "health_worker" || normalized === "health-worker") {
    return "health-worker";
  }
  if (normalized === "mother" || normalized === "mothers") {
    return "mother";
  }
  if (normalized === "admin") {
    return "admin";
  }

  return normalized;
};

export const getDashboardRoute = (role) => {
  const normalizedRole = normalizeRole(role);

  switch (normalizedRole) {
    case "hospital":
      return "/hospital";
    case "health-worker":
      return "/health-worker";
    case "mother":
      return "/mother";
    case "admin":
      return "/admin";
    default:
      return "/dashboard";
  }
};

export const getBackendRole = (frontendRole) => {
  // Convert frontend role to backend role format
  switch (frontendRole) {
    case "health-worker":
      return "health_worker"; // frontend hyphen → backend underscore
    case "hospital":
      return "hospital_staff"; // frontend simple → backend with _staff
    default:
      return frontendRole; // mother, admin stay the same
  }
};

export const getFrontendRole = (backendRole) => {
  // Convert backend role to frontend role format
  switch (backendRole) {
    case "health_worker":
      return "health-worker"; // backend underscore → frontend hyphen
    case "hospital_staff":
      return "hospital"; // backend with _staff → frontend simple
    default:
      return backendRole; // mother, admin stay the same
  }
};

export const ROLES_CONFIG = {
  mother: {
    id: "mother",
    title: "Mother/Parent",
    icon: "Users",
    description: "Track your child's vaccination schedule",
    color: "bg-blue-500",
    showChildren: true,
    showDetails: true,
  },
  "health-worker": {
    id: "health-worker",
    title: "Community Health Worker",
    icon: "Stethoscope",
    description: "Manage vaccinations and follow-ups",
    color: "bg-green-500",
    showChildren: false,
    showDetails: false,
  },
  hospital: {
    id: "hospital",
    title: "Hospital Staff",
    icon: "Building",
    description: "Manage vaccine stock and coverage",
    color: "bg-red-500",
    showChildren: false,
    showDetails: false,
  },
  admin: {
    id: "admin",
    title: "System Administrator",
    icon: "Shield",
    description: "System analytics and user management",
    color: "bg-purple-500",
    showChildren: false,
    showDetails: false,
  },
};
