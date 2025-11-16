// src/pages/shared/Notifications.jsx
import React, { useState } from 'react';
import { Bell, CheckCircle, XCircle, Filter, CheckCheck } from 'lucide-react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'reminder',
      title: 'Vaccination Reminder',
      message: 'Maria Auma is due for Measles Rubella vaccination in 12 days',
      timestamp: '2023-10-25T09:00:00',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'system',
      title: 'System Update',
      message: 'New features added to the vaccination tracking system',
      timestamp: '2023-10-24T14:30:00',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Stock Alert',
      message: 'BCG vaccine stock is running low at your facility',
      timestamp: '2023-10-23T11:15:00',
      read: true,
      priority: 'high'
    },
    {
      id: 4,
      type: 'success',
      title: 'Vaccination Recorded',
      message: 'Pentavalent 3 vaccination successfully recorded for John Kamau',
      timestamp: '2023-10-22T16:45:00',
      read: true,
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'red',
      medium: 'yellow',
      low: 'green'
    };
    return colors[priority] || 'gray';
  };

  const getTypeIcon = (type) => {
    const icons = {
      reminder: Bell,
      system: CheckCircle,
      alert: XCircle,
      success: CheckCheck
    };
    const IconComponent = icons[type] || Bell;
    return <IconComponent className="h-5 w-5" />;
  };

  const getTypeColor = (type) => {
    const colors = {
      reminder: 'blue',
      system: 'purple',
      alert: 'red',
      success: 'green'
    };
    return colors[type] || 'gray';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        title="Notifications" 
        subtitle="Manage your system notifications and alerts"
      />

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header with Actions */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <Bell className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                  <p className="text-gray-600">
                    {notifications.filter(n => !n.read).length} unread notifications
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={markAllAsRead}
                  variant="outline"
                  className="flex items-center"
                  disabled={notifications.every(n => n.read)}
                >
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Mark All as Read
                </Button>
                
                <div className="relative">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                  >
                    <option value="all">All Notifications</option>
                    <option value="unread">Unread Only</option>
                    <option value="reminder">Reminders</option>
                    <option value="alert">Alerts</option>
                    <option value="system">System</option>
                    <option value="success">Success</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow border-l-4 ${
                  notification.priority === 'high' ? 'border-red-500' :
                  notification.priority === 'medium' ? 'border-yellow-500' :
                  'border-green-500'
                } ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-${getTypeColor(notification.type)}-100`}>
                          {getTypeIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            <Badge variant={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            {!notification.read && (
                              <Badge variant="primary">New</Badge>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-3">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>
                              {new Date(notification.timestamp).toLocaleDateString()}
                            </span>
                            <span>
                              {new Date(notification.timestamp).toLocaleTimeString()}
                            </span>
                            <span className="capitalize">
                              {notification.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                          title="Mark as read"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete notification"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
              </h3>
              <p className="text-gray-600">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "No notifications match your current filter."
                }
              </p>
            </div>
          )}

          {/* Notification Statistics */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Notification Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {notifications.length}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {notifications.filter(n => !n.read).length}
                </div>
                <div className="text-sm text-gray-600">Unread</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {notifications.filter(n => n.priority === 'high').length}
                </div>
                <div className="text-sm text-gray-600">High Priority</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {notifications.filter(n => n.type === 'reminder').length}
                </div>
                <div className="text-sm text-gray-600">Reminders</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;