// src/components/auth/RoleSelector.jsx
import React from 'react';
import { Users, Stethoscope, Building, Shield } from 'lucide-react';

const RoleSelector = ({ selectedRole, onRoleSelect }) => {
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
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your Role</h2>
      <div className="grid gap-4">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedRole === role.id 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${role.color} text-white mr-4`}>
                <role.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">{role.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{role.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;