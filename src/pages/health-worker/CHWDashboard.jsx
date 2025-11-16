// src/pages/CHWDashboard.jsx
import React, { useState } from 'react'
import { 
  Users, 
  Shield, 
  LogOut,
  Bell,
  Search,
  Filter
} from 'lucide-react'

const CHWDashboard = () => {
 
  const [activeTab, setActiveTab] = useState('assigned')

  // Mock data
  const assignedMothers = [
    {
      id: 1,
      name: 'Jane Atieno',
      phone: '+254712345678',
      children: [
        { name: 'Maria Auma', age: '6 months', nextVaccine: 'Measles Rubella', dueDate: '2023-11-15' }
      ],
      lastVisit: '2023-10-15',
      status: 'up-to-date'
    },
    {
      id: 2,
      name: 'Grace Mwende',
      phone: '+254723456789',
      children: [
        { name: 'John Kamau', age: '4 months', nextVaccine: 'Pentavalent 3', dueDate: '2023-10-28' }
      ],
      lastVisit: '2023-09-20',
      status: 'defaulting'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Community Health Worker Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage assigned mothers and vaccination follow-ups</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm font-medium text-gray-600">Assigned Mothers</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm font-medium text-gray-600">Upcoming Vaccinations</p>
              <p className="text-2xl font-bold text-gray-900">18</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm font-medium text-gray-600">Defaulters</p>
              <p className="text-2xl font-bold text-red-600">6</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm font-medium text-gray-600">Coverage Rate</p>
              <p className="text-2xl font-bold text-green-600">75%</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {['assigned', 'defaulters', 'records', 'reports'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search mothers or children..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center text-gray-700 hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {/* Assigned Mothers List */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Assigned Mothers</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {assignedMothers.map((mother) => (
                <div key={mother.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{mother.name}</h4>
                      <p className="text-gray-600">{mother.phone}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      mother.status === 'up-to-date' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {mother.status === 'up-to-date' ? 'Up to date' : 'Defaulting'}
                    </span>
                  </div>

                  {/* Children */}
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Children</h5>
                    {mother.children.map((child, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{child.name}</p>
                            <p className="text-sm text-gray-600">{child.age}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{child.nextVaccine}</p>
                            <p className="text-sm text-gray-600">
                              Due: {new Date(child.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                      Record Vaccination
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Send Reminder
                    </button>
                    {mother.status === 'defaulting' && (
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                        Follow Up
                      </button>
                    )}
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

export default CHWDashboard