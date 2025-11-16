// src/components/layout/Navbar.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import NotificationBell from '../dashboard/NotificationBell';
import { Menu, LogOut, User, Building, Shield, Heart } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { setSidebarOpen } = useApp();

  const getRoleDisplay = (role) => {
    const roles = {
      mother: 'Mother/Parent',
      'health-worker': 'Community Health Worker',
      hospital: 'Hospital Staff',
      admin: 'System Administrator'
    };
    return roles[role] || role;
  };

  const getHospitalName = () => {
    // You can replace this with actual hospital data from user context
    const hospitals = {
      'hospital-1': 'Kenyatta National Hospital',
      'hospital-2': 'Moi Teaching and Referral Hospital',
      'hospital-3': 'Nairobi Hospital'
    };
    return hospitals[user?.hospitalId] || 'Hospital Portal';
  };

  // Role-based configurations
  const roleConfig = {
    mother: {
      icon: Heart,
      iconColor: 'text-pink-600',
      title: 'Parent Portal',
      userDisplay: user?.name || 'Parent',
      roleDisplay: getRoleDisplay(user?.role),
      bgColor: 'bg-white',
      borderColor: 'border-b border-gray-200',
      statsBarColor: 'bg-pink-50'
    },
    'health-worker': {
      icon: Shield,
      iconColor: 'text-green-600',
      title: 'CHW Portal',
      userDisplay: user?.name || 'Community Health Worker',
      roleDisplay: getRoleDisplay(user?.role),
      bgColor: 'bg-white',
      borderColor: 'border-b border-gray-200',
      statsBarColor: 'bg-green-50'
    },
    hospital: {
      icon: Building,
      iconColor: 'text-red-600',
      title: getHospitalName(),
      userDisplay: user?.name || 'Hospital Staff',
      roleDisplay: `${user?.department || 'Medical Department'}`,
      bgColor: 'bg-white',
      borderColor: 'border-b border-gray-200',
      statsBarColor: 'bg-red-50'
    },
    admin: {
      icon: Shield,
      iconColor: 'text-purple-600',
      title: 'Admin Portal',
      userDisplay: 'System Administrator',
      roleDisplay: 'Full Access',
      bgColor: 'bg-white',
      borderColor: 'border-b border-gray-200',
      statsBarColor: 'bg-purple-50'
    }
  };

  const config = roleConfig[user?.role] || {
    icon: User,
    iconColor: 'text-gray-600',
    title: 'Vaccination System',
    userDisplay: user?.name || 'User',
    roleDisplay: getRoleDisplay(user?.role),
    bgColor: 'bg-white',
    borderColor: 'border-b border-gray-200',
    statsBarColor: 'bg-gray-50'
  };

  const IconComponent = config.icon;

  // Calculate total navbar height for proper content padding
  const getNavbarHeight = () => {
    let height = 64; // h-16 = 4rem = 64px
    
    // Add stats bar height if present
    if (user?.role && user.role !== 'unknown') {
      height += 40; // py-2 = 0.5rem top + 0.5rem bottom = 1rem = 16px, plus some extra
    }
    
    return height;
  };

  return (
    <>
      {/* Sticky Navbar Container */}
      <div className={`sticky top-0 z-50 w-full ${config.bgColor} ${config.borderColor} shadow-sm`}>
        {/* Main Navbar */}
        <div className="w-full">
          <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
            {/* Left Section - Logo and Title */}
            <div className="flex items-center flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden mr-3"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="flex items-center min-w-0">
                <IconComponent className={`h-8 w-8 ${config.iconColor} flex-shrink-0`} />
                <span className="ml-3 text-xl font-bold text-gray-800 truncate">
                  {config.title}
                </span>
              </div>
            </div>
            
            {/* Right Section - User Info and Actions */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Notification Bell - Show for all roles except maybe mother */}
              {(user?.role === 'health-worker' || user?.role === 'hospital' || user?.role === 'admin') && (
                <NotificationBell />
              )}
              
              <div className="flex items-center space-x-3">
                {/* User Info */}
                <div className="text-right hidden sm:block min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {config.userDisplay}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {config.roleDisplay}
                  </p>
                  
                  {/* Additional info for hospital staff */}
                  {user?.role === 'hospital' && user?.facility && (
                    <p className="text-xs text-gray-400 truncate">
                      {user.facility}
                    </p>
                  )}
                </div>
                
                {/* User Avatar */}
                <div className={`p-2 ${
                  user?.role === 'mother' ? 'bg-pink-100' : 
                  user?.role === 'health-worker' ? 'bg-green-100' : 
                  user?.role === 'hospital' ? 'bg-red-100' : 'bg-purple-100'
                } rounded-full flex-shrink-0`}>
                  <IconComponent className={`h-5 w-5 ${config.iconColor}`} />
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Bar - Full Width */}
        {user?.role === 'hospital' && (
          <div className={`w-full border-t border-gray-200 ${config.statsBarColor}`}>
            <div className="px-4 sm:px-6 lg:px-8 py-2">
              <div className="flex justify-between items-center text-xs text-gray-600 w-full">
                <span className="flex-1 text-center">Today's Appointments: <strong>24</strong></span>
                <span className="flex-1 text-center">Vaccines Available: <strong>156</strong></span>
                <span className="flex-1 text-center">Staff On Duty: <strong>18</strong></span>
                <span className="flex-1 text-center">Emergency Cases: <strong>3</strong></span>
              </div>
            </div>
          </div>
        )}
        
        {user?.role === 'health-worker' && (
          <div className={`w-full border-t border-gray-200 ${config.statsBarColor}`}>
            <div className="px-4 sm:px-6 lg:px-8 py-2">
              <div className="flex justify-between items-center text-xs text-gray-600 w-full">
                <span className="flex-1 text-center">Today's Visits: <strong>8</strong></span>
                <span className="flex-1 text-center">Vaccinations Done: <strong>12</strong></span>
                <span className="flex-1 text-center">Pending Follow-ups: <strong>5</strong></span>
                <span className="flex-1 text-center">Area: <strong>{user?.area || 'Nairobi West'}</strong></span>
              </div>
            </div>
          </div>
        )}
        
        {user?.role === 'admin' && (
          <div className={`w-full border-t border-gray-200 ${config.statsBarColor}`}>
            <div className="px-4 sm:px-6 lg:px-8 py-2">
              <div className="flex justify-between items-center text-xs text-gray-600 w-full">
                <span className="flex-1 text-center">Total Users: <strong>1,234</strong></span>
                <span className="flex-1 text-center">Active Hospitals: <strong>45</strong></span>
                <span className="flex-1 text-center">Vaccine Stock: <strong>89%</strong></span>
                <span className="flex-1 text-center">System Status: <strong className="text-green-600">Online</strong></span>
              </div>
            </div>
          </div>
        )}
        
        {user?.role === 'mother' && (
          <div className={`w-full border-t border-gray-200 ${config.statsBarColor}`}>
            <div className="px-4 sm:px-6 lg:px-8 py-2">
              <div className="flex justify-between items-center text-xs text-gray-600 w-full">
                <span className="flex-1 text-center">Children Registered: <strong>{user?.childrenCount || 2}</strong></span>
                <span className="flex-1 text-center">Upcoming Vaccinations: <strong>3</strong></span>
                <span className="flex-1 text-center">Completed Doses: <strong>8</strong></span>
                <span className="flex-1 text-center">Next Appointment: <strong>Tomorrow</strong></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add spacing for the fixed navbar - This ensures content doesn't go behind navbar */}
      <style jsx>{`
        .content-wrapper {
          padding-top: ${getNavbarHeight()}px;
        }
      `}</style>
    </>
  );
};

export default Navbar;