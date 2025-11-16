// src/pages/mother/Reminders.jsx
import React, { useState } from 'react';
import { Bell, BellOff, Calendar, Phone, Settings } from 'lucide-react';
import Button from '../../components/ui/Button';

const Reminders = () => {
  const [reminderSettings, setReminderSettings] = useState({
    smsReminders: true,
    phoneReminders: false,
    daysBefore: [7, 3, 1],
    timeOfDay: '09:00',
    language: 'english'
  });

  const [upcomingReminders, setUpcomingReminders] = useState([
    {
      id: 1,
      childName: 'Maria Auma',
      vaccineName: 'Measles Rubella 1',
      dueDate: '2023-11-15',
      daysUntil: 12,
      type: 'sms',
      status: 'scheduled'
    },
    {
      id: 2,
      childName: 'Maria Auma',
      vaccineName: 'Vitamin A',
      dueDate: '2023-12-01',
      daysUntil: 28,
      type: 'sms',
      status: 'scheduled'
    }
  ]);

  const [pastReminders, setPastReminders] = useState([
    {
      id: 3,
      childName: 'Maria Auma',
      vaccineName: 'Pentavalent 3',
      dueDate: '2023-09-15',
      sentDate: '2023-09-08',
      type: 'sms',
      status: 'delivered'
    },
    {
      id: 4,
      childName: 'Maria Auma',
      vaccineName: 'PCV 3',
      dueDate: '2023-09-15',
      sentDate: '2023-09-08',
      type: 'sms',
      status: 'read'
    }
  ]);

  const handleSettingChange = (key, value) => {
    setReminderSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleDayBefore = (day) => {
    const newDays = reminderSettings.daysBefore.includes(day)
      ? reminderSettings.daysBefore.filter(d => d !== day)
      : [...reminderSettings.daysBefore, day].sort((a, b) => a - b);
    
    handleSettingChange('daysBefore', newDays);
  };

  const saveSettings = () => {
    console.log('Saving reminder settings:', reminderSettings);
    // In real app, save to backend
    alert('Reminder settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
    

      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Reminder Settings */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Settings className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Reminder Settings</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Notification Methods */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Notification Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">SMS Reminders</label>
                      <p className="text-sm text-gray-500">Receive text message reminders</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('smsReminders', !reminderSettings.smsReminders)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        reminderSettings.smsReminders ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          reminderSettings.smsReminders ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone Call Reminders</label>
                      <p className="text-sm text-gray-500">Receive automated phone call reminders</p>
                    </div>
                    <button
                      onClick={() => handleSettingChange('phoneReminders', !reminderSettings.phoneReminders)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        reminderSettings.phoneReminders ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          reminderSettings.phoneReminders ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Reminder Schedule */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Reminder Schedule</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2">
                      Send reminders (days before due date)
                    </label>
                    <div className="flex space-x-2">
                      {[1, 3, 7, 14].map(day => (
                        <button
                          key={day}
                          onClick={() => toggleDayBefore(day)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            reminderSettings.daysBefore.includes(day)
                              ? 'bg-blue-100 text-blue-700 border border-blue-300'
                              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                          }`}
                        >
                          {day} day{day !== 1 ? 's' : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      value={reminderSettings.timeOfDay}
                      onChange={(e) => handleSettingChange('timeOfDay', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Language Preference */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Language Preference</h3>
                <select
                  value={reminderSettings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="english">English</option>
                  <option value="swahili">Swahili</option>
                  <option value="kikuyu">Kikuyu</option>
                  <option value="dholuo">Dholuo</option>
                </select>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={saveSettings}>
                  Save Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Upcoming Reminders */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-green-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Upcoming Reminders</h2>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {upcomingReminders.map(reminder => (
                <div key={reminder.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{reminder.childName}</h3>
                      <p className="text-sm text-gray-600 mt-1">{reminder.vaccineName}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due: {new Date(reminder.dueDate).toLocaleDateString()} 
                        <span className="ml-2">({reminder.daysUntil} days)</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {reminder.type.toUpperCase()}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {reminder.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Reminders */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <BellOff className="h-5 w-5 text-gray-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Recent Reminders</h2>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {pastReminders.map(reminder => (
                <div key={reminder.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{reminder.childName}</h3>
                      <p className="text-sm text-gray-600 mt-1">{reminder.vaccineName}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        Sent: {new Date(reminder.sentDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {reminder.type.toUpperCase()}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        reminder.status === 'delivered' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {reminder.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {upcomingReminders.length === 0 && pastReminders.length === 0 && (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reminders yet</h3>
              <p className="text-gray-600">
                Reminders will appear here when your children have upcoming vaccinations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reminders;