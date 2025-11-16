// src/pages/Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Shield, Users, Stethoscope, Building, Eye, EyeOff, Syringe } from 'lucide-react'

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('')
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const roles = [
    {
      id: 'mother',
      title: 'Mother/Parent',
      icon: Users,
      description: 'Track your child\'s vaccination schedule',
      color: 'bg-blue-500'
    },
    {
      id: 'health-worker',
      title: 'Community Health Worker',
      icon: Stethoscope,
      description: 'Manage vaccinations and follow-ups',
      color: 'bg-green-500'
    },
    {
      id: 'hospital',
      title: 'Hospital Staff',
      icon: Building,
      description: 'Manage vaccine stock and coverage',
      color: 'bg-red-500'
    },
    {
      id: 'admin',
      title: 'System Administrator',
      icon: Shield,
      description: 'System analytics and user management',
      color: 'bg-purple-500'
    }
  ]

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId)
    setCredentials({ username: '', password: '' })
    setErrors({})
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    // Validation
    const newErrors = {}
    if (!selectedRole) newErrors.role = 'Please select a role'
    if (!credentials.username) newErrors.username = 'Username is required'
    if (!credentials.password) newErrors.password = 'Password is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      // Mock authentication - in real app, integrate with backend
      const userData = {
        role: selectedRole,
        name: 'Demo User',
        id: '12345',
        username: credentials.username
      }
      await login(userData)
      
      // Navigate to respective dashboard
      switch(selectedRole) {
        case 'mother':
          navigate('/mother')
          break
        case 'health-worker':
          navigate('/health-worker')
          break
        case 'hospital':
          navigate('/hospital')
          break
        case 'admin':
          navigate('/admin')
          break
        default:
          break
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateAccount = () => {
    navigate(('/signup'))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mr-4">
              <Syringe className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Community Vaccination System</h1>
              <p className="text-blue-600 font-medium mt-1">
                Ensuring Complete & Timely Childhood Immunization
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Digital platform for tracking vaccinations, sending reminders, and monitoring coverage across Kenyan communities
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Enhanced Role Selection */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
              <Shield className="w-6 h-6 mr-2 text-blue-600" />
              Select Your Role
            </h2>
            <p className="text-gray-600 mb-6">Choose how you'll use the system</p>
            
            {errors.role && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                <p className="text-sm text-red-600">{errors.role}</p>
              </div>
            )}

            <div className="space-y-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedRole === role.id 
                      ? 'border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${role.color} text-white mr-4 shadow-sm`}>
                      <role.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg">{role.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{role.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Login Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedRole ? `Login as ${roles.find(r => r.id === selectedRole)?.title}` : 'Select a Role'}
            </h2>
            <p className="text-gray-600 mb-6">
              {selectedRole ? 'Enter your credentials to continue' : 'Please select your role from the options'}
            </p>
            
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-6">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {selectedRole && (
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Username Field - Consistent for all roles */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.username ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                    placeholder="Enter your username"
                    required
                  />
                  {errors.username && (
                    <p className="text-sm text-red-600 mt-1">{errors.username}</p>
                  )}
                </div>

                {/* Password Field - Consistent for all roles */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
                      }`}
                      placeholder="Enter your password"
                      required
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
                    <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing In..." : "Login to System"}
                </button>

                {/* "Don't have an account" Section */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={handleCreateAccount}
                        className="text-blue-600 hover:text-blue-700 font-medium underline transition-colors duration-200"
                      >
                        Create New Account
                      </button>
                    </p>
                  </div>
                </div>
              </form>
            )}

            {!selectedRole && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Please select your role to continue</p>
                <p className="text-gray-400 text-sm mt-2">Choose from the options on the left</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <Shield className="h-10 w-10 text-green-500 mx-auto mb-4 p-2 bg-green-50 rounded-lg" />
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">Digital Tracking</h3>
            <p className="text-sm text-gray-600">Real-time vaccination records and immunization schedules</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <Users className="h-10 w-10 text-blue-500 mx-auto mb-4 p-2 bg-blue-50 rounded-lg" />
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">SMS Reminders</h3>
            <p className="text-sm text-gray-600">Automated alerts for upcoming vaccination appointments</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200">
            <Stethoscope className="h-10 w-10 text-purple-500 mx-auto mb-4 p-2 bg-purple-50 rounded-lg" />
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">Coverage Analytics</h3>
            <p className="text-sm text-gray-600">Monitor vaccination rates and identify coverage gaps</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login