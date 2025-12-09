/* eslint-disable no-unused-vars */
// src/pages/health-worker/MySchedule.jsx
import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Shield,
  CheckCircle,
  XCircle,
  Plus,
  Filter,
  Download,
  Bell,
} from "lucide-react";

const MySchedule = () => {
  const [activeView, setActiveView] = useState("week"); // 'day', 'week', 'month'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddVisit, setShowAddVisit] = useState(false);

  // Mock schedule data
  const schedule = [
    {
      id: 1,
      type: "home-visit",
      title: "Home Visit - Jane Atieno",
      date: "2023-11-15",
      time: "09:00",
      duration: 60,
      location: "Kibera, Lindi Village",
      mother: "Jane Atieno",
      children: ["Maria Auma (6 months)"],
      purpose: "Measles Rubella vaccination",
      status: "scheduled",
      priority: "high",
    },
    {
      id: 2,
      type: "follow-up",
      title: "Follow-up - Grace Mwende",
      date: "2023-11-15",
      time: "11:00",
      duration: 45,
      location: "Mathare, Mabatini",
      mother: "Grace Mwende",
      children: ["John Kamau (4 months)"],
      purpose: "Pentavalent 3 reminder",
      status: "scheduled",
      priority: "medium",
    },
    {
      id: 3,
      type: "community-outreach",
      title: "Community Outreach",
      date: "2023-11-15",
      time: "14:00",
      duration: 120,
      location: "Kawangware Health Center",
      mother: "Multiple families",
      children: [],
      purpose: "Vaccination awareness campaign",
      status: "scheduled",
      priority: "low",
    },
    {
      id: 4,
      type: "home-visit",
      title: "Home Visit - Sarah Ochieng",
      date: "2023-11-16",
      time: "10:00",
      duration: 60,
      location: "Dandora Phase 4",
      mother: "Sarah Ochieng",
      children: ["David Omondi (2 months)"],
      purpose: "BCG vaccination follow-up",
      status: "scheduled",
      priority: "high",
    },
    {
      id: 5,
      type: "admin",
      title: "Report Submission",
      date: "2023-11-16",
      time: "15:00",
      duration: 30,
      location: "Home Office",
      mother: "",
      children: [],
      purpose: "Weekly activity report",
      status: "scheduled",
      priority: "medium",
    },
  ];

  // Completed visits (for history)
  const completedVisits = [
    {
      id: 6,
      type: "home-visit",
      title: "Home Visit - Mary Wanjiku",
      date: "2023-11-14",
      time: "10:00",
      duration: 60,
      location: "Kibera, Soweto",
      mother: "Mary Wanjiku",
      children: ["Elizabeth Nyong'o (9 months)"],
      purpose: "Vitamin A supplementation",
      status: "completed",
      vaccinesGiven: ["Vitamin A"],
      notes: "Mother very cooperative, child in good health",
    },
    {
      id: 7,
      type: "follow-up",
      title: "Follow-up - Ann Muthoni",
      date: "2023-11-14",
      time: "13:00",
      duration: 45,
      location: "Mathare North",
      mother: "Ann Muthoni",
      children: ["Peter Kariuki (18 months)"],
      purpose: "Defaulting case follow-up",
      status: "completed",
      vaccinesGiven: [],
      notes: "Convinced mother to visit health facility tomorrow",
    },
  ];

  // Stats
  const stats = {
    scheduled: schedule.filter((v) => v.status === "scheduled").length,
    completed: completedVisits.length,
    highPriority: schedule.filter((v) => v.priority === "high").length,
    visitsThisWeek: schedule.filter((v) => {
      const visitDate = new Date(v.date);
      const today = new Date();
      const weekStart = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      return visitDate >= weekStart;
    }).length,
  };

  // Filter visits for selected date
  const getVisitsForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return schedule.filter((visit) => visit.date === dateStr);
  };

  const getVisitIcon = (type) => {
    const icons = {
      "home-visit": Users,
      "follow-up": Shield,
      "community-outreach": Users,
      admin: Calendar,
    };
    return icons[type] || Calendar;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[priority] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusColor = (status) => {
    const colors = {
      scheduled: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // Generate calendar days for the week view
  const getWeekDays = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Schedule</h1>
              <p className="text-gray-600 mt-2">
                Manage your daily visits and activities
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button
                onClick={() => setShowAddVisit(true)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Visit
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Scheduled Visits
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.scheduled}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.completed}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Bell className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    High Priority
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.highPriority}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">This Week</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.visitsThisWeek}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {["day", "week", "month"].map((view) => (
                    <button
                      key={view}
                      onClick={() => setActiveView(view)}
                      className={`px-3 py-1 text-sm font-medium rounded-md capitalize ${
                        activeView === view
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {view}
                    </button>
                  ))}
                </div>

                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Week View - Calendar Days */}
            {activeView === "week" && (
              <div className="mt-6 grid grid-cols-7 gap-4">
                {getWeekDays().map((date, index) => {
                  const dayVisits = getVisitsForDate(date);
                  const isToday =
                    date.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-2 ${
                        isToday
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="text-center">
                        <p className="text-sm text-gray-600 capitalize">
                          {date.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </p>
                        <p
                          className={`text-lg font-semibold ${
                            isToday ? "text-green-600" : "text-gray-900"
                          }`}
                        >
                          {date.getDate()}
                        </p>
                      </div>

                      <div className="mt-2 space-y-1">
                        {dayVisits.slice(0, 2).map((visit) => (
                          <div
                            key={visit.id}
                            className={`p-1 text-xs rounded border ${getPriorityColor(
                              visit.priority
                            )}`}
                          >
                            <p className="font-medium truncate">{visit.time}</p>
                            <p className="truncate">
                              {visit.mother.split(" ")[0]}
                            </p>
                          </div>
                        ))}
                        {dayVisits.length > 2 && (
                          <p className="text-xs text-gray-500 text-center">
                            +{dayVisits.length - 2} more
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Today's Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Visits */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Today's Schedule
                </h3>
                <p className="text-sm text-gray-600">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {getVisitsForDate(new Date()).map((visit) => {
                  const IconComponent = getVisitIcon(visit.type);

                  return (
                    <div key={visit.id} className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {visit.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {visit.purpose}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            visit.status
                          )}`}
                        >
                          {visit.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {visit.time} ({visit.duration} min)
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {visit.location}
                        </div>
                      </div>

                      {visit.children.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700">
                            Children:
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {visit.children.map((child, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800"
                              >
                                {child}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2 mt-4">
                        <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700">
                          Start Visit
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  );
                })}

                {getVisitsForDate(new Date()).length === 0 && (
                  <div className="p-6 text-center text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>No visits scheduled for today</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Completed Visits */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Completed Visits
                </h3>
              </div>

              <div className="divide-y divide-gray-200">
                {completedVisits.map((visit) => {
                  const IconComponent = getVisitIcon(visit.type);

                  return (
                    <div key={visit.id} className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <IconComponent className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {visit.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {new Date(visit.date).toLocaleDateString()} at{" "}
                              {visit.time}
                            </p>
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>

                      <div className="text-sm text-gray-600 mb-3">
                        <div className="flex items-center mb-1">
                          <MapPin className="h-4 w-4 mr-2" />
                          {visit.location}
                        </div>
                        <p>{visit.purpose}</p>
                      </div>

                      {visit.vaccinesGiven.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700">
                            Vaccines Given:
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {visit.vaccinesGiven.map((vaccine, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                              >
                                {vaccine}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {visit.notes && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700">{visit.notes}</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {completedVisits.length === 0 && (
                  <div className="p-6 text-center text-gray-500">
                    <CheckCircle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>No completed visits yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySchedule;
