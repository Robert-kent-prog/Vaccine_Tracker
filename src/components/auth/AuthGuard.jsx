// src/components/auth/AuthGuard.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// Helper function to normalize roles for comparison
const normalizeRoleForComparison = (role) => {
  if (!role) return "";

  const normalized = role.toLowerCase().trim();

  // Map backend roles to frontend route roles
  if (normalized === "hospital_staff" || normalized === "hospital") {
    return "hospital"; // Both hospital_staff and hospital → hospital
  }
  if (normalized === "health_worker" || normalized === "health-worker") {
    return "health-worker"; // Both health_worker and health-worker → health-worker
  }
  if (normalized === "mother" || normalized === "mothers") {
    return "mother";
  }
  if (normalized === "admin") {
    return "admin";
  }

  return normalized;
};

const AuthGuard = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔍 AuthGuard Debug:", {
      requiredRole,
      userRole: user?.role,
      normalizedUserRole: normalizeRoleForComparison(user?.role),
      normalizedRequiredRole: normalizeRoleForComparison(requiredRole),
      isAuthenticated,
      loading,
    });

    if (!loading) {
      if (!isAuthenticated) {
        console.log("❌ AuthGuard: Not authenticated, redirecting to /");
        navigate("/");
      } else if (requiredRole) {
        const userNormalized = normalizeRoleForComparison(user?.role);
        const requiredNormalized = normalizeRoleForComparison(requiredRole);

        console.log(
          `🔍 AuthGuard: Checking role - User: ${userNormalized}, Required: ${requiredNormalized}`
        );

        if (userNormalized !== requiredNormalized) {
          console.log(`❌ AuthGuard: Role mismatch. Redirecting to /`);
          navigate("/");
        } else {
          console.log(`✅ AuthGuard: Role check passed!`);
        }
      }
    }
  }, [user, isAuthenticated, loading, requiredRole, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole) {
    const userNormalized = normalizeRoleForComparison(user?.role);
    const requiredNormalized = normalizeRoleForComparison(requiredRole);

    if (userNormalized !== requiredNormalized) {
      return null;
    }
  }

  return children;
};

export default AuthGuard;
