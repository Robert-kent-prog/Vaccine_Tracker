// src/components/layout/Sidebar.jsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { 
  X, 
  Home, 
  Users, 
  Shield, 
  BarChart3, 
  Settings,
  FileText,
  Bell,
  Calendar,
  Package,
  Heart,
  Building,
  Stethoscope
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const getNavigationItems = () => {
    const baseItems = {
      mother: [
        { name: 'Dashboard', href: '/mother', icon: Home },
        { name: 'My Children', href: '/mother/child/:childId', icon: Users },
        { name: 'Vaccination Schedule', href: '/mother/vaccination-schedule', icon: Calendar },
        { name: 'Reminders', href: '/mother/reminders', icon: Bell },
         { name: 'Mother`s Profile ', href: '/mother/profile', icon: Users },
        // { name: 'Health Records', href: '/mother/health-records', icon: FileText },
      ],
      'health-worker': [
        { name: 'Dashboard', href: '/health-worker', icon: Home },
        { name: 'Assigned Mothers', href: '/health-worker/assigned-mothers', icon: Users },
        { name: 'Record Vaccination', href: '/health-worker/record-vaccination', icon: Shield },
        { name: 'Defaulters List', href: '/health-worker/defaulters-list', icon: FileText },
        { name: 'Field Reports', href: '/health-worker/field-reports', icon: BarChart3 },
        { name: 'My Schedule', href: '/health-worker/schedule', icon: Calendar },
      ],
      hospital: [
        { name: 'Dashboard', href: '/hospital', icon: Home },
        { name: 'Patient Records', href: '/hospital/patients', icon: Users },
        { name: 'Vaccine Stock', href: '/hospital/vaccine-stock', icon: Package },
        { name: 'Appointments', href: '/hospital/appointments', icon: Calendar },
        { name: 'Coverage Reports', href: '/hospital/coverage-reports', icon: BarChart3 },
        { name: 'Facility Management', href: '/hospital/facility-management', icon: Settings },
      ],
      admin: [
        { name: 'Dashboard', href: '/admin', icon: Home },
        { name: 'User Management', href: '/admin/user-management', icon: Users },
        { name: 'Hospital Management', href: '/admin/hospital-management', icon: Building },
        { name: 'CHW Management', href: '/admin/chw-management', icon: Stethoscope },
        { name: 'System Analytics', href: '/admin/system-analytics', icon: BarChart3 },
        { name: 'System Settings', href: '/admin/settings', icon: Settings },
      ]
    };

    return baseItems[user?.role] || [];
  };

  const getRoleIcon = () => {
    const icons = {
      mother: Heart,
      'health-worker': Stethoscope,
      hospital: Building,
      admin: Shield
    };
    return icons[user?.role] || Users;
  };

  const navigationItems = getNavigationItems();
  const RoleIcon = getRoleIcon();

  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  // Don't render sidebar if no user or no navigation items
  if (!user || navigationItems.length === 0) {
    return null;
  }

  // Calculate dynamic height based on whether stats bar is visible
  const getSidebarHeight = () => {
    // Navbar height (h-16 = 4rem = 64px)
    let navbarHeight = 64;
    
    // Check if user has stats bar (all roles except unknown)
    const hasStatsBar = user?.role && ['mother', 'health-worker', 'hospital', 'admin'].includes(user.role);
    
    // Stats bar height (approx 40px)
    const statsBarHeight = hasStatsBar ? 40 : 0;
    
    // Total navbar height including stats
    const totalNavbarHeight = navbarHeight + statsBarHeight;
    
    return `calc(100vh - ${totalNavbarHeight}px)`;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          lg:fixed lg:left-0 lg:z-40 lg:flex lg:flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
        style={{ 
          height: getSidebarHeight(),
          top: 'auto', // Reset top positioning
        }}
      >
        {/* Sidebar Content */}
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white flex-shrink-0">
            <div className="flex items-center">
              <RoleIcon className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Items - Scrollable area */}
          <div className="flex-1 overflow-y-auto">
            <nav className="px-4 py-6">
              <ul className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  
                  return (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.href);
                          // Close sidebar on mobile after navigation
                          if (window.innerWidth < 1024) {
                            setSidebarOpen(false);
                          }
                        }}
                        className={`
                          w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200
                          ${active
                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                          }
                        `}
                      >
                        <Icon className={`h-5 w-5 mr-3 flex-shrink-0 ${
                          active ? 'text-blue-500' : 'text-gray-400'
                        }`} />
                        <span className="text-left">{item.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* User Info Footer - Stays at bottom */}
          <div className="border-t border-gray-200 bg-gray-50 p-4 flex-shrink-0">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                  <RoleIcon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate capitalize">
                  {user?.role?.replace('-', ' ') || 'Unknown Role'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;