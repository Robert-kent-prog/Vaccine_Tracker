// src/pages/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Users,
  Stethoscope,
  Building,
  Eye,
  EyeOff,
  Syringe,
  Mail,
  Phone,
  MapPin,
  Baby,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    subCounty: "",
    ward: "",
    children: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [childData, setChildData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "male",
  });

  const roles = [
    {
      id: "mother",
      title: "Mother/Parent",
      icon: Users,
      description: "Track your child's vaccination schedule",
      color: "bg-blue-500",
      showChildren: true,
      showDetails: true,
    },
    {
      id: "health_worker",
      title: "Community Health Worker",
      icon: Stethoscope,
      description: "Manage vaccinations and follow-ups",
      color: "bg-green-500",
      showChildren: false,
      showDetails: false,
    },
    {
      id: "hospital_staff",
      title: "Hospital Staff",
      icon: Building,
      description: "Manage vaccine stock and coverage",
      color: "bg-red-500",
      showChildren: false,
      showDetails: false,
    },
    {
      id: "admin",
      title: "System Administrator",
      icon: Shield,
      description: "System analytics and user management",
      color: "bg-purple-500",
      showChildren: false,
      showDetails: false,
    },
  ];

  const kituiSubCounties = [
    "Kitui West",
    "Kitui Central",
    "Kitui East",
    "Kitui South",
    "Kitui Rural",
    "Mwingi North",
    "Mwingi West",
    "Mwingi Central",
    "Mwingi East",
  ];

  const kituiWards = {
    "Kitui West": [
      "Kwa Mutonga/Kithumula",
      "Kisasi",
      "Mbitini",
      "Kwavonza/Yatta",
      "Kanyangi",
    ],
    "Kitui Central": [
      "Miambani",
      "Township",
      "Kyangwithya West",
      "Mulango",
      "Kyangwithya East",
    ],
    "Kitui East": [
      "Zombe/Mwitika",
      "Nzambani",
      "Chuluni",
      "Voo/Kyamatu",
      "Endau/Malalani",
    ],
    "Kitui South": ["Ikanga/Kyatune", "Mutomo", "Mutha", "Ikutha", "Athi"],
    "Kitui Rural": ["Kanyonyoo", "Matinyani", "Kwa Vonza", "Kanyangi"],
    "Mwingi North": ["Kyome/Thaana", "Nguutani", "Migwani", "Kiomo/Kyethani"],
    "Mwingi West": ["Mui", "Waita", "Kathiini", "Mutonguni"],
    "Mwingi Central": ["Nuu", "Mumbuni", "Kivou", "Nguni", "Mbeti South"],
    "Mwingi East": ["Kyuso", "Mumoni", "Tseikuru", "Tharaka", "Ngomeni"],
  };

  const selectedRoleData = roles.find((role) => role.id === selectedRole);

  const validateStep1 = () => {
    const newErrors = {};
    if (!selectedRole) newErrors.role = "Please select a role";
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (selectedRoleData?.showDetails) {
      const newErrors = {};
      if (!formData.phone?.trim()) newErrors.phone = "Phone number is required";
      if (!formData.subCounty?.trim())
        newErrors.subCounty = "Sub-county is required";
      if (!formData.ward?.trim()) newErrors.ward = "Ward is required";
      if (!formData.location?.trim())
        newErrors.location = "Specific location/village is required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    return true;
  };

  const validateStep3 = () => {
    if (selectedRoleData?.showChildren && formData.children?.length === 0) {
      setErrors({ children: "Please add at least one child" });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      if (selectedRoleData?.showChildren) {
        setStep(3);
      } else {
        handleSubmit();
      }
    } else if (step === 3 && validateStep3()) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAddChild = () => {
    if (childData.name && childData.dateOfBirth) {
      setFormData((prev) => ({
        ...prev,
        children: [...prev.children, { ...childData }],
      }));
      setChildData({ name: "", dateOfBirth: "", gender: "male" });
      setErrors({});
    } else {
      setErrors({ children: "Please fill all child details" });
    }
  };

  const handleRemoveChild = (index) => {
    setFormData((prev) => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      // Prepare data for API
      const signupData = {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
        children: formData.children || [],
      };

      // ONLY add location fields for mother role
      if (selectedRole === "mother") {
        signupData.phone = formData.phone;
        signupData.subCounty = formData.subCounty;
        signupData.ward = formData.ward;
        signupData.location = formData.location;
      }
      // DO NOT add these fields for other roles at all

      // Call signup function from AuthContext
      const result = await signup(signupData);

      if (result.success) {
        navigate("/hospital");
      }
    } catch (error) {
      console.error("Full signup error:", error);
      console.error("Error response:", error.response?.data);
      setErrors({
        general: error.message || "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalSteps = () => {
    if (selectedRoleData?.showChildren) return 3;
    return 2;
  };

  const getStepLabel = (stepNum) => {
    if (stepNum === 1) return "Account";
    if (stepNum === 2)
      return selectedRoleData?.showDetails ? "Details" : "Review";
    if (stepNum === 3) return "Children";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 px-8 py-6 text-center">
          <div className="flex items-center justify-between mb-4">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="p-2 text-blue-100 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <div className="w-5"></div>
            )}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto">
              <Syringe className="w-6 h-6 text-blue-600" />
            </div>
            <button
              onClick={() => (window.location.href = "/")}
              className="text-sm text-blue-100 hover:text-white transition-colors"
            >
              Sign In
            </button>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Join Community Vaccination System
          </h1>
          <p className="text-blue-100">
            Ensuring Complete & Timely Childhood Immunization
          </p>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pt-6">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3].slice(0, getTotalSteps()).map((stepNum) => (
              <React.Fragment key={stepNum}>
                <div
                  className={`flex flex-col items-center ${
                    stepNum <= step ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      stepNum < step
                        ? "bg-blue-600 text-white"
                        : stepNum === step
                        ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {stepNum < step ? "✓" : stepNum}
                  </div>
                  <span className="text-xs mt-1 hidden sm:block">
                    {getStepLabel(stepNum)}
                  </span>
                </div>
                {stepNum < getTotalSteps() && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      stepNum < step ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="px-8 py-6">
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-6">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          {/* Step 1: Account Information */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Shield className="inline w-4 h-4 mr-2" />
                  Select Your Role
                </label>
                <div className="space-y-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRole(role.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                          selectedRole === role.id
                            ? "border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`p-3 rounded-lg ${role.color} text-white mr-4 shadow-sm`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-lg">
                              {role.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {role.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.role && (
                  <p className="text-sm text-red-600 mt-1">{errors.role}</p>
                )}
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.username
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Choose a username"
                  />
                  {errors.username && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.password
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Create a password (min. 6 characters)"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.confirmPassword
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information or Review */}
          {step === 2 && (
            <div className="space-y-6">
              {selectedRoleData?.showDetails ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="inline w-4 h-4 mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.phone
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="254712345678"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="inline w-4 h-4 mr-2" />
                        County
                      </label>
                      <input
                        type="text"
                        value="Kitui County"
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Currently serving Kitui County residents only
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sub-County
                      </label>
                      <select
                        value={formData.subCounty}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            subCounty: e.target.value,
                            ward: "", // Reset ward when sub-county changes
                          });
                        }}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.subCounty
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Sub-County</option>
                        {kituiSubCounties.map((subCounty) => (
                          <option key={subCounty} value={subCounty}>
                            {subCounty}
                          </option>
                        ))}
                      </select>
                      {errors.subCounty && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.subCounty}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ward
                      </label>
                      <select
                        value={formData.ward}
                        onChange={(e) =>
                          setFormData({ ...formData, ward: e.target.value })
                        }
                        disabled={!formData.subCounty}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          errors.ward
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        } ${
                          !formData.subCounty
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <option value="">
                          {formData.subCounty
                            ? "Select Ward"
                            : "First select Sub-County"}
                        </option>
                        {formData.subCounty &&
                          kituiWards[formData.subCounty]?.map((ward) => (
                            <option key={ward} value={ward}>
                              {ward}
                            </option>
                          ))}
                      </select>
                      {errors.ward && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors.ward}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Specific Location/Village
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.location
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your specific village, estate, or area"
                    />
                    {errors.location && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.location}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                // Review section for non-parent roles
                <div className="space-y-4">
                  <div className="text-center">
                    <Shield className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <h3 className="text-lg font-medium text-gray-900">
                      Review Your Information
                    </h3>
                    <p className="text-sm text-gray-600">
                      Please review your account details before proceeding
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Role:
                      </span>
                      <span className="text-sm text-gray-900">
                        {selectedRoleData?.title}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Full Name:
                      </span>
                      <span className="text-sm text-gray-900">
                        {formData.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Username:
                      </span>
                      <span className="text-sm text-gray-900">
                        {formData.username}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Email:
                      </span>
                      <span className="text-sm text-gray-900">
                        {formData.email}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Children Information (Only for Mothers) */}
          {step === 3 && selectedRoleData?.showChildren && (
            <div className="space-y-6">
              <div className="text-center">
                <Baby className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Add Your Children
                </h3>
                <p className="text-sm text-gray-600">
                  Register your children to track their vaccination schedules
                </p>
              </div>

              {/* Add Child Form */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">
                  Add New Child
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Child's Name
                    </label>
                    <input
                      type="text"
                      value={childData.name}
                      onChange={(e) =>
                        setChildData({ ...childData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Child's name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={childData.dateOfBirth}
                      onChange={(e) => {
                        const selectedDate = e.target.value;
                        const today = new Date().toISOString().split("T")[0];
                        if (selectedDate <= today) {
                          setChildData({
                            ...childData,
                            dateOfBirth: selectedDate,
                          });
                        }
                      }}
                      max={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Gender
                    </label>
                    <select
                      value={childData.gender}
                      onChange={(e) =>
                        setChildData({ ...childData, gender: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddChild}
                  disabled={!childData.name || !childData.dateOfBirth}
                  className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Child
                </button>
              </div>

              {/* Children List */}
              {formData.children.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Your Children ({formData.children.length})
                  </h4>
                  <div className="space-y-2">
                    {formData.children.map((child, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {child.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {child.gender} • Born{" "}
                            {new Date(child.dateOfBirth).toLocaleDateString()}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveChild(index)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {errors.children && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{errors.children}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex space-x-3 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Creating Account..."
                : step === getTotalSteps()
                ? "Complete Registration"
                : "Continue"}
            </button>
          </div>

          {/* Back to Login Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => (window.location.href = "/")}
                  className="text-blue-600 hover:text-blue-700 font-medium underline transition-colors duration-200"
                >
                  Back to Sign In
                </button>
              </p>
            </div>
          </div>

          {/* Terms Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy. Your data is securely stored and used only for
              vaccination tracking purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
