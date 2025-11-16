// src/pages/MotherDashboard.jsx
import React, { useState } from 'react'
import { 
  Calendar, 
  Shield, 
  Bell, 
  User, 
  LogOut,
  Plus,
  CheckCircle,
  Clock
} from 'lucide-react'

const MotherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddChild, setShowAddChild] = useState(false)

  // Mock data
  const children = [
    {
      id: 1,
      name: 'Maria Auma',
      dob: '2023-05-15',
      gender: 'Female',
      upcomingVaccines: [
        { name: 'Measles Rubella', date: '2023-11-15', daysLeft: 12 },
        { name: 'Vitamin A', date: '2023-12-01', daysLeft: 28 }
      ],
      completedVaccines: [
        { name: 'BCG', date: '2023-05-15', status: 'completed' },
        { name: 'OPV 0', date: '2023-05-15', status: 'completed' },
        { name: 'Pentavalent 1', date: '2023-06-15', status: 'completed' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">


      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mother Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your children's vaccination schedules</p>
            </div>
            <button
              onClick={() => setShowAddChild(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Register Child
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'schedule', 'history', 'reminders'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Stats Cards */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Registered Children</p>
                    <p className="text-2xl font-bold text-gray-900">{children.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed Vaccines</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {children.reduce((acc, child) => acc + child.completedVaccines.length, 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Upcoming Vaccines</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {children.reduce((acc, child) => acc + child.upcomingVaccines.length, 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Children List */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">My Children</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {children.map((child) => (
                <div key={child.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{child.name}</h4>
                      <p className="text-gray-600">
                        {child.gender} • Born {new Date(child.dob).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>

                  {/* Upcoming Vaccines */}
                  <div className="mt-6">
                    <h5 className="text-lg font-medium text-gray-900 mb-4">Upcoming Vaccinations</h5>
                    <div className="space-y-3">
                      {child.upcomingVaccines.map((vaccine, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{vaccine.name}</p>
                            <p className="text-sm text-gray-600">
                              Due: {new Date(vaccine.date).toLocaleDateString()} 
                              ({vaccine.daysLeft} days)
                            </p>
                          </div>
                          <Bell className="h-5 w-5 text-blue-600" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Completed Vaccines */}
                  <div className="mt-6">
                    <h5 className="text-lg font-medium text-gray-900 mb-4">Completed Vaccinations</h5>
                    <div className="grid gap-2">
                      {child.completedVaccines.map((vaccine, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-700">{vaccine.name}</span>
                          <span className="text-gray-500 text-sm ml-auto">
                            {new Date(vaccine.date).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MotherDashboard