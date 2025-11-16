// src/components/dashboard/QuickActions.jsx
import React from 'react';
import { Plus, Users, FileText, BarChart3, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getActions = () => {
    const baseActions = {
      mother: [
        {
          icon: Plus,
          label: 'Register Child',
          description: 'Add a new child to the system',
          onClick: () => console.log('Register child'),
          color: 'blue'
        },
        {
          icon: Users,
          label: 'View Children',
          description: 'See all registered children',
          onClick: () => navigate('/mother'),
          color: 'green'
        },
        {
          icon: Bell,
          label: 'Set Reminders',
          description: 'Configure vaccination reminders',
          onClick: () => navigate('/mother/reminders'),
          color: 'yellow'
        }
      ],
      'health-worker': [
        {
          icon: Plus,
          label: 'Record Vaccination',
          description: 'Record a vaccination given',
          onClick: () => navigate('/health-worker/record-vaccination'),
          color: 'blue'
        },
        {
          icon: Users,
          label: 'View Assigned Mothers',
          description: 'See mothers under your care',
          onClick: () => navigate('/health-worker/assigned-mothers'),
          color: 'green'
        },
        {
          icon: FileText,
          label: 'Field Reports',
          description: 'Submit daily field reports',
          onClick: () => navigate('/health-worker/field-reports'),
          color: 'purple'
        }
      ],
      hospital: [
        {
          icon: BarChart3,
          label: 'Coverage Reports',
          description: 'View vaccination coverage',
          onClick: () => navigate('/hospital/coverage-reports'),
          color: 'blue'
        },
        {
          icon: FileText,
          label: 'Manage Stock',
          description: 'Update vaccine inventory',
          onClick: () => navigate('/hospital/vaccine-stock'),
          color: 'green'
        },
        {
          icon: Users,
          label: 'Facility Management',
          description: 'Manage health facility data',
          onClick: () => navigate('/hospital/facility-management'),
          color: 'purple'
        }
      ],
      admin: [
        {
          icon: Users,
          label: 'User Management',
          description: 'Manage system users',
          onClick: () => navigate('/admin/user-management'),
          color: 'blue'
        },
        {
          icon: BarChart3,
          label: 'System Analytics',
          description: 'View system-wide analytics',
          onClick: () => navigate('/admin/system-analytics'),
          color: 'green'
        },
        {
          icon: FileText,
          label: 'Settings',
          description: 'Configure system settings',
          onClick: () => navigate('/admin/settings'),
          color: 'purple'
        }
      ]
    };

    return baseActions[user?.role] || [];
  };

  const actions = getActions();

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <div className={`p-3 rounded-lg ${colorClasses[action.color]} mr-4`}>
              <action.icon className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{action.label}</h4>
              <p className="text-sm text-gray-600">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;