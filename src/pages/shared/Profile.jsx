/* eslint-disable no-unused-vars */
// src/pages/shared/Profile.jsx
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Shield,
} from "lucide-react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Button from "../../components/ui/Button";
import { useAuth } from "../../contexts/AuthContext";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    subCounty: "",
    ward: "",
    location: "",
    role: "",
    children: [],
  });

  // Initialize profile data from user context
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        subCounty: user.subCounty || "",
        ward: user.ward || "",
        location: user.location || "",
        role: user.role || "",
        children: user.children || [],
      });
    }
  }, [user]);

  const handleSave = async () => {
    try {
      // Prepare data to update (exclude children from profile update)
      const updateData = {
        name: profileData.name,
        username: profileData.username,
        email: profileData.email,
        phone: profileData.phone,
        subCounty: profileData.subCounty,
        ward: profileData.ward,
        location: profileData.location,
      };

      await updateUser(updateData);
      setIsEditing(false);
      // Show success message (you can add a toast notification here)
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancel = () => {
    // Reset to original user data
    if (user) {
      setProfileData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        subCounty: user.subCounty || "",
        ward: user.ward || "",
        location: user.location || "",
        role: user.role || "",
        children: user.children || [],
      });
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Helper function to extract first and last name from full name
  const getNames = () => {
    if (!profileData.name) return { firstName: "", lastName: "" };
    const parts = profileData.name.split(" ");
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
    };
  };

  const { firstName, lastName } = getNames();

  // Get role display name
  const getRoleDisplayName = () => {
    if (!profileData.role) return "";
    const roleMap = {
      mother: "Mother",
      "health-admin": "Health Administrator",
      "hospital-staff": "Hospital Staff",
      "system-admin": "System Administrator",
    };
    return roleMap[profileData.role] || profileData.role.replace("-", " ");
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {profileData.name}
                    </h2>
                    <div className="flex items-center mt-1">
                      <Shield className="h-4 w-4 text-gray-500 mr-2" />
                      <p className="text-gray-600">{getRoleDisplayName()}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Username: {profileData.username}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="flex items-center"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h3>
              <p className="text-gray-600 text-sm">
                Your basic profile information and contact details
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account Details */}
                <div className="space-y-6">
                  <h4 className="font-medium text-gray-900">Account Details</h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {profileData.name || "Not set"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {profileData.username || "Not set"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <div className="flex items-center p-2 bg-gray-50 rounded">
                      <Shield className="h-4 w-4 text-gray-500 mr-2" />
                      <p className="text-gray-900">{getRoleDisplayName()}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Role cannot be changed
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h4 className="font-medium text-gray-900">
                    Contact Information
                  </h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {profileData.email || "Not set"}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="254712345678"
                      />
                    ) : (
                      <p className="text-gray-900">
                        {profileData.phone || "Not set"}
                      </p>
                    )}
                  </div>

                  {/* Location Information - Only show for mothers */}
                  {profileData.role === "mother" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          County
                        </label>
                        <p className="text-gray-900">Kitui County</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sub-County
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="subCounty"
                            value={profileData.subCounty}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-gray-900">
                            {profileData.subCounty || "Not set"}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ward
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="ward"
                            value={profileData.ward}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-gray-900">
                            {profileData.ward || "Not set"}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location/Village
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="location"
                            value={profileData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-gray-900">
                            {profileData.location || "Not set"}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Children Section - Only for mothers */}
              {profileData.role === "mother" &&
                profileData.children &&
                profileData.children.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Registered Children
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {profileData.children.map((child, index) => (
                        <div key={index} className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-medium text-gray-900">
                            {child.name}
                          </h5>
                          <p className="text-sm text-gray-600 mt-1">
                            {child.gender === "male"
                              ? "Boy"
                              : child.gender === "female"
                              ? "Girl"
                              : "Child"}{" "}
                            • Born {formatDate(child.dateOfBirth)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Note: Children information cannot be edited from profile.
                      Please contact support for changes.
                    </p>
                  </div>
                )}
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-white rounded-lg shadow mt-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Account Security
              </h3>
              <p className="text-gray-600 text-sm">
                Manage your password and security settings
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Password</h4>
                    <p className="text-sm text-gray-600">
                      Change your account password
                    </p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Login Activity
                    </h4>
                    <p className="text-sm text-gray-600">
                      View your recent login history
                    </p>
                  </div>
                  <Button variant="outline">View Activity</Button>
                </div>

                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Account Status
                    </h4>
                    <p className="text-sm text-gray-600">
                      Account is active and in good standing
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-700 font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
