/* eslint-disable no-unused-vars */
// src/pages/hospital/Appointments.jsx
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  MoreVertical,
} from "lucide-react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Modal from "../../components/ui/Modal";
import AppointmentForm from "../../components/forms/AppointmentForm";

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("day"); // 'day', 'week', 'month'
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      childName: "John Doe",
      parentName: "Jane Doe",
      age: "6 months",
      vaccine: "Pentavalent 2",
      date: new Date(2024, 2, 15, 9, 0),
      duration: 30,
      status: "scheduled", // scheduled, completed, cancelled, no-show
      contact: "+254712345678",
      notes: "Regular vaccination appointment",
    },
    {
      id: 2,
      childName: "Sarah Smith",
      parentName: "Michael Smith",
      age: "4 months",
      vaccine: "OPV 2",
      date: new Date(2024, 2, 15, 10, 0),
      duration: 30,
      status: "scheduled",
      contact: "+254723456789",
      notes: "",
    },
    {
      id: 3,
      childName: "David Johnson",
      parentName: "Mary Johnson",
      age: "12 months",
      vaccine: "Measles",
      date: new Date(2024, 2, 15, 11, 0),
      duration: 30,
      status: "completed",
      contact: "+254734567890",
      notes: "Completed successfully",
    },
    {
      id: 4,
      childName: "Emma Wilson",
      parentName: "Robert Wilson",
      age: "2 months",
      vaccine: "BCG",
      date: new Date(2024, 2, 16, 9, 30),
      duration: 30,
      status: "cancelled",
      contact: "+254745678901",
      notes: "Rescheduled for next week",
    },
  ];

  const statusColors = {
    scheduled: "blue",
    completed: "green",
    cancelled: "red",
    "no-show": "orange",
  };

  const getStatusLabel = (status) => {
    const labels = {
      scheduled: "Scheduled",
      completed: "Completed",
      cancelled: "Cancelled",
      "no-show": "No Show",
    };
    return labels[status] || status;
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const todayAppointments = filteredAppointments.filter(
    (apt) => apt.date.toDateString() === new Date().toDateString()
  );

  const handleCreateAppointment = (appointmentData) => {
    console.log("Creating appointment:", appointmentData);
    setShowAppointmentForm(false);
  };

  const handleUpdateAppointment = (appointmentData) => {
    console.log("Updating appointment:", appointmentData);
    setShowAppointmentForm(false);
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = (appointmentId) => {
    console.log("Deleting appointment:", appointmentId);
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    console.log("Updating appointment status:", appointmentId, newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Today's Appointments
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {todayAppointments.length}
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
                    {
                      appointments.filter((a) => a.status === "completed")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      appointments.filter((a) => a.status === "scheduled")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <XCircle className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Cancelled</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      appointments.filter((a) => a.status === "cancelled")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls and Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 w-64"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no-show">No Show</option>
                </select>

                {/* View Toggle */}
                <div className="flex border border-gray-300 rounded-md overflow-hidden">
                  {["day", "week", "month"].map((viewType) => (
                    <button
                      key={viewType}
                      onClick={() => setView(viewType)}
                      className={`px-3 py-2 text-sm font-medium capitalize ${
                        view === viewType
                          ? "bg-red-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {viewType}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setShowAppointmentForm(true)}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </div>
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Appointments
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Child & Parent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vaccine & Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-red-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {appointment.childName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.parentName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {appointment.vaccine}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.age}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {appointment.date.toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.date.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={statusColors[appointment.status]}>
                          {getStatusLabel(appointment.status)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center text-gray-500">
                          <Phone className="h-4 w-4 mr-1" />
                          {appointment.contact}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {appointment.status === "scheduled" && (
                            <>
                              <Button
                                size="small"
                                onClick={() =>
                                  handleStatusChange(
                                    appointment.id,
                                    "completed"
                                  )
                                }
                              >
                                Complete
                              </Button>
                              <Button
                                size="small"
                                variant="outline"
                                onClick={() =>
                                  handleStatusChange(
                                    appointment.id,
                                    "cancelled"
                                  )
                                }
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          <Button
                            size="small"
                            variant="outline"
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowAppointmentForm(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="small"
                            variant="outline"
                            onClick={() =>
                              handleDeleteAppointment(appointment.id)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Calendar View (Optional) */}
          <div className="bg-white rounded-lg shadow mt-6 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Calendar View
            </h3>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
              {/* Calendar days would go here */}
            </div>
          </div>

          {/* Appointment Form Modal */}
          <Modal
            isOpen={showAppointmentForm}
            onClose={() => {
              setShowAppointmentForm(false);
              setSelectedAppointment(null);
            }}
            title={selectedAppointment ? "Edit Appointment" : "New Appointment"}
            size="large"
          >
            <AppointmentForm
              appointment={selectedAppointment}
              onSubmit={
                selectedAppointment
                  ? handleUpdateAppointment
                  : handleCreateAppointment
              }
              onCancel={() => {
                setShowAppointmentForm(false);
                setSelectedAppointment(null);
              }}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
